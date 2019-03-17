const GithubService = require("../services/GithubService");
const AsanaService = require("../services/AsanaService");

module.exports.handleOpenedAction = (req, res) => {
    const task = AsanaService.getTaskDetails(req, res);
    if (!task.projectId || !task.taskId) {
        return GithubService.closePR(req.body.repository.owner.login, req.body.repository.name, req.body.number);
    }

    AsanaService.moveTask(task.taskId, task.projectId, process.env.ASANA_CODE_REVIEW_SECTION_ID);
};

module.exports.handleReopenedAction = (req, res) => {
    const task = AsanaService.getTaskDetails(req, res);
    if (!task.projectId || !task.taskId) {
        return GithubService.closePR(req.body.repository.owner.login, req.body.repository.name, req.body.number);
    }

    AsanaService.moveTask(task.taskId, task.projectId, process.env.ASANA_CODE_REVIEW_SECTION_ID);
};

module.exports.handleMergeAction = (req, res) => {
    const task = AsanaService.getTaskDetails(req, res);
    if (!task.projectId || !task.taskId) {
        return GithubService.closePR(req.body.repository.owner.login, req.body.repository.name, req.body.number);
    }

    AsanaService.moveTask(task.taskId, task.projectId, process.env.ASANA_DEPLOY_TO_QA_SECTION_ID);
};

module.exports.handleDeployedToQaAction = (req, res) => {
    const task = AsanaService.getTaskDetails(req, res);
    if (!task.projectId || !task.taskId) {
        return GithubService.closePR(req.body.repository.owner.login, req.body.repository.name, req.body.number);
    }

    AsanaService.moveTask(task.taskId, task.projectId, process.env.ASANA_DEPLOYED_ON_QA_SECTION_ID);
};

module.exports.handleDeployedToProductionAction = (req, res) => {
    const task = AsanaService.getTaskDetails(req, res);
    if (!task.projectId || !task.taskId) {
        return GithubService.closePR(req.body.repository.owner.login, req.body.repository.name, req.body.number);
    }

    AsanaService.moveTask(task.taskId, task.projectId, process.env.ASANA_DEPLOYED_ON_PROD_SECTION_ID);
};
