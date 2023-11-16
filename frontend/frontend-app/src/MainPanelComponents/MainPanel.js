import React, { useState } from "react";
import './MainPanel.css'
import UserInputPanel from "./UserInputPanelComponents/UserInputPanel";
import TempBottomPanel from "./BottomPanelComponents/TempBottomPanel";
import GenerateAreaButton from "./BottomPanelComponents/GenerateAreaButton";


const MainPanel = () => {

    const [renderPanel, setRenderPanel] = useState(UserInputPanel.ReactElement);

    GenerateAreaButton.setRenderPanel = setRenderPanel;

    return (

        <div className="MainPanel">
            {renderPanel}
            <TempBottomPanel />
        </div>

    );
};

export default MainPanel;