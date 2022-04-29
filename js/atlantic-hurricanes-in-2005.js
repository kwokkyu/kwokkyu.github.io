"use strict";

require(
    [
        "esri/Map", 
        "esri/views/SceneView",
        "esri/symbols/SimpleLineSymbol",
        "esri/renderers/SimpleRenderer",
        "esri/layers/FeatureLayer",
        "esri/layers/support/FeatureFilter",
        "esri/widgets/Home",
        "esri/widgets/Legend"
    ],
    (Map, SceneView, SimpleLineSymbol, SimpleRenderer, FeatureLayer, FeatureFilter, Home, Legend) => {
        const lineSymbol = new SimpleLineSymbol({
            width: 3,
            style: "solid"
        });

        const hurricanesRenderer = new SimpleRenderer({
            symbol: lineSymbol,
            label: "Hurricanes",
            visualVariables: [{
                type: "color",
                field: "WIND_KTS",
                legendOptions: {
                    title: "Wind Speed (Knots)"
                },
                stops: [
                    {
                        value: 20,
                        color: [255, 215, 0, 0.7],
                        label: "20"
                    },
                    {
                        value: 160,
                        color: [128, 0, 0, 0.7],
                        label: "160"
                    }
                ]
            }]
        });

        const hurricanePopupTemplate = {
            title: "{NAME}",
            content: [
                {
                    type: "fields",
                    fieldInfos: [
                        {
                            label: "Date",
                            fieldName: "Date_only"
                        },
                        {
                            label: "Category",
                            fieldName: "CAT"
                        },
                        {
                            label: "Basin",
                            fieldName: "BASIN"
                        },
                        {
                            label: "Latitude",
                            fieldName: "LAT",
                        },
                        {
                            label: "Longitude",
                            fieldName: "LONG",
                        },
                        {
                            label: "Wind Speed (Knots)",
                            fieldName: "WIND_KTS",
                        },
                        {
                            label: "Pressure",
                            fieldName: "PRESSURE",
                        }
                    ]
                }
            ] 
        };

        const hurricanesLayer = new FeatureLayer({
            // Atlantic Hurricanes 2005
            url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/1",
            renderer: hurricanesRenderer,
            outfields: ["NAME", "Date_only", "CAT", "BASIN", "LAT", "LONG", "WIND_KTS", "PRESSURE"],
            popupTemplate: hurricanePopupTemplate
        });

        const map = new Map({
            basemap: "hybrid",
            ground: "world-elevation",
            layers: [hurricanesLayer]
        });

        const view = new SceneView({
            container: "view",
            map: map,
            scale: 68954487.45369782,
            center: [-54.94081180317662, 33.12614123680388],
            popup: {
                dockOptions: {
                    position: "top-center"
                }
            }
        });

        const home = new Home({
            view: view
        });

        const legend = new Legend({
            view: view,
            container: "legend",
            layerInfos: [
                {
                    layer: hurricanesLayer,
                    title: "Atlantic Hurricanes in 2005"
                }
            ]
        });

        view.when(() => {
            view.ui.add(home, {
                position: "top-left"
            });

            view.ui.add(legend, {
                position: "bottom-left"
            });

            const fragment = document.createDocumentFragment();

            const allHurricanes = document.createElement("li");
            allHurricanes.setAttribute("hurricane-name", "ALL");
            allHurricanes.textContent = "ALL";
            allHurricanes.tabIndex = 0;
            fragment.appendChild(allHurricanes);

            const hurricanesList = document.querySelector("#hurricanes-list");

            const hurricaneNames = [];
            const hurricanesQuery = hurricanesLayer.createQuery();
            hurricanesLayer.queryFeatures(hurricanesQuery).then((hurricanes) => {
                
                hurricanes.features.forEach((hurricane) => {
                    if (!hurricaneNames.includes(hurricane.attributes.NAME)) {
                        hurricaneNames.push(hurricane.attributes.NAME);
                        const listItem = document.createElement("li");
                        listItem.setAttribute("hurricane-name", hurricane.attributes.NAME);
                        listItem.textContent = hurricane.attributes.NAME;
                        listItem.tabIndex = 0;
                        fragment.appendChild(listItem);
                    }
                });

                hurricanesList.appendChild(fragment);

                hurricanesList.addEventListener("click", (event) => {
                    const hurricaneName = event.target.getAttribute("hurricane-name");
                    if (hurricaneName && hurricaneName.length > 0) {
                        view.whenLayerView(hurricanesLayer).then((hurricanesLayerView) => {
                            if (hurricaneName == "ALL") {
                                hurricanesLayerView.filter = undefined;
                                home.go();
                            } else {
                                hurricanesLayerView.filter = new FeatureFilter({
                                    where: "NAME = '" + hurricaneName + "'"
                                });
                            }
                        }).catch((error) => {
                            console.error(error);
                        });
                    }
                });
            }).catch((error) => {
                console.error(error);
            });
        }).catch((error) => {
            console.error(error);
        });
    }
);