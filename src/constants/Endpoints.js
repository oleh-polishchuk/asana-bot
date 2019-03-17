const API = {};

API.ASANA = {
    BASE_URL: 'https://app.asana.com/api/1.0',
    TASKS: this.BASE_URL + '/tasks'
};

API.GITHUB = {
    BASE_URL: 'https://api.github.com',
    REPOS: this.BASE_URL + '/repos'
};

module.exports = API;
