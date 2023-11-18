import Parser from "./Parser";


class SimulationHandler {

    #handler;

    #areaSize = {};
    #itemsToRender = [];
    #robotPath = [];

    constructor(initialData) {

        if (!this.#handler) {
            this.Initialize(initialData);
            this.#handler  = this;
        }

        return this.#handler;
    }


    Initialize(initialData) {

        const initializeRenderItems = (itemsArray2D, dataArray, renderType) => {
            for (let iter=0; iter<dataArray.length; iter++) {
                itemsArray2D[dataArray[iter].y]
                            [dataArray[iter].x] = renderType;
            }
        }


        const inputAreaSize             =   Parser.stringToPairsArray(initialData.areaSize);
        const initRobotPosition         =   Parser.stringToPairsArray(initialData.robotPosition);
        const initRobotPath             =   Parser.stringToPairsArray(initialData.robotPath);
        const initHazardPositions       =   Parser.stringToPairsArray(initialData.hazardPositions);
        const initImportantPositions    =   Parser.stringToPairsArray(initialData.importantPositions);

        this.#areaSize = {
            x: (inputAreaSize[0].x + 1),
            y: (inputAreaSize[0].y + 1),
        }

        this.#robotPath = initRobotPath;

        const initItemsToRender = [];
        for (let iter=0; iter<this.#areaSize.y; iter++) {
    
            initItemsToRender.push( [] );
            for (let jter=0; jter<this.#areaSize.x; jter++) {
                initItemsToRender[iter].push("");
            }
        }

        initializeRenderItems(initItemsToRender, initRobotPosition, "Robot");
        initializeRenderItems(initItemsToRender, initHazardPositions, "Hazard");
        initializeRenderItems(initItemsToRender, initImportantPositions, "Important");

        this.#itemsToRender = initItemsToRender;
    }


    UpdateRobotPath(newRobotPath) {
        this.#robotPath = newRobotPath;
    }

    UpdateItemsToRender(newItemsToRender) {
        this.#itemsToRender = newItemsToRender;
    }

    readAreaSize() { return this.#areaSize; }
    readRobotPath() { return this.#robotPath; }
    readItemsToRender() { return this.#itemsToRender; }
}


export default SimulationHandler;