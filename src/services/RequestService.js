module.exports.isSecureRequest = (req, res) => {
    const reqToken = req.headers[ 'authorization' ];
    return reqToken === `Bearer ${process.env.APPLICATION_TOKEN}`;
};
