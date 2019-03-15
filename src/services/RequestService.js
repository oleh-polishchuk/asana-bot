const crypto = require('crypto');

module.exports.isSecureRequest = (req, res) => {
    const payload = req.body;
    const hmac = crypto.createHmac('sha1', process.env.GITHUB_SECRET);
    hmac.update(JSON.stringify(payload));
    const calculatedSignature = `sha1=${hmac.digest('hex')}`;
    const githubSignature = req.headers[ 'x-hub-signature' ];
    return githubSignature === calculatedSignature;
};
