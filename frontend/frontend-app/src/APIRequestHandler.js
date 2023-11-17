

class APIRequestHandler {

    // temp use
    static async notifyUserSTT(userSTT) {

        return {};
        // try {
        //     const response = await fetch('/fake-backend-endpoint', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(dataToSend)
        //     });
    
        //     if (!response.ok) { throw new Error("Server Response Error"); }
    
        //     const responseData = await response.json();
        //     console.log(responseData);
        // }   catch (error) {
        //     console.error(error);
        // }


    }


    static async generatePath(userInputData) {
        return { path: "2223" }

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