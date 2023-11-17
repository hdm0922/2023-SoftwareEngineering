

class Parser {

    static parseUserSTT({ userSTT }) {

        let inputString = "";
        for (let iter=0; iter<userSTT.length(); iter++) {
            if ( userSTT[iter] === '' ) continue;
            inputString += userSTT[iter];
        }

        return {
            order: inputString.slice(0, -2),
            positionX: 0 + inputString[inputString.length - 1],
            positionY: 0 + inputString[inputString.length - 2]
        };
    }

}


export default Parser