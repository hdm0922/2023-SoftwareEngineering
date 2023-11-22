

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

        const response = await fetch('/stt-handle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userOrder)
        });

        if (!response.ok) {
            throw new Error('Response was not ok.');
        }

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


}


export default APIRequestHandler;