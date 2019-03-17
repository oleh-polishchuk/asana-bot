const config = require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const RequestService = require('./src/services/RequestService');
const PullRequestController = require("./src/controllers/PullRequestController");
const ResponseService = require("./src/services/ResponseService");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.post('/pull-request', async (req, res) => {
    try {
        const isSecure = RequestService.isSecureRequest(req, res);
        if (!isSecure) {
            return ResponseService.forbidden(res, 'Secret signature is not valid!');
        }

        switch (req.body.action) {
            case 'opened':
                PullRequestController.handleOpenedAction(req, res);
                break;
            case 'reopened':
                PullRequestController.handleReopenedAction(req, res);
                break;
            case 'merged':
                PullRequestController.handleMergeAction(req, res);
                break;
            default:
                ResponseService.info(res, `There are no handler for action: ${req.body.action}`);
        }
    } catch (e) {
        ResponseService.error(res, e.message);
    }
});

app.listen(8080, () => console.log(`==> App listening on port 8080`));
