import React from "react";
import ReactDOM from "react-dom";
import { InputNumber, Input, Button } from "antd";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import * as diagram from "./Diagram";


class MachineControls extends React.Component {

    componentWillMount() {
        let model = diagram.machineModel();
        model.speed = diagram.getAngularSpeed();
        this.setState({ model });
    }

    crankChanged = (value) => {

        let { model } = this.state;
        model.crank = value;
        diagram.resetMachineModel(model);
    }

    couplerChanged = (value) => {

        let { model } = this.state;
        model.coupler = value;
        diagram.resetMachineModel(model);
    }

    offsetChanged = (value) => {

        let { model } = this.state;
        model.offset = value;
        diagram.resetMachineModel(model);
    }

    speedChanged = (value) => {
        if(value == 0){
            diagram.stopAnimation();
        } else {
            diagram.animate(value);
        }
    }

    render() {

        let { model } = this.state;
        let lblStyle = {
            width: 110,
            display: "inline-block",
            textAlign: "right",
        }

        return (
            <div class="controls">
                <div class="item">
                    <label style={lblStyle} >Crank Length</label>:&nbsp;&nbsp;
                    <InputNumber defaultValue={model.crank} onChange={this.crankChanged} />
                </div>
                <div class="item">
                    <label style={lblStyle} >Coupler Length</label>:&nbsp;&nbsp;
                    <InputNumber defaultValue={model.coupler} onChange={this.couplerChanged} />
                </div>
                <div class="item">
                    <label style={lblStyle} >Offset</label>:&nbsp;&nbsp;
                    <InputNumber defaultValue={model.offset} onChange={this.offsetChanged} />
                </div>
                <div class="item">
                    <label style={lblStyle}>Crank Speed</label>:&nbsp;&nbsp;
                    <InputNumber defaultValue={model.speed} onChange={this.speedChanged} />
                </div>
            </div>
        );
    }
}

diagram.listeners.ready = function () {
    console.log("Ready !!");
    ReactDOM.render(<MachineControls />, document.getElementById("app"))
};