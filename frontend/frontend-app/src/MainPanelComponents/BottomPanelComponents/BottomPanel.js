import React from "react";
import './BottomPanel.css'
import GenerateAreaButton from "./GenerateAreaButton";

const BottomPanel = {

    RenderButton: GenerateAreaButton.ReactElement,

};

BottomPanel.ReactElement = () => {

    return (

        <div className="BottomPanel">
            <BottomPanel.RenderButton />
        </div>

    );

};


BottomPanel.SetRenderButton = function(RenderButton) {
    BottomPanel.RenderButton = RenderButton;
}


export default BottomPanel;
