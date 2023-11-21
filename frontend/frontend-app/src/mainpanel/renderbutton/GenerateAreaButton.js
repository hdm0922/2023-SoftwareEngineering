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

        const initialData = {
            areaSize            : Parser.parseOnlyNumbers( "" + props.userInputData.areaSizeUserInput ),
            robotPosition       : Parser.parseOnlyNumbers( "" + props.userInputData.robotPositionUserInput ),
            importantPositions  : Parser.parseOnlyNumbers( "" + props.userInputData.importantPositionsUserInput ),
            colorBlobPositions  : Parser.parseOnlyNumbers( "" + props.userInputData.colorBlobPositionsUserInput ),
            hazardPositions     : Parser.parseOnlyNumbers( "" + props.userInputData.hazardPositionsUserInput ),
        };

        // check input valid

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

 
        // make data to send
        const dataToSend = {};
        dataToSend.areaSize                 = Parser.parseInputToExpectedString(initialData.areaSize);
        dataToSend.robotPosition            = Parser.parseInputToExpectedString(initialData.robotPosition);
        if (initialData.importantPositions !== "") {
            dataToSend.importantPositions   = Parser.parseInputToExpectedString(initialData.importantPositions);
        }
        if (initialData.colorBlobPositions !== "") {
            dataToSend.colorBlobPositions   = Parser.parseInputToExpectedString(initialData.colorBlobPositions);
        }
        if (initialData.hazardPositions !== "") {
            dataToSend.hazardPositions      = Parser.parseInputToExpectedString(initialData.hazardPositions);
        }

        const fetchedRobotPath = APIRequestHandler.fetchRobotPathViaInitialization(dataToSend);
        // initialData.robotPath = fetchedRobotPath.robotPath;

        fetchedRobotPath.then(fetchedData => {
            console.log(fetchedData.robotPath);
            initialData.robotPath = fetchedData.robotPath;
        }).then(() => {
            props.setInitialData(initialData);
        });


        props.setRenderPanelState("SimulatePanel");
        props.setRenderButtonState("ResumeButton");
    };

    return (

        <button className="generateAreaButton"
                onClick={onEventButtonClicked}>GO</button>

    );

};


export default GenerateAreaButton;