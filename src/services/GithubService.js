const Endpoints = require('../constants/Endpoints');
const axios = require('axios');
const instance = axios.create({
    baseURL: Endpoints.GITHUB.BASE_URL,
    headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
    }
});

instance.defaults.headers.patch[ 'Content-Type' ] = 'application/json';

module.exports.closePR = (ownerName, repoName, pullRequestNumber) => {
    return instance.patch(`/repos/${ownerName}/${repoName}/pulls/${pullRequestNumber}`, {
        state: 'close'
    });
};
