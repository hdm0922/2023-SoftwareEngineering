import React from "react";
import './GenerateAreaButton.css'
import { FaPlay } from "react-icons/fa";

import APIRequestHandler from "../../APIRequestHandler";

/*
props = { setRenderPanelState: Function, setRenderButtonState: Function
            userInputData: Object, setInitialData: Function }
*/
const GenerateAreaButton = function(props) {

    const onEventButtonClicked = function() {


        // 서버측에 userInputData 전송, 초기 데이터 수신함
        const initialData = APIRequestHandler.fetchInitialData(props.userInputData);
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