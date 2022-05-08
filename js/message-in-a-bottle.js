"use strict";

require(
    [
        "esri/Map", 
        "esri/views/SceneView",
        "esri/tasks/Geoprocessor",
        "esri/layers/GraphicsLayer",
        "esri/widgets/Home",
        "esri/symbols/PolygonSymbol3D",
        "esri/geometry/Point",
        "esri/Graphic",
        "esri/tasks/support/FeatureSet",
        "esri/symbols/SimpleLineSymbol",
        "esri/config"
    ],
    (Map, SceneView, Geoprocessor, GraphicsLayer, Home, PolygonSymbol3D, Point, Graphic, FeatureSet, SimpleLineSymbol, esriConfig) => {
        esriConfig.request.corsDetection = false;
        
        const endPointURL = "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_Currents_World/GPServer/MessageInABottle";

        const geoProcessor = new Geoprocessor({
            url: endPointURL
        });
        
        const bottlePathLayer = new GraphicsLayer();
        
        const map = new Map({
            basemap: "oceans",
            ground: "world-elevation",
            layers: [bottlePathLayer]
        });

        const view = new SceneView({
            container: "view",
            map: map,
            scale: 68954487.45369782,
            center: [-81.80569898479726, 16.87349598168152]
        });

        const home = new Home({
            view: view
        });

        const bottleSymbol = new PolygonSymbol3D({
            symbolLayers: [
                {
                    type: "object",
                    resource: { primitive: "cylinder" },
                    material: { color: [38, 145, 22, 0.7]},
                    height: 300000,
                    width: 50000
                },
                {
                    type: "object",
                    resource: { primitive: "cylinder" },
                    material: { color: [38, 145, 22, 0.7]},
                    height: 150000,
                    width: 100000
                }
            ]
        });

        view.when(() => {
            view.ui.add(home, {
                position: "manual"
            });

            const panel = document.querySelector("#panel");
            view.ui.add(panel, "bottom-right");

            document.querySelector("#maximize-button").addEventListener("click", (event) => {
                event.target.style.display = "none";
                document.querySelector("#panel").style.display = "block";
                view.ui.add(panel, "bottom-right");
            });

            document.querySelector("#minimize-button").addEventListener("click", (event) => {
                document.querySelector("#panel").style.display = "none";
                document.querySelector("#maximize-button").style.display = "block";
                const maximizeButton = document.querySelector("#maximize-button");
                view.ui.add(maximizeButton, "bottom-right");
            });

            document.querySelector("#instructions-button").addEventListener("click", (event) => {
                const instructionButton = document.querySelector("#instructions-button");
                const instructions = document.querySelector("#instructions");
                if (event.target.innerHTML == "?") {
                    instructionButton.innerHTML = "X";
                    instructions.innerHTML = "To calculate the path of the bottle:<br>" +
                                             "  1. Define a starting point by clicking anywhere on the ocean parts of the map.<br>" +
                                             "  2. Enter the number of day(s) the bottle will travel in the \"Traveling Days\" textbox.<br>" +
                                             "  3. Click on the \"Calculate Path\" button.<br>";
                } else {
                    instructionButton.innerHTML = "?";
                    instructions.innerHTML = "";
                }
            });

            let days;
            document.querySelector("#days").addEventListener("input", (event) => {
                days = parseFloat(event.target.value);
            });

            let inputPoint;
            view.on("click", (event) => {
                if (inputPoint === undefined) {
                    const startingPoint = new Point({
                        longitude: event.mapPoint.longitude,
                        latitude: event.mapPoint.latitude
                    });
    
                    const bottleGraphic = new Graphic({
                        geometry: startingPoint,
                        symbol: bottleSymbol
                    });
    
                    bottlePathLayer.add(bottleGraphic);
    
                    inputPoint = new FeatureSet({
                        features: [bottleGraphic]
                    });
                }
            });

            document.querySelector("#calculate-path").addEventListener("click", (event) => {
                let message = document.querySelector("#message");
                message.innerHTML = "";

                if (inputPoint === undefined && days === undefined) {
                    message.innerHTML = "Please define a starting point on the ocean part of the map and enter the number of days that the bottle will travel."
                } else if (inputPoint === undefined) {
                    message.innerHTML = "Please define a starting point on the ocean part of the map.";
                } else if (days === undefined) {
                    message.innerHTML = "Please enter the number of days that the bottle will travel.";
                } else {
                    message.innerHTML = "Calculating..."

                    const params = {
                        "Input_Point": inputPoint,
                        "Days": days
                    };

                    geoProcessor.execute(params).then((result) => {
                        const pathFeatures = result.results[0].value.features;

                        const lineSymbol = new SimpleLineSymbol({
                            color: [255, 215, 0, 0.75],
                            width: 5
                        });

                        const pathGraphics = pathFeatures.map((feature) => {
                            feature.symbol = lineSymbol;
                            return feature;
                        });

                        bottlePathLayer.addMany(pathGraphics);

                        view.goTo({
                            target: pathGraphics
                        });

                        document.querySelector("#calculate-path").disabled = true;
                        message.innerHTML = "";
                    }).catch((error) => {
                        message.innerHTML = "Error occurred. Please try again.";
                        console.error(error);
                    });
                }
            });

            document.querySelector("#start-over").addEventListener("click", (event) => {
                inputPoint = undefined;
                days = undefined;
                bottlePathLayer.removeAll();
                document.querySelector("#days").value = "";
                document.querySelector("#calculate-path").disabled = false;
                document.querySelector("#message").innerHTML = "";
                home.go();
            });
        }).catch((error) => {
            console.error(error);
        });
    }
);