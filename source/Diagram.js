import Paper, { Point, Path, Color, view, project } from "paper";
import TWEEN from "@tweenjs/tween.js";

export var listeners = {};

let doAnimate = true;
let angularSpeed = 0.1;
let offset = -40;
let crankLength = 130;
let couplerLength = 200;
let crank, coupler, slider,trajectory, tip;

Paper.install(window);
window.onload = function () {

    Paper.setup('main-board');
    Paper.view.on("frame", function (e) {
        TWEEN.update();
    });

    $(window).resize(function () {
        var cw = $("#main-board").width();
        var ch = $("#main-board").height();

        project.view.viewSize = new Size(cw, ch);
        project.view.update();
    });

    console.log("PaperJS canvas is up and running !.");

    rebuildMechanism();

    if(listeners.ready){
        listeners.ready();
    }

    let rotation = 0;
    view.on("frame", function (e) {

        if (doAnimate) {
            let lastRot = rotation % 360;
            rotation += angularSpeed;
            rotateCrank(rotation);

            if (lastRot > (rotation % 360)) {
                trajectory.removeSegments();
                trajectory.moveTo(coupler.position);
            } else {
                trajectory.lineTo(coupler.position);
            }
        }
    });
}

function rebuildMechanism() {

    project.clear();
    crank = new Paper.Path.Rectangle(new Rectangle(0, 0, crankLength + 10, 10), 5);
    crank.fillColor = "red";
    crank.applyMatrix = false;
    crank.pivot = new Point(5, 5);
    crank.position = new Point(300, 300);
    crank.onMouseEnter = () => $("#main-board").css("cursor", "pointer");
    crank.onMouseLeave = () => $("#main-board").css("cursor", "default");
    crank.onMouseDrag = function (e) {

        doAnimate = false;
        trajectory.removeSegments();
        let mousePoint = e.point;
        let mv = mousePoint.subtract(this.position);
        rotateCrank(-1 * mv.angle);
    }

    coupler = new Paper.Path.Rectangle(new Rectangle(0, 0, couplerLength + 10, 10), 5);
    coupler.fillColor = "green";
    coupler.applyMatrix = false;
    coupler.pivot = new Point(5, 5);
    coupler.position = new Point(300, 300);

    slider = new Paper.Path.Rectangle(new Rectangle(0, 0, 50, 30));
    slider.fillColor = "magenta";
    slider.position = new Point(300, 300);

    tip = new Point(crankLength, 0);

    trajectory = new Path();
    trajectory.strokeColor = new Color(0.4, 0.4, 0.4, 0.4);
    trajectory.dashArray = [10, 5];
    trajectory.strokeWidth = 1;
    crank.bringToFront();
    slider.bringToFront();
    rotateCrank(0);
}

function rotateCrank(angle) {

    let rotation = -1 * angle;
    crank.rotation = rotation;
    let cpl = crank.position.add(tip.rotate(rotation));
    coupler.position = cpl;

    let v1 = cpl.subtract(crank.position);
    let acos = (v1.y - + offset) / couplerLength;
    let ang = Math.acos(acos);
    let tx = cpl.x + Math.sin(ang) * couplerLength;

    coupler.rotation = -90 + ang * 180 / Math.PI;
    slider.position = new Point(tx, crank.position.y + offset);
}

export function animate(speed){
    angularSpeed = (speed) ? speed : angularSpeed;
    doAnimate = true;
}

export function stopAnimation(){
    doAnimate = false;
}

export function getAngularSpeed(){
    return angularSpeed;
}

export function resetMachineModel({crank, coupler, offset:dy}){
    crankLength = crank;
    couplerLength = coupler;
    offset = dy;
    rebuildMechanism();
}

export function machineModel(){
    return {crank: crankLength, coupler: couplerLength, offset};
}