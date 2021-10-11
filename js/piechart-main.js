"use strict";

import { PieChart } from "./piechart.js";

const dataset = [
    {name: "Satisfied", count: 1043},
    {name: "Neutral", count: 563},
    {name: "Unsatisfied", count: 510},
    {name: "No comment", count: 175}
];

const colors = [
    "dodgerblue",
    "#FFD700",  // gold
    "rgb(255,69,0)",    // orangered
    "limegreen"
];

let pieChart = new PieChart(dataset, colors);
pieChart.draw();