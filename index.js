const config = require('dotenv').config();
const app = require('express')();

app.get('/', (req, res) => {
    res.send("Hello World!")
});

app.post('/pull-request/submit', (req, res) => {
    console.log(req)
    res.send("Hello World!")
});

app.listen(8080, () => console.log(`==> App listening on port 8080`));
