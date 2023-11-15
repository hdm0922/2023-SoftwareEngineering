import React from "react";
import './UserInputPanel.css'

const UserInputPanel = {

    inputData: {
        areaSize: null,
        startPosition: null,
        importantPositions: null,
        hazardPositions: null
    }

};

UserInputPanel.ReactElement = () => {

    return (

        <div className="UserInputPanel">
            <InputComponent componentName={"Area Size"}
                            updateFunction={(newInput) => {UserInputPanel.inputData.areaSize = newInput;}}/>

            <InputComponent componentName={"Start Position"}
                            updateFunction={(newInput) => {UserInputPanel.inputData.startPosition = newInput;}}/>

            <InputComponent componentName={"Important Positions"}
                            updateFunction={(newInput) => {UserInputPanel.inputData.importantPositions = newInput;}}/>

            <InputComponent componentName={"Hazard Positions"}
                            updateFunction={(newInput) => {UserInputPanel.inputData.hazardPositions = newInput;}}/>
        </div>

    );

};




const InputComponent = ({ componentName, updateFunction }) => {

    return (

        <div className="InputComponent">
            <span className="componentName">{componentName}</span>
            <textarea className="componentInputBox"
                      onChange={(e) => {updateFunction(e.target.value)}}></textarea>
        </div>
    
    );
};


export default UserInputPanel;