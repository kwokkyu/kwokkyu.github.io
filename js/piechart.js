"use strict";

export class PieChart {
    constructor(dataset, colors) {
        if (dataset.length != colors.length) {
            throw new Error("The number of data points does not match the number of colors.");
        }
        this.dataset = dataset;
        this.colors = colors;
    }

    draw() {
        /* Pie Chart */
        const pieChartCanvasWidth = 200;
        const pieChartCanvasHeight = 200;
        let pieChartCanvas = document.querySelector("#piechart");
        pieChartCanvas.width = pieChartCanvasWidth;
        pieChartCanvas.height = pieChartCanvasHeight;
        let pieChartContext = pieChartCanvas.getContext("2d");
        const centerX = 100;
        const centerY = 100;
        const radius = 100;
        const distanceFromCenter = 0.6 * radius;
        let total = this.dataset.reduce((sum, {count}) => sum + count, 0);
        let currentSliceStartAngle = -0.5 * Math.PI;  // Angle measured in radians. Start at the top.
        let currentSliceTextAngle = -0.5 * Math.PI;
        let theta;
        let x;
        let y;
        let textX;
        let textY;
        let totalPercentage = 0;
        let slicePercentage = 0;

        for (let i = 0; i < this.dataset.length; i++) {
            // Draw each slice.
            let sliceAngle = (this.dataset[i].count / total) * 2 * Math.PI;  // The angle of a full circle is 2 PI.
            pieChartContext.beginPath();
            pieChartContext.arc(centerX, centerY, radius, currentSliceStartAngle, currentSliceStartAngle + sliceAngle);   // Center: (100, 100); radius: 100
            pieChartContext.lineTo(centerX, centerY);   // Draw a line to the center.
            pieChartContext.closePath();
            pieChartContext.fillStyle = this.colors[i];
            pieChartContext.fill();

            // Calculate percentage text coordinates.
            currentSliceTextAngle = currentSliceStartAngle + (sliceAngle / 2);
            if ((currentSliceTextAngle > -0.5 * Math.PI) && (currentSliceTextAngle <= 0 * Math.PI)) {
                theta = 0 * Math.PI - currentSliceTextAngle;
                x = 0.6 * radius * Math.cos(theta);
                y = 0.6 * radius * Math.sin(theta);
                textX = centerX + 0.75 * x;
                textY = centerY - y;
            } else if ((currentSliceTextAngle > 0 * Math.PI) && (currentSliceTextAngle <= 0.5 * Math.PI)) {
                theta = currentSliceTextAngle - 0 * Math.PI;
                x = 0.6 * radius * Math.cos(theta);
                y = 0.6 * radius * Math.sin(theta);
                textX = centerX + 0.75 * x;
                textY = centerY + y;
            } else if ((currentSliceTextAngle > 0.5 * Math.PI) && (currentSliceTextAngle <= 1 * Math.PI)) {
                theta = 1 * Math.PI - currentSliceTextAngle;
                x = 0.6 * radius * Math.cos(theta);
                y = 0.6 * radius * Math.sin(theta);
                textX = centerX - 1.25 * x;
                textY = centerY + y;
            } else {
                theta = currentSliceTextAngle - 1 * Math.PI;
                x = 0.6 * radius * Math.cos(theta);
                y = 0.6 * radius * Math.sin(theta);
                textX = centerX - 1.25 * x;
                textY = centerY - y;
            }

            // Draw percentage text.
            pieChartContext.font = "10px Arial";
            pieChartContext.fillStyle = "white";
            slicePercentage = this.dataset[i].count / total * 100;
            if ((parseInt(slicePercentage.toFixed(0)) + totalPercentage) > 100) {
                slicePercentage = Math.floor(this.dataset[i].count / total * 100); // Fix rounding error.
            }
            totalPercentage += slicePercentage;
            pieChartContext.fillText(slicePercentage.toFixed(0) + "%", textX, textY);

            currentSliceStartAngle += sliceAngle;
        }

        /* Legend */
        const legendCanvasWidth = 200;
        const legendCanvasHeight = 200;
        let legendCanvas = document.querySelector("#legend");
        legendCanvas.width = legendCanvasWidth;
        legendCanvas.height = legendCanvasHeight;
        let legendContext = legendCanvas.getContext("2d");
        const legendSquareX = 50;
        let legendSquareY = 30;
        const legendSquareWidth = 10;
        const legendSquareHeight = 10;
        const legendTextX = 70;
        let legendTextY = 40;

        for (let i = 0; i < this.dataset.length; i++) {
            legendContext.fillStyle = this.colors[i];
            legendContext.fillRect(legendSquareX, legendSquareY, legendSquareHeight, legendSquareHeight);
            legendSquareY += 20;
            legendContext.fillStyle = "black";
            legendContext.fillText(this.dataset[i].name, legendTextX, legendTextY);
            legendTextY += 20;
        }

        /* Event Handler */
        window.addEventListener("resize", () => {
            if (window.innerWidth < pieChartCanvasWidth + legendCanvasWidth) {
                pieChartCanvas.style.display = "block";
                legendCanvas.style.display = "block";
            } else {
                pieChartCanvas.style.display = "inline";
                legendCanvas.style.display = "inline";
            }
        });
    }
}