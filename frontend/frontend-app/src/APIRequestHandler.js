

class APIRequestHandler {

    // temp use
    static async sendDataToServer(dataToSend) {

        try {
            const response = await fetch('/fake-backend-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });
    
            if (!response.ok) { throw new Error("Server Response Error"); }
    
            const responseData = await response.json();
            console.log(responseData);
        }   catch (error) {
            console.error(error);
        }

        console.log("Hi");
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