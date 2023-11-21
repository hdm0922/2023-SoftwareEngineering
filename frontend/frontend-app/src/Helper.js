
class Helper {


    static Array2D(x, y, value) {
        const arr = [];

        for (let iter=0; iter<y; iter++) {
            arr.push( [] );
            for (let jter=0; jter<x; jter++) { arr[iter].push(value); }
        }
    
        return arr;    
    }


    static getDirectionDegree(source, destination) {

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


    static getForwarVector(inputDirectionDegree) {

        const directionDegree = (360 + inputDirectionDegree) % 360;
        const forwardVector = {x:0, y:0};
        
        switch (directionDegree) {
            case 0      : forwardVector.y++;    break;
            case 90     : forwardVector.x++;    break;
            case 180    : forwardVector.y--;    break;
            case 270    : forwardVector.x--;    break;
            default     :                       break;
        }

        return forwardVector;
    }

}

export default Helper;