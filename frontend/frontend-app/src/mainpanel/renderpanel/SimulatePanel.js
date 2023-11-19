import React from "react";
import './SimulatePanel.css'

import { RiRobot2Line } from "react-icons/ri";
import { MdOutlineDangerous } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";







const Line = ({ startPosition, endPosition, style }) => {
    return (
        <line x1={startPosition.x} x2={endPosition.x}
              y1={startPosition.y} y2={endPosition.y}
              style={style} />
    );
};

/*
props = { areaSize: Object, robotPath: Array<Object>, itemsToRender: Array2D<String> }
*/
const SimulatePanel = function(props) {

    const panelWidth = 600;
    const panelHeight = 400;


    const getPixelPosition = function(_x, _y) {
        return { x: ( panelWidth *  (    _x/(props.areaSize.x-1)) ),
                 y: ( panelHeight * (1 - _y/(props.areaSize.y-1)) )};
    };


    const border = [];
    {
        for (let iter=0; iter<=props.areaSize.x; iter++) {
            border.push(
                <Line startPosition={ getPixelPosition(iter, 0) }
                        endPosition={ getPixelPosition(iter, props.areaSize.y) }
                        key={`line-${border.length}`}
                        style={{stroke: "white"}}/>
            );
        }
    
        for (let iter=0; iter<props.areaSize.y; iter++) {
            border.push(
                <Line startPosition={ getPixelPosition(0, iter) }
                        endPosition={ getPixelPosition(props.areaSize.x, iter) }
                        key={`line-${border.length}`}
                        style={{stroke: "white"}}/>
            );
        }
    }

    const renderItems = function(itemsToRender) {

        const renderIcon = function(itemString) {

            switch (itemString) {
                case "Robot"        : return <RiRobot2Line />;
                case "Hazard"       : return <MdOutlineDangerous />;
                case "Important"    : return <FaRegStar />;
                default             : return "";
            }

        };

        const iconStyle = {
            width: 50,
            height: 50
        };

        iconStyle.top  = - (iconStyle.width  >> 1);
        iconStyle.left = - (iconStyle.height >> 1);

        console.log(iconStyle);

        const reactElements = [];

        for (let iter=0; iter<itemsToRender.length; iter++) {
            for (let jter=0; jter<itemsToRender[iter].length; jter++) {

                reactElements.push(

                    <div key={reactElements.length} className="renderItem"
                         style={ { top : getPixelPosition(jter, iter).y + iconStyle.top,
                                   left: getPixelPosition(jter, iter).x + iconStyle.left,
                                   width: iconStyle.width,
                                   height: iconStyle.height
                                 } } >
                        {renderIcon(itemsToRender[iter][jter])}
                    </div>

                );
            }
        }

        console.log( "Input :", itemsToRender );
        console.log( "Rendered :", reactElements );

        return reactElements;
    }

    const renderPath = function(robotPath) {

    }


    return (

        <div className="SimulatePanel">

            <svg width={panelWidth} height={panelHeight}>
                {border}
                {renderPath(props.robotPath)}
            </svg>

            {renderItems(props.itemsToRender)}
        </div>

    );

};


export default SimulatePanel;