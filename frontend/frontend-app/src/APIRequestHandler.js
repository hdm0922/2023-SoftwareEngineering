

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


    }




}


export default APIRequestHandler;