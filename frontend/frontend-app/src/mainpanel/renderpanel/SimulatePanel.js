import React from "react";
import './SimulatePanel.css'

import Helper from "../../Helper";

import { RiRobot2Line } from "react-icons/ri";
import { MdOutlineDangerous } from "react-icons/md";
import { GiBurstBlob } from "react-icons/gi";
import { FaStar  } from "react-icons/fa";
import { FaArrowUp  } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";



const Line = ({ startPosition, endPosition, style }) => {
    return (
        <line x1={startPosition.x} x2={endPosition.x}
              y1={startPosition.y} y2={endPosition.y}
              style={style} />
    );
};

/*
props = { areaSize: Object, itemsToRender: Array2D<String>,
          robot: Object, updateFunctions: Object }

robot = { robotPosition: Object, robotRotationDegree: Number,
          robotPath: Array<Object>, robotGoingCorrect: Boolean,
          sensors: Object }

sensors = {  }

updateFunctions = {  }
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
    };


    const renderItems = function(itemsToRender, robotRotationDegree, robotGoingCorrect) {

        const renderIcon = function(itemString) {

            switch (itemString) {

                case "Robot"        : return <RiRobot2Line style={{
                                                                transform: "rotate(" + robotRotationDegree + "deg)",
                                                                color: (robotGoingCorrect ? "black" : "purple")
                                                            }} />;

                case "Hazard"       : return <MdOutlineDangerous className="hazardIcon"/>;
                case "Color"        : return <GiBurstBlob className="colorBlobIcon"/>
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
    };

    const renderPath = function(robotPath) {

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
                    Helper.getDirectionDegree(source, destination) )
            );

        }

        return reactElements;
    };

    const renderSensors = function(itemsToRender, robotPosition, robotRotationDegree) {

        const isInBoundary = function(position, areaSize) {
            return ((0 <= position.x) && (position.x < areaSize.x))
                && ((0 <= position.y) && (position.y < areaSize.y));
        }

        const northVector   = Helper.getForwarVector( robotRotationDegree );
        const eastVector    = Helper.getForwarVector( robotRotationDegree + 90 );
        const westVector    = Helper.getForwarVector( robotRotationDegree - 90 );

        const northPosition = {x: (robotPosition.x + northVector.x),    y: (robotPosition.y + northVector.y)};
        const eastPosition  = {x: (robotPosition.x + eastVector.x),     y: (robotPosition.y + eastVector.y)};
        const westPosition  = {x: (robotPosition.x + westVector.x),     y: (robotPosition.y + westVector.y)};


        props.updateFunctions.setHazardSensorNorth(
            isInBoundary(northPosition, props.areaSize) &&
            (itemsToRender[ northPosition.y ][ northPosition.x ] === "Hazard")
        );

        props.updateFunctions.setColorBlobSensorNorth(
            isInBoundary(northPosition, props.areaSize) &&
            (itemsToRender[ northPosition.y ][ northPosition.x ] === "Color")            
        );

        props.updateFunctions.setColorBlobSensorEast(
            isInBoundary(eastPosition, props.areaSize) &&
            (itemsToRender[ eastPosition.y ][ eastPosition.x ] === "Color")               
        );

        props.updateFunctions.setColorBlobSensorWest(
            isInBoundary(westPosition, props.areaSize) &&
            (itemsToRender[ westPosition.y ][ westPosition.x ] === "Color")                 
        );

        return (
            <div>

                <RiRobot2Line className=""
                                style={{position:"absolute", top: "450px", left: "480px",
                                        fontSize: "60px"}}/>

                <FaCircle className="sensor"
                            style={{position:"absolute", top: "420px", left: "503px"}}
                            color={(props.robot.sensors.hazardSensorNorth    ? "red"  :
                                    props.robot.sensors.colorBlobSensorNorth ? "blue" : "white")}/>

                <FaCircle className="sensor"
                            style={{position:"absolute", top: "475px", left: "450px"}}
                            color={(props.robot.sensors.colorBlobSensorWest  ? "blue" : "white")}/>

                <FaCircle className="sensor"
                            style={{position:"absolute", top: "475px", left: "555px"}}
                            color={(props.robot.sensors.colorBlobSensorEast  ? "blue" : "white")}/>

            </div>
        );
    };

    return (

        <div className="SimulatePanel">

            <svg width={panelWidth} height={panelHeight}>
                {renderBorder()}
            </svg>

            {renderPath(props.robot.robotPath)}
            {renderItems(props.itemsToRender, props.robot.robotRotationDegree,
                         props.robot.robotGoingCorrect)}

            {renderSensors(props.itemsToRender, props.robot.robotPosition,
                props.robot.robotRotationDegree)}
        </div>

    );

};


export default SimulatePanel;