import React from "react";
import './UserInputPanel.css'

/* 
props = { userInputDataSetters: Object };
userInputDataSetters =  { setAreaSizeUserInput: Function, setStartPositionUserInput: Function,
                          setImportantPositionsUserInput: Function, setHazardPositionsUserInput:Function }
*/
const UserInputPanel = function(props) {

    return (

        <div className="UserInputPanel">

            <InputComponent componentName={"Area Size"}
                            updateFunction={props.userInputDataSetters.setAreaSizeUserInput}/>

            <InputComponent componentName={"Start Position"}
                            updateFunction={props.userInputDataSetters.setStartPositionUserInput}/>

            <InputComponent componentName={"Important Positions"}
                            updateFunction={props.userInputDataSetters.setImportantPositionsUserInput}/>

            <InputComponent componentName={"Hazard Positions"}
                            updateFunction={props.userInputDataSetters.setHazardPositionsUserInput}/>

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