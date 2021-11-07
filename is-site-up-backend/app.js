const express = require('express');
const ping = require('ping');
const { connection } = require('./connection');
const { User } = require('./user');

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

function unique(value, index, self) {
    return self.indexOf(value) === index;
}

setInterval(() => {
    let sites=[];
    User.find().then((lst) => {
        lst.forEach((obj) => {
            sites.push(obj.site);
        });

        let websites=sites.filter(unique);
        websites.forEach((site) => {
            ping.sys.probe(site, function (isAlive) {
                if(isAlive) {
                    //delete entries from db
                    sendMail(site);
                }
            });
        });
    });
}, 1000);

function sendMail(site) {
    console.log(site,"is up.");
    User.deleteMany({ site:site}).then((res)=>{
        console.log(res,"Deleted");
    });
}

app.post('/check', (request, response) => {
    const data = request.body;
    const user = new User({
        email: data.email,
        mobileNo: data.number,
        site: data.site
    });

    user.save().then((item) => {
        console.log(item, " Stored in DB");
    }).catch(e => {
        console.log("Can't store info in DB");
    });

    return response.status(200).send("We'll notify you when the site is up :)");
});

app.listen(port, () => console.log(`Server running at port: ${port}`));