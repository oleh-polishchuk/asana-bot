const Endpoints = require('../constants/Endpoints');
const axios = require('axios');
const instance = axios.create({
    baseURL: Endpoints.ASANA.BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.ASANA_TOKEN}`,
    },

});

instance.defaults.headers.post[ 'Content-Type' ] = 'application/json';

module.exports.moveTask = (taskId, projectId, sectionId) => {
    return instance.post(`/tasks/${taskId}/addProject`, {
        data: {
            task_gid: taskId,
            project: projectId,
            section: sectionId,
        },
    });
};
