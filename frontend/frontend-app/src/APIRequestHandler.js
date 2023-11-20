

class APIRequestHandler {

    static notifyUserSTT(userOrder) {
        return {
            itemID: "Hazard",
            robotPath: "22232425"
        };
    }
    

    static fetchRobotMovement() {
        return {
            robotMovement: "Move",
            moveDistance: 1
        };
    }

    // 서버측에 사용자의 명령을 전달한 후, 응답으로 새로운 입력 데이터(items, path)를 받는다.
    static fetchUpdateDataViaSTT(userOrder) {

        const itemID = userOrder ? "Hazard" : null;
        const robotPath = userOrder ? "22232425" : null;

        return {
            itemID: itemID,
            robotPath: robotPath
        };
    }

    // temp use
    static getInitialData(userInputData) {

        return {
            areaSize: "45",
            robotPosition: "12",
            importantPositions: "4215",
            hazardPositions: "1032",

            robotPath: "122223242515"
        };

        // try {
        //     const response = await fetch('/get_fake_path', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(userInputData)
        //     });
    
        //     if (!response.ok) { throw new Error("Server Response Error"); }
    
        //     const responseData = await response.json();
        //     return responseData;
        // }   catch (error) {
        //     console.error(error);
        // }

    }


}


export default APIRequestHandler;