import React from "react";
import ReactDOM from "react-dom";

import Paper from "paper";
import TWEEN from "@tweenjs/tween.js";

class Root extends React.Component {

    render() {
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById("app"));

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

    let rect = new Paper.Path.Rectangle(new Rectangle(0, 0, 100, 4));
    rect.fillColor = "red";
    rect.position = new Point(100, 300);
    
    rect.on("frame", function (e) {
        this.rotation += 3;
    });
}