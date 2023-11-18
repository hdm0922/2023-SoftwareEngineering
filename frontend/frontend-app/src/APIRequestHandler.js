

class APIRequestHandler {

    static notifyUserSTT(userOrder) {
        return null;
    }
    
    // 서버측에 사용자의 명령을 전달한 후, 응답으로 새로운 입력 데이터(items, path)를 받는다.
    static fetchUpdateData(userOrder) {
        return null;
    }

    // temp use
    static async generatePath(userInputData) {

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


        return { path: "2223" }

    }


}


export default APIRequestHandler;