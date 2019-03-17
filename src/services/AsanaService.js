const axios = require('axios');
const Logger = require("./LogService");
const Endpoints = require('../constants/Endpoints');

const instance = axios.create({
    baseURL: Endpoints.ASANA.BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.ASANA_TOKEN}`,
    },
});

instance.defaults.headers.post[ 'Content-Type' ] = 'application/json';

module.exports.moveTask = (taskId, projectId, sectionId) => {
    Logger.info(`Moving task ${taskId} to project ${projectId}, section ${sectionId}`);
    return instance.post(`/tasks/${taskId}/addProject`, {
        data: {
            task_gid: taskId,
            project: projectId,
            section: sectionId,
        },
    });
};

module.exports.getTaskDetails = (req, res) => {
    const pullRequestBody = req.body.pull_request.body;
    const matches = pullRequestBody.match(/https:\/\/app\.asana\.com\/\d\/(\d+)\/(\d+)\/f/);
    const projectId = matches && matches[ 1 ];
    const taskId = matches && matches[ 2 ];
    const sectionId = process.env.ASANA_CODE_REVIEW_SECTION_ID;

    return { projectId, taskId, sectionId };
};
