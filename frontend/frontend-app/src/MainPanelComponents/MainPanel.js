import React from "react";
import './MainPanel.css'
import UserInputPanel from "./UserInputPanelComponents/UserInputPanel";
import BottomPanel from "./BottomPanelComponents/BottomPanel";

const MainPanel = {};

MainPanel.ReactElement = () => {

    return (

        <div className="MainPanel">
            <UserInputPanel.ReactElement />
            <BottomPanel />
        </div>

    );
};

export default MainPanel;