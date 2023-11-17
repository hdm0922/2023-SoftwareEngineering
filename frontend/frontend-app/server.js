const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// POST 요청에 대한 가짜 응답을 처리하는 엔드포인트
app.post('/fake-backend-endpoint', (req, res) => {
    const requestData = req.body;

    // 여기서 가짜 응답 데이터를 생성할 수 있습니다.
    const fakeResponseData = {
        message: '가짜 응답이 성공적으로 도착했습니다!',
        receivedData: requestData
    };

    // 200 상태 코드와 함께 가짜 응답 데이터를 클라이언트에 전송합니다.
    res.status(200).json(fakeResponseData);
});


// GET 요청에 대한 가짜 응답을 처리하는 핸들러
// app.get('/fake-backend-endpoint', (req, res) => {
//     // 가짜 GET 응답 데이터 생성
//     const fakeGetResponseData = {
//         message: '가짜 GET 응답이 성공적으로 도착했습니다!'
//     };

//     // 200 상태 코드와 함께 가짜 GET 응답 데이터를 클라이언트에 전송
//     res.status(200).json(fakeGetResponseData);
// });




// 서버 시작
app.listen(port, () => {
    console.log(`가짜 백엔드 서버가 포트 ${port}에서 실행 중입니다.`);
});
