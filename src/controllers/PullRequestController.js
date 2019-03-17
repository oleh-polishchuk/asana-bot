const GithubService = require("../services/GithubService");
const AsanaService = require("../services/AsanaService");

module.exports.handleOpenedAction = (req, res) => {
    const task = AsanaService.getTaskDetails(req, res);
    if (!task.projectId || !task.taskId) {
        return GithubService.closePR(req.body.repository.owner.login, req.body.repository.name, req.body.number);
    }

    AsanaService.moveTask(task.taskId, task.projectId, task.sectionId);
};

module.exports.handleReopenedAction = (req, res) => {
    const task = AsanaService.getTaskDetails(req, res);
    if (!task.projectId || !task.taskId) {
        return GithubService.closePR(req.body.repository.owner.login, req.body.repository.name, req.body.number);
    }

    AsanaService.moveTask(task.taskId, task.projectId, task.sectionId);
};

module.exports.handleMergeAction = (req, res) => {
    console.log(req.body)
    res.send('handle merge req')
};
