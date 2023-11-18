

class Parser {

    static parseUserSTT({ userSTT }) {

        let inputString = "";
        for (let iter=0; iter<userSTT.length(); iter++) {
            if ( userSTT[iter] === '' ) continue;
            inputString += userSTT[iter];
        }

        return {
            order: inputString.slice(0, -2),
            positionX: Number( inputString[inputString.length - 1] ),
            positionY: Number( inputString[inputString.length - 2] )
        };
    }


    static parseRobotPath(robotPathString) {
        
        const pathCounts = robotPathString.length >> 1;

        const destinationsArray = [];
        for (let iter=0; iter<pathCounts; iter++) {
            const destinationX = Number( robotPathString[ (iter << 1) ] );
            const destinationY = Number( robotPathString[ (iter << 1) + 1 ] );
            destinationsArray.push({x: destinationX, y: destinationY});
        }

        return destinationsArray;
    }

}

export default Parser