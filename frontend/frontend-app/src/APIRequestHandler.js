

class APIRequestHandler {

    // 로봇의 다음 동작을 수신한다.
    static fetchRobotAction() {
        return {
            robotAction_robotMovement: "Move",
            robotAction_moveDistance: 1,
            robotAction_isCorrectMove: true,

            unknownObjects: "H33",
            robotPath: "1112222324"
        };
    }

    // 웹서버에게 사용자의 STT명령을 전달한다.
    static notifyUserUpdateViaSTT(userOrder) {


        return;
    }

    // 웹서버에게 사용자의 입력을 전달하고, 시스템의 초기값을 수신한다.
    static fetchInitialData(userInputData) {

        return {
            areaSize: "45",
            robotPosition: "12",
            importantPositions: "4215",
            hazardPositions: "1032",
            colorBlobPositions: "2244",

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