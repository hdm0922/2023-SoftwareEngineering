import React from "react";
import './SimulatePanel.css'

import { RiRobot2Line } from "react-icons/ri";
import { MdOutlineDangerous } from "react-icons/md";
import { FaStar  } from "react-icons/fa";
import { FaArrowUp  } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";



const Line = ({ startPosition, endPosition, style }) => {
    return (
        <line x1={startPosition.x} x2={endPosition.x}
              y1={startPosition.y} y2={endPosition.y}
              style={style} />
    );
};

/*
props = { areaSize: Object, robotPath: Array<Object>, itemsToRender: Array2D<String>,
          robotRotationDegree: Number }
*/
const SimulatePanel = function(props) {

    const panelWidth = 600;
    const panelHeight = 400;


    const getPixelPosition = function(_x, _y) {
        return { x: ( panelWidth *  (    _x/(props.areaSize.x-1)) ),
                 y: ( panelHeight * (1 - _y/(props.areaSize.y-1)) )};
    };


    const renderBorder = function() {

        const border = [];

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

        return border;
    }


    const renderItems = function(itemsToRender, robotRotationDegree) {

        const renderIcon = function(itemString) {

            switch (itemString) {
                case "Robot"        : return <RiRobot2Line style={{transform: "rotate(" + robotRotationDegree + "deg)"}} />;
                case "Hazard"       : return <MdOutlineDangerous className="hazardIcon"/>;
                case "Important"    : return <FaStar className="importantIcon" />;
                default             : return null;
            }

        };

        const iconStyle = {
            width: 50,
            height: 50
        };

        iconStyle.top  = - (iconStyle.width  >> 1);
        iconStyle.left = - (iconStyle.height >> 1);

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

        return reactElements;
    }

    const renderPath = function(robotPath) {

        const getDirectionDegree = function(source, destination) {
            const difference = "" + (destination.x - source.x) + (destination.y - source.y);

            let directionDegree = 0;
            switch (difference) {
                case "01"   : directionDegree = 0;      break;
                case "10"   : directionDegree = 90;     break;
                case "0-1"  : directionDegree = 180;    break;
                case "-10"  : directionDegree = 270;    break;
                default     : directionDegree = 0;
            }

            return directionDegree;
        }

        const renderArrow = function(arrowStyle, index, directionDegree) {
            return (
                <div key={index} className="renderArrow"
                     style={{
                        top     : (arrowStyle.top  - (arrowStyle.width  >> 1)),
                        left    : (arrowStyle.left - (arrowStyle.height >> 1)),
                        width   :  arrowStyle.width,
                        height  :  arrowStyle.height
                     }}> <FaArrowUp fontSize={30} color="black"
                                    style={{transform: "rotate(" + directionDegree + "deg)"}}/> </div>
            );

        }


        const reactElements = [];


        for (let iter=0; iter<robotPath.length-1; iter++) {

            const source        = robotPath[iter];
            const destination   = robotPath[iter+1];

            const arrowStyle = {
                top: (0.5 * ( getPixelPosition(source.x, source.y).y +
                              getPixelPosition(destination.x,destination.y).y )
                ),

                left: (0.5 * ( getPixelPosition(source.x, source.y).x +
                               getPixelPosition(destination.x, destination.y).x )
                ),

                width: 50,
                height: 50,
            };
            
            reactElements.push(
                renderArrow( arrowStyle, reactElements.length,
                    getDirectionDegree(source, destination) )
            );

        }

        return reactElements;
    }



    return (

        <div className="SimulatePanel">

            <svg width={panelWidth} height={panelHeight}>
                {renderBorder()}
            </svg>

            {renderPath(props.robotPath)}
            {renderItems(props.itemsToRender, props.robotRotationDegree)}
        </div>

    );

};


export default SimulatePanel;