import React from "react";
import './UserInputPanel.css'

const UserInputPanel = {

    inputData: {areaSize: null,
                startPosition: null,
                importantPositions: null,
                hazardPositions: null}

};

UserInputPanel.ReactElement = () => {

    return (

        <div className="UserInputPanel">
            <InputComponent componentName={"Area Size"}/>
            <InputComponent componentName={"Start Position"}/>
            <InputComponent componentName={"Important Positions"}/>
            <InputComponent componentName={"Hazard Positions"}/>
        </div>

    );

};

const InputComponent = ({ componentName }) => {

    return (

        <div className="InputComponent">
            <span className="componentName">{componentName}</span>
            <textarea className="componentInputBox"></textarea>
        </div>
    
    );
};

export default UserInputPanel;