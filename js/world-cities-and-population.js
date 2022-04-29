"use strict";

require(
    [
        "esri/Map", 
        "esri/views/MapView",
        "esri/layers/support/FeatureFilter",
        "esri/layers/FeatureLayer",
        "esri/renderers/SimpleRenderer",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Home",
        "esri/widgets/Legend",
        "esri/rest/support/Query",
        "esri/widgets/ScaleBar",
        "esri/widgets/Expand"
    ],
    (Map, MapView, FeatureFilter, FeatureLayer, SimpleRenderer, SimpleMarkerSymbol, BasemapGallery, Home, Legend, Query, ScaleBar, Expand) => {
        const continentLayer = new FeatureLayer({
            // World Continents
            url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Continents/FeatureServer/0",
            outfields: ["CONTINENT"]
        });

        const citySymbol = new SimpleMarkerSymbol({
            style: "circle",
            color: [210, 74, 237, 0.5]
        });

        const cityRenderer = new SimpleRenderer({
            symbol: citySymbol,
            label: "World Cities",
            visualVariables: [{
                type: "size",
                field: "POP",
                legendOptions: {
                    title: "Population"
                },
                stops: [
                    {
                        value: 100000,
                        size: 5,
                        label: "100000"
                    },
                    {
                        value: 10000000,
                        size: 30,
                        label: "10000000"
                    }
                ]
            }]
        });

        const cityPopupTemplate = {
            title: "{CITY_NAME}",
            content: [
                {
                    type: "fields",
                    fieldInfos: [
                        {
                            label: "Country",
                            fieldName: "CNTRY_NAME"
                        },
                        {
                            label: "Population",
                            fieldName: "POP",
                            format: {
                                digitSeparator: true
                            }
                        }
                    ]
                }
            ] 
        };

        const cityLayer = new FeatureLayer({                  
            // World Cities
            url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Cities/FeatureServer/0",
            renderer: cityRenderer,
            outfields: ["CITY_NAME", "CNTRY_NAME", "POP"],
            popupTemplate: cityPopupTemplate
        });

        const map = new Map({
            basemap: "topo-vector",
            layers: [cityLayer]
        });

        const view = new MapView({
            container: "view",
            map: map,
            center: [10.039922854205841, 24.379196102832942],
            scale: 74696762,
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
                    layer: cityLayer,
                    title: "World Cities and Population"
                }
            ]
        });

        const scaleBar = new ScaleBar({
            view: view,
            style: "line",
            unit: "dual"
        });

        const basemapGallery = new BasemapGallery({
            view: view,
            container: document.createElement("div")
        });

        const basemapGalleryExpand = new Expand({
            view: view,
            content: basemapGallery
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

            view.ui.add(basemapGalleryExpand, {
                position: "top-left",
                index: 1
            });

            view.ui.add(document.querySelector("#continents"), {
                position: "top-left",
                index: 0
            });

            document.querySelector("#continent-select").addEventListener("change", (event) => {
                const selectedContinent = event.target.value;
    
                if (selectedContinent == "All") {
                    view.whenLayerView(cityLayer).then((cityLayerView) => {
                        cityLayerView.filter = undefined;
                    }).catch((error) => {
                        console.error(error);
                    });
                    home.go();
                } else {
                    const continentWhere = "CONTINENT = '" + selectedContinent + "'";
    
                    const continentQuery = new Query({
                        where: continentWhere,
                        returnGeometry: true
                    });
    
                    continentLayer.queryFeatures(continentQuery).then((continents) => {
                        const continent = continents.features[0];   // Query returns only one continent.
                        view.whenLayerView(cityLayer).then((cityLayerView) => {
                            cityLayerView.filter = new FeatureFilter({
                                geometry: continent.geometry,
                                spatialRelationship: "intersects"
                            });
        
                            view.goTo({
                                center: continent.geometry.centroid,
                                scale: 50000000
                            });
                        }).catch((error) => {
                            console.error(error);
                        });
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            });
        }).catch((error) => {
            console.error(error);
        });
    }
);