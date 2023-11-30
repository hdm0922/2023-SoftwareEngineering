

class Parser {

    static parseOnlyNumbers(dataString) {

        const isNumber = function(inputCharacter) {
            return /^\d$/.test(inputCharacter);
        }

        let resultString = "";

        for (let iter=0; iter<dataString.length; iter++) {
            if (!isNumber(dataString[iter])) continue;
            resultString += dataString[iter];
        }

        return resultString;
    }


    static parseUserSTT(userSTT) {

        const checkMatch = function(inputString, searchArray) {

            for (let iter=0; iter<searchArray.length; iter++) {
                if (searchArray[iter] === inputString) return true;
            }
    
            return false;
        };

        const parseWords = function(inputString) {

            const typeFixedString = ( inputString[2] === ' ' ) ?
                ( userSTT.slice(0, 2) + userSTT.slice(3, undefined) ) : inputString


            const parsedParts = typeFixedString.trim().split(/\s+/);
            const parsedWords = [ parsedParts[0] ];

            if ( parsedParts.length < 2 ) return null;

            if ( (parsedParts.length === 2) && ( parsedParts[1].length === 2 ) ) {
                parsedWords.push( parsedParts[1][0] );
                parsedWords.push( parsedParts[1][1] );
            }

            if ( parsedParts.length === 3 ) {
                parsedWords.push( parsedParts[1] );
                parsedWords.push( parsedParts[2] );
            }

            return parsedWords;
        };

        
        const parts = parseWords(userSTT);

        if ( !parts ) return null;

        const parsedResult = {
            target    :   null,
            x         :   -1,
            y         :   -1
        };



        const hazardExpectations =
            ["위험지역", "위험지점", "위명지역", "위명지점", "위염지역", "위염지점",
             "위암지역", "위암지점", "귀염지역", "귀염지점", "위암제어", "위염제어",
             "비염지역", "비염지점"];

        const importantPositionExpectations =
            ["중요지역", "중요지점", "중요시설", "중국지점"];

        const numberExpectations = [
            ['0', "영", "공", "녕", "령", "명", "염", "경", "연", "용"],
            ['1', "일", "하나"],
            ['2', "이", "둘", "리", "미"],
            ['3', "삼", "셋", "산", "색"],
            ['4', "사", "넷", "냇"],
            ['5', "오", "다섯", "다섭", "호", "어"],
            ['6', "육", "여섯", "여섭", "역", "룹"],
            ['7', "칠", "일곱"],
            ['8', "팔", "여덟", "여덜", "빨"],
            ['9', "구", "아홉", "그"]
        ];


        if ( checkMatch(parts[0], importantPositionExpectations) ) {
            parsedResult.target = "중요지점";
        }


        if ( checkMatch(parts[0], hazardExpectations) ) {
            parsedResult.target = "위험지역";
        }
    
    
        for (let iter=0; iter<10; iter++) {
            if ( checkMatch(parts[1], numberExpectations[iter]) ) { parsedResult.x = iter; }
            if ( checkMatch(parts[2], numberExpectations[iter]) ) { parsedResult.y = iter; }
        }

        return ( parsedResult.target     &&
               ( parsedResult.x !== -1 ) && 
               ( parsedResult.y !== -1 )) ?
                 parsedResult : null;
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

        const objectsArray = [];
        for (let iter=0; iter<SIZE; iter++) {
            const itemType      = String( dataString[ (iter * 3)    ] );
            const destinationX  = Number( dataString[ (iter * 3) + 1] );
            const destinationY  = Number( dataString[ (iter * 3) + 2] );
            objectsArray.push({ item: itemType, x: destinationX, y: destinationY});
        }

        return objectsArray;
    }

    static parseInputToExpectedString(dataString) {

        let expectedString = "";
        for (let iter=0; iter<dataString.length-1; iter+=2) {
            expectedString += ( "(" + dataString[iter] + " " + dataString[iter+1] + ")" );
        }

        return (dataString.length <= 2) ?
                expectedString : ( "(" + expectedString + ")" )
    }
}

export default Parser