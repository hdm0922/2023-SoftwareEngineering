import React from "react";
import './UserInputPanel.css'

/* 
props = { userInputDataSetters: { setAreaSize, setStartPosition,
                                  setImportantPositions, setHazardPositions } };
*/
const UserInputPanel = function(props) {

    return (

        <div className="UserInputPanel">

            <InputComponent componentName={"Area Size"}
                            updateFunction={props.userInputDataSetters.setAreaSize}/>

            <InputComponent componentName={"Start Position"}
                            updateFunction={props.userInputDataSetters.setStartPosition}/>

            <InputComponent componentName={"Important Positions"}
                            updateFunction={props.userInputDataSetters.setImportantPositions}/>

            <InputComponent componentName={"Hazard Positions"}
                            updateFunction={props.userInputDataSetters.setHazardPositions}/>

        </div>

    );

};


const InputComponent = function(props) {

    return (

        <div className="InputComponent">
            <span className="componentName">{props.componentName}</span>
            <textarea className="componentInputBox"
                      onChange={(e) => {props.updateFunction(e.target.value)}}></textarea>
        </div>
   
    );

}


export default UserInputPanel;