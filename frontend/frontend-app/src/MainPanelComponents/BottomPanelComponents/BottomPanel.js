import React, { useState } from "react";
import './BottomPanel.css'
import GenerateAreaButton from "./GenerateAreaButton";


const BottomPanel = () => {

    const [renderButton, setRenderButton] = useState(GenerateAreaButton.ReactElement);

    GenerateAreaButton.setRenderButton = setRenderButton;

    return (

        <div className="BottomPanel">
            {renderButton}
        </div>

    );

};


export default BottomPanel;