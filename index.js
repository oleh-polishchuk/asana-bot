const config = require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const RequestService = require('./src/services/RequestService');
const GithubService = require("./src/services/GithubService");
const AsanaService = require("./src/services/AsanaService");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.post('/pull-request/submit', async (req, res) => {
    try {
        const isSecure = RequestService.isSecureRequest(req, res);
        if (!isSecure) {
            console.log(`==> Secret signature from req header is not equal to expected signature!`);
            return res.status(403).send('Forbidden');
        }

        if ([ 'opened', 'reopened' ].includes(req.body.action)) {
            const pullRequestBody = req.body.pull_request.body;
            const matches = pullRequestBody.match(/https:\/\/app\.asana\.com\/\d\/(\d+)\/(\d+)\/f/);
            const projectId = matches && matches[ 1 ];
            const taskId = matches && matches[ 2 ];
            const sectionId = process.env.ASANA_CODE_REVIEW_SECTION_ID;

            if (!projectId || !taskId) {
                const ownerName = req.body.repository.owner.login;
                const repoName = req.body.repository.name;
                const pullRequestNumber = req.body.number;
                return await GithubService.closePR(ownerName, repoName, pullRequestNumber);
            }

            await AsanaService.moveTask(taskId, projectId, sectionId);
        }
    } catch (e) {
        res.status(500).send(e)
    }
});

app.listen(8080, () => console.log(`==> App listening on port 8080`));
