module.exports.isOpened = (req) => {
    return req.body.action === 'opened';
};

module.exports.isReopened = (req) => {
    return req.body.action === 'reopened';
};

module.exports.isMerged = (req) => {
    return req.body.action === 'closed'
        && req.body.pull_request.merged;
};

module.exports.isDeployedOnQa = (req) => {
    return req.body.action === 'deployedOnQa';
};

module.exports.isDeployedOnProd = (req) => {
    return req.body.action === 'deployedOnProd';
};
