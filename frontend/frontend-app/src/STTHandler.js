
class STTHandler {

    language;
    recognition;

    constructor({ language }) {

        this.language = language;
        this.recognition = new window.webkitSpeechRecognition();

    }

    GetConvertedText() {
        return new Promise((resolve, reject) => {

            this.recognition.onresult     = (event) => { resolve(event.results[0][0].transcript); };
            this.recognition.onerror      = (event) => { reject(event.error); };
        
            this.recognition.start();
        
          });
    }

}


export default STTHandler;