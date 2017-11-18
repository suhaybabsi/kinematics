import React from "react";
import ReactDOM from "react-dom";

import Paper, { Point } from "paper";
import TWEEN from "@tweenjs/tween.js";

Paper.install(window);
window.onload = function () {

    Paper.setup('main-board');
    Paper.view.on("frame", function (e) {
        TWEEN.update();
    });

    initCanvas();
}

function initCanvas() {

    console.log("PaperJS canvas is up and running !.");

    let crankLength = 130;
    let crank = new Paper.Path.Rectangle(new Rectangle(0, 0, crankLength, 10));
    crank.fillColor = "red";
    crank.pivot = new Point(0, 5);
    crank.position = new Point(300, 300);

    let couplerLength = 200;
    let coupler = new Paper.Path.Rectangle(new Rectangle(0, 0, couplerLength, 10));
    coupler.fillColor = "green";
    coupler.applyMatrix = false;
    coupler.pivot = new Point(0, 5);
    coupler.position = new Point(300, 300);

    let slider = new Paper.Path.Rectangle(new Rectangle(0, 0, 50, 30));
    slider.fillColor = "magenta";
    slider.position = new Point(300, 300);

    let offset = -40;
    let tip = new Point(crankLength, 0);
    let rotation = 0;
    let speed = 2;

    view.on("frame", function (e) {
        rotation += speed;
        crank.rotation += speed;

        let cpl = crank.position.add(tip.rotate(rotation));
        coupler.position = cpl;

        let v1 = cpl.subtract(crank.position);
        let acos = (v1.y -  + offset)/couplerLength;
        let ang = Math.acos(acos);
        let tx = cpl.x + Math.sin(ang) * couplerLength;

        coupler.rotation =  - 90 + ang * 180 / Math.PI;
        slider.position = new Point(tx, crank.position.y + offset);
    });
}