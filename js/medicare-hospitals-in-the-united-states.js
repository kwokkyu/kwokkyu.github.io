"use strict";

require(
    [
        "esri/Map", 
        "esri/views/MapView",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/renderers/UniqueValueRenderer",
        "esri/layers/FeatureLayer",
        "esri/layers/support/FeatureFilter",
        "esri/widgets/Home",
        "esri/widgets/Legend",
        "esri/widgets/ScaleBar"
    ],
    (Map, MapView, SimpleMarkerSymbol, UniqueValueRenderer, FeatureLayer, FeatureFilter, Home, Legend, ScaleBar) => {
        const uniqueHospitalTypeValueInfos = [];

        function createUniqueHospitalTypeValueInfo(type, color) {
            const uniqueHospitalTypeInfo = {
                value: type,
                symbol: new SimpleMarkerSymbol({
                    color: color,
                    size: "6px",
                    style: "circle",
                    outline: {
                        color: color
                    }
                })
            }
            uniqueHospitalTypeValueInfos.push(uniqueHospitalTypeInfo);
        }

        createUniqueHospitalTypeValueInfo("Psychiatric", [0, 0, 255, 0.7]);
        createUniqueHospitalTypeValueInfo("Critical Access Hospitals", [255, 0, 0, 0.7]);
        createUniqueHospitalTypeValueInfo("Acute Care Hospitals", [0, 128, 0, 0.7]);
        createUniqueHospitalTypeValueInfo("Childrens", [255, 140, 0, 0.7]);
        createUniqueHospitalTypeValueInfo("Acute Care - Department of Defense", [128, 0, 128, 0.7]);

        const hospitalsRenderer = new UniqueValueRenderer({
            field: "USER_Hos_1",
            legendOptions: {
                title: "Hospital Types"   
            },
            defaultSymbol: { 
                type: "simple-marker",
                size: "5px",
                style: "circle" 
            },
            uniqueValueInfos: uniqueHospitalTypeValueInfos
        });

        const hospitalPopupTemplate = {
            title: "{USER_Hospi}",
            content: "{USER_Addre}<br>{USER_City}, {USER_State} {USER_Zip_C}<br>{USER_Phone}"
        }

        const hospitalsLayer = new FeatureLayer({
            // Medicare Hospitals
            url: "https://services2.arcgis.com/FiaPA4ga0iQKduv3/ArcGIS/rest/services/Medicare_Hospitals/FeatureServer/0",
            renderer: hospitalsRenderer,
            outfields: ["USER_Hos_1", "USER_Hospi", "USER_Addre", "USER_City", "USER_State", "USER_Zip_C", "USER_Phone"],
            popupTemplate: hospitalPopupTemplate
        });

        const map = new Map({
            basemap: "streets-navigation-vector",
            layers: [hospitalsLayer]
        });

        const view = new MapView({
            container: "view",
            map: map,
            scale: 73957190.9489445,
            center: [-103.57947777730391, 43.96403186525061],
            popup: {
                dockOptions: {
                    position: "bottom-right"
                }
            }
        });

        const home = new Home({
            view: view
        });

        const legend = new Legend({
            view: view,
            layerInfos: [
                {
                    layer: hospitalsLayer,
                    title: "Medicare Hospitals in the United States"
                }
            ]
        });

        const scaleBar = new ScaleBar({
            view: view,
            style: "line",
            unit: "dual"
        });

        view.when(() => {
            view.ui.add(home, {
                position: "top-left"
            });

            view.ui.add(legend, {
                position: "top-right"
            });

            view.ui.add(scaleBar, {
                position: "bottom-left"
            });

            view.ui.add(document.querySelector("#select-wrapper"), {
                position: "top-left",
                index: 0
            });

            function buildWhereClause(selectedState, selectedHospitalType) {
                let whereClause;
                if (selectedState == "All") {
                    if (selectedHospitalType == "All") {
                        whereClause = "1 = 1";
                    } else {
                        whereClause = "USER_Hos_1 = '" + selectedHospitalType + "'";
                    }
                } else {
                    if (selectedHospitalType == "All") {
                        whereClause = "USER_State = '" + selectedState + "'";
                    } else {
                        whereClause = "USER_State = '" + selectedState + "' AND USER_Hos_1 = '" + selectedHospitalType + "'";
                    }
                }
                return whereClause;
            }

            function filterHospitals(view, hospitalsLayer, whereClause) {
                view.whenLayerView(hospitalsLayer).then((hospitalsLayerView) => {
                    hospitalsLayerView.filter = new FeatureFilter({
                        where: whereClause
                    });
                }).catch((error) => {
                    console.error(error);
                });
            }

            function goToTarget(hospitalsLayer, whereClause, selectedState, home, view) {
                const longitudes = [];
                const latitudes = [];
                const hospitalsQuery = hospitalsLayer.createQuery();
                hospitalsQuery.where = whereClause;
                hospitalsLayer.queryFeatures(hospitalsQuery).then((hospitals) => {
                    hospitals.features.forEach((hospital) => {
                        longitudes.push(hospital.attributes.X);
                        latitudes.push(hospital.attributes.Y);
                    });
                   
                    let longitude;
                    if (longitudes.length > 0) {
                        const minLongitude = Math.min(...longitudes);
                        const maxLongitude = Math.max(...longitudes);
                        longitude = (minLongitude + maxLongitude) / 2; 
                    }

                    let latitude;
                    if (latitudes.length > 0) {
                        const minLatitude = Math.min(...latitudes);
                        const maxLatitude = Math.max(...latitudes);
                        latitude = (minLatitude + maxLatitude) / 2;
                    }

                    if (selectedState == "All" || (longitude === undefined && latitude == undefined)) {
                        home.go();
                    } else {
                        view.goTo({
                            scale: (selectedState == "AK") ? 36978595 : 5000000,
                            center: [longitude, latitude]
                        }).catch((error) => {
                            console.error(error);
                        });
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }

            document.querySelector("#state-select").addEventListener("change", (event) => {
                const whereClause = buildWhereClause(event.target.value, document.querySelector("#hospital-type-select").value);
                filterHospitals(view, hospitalsLayer, whereClause);
                goToTarget(hospitalsLayer, whereClause, event.target.value, home, view);
            });

            document.querySelector("#hospital-type-select").addEventListener("change", (event) => {
                const whereClause = buildWhereClause(document.querySelector("#state-select").value, event.target.value);
                filterHospitals(view, hospitalsLayer, whereClause);
            });
        }).catch((error) => {
            console.error(error);
        });
    }
);