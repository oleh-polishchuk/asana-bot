const config = require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const RequestService = require('./src/services/RequestService');
const PullRequestController = require("./src/controllers/PullRequestController");
const ResponseService = require("./src/services/ResponseService");
const PR = require("./src/services/PullRequestService");
const GithubService = require("./src/services/GithubService");
const AsanaService = require("./src/services/AsanaService");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.post('/pull-request', (req, res) => {
    try {
        const isSecure = GithubService.isSecureRequest(req, res);
        if (!isSecure) {
            return ResponseService.forbidden(res, 'Secret signature is not valid!');
        }

        if (PR.isOpened(req)) {
            PullRequestController.handleOpenedAction(req, res);
        } else if (PR.isReopened(req)) {
            PullRequestController.handleReopenedAction(req, res);
        } else if (PR.isMerged(req)) {
            PullRequestController.handleMergeAction(req, res);
        } else {
            ResponseService.info(res, `There are no handler for action: ${req.body.action}`);
        }
    } catch (e) {
        ResponseService.error(res, e.message);
    }
});

app.post('/task/:taskId/move', (req, res) => {
    try {
        const isSecure = RequestService.isSecureRequest(req, res);
        if (!isSecure) {
            return ResponseService.forbidden(res, 'Bearer token is not valid!');
        }

        const taskId = req.body.taskId;
        const projectId = req.body.projectId;
        const sectionId = req.body.sectionId;

        AsanaService.moveTask(taskId, projectId, sectionId);
        ResponseService.success(res, {
            message: `Task ${taskId} successfully moved to project ${projectId}, section ${sectionId}`
        })
    } catch (e) {
        ResponseService.error(res, e.message);
    }
});

app.listen(8080, () => console.log(`==> App listening on port 8080`));
