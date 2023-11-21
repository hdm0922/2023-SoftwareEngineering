

class APIRequestHandler {


    // 로봇의 다음 동작을 수신한다.
    static fetchRobotAction() {
        return {
            robotAction_robotMovement: "Move",
            robotAction_moveDistance: 1,
            robotAction_isCorrectMove: true,

            unknownObjects: "H33I00",
            robotPath: "1112222324"
        };
    }



    // 웹서버에게 사용자의 STT명령을 전달한다.
    static notifyUserUpdateViaSTT(userOrder) {


        return;
    }



    // 웹서버에게 사용자의 입력을 전달하고, 시스템의 초기값을 수신한다.
    static fetchRobotPathViaInitialization(userInputData) {
        // areaSize: "45",
        // robotPosition: "12",
        // importantPositions: "42",
        // hazardPositions: "103215",
        // colorBlobPositions: "2244",
        return {
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

    static async testWithWeb() {

        const inputData = {
            areaSize: "45",
            robotPosition: "12",
            importantPositions: "4215",
            colorBlobPositions: "2244",
            hazardPositions: "1032"
        };


        const response = await fetch('/data-initialize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        });

        if (!response.ok) {
            throw new Error('Response was not ok.');
        }

        const data = await response.json();

        console.log( data );

        return data;

    }

}


export default APIRequestHandler;