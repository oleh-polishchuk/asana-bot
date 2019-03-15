const config = require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const RequestService = require('./src/services/RequestService');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.post('/pull-request/submit', (req, res) => {
    const isSecure = RequestService.isSecureRequest(req, res);
    if (!isSecure) {
        console.log(`==> Secret signature from req header is not equal to expected signature!`);
        return res.status(403).send('Forbidden');
    }

    console.log(JSON.stringify(req.body, 4));
    console.log(JSON.stringify(req.headers, 4));

    const pullRequestBody = req.body.pull_request.body;
    const matches = pullRequestBody.match(/https:\/\/app\.asana\.com\/\d\/(\d+)\/(\d+)\/f/);
    const projectId = matches && matches[1];
    const taskId = matches && matches[2];

    res.send("Hello World!")
});

app.listen(8080, () => console.log(`==> App listening on port 8080`));
