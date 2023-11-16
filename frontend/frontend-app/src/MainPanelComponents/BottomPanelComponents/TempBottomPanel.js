import React, { useState } from "react";
import './TempBottomPanel.css'
import GenerateAreaButton from "./GenerateAreaButton";


const TempBottomPanel = () => {

    const [renderButton, setRenderButton] = useState(GenerateAreaButton.ReactElement);

    GenerateAreaButton.setRenderButton = setRenderButton;

    return (

        <div className="Bo1ttomPanel">
            {renderButton}
        </div>

    );

};


export default TempBottomPanel;