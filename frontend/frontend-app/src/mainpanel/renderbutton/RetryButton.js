import React from "react";
import "./RetryButton.css";
import { MdRefresh } from "react-icons/md";

// props = { setRenderButtonState: Function, serRenderPanelState: Function }
const RetryButton = function(props) {

    const onEventButtonClicked = function() {
        props.setRenderButtonState("GenerateAreaButton");
        props.setRenderPanelState("UserInputPanel");
    };

    return (

        <button className="refreshButton" onClick={onEventButtonClicked}>
            <MdRefresh className="refreshIcon" />
        </button>

    );

};


export default RetryButton;