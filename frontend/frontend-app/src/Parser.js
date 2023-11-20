

class Parser {

    static parseUserSTT(userSTT) {

        let inputString = "";
        for (let iter=0; iter<userSTT.length; iter++) {
            if ( userSTT[iter] === '' ) continue;
            inputString += userSTT[iter];
        }

        const x = Number( inputString[inputString.length - 2] );
        const y = Number( inputString[inputString.length - 1] );

        const  isValidSTT = (!isNaN(x)) && (!isNaN(y));
        
        return isValidSTT ?
        {
            order   :   inputString.slice(0, -2),
            x       :   x,
            y       :   y
        }           :   null

    }


    static parseStringToPairsArray(dataString) {

        const SIZE = dataString.length >> 1;

        const pairsArray = [];
        for (let iter=0; iter<SIZE; iter++) {
            const destinationX = Number( dataString[ (iter << 1) ] );
            const destinationY = Number( dataString[ (iter << 1) + 1] );
            pairsArray.push({x: destinationX, y: destinationY});
        }

        return pairsArray;
    }


    static parseUnknownObjects(dataString) {

        const SIZE = Number( dataString.length/3 );

        const pairsArray = [];
        for (let iter=0; iter<SIZE; iter++) {
            const itemType      = String( dataString[ (iter * 3)    ] );
            const destinationX  = Number( dataString[ (iter * 3) + 1] );
            const destinationY  = Number( dataString[ (iter * 3) + 2] );
            pairsArray.push({ item: itemType, x: destinationX, y: destinationY});
        }

        return pairsArray;
    }


}

export default Parser