

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



    // 웹서버에게 사용자의 입력을 전달하고, 로봇의 경로를 수신한다.
    static async fetchRobotPathViaInitialization(userInputData) {

        console.log(userInputData);

        const response = await fetch('/data-initialize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInputData)
        });

        if (!response.ok) {
            throw new Error('Response was not ok.');
        }

        const data = await response.json();
        return data;
    }

    static async testWithWeb() {



        const inputData = {
            areaSize: "(8 8)",
            robotPosition: "(4 4)",
            importantPositions: "(1 2)",
            colorBlobPositions: "((7 6)(7 7))",
            hazardPositions: "((4 5)(5 6))"
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