var admin = require("firebase-admin");
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var serviceAccount = require("./wemeet-a0aa8-firebase-adminsdk-hlqjv-4eb9c72a60.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

app.post('/sendMessage', (req, res) => {
    const token = req.body.token
    const title = req.body.title
    const body = req.body.body
    const imageUrl = req.body.imageUrl

    const message = {
        notification: {
            title: title,
            body: body,
            imageUrl: imageUrl
        },
        token: token
    };

    admin.messaging().send(message).then((response) => {

    }).catch((e) => {
        res.json({
            error: e
        })
    })

    res.json(message)
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})