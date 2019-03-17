const Logger = require("./LogService");

module.exports.forbidden = (res, message) => {
    Logger.error(message);

    return res.status(403).json({
        error: true,
        message
    })
};

module.exports.error = (res, message) => {
    Logger.error(message);

    return res.status(500).json({
        error: true,
        message
    })
};

module.exports.info = (res, message) => {
    Logger.info(message);

    return res.status(200).json({
        error: false,
        message
    })
};


