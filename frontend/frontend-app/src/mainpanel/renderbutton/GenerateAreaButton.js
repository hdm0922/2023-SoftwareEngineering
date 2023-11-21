import React from "react";
import './GenerateAreaButton.css'

import APIRequestHandler from "../../APIRequestHandler";
import Parser from "../../Parser";

/*
props = { setRenderPanelState: Function, setRenderButtonState: Function
            userInputData: Object, setInitialData: Function }
*/
const GenerateAreaButton = function(props) {

    const onEventButtonClicked = function() {

        console.log( props.userInputData );

        const initialData = {
            areaSize            : Parser.parseOnlyNumbers( "" + props.userInputData.areaSizeUserInput ),
            robotPosition       : Parser.parseOnlyNumbers( "" + props.userInputData.robotPositionUserInput ),
            importantPositions  : Parser.parseOnlyNumbers( "" + props.userInputData.importantPositionsUserInput ),
            colorBlobPositions  : Parser.parseOnlyNumbers( "" + props.userInputData.colorBlobPositionsUserInput ),
            hazardPositions     : Parser.parseOnlyNumbers( "" + props.userInputData.hazardPositionsUserInput ),
        };

        const isValidInput =
            ( initialData.areaSize.length               === 2 ) &&
            ( initialData.robotPosition.length          === 2 ) &&
            ( initialData.importantPositions.length % 2 === 0 ) &&
            ( initialData.colorBlobPositions.length % 2 === 0 ) &&
            ( initialData.hazardPositions.length    % 2 === 0 );     

        if (!isValidInput) {
            alert("Invalid Input");
            return;
        }

        const nowhereToSearch = 
        ( initialData.importantPositions.length === 0 ) &&
        ( initialData.colorBlobPositions.length === 0 );

        if (nowhereToSearch) {
            alert("Nowhere to search!");
            return;
        }

 

        const robotPath = APIRequestHandler.fetchRobotPathViaInitialization(initialData);
        initialData.robotPath = robotPath.robotPath;

        console.log( initialData );

        props.setInitialData(initialData);

        props.setRenderPanelState("SimulatePanel");
        props.setRenderButtonState("ResumeButton");
    };

    return (

        <button className="generateAreaButton"
                onClick={onEventButtonClicked}>GO</button>

    );

};


export default GenerateAreaButton;