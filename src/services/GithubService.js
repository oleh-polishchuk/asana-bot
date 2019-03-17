const axios = require('axios');
const Logger = require("./LogService");
const Endpoints = require('../constants/Endpoints');

const instance = axios.create({
    baseURL: Endpoints.GITHUB.BASE_URL,
    headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
    }
});

instance.defaults.headers.patch[ 'Content-Type' ] = 'application/json';

module.exports.closePR = (ownerName, repoName, pullRequestNumber) => {
    Logger.log(`Closing pull-request number ${pullRequestNumber} for repo ${repoName} owned by ${ownerName}`);
    instance.patch(`/repos/${ownerName}/${repoName}/pulls/${pullRequestNumber}`, {
        state: 'close'
    }).then(value => value).catch(reason => {
        throw new Error(reason.message)
    });
};
