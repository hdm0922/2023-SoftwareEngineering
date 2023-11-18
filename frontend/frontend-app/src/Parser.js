

class Parser {

    static parseUserSTT({ userSTT }) {

        let inputString = "";
        for (let iter=0; iter<userSTT.length(); iter++) {
            if ( userSTT[iter] === '' ) continue;
            inputString += userSTT[iter];
        }

        return {
            order: inputString.slice(0, -2),
            x: Number( inputString[inputString.length - 1] ),
            y: Number( inputString[inputString.length - 2] )
        };
    }


    static stringToPairsArray(dataString) {


        const SIZE = dataString.length >> 1;

        const pairsArray = [];
        for (let iter=0; iter<SIZE; iter++) {
            const destinationX = Number( dataString[ (iter << 1) ] );
            const destinationY = Number( dataString[ (iter << 1) + 1] );
            pairsArray.push({x: destinationX, y: destinationY});
        }
        return pairsArray;
    }

}

export default Parser