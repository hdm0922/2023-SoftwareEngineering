

class APIRequestHandler {


    // 로봇의 다음 동작을 수신한다.
    static async fetchRobotAction() {

        const response = await fetch('/robot-action', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error('Response was not ok.');
        }

        const data = await response.json();
        return data;
    }



    // 웹서버에게 사용자의 STT명령을 전달한다.
    static async notifyUserUpdateViaSTT(userOrder) {

        console.log(userOrder);

        const response = await fetch('/handle-stt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userOrder)
        });

        if (!response.ok) {
            throw new Error('Response was not ok.');
        }   else { console.log("Data Received", userOrder); }


        return;
    }



    // 웹서버에게 사용자의 입력을 전달하고, 로봇의 경로를 수신한다.
    static async fetchRobotPathViaInitialization(userInputData) {

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



    static async testWithWeb(testCounter) {

        const ret = {
            robotAction_robotMovement: undefined,
            robotAction_moveDistance: undefined,
            robotAction_isCorrectMove: true,
            unknownObjects: null,
            robotPath: undefined
        };

        switch (testCounter) {

            case 0:
                ret.robotAction_robotMovement = "Rotate";
                ret.robotAction_moveDistance = 0;
                ret.robotPath = "112122";
                break;

            case 1:
                ret.robotAction_robotMovement = "Move";
                ret.robotAction_moveDistance = 1;
                ret.robotPath = "2122";
                break;

            case 2,3,4:
                ret.robotAction_robotMovement = "Rotate";
                ret.robotAction_moveDistance = 0;
                ret.robotPath = "2122";
                break;
                
            case 5:
                ret.robotAction_robotMovement = "Move";
                ret.robotAction_moveDistance = 1;
                ret.robotPath = "22";
                break;
        }

        return ret;

    }

}


export default APIRequestHandler;