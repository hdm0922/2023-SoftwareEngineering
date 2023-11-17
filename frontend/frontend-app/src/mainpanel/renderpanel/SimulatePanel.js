import React from "react";
import './SimulatePanel.css'


const Line = ({ startPosition, endPosition }) => {
    return (
        <line x1={startPosition.x} x2={endPosition.x}
                y1={startPosition.y} y2={endPosition.y}
                stroke="black" />
    );
};


const SimulatePanel = function(props) {
    
    const panelWidth = 600;
    const panelHeight = 400;


    const getPixelPosition = function(_x, _y) {
        return { x: ( panelWidth *  (    _x/props.areaSize.x) ),
                 y: ( panelHeight * (1 - _y/props.areaSize.y) )};
    };


    const border = [];

    for (let iter=0; iter<=props.areaSize.x; iter++) {
        border.push(
            <Line startPosition={ getPixelPosition(iter, 0) }
                    endPosition={ getPixelPosition(iter, props.areaSize.y) }/>
        );
    }

    for (let iter=0; iter<=props.areaSize.y; iter++) {
        border.push(
            <Line startPosition={ getPixelPosition(0, iter) }
                    endPosition={ getPixelPosition(props.areaSize.x, iter) }/>
        );
    }

    return (

        <div className="SimulatePanel">
            <svg width={panelWidth} height={panelHeight}>{border}</svg>
        </div>

    );

};


export default SimulatePanel;