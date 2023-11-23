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






        // check index error

        const isInBoundary = function(areaSize, position) {
            return (0 <= position.x) && (position.x <= areaSize.x)
            &&     (0 <= position.y) && (position.y <= areaSize.y);
        };

        const initialDataParsed = {
            areaSize            :   Parser.parseStringToPairsArray(initialData.areaSize)[0],
            robotPosition       :   Parser.parseStringToPairsArray(initialData.robotPosition)[0],
            importantPositions  :   Parser.parseStringToPairsArray(initialData.importantPositions),
            colorBlobPositions  :   Parser.parseStringToPairsArray(initialData.colorBlobPositions),
            hazardPositions     :   Parser.parseStringToPairsArray(initialData.hazardPositions)
        };

        let allPositionsValid = true;
        if ( !isInBoundary(initialDataParsed.areaSize,
                           initialDataParsed.robotPosition) ) { allPositionsValid = false; }

        for (let iter=0; iter<initialDataParsed.importantPositions.length; iter++) {
            if ( isInBoundary(initialDataParsed.areaSize,
                              initialDataParsed.importantPositions[iter]) ) continue;
            allPositionsValid = false;
        }

        for (let iter=0; iter<initialDataParsed.colorBlobPositions.length; iter++) {
            if ( isInBoundary(initialDataParsed.areaSize,
                              initialDataParsed.colorBlobPositions[iter]) ) continue;
            allPositionsValid = false;
        }

        for (let iter=0; iter<initialDataParsed.hazardPositions.length; iter++) {
            if ( isInBoundary(initialDataParsed.areaSize,
                              initialDataParsed.hazardPositions[iter]) ) continue;
            allPositionsValid = false;
        }

        if ( !allPositionsValid ) {
            alert("Invalid Position Detected. Try Again.");
            return;
        }


        // make data to send
        const dataToSend = {};
        dataToSend.areaSize = Parser.parseInputToExpectedString(initialData.areaSize);
        dataToSend.robotPosition = Parser.parseInputToExpectedString(initialData.robotPosition);

        if (initialData.importantPositions !== "") {
            dataToSend.importantPositions = Parser.parseInputToExpectedString(initialData.importantPositions);
        }

        if (initialData.colorBlobPositions !== "") {
            dataToSend.colorBlobPositions = Parser.parseInputToExpectedString(initialData.colorBlobPositions);
        }

        if (initialData.hazardPositions !== "") {
            dataToSend.hazardPositions = Parser.parseInputToExpectedString(initialData.hazardPositions);
        }



        // communicate with server
        const fetchedRobotPath = APIRequestHandler.fetchRobotPathViaInitialization(dataToSend);

        fetchedRobotPath.then(fetchedData => {

            initialDataParsed.robotPath =
                Parser.parseStringToPairsArray(fetchedData.robotPath);

        }).then(() => {
            props.setInitialData(initialDataParsed);
        });





        props.setRenderPanelState("SimulatePanel");
        props.setRenderButtonState("ResumeButton");
    };

    // const test = function() {

    //     const initialData = {
    //         areaSize: "33",
    //         robotPosition: "11",
    //         robotPath: "112122",
    //         colorBlobPositions: "22",
    //         importantPositions: "",
    //         hazardPositions: ""
    //     };

    //     props.setInitialData(initialData);
    //     props.setRenderPanelState("SimulatePanel");
    //     props.setRenderButtonState("ResumeButton");
    // };

    return (

        <button className="generateAreaButton"
                onClick={onEventButtonClicked}>GO</button>

    );

};


export default GenerateAreaButton;