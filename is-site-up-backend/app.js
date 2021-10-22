const express = require('express');
const Monitor = require('ping-monitor');
const {connection}=require('./connection');
const {User} = require('./user');

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());


function check(site){
    return new Promise(resolve=>{
        const monitor = new Monitor({
            website: site,
            interval: 1
        });
    
        monitor.on('error', function (error) {
            console.log(error);
            resolve(undefined);
        });
    
        monitor.on('up', function (res, state) {
            //console.log(res);
            console.log(res.website," is up :)");
            resolve(1);
            //response.status(200).send(res.website + " is up :)");
            
            /*
            monitor.on('stop', function (website) {
                console.log(website + ' monitoring stopped :)');
                //return response.status(200).send(website+" monitoring stopped :)");
            });*/
        });
    
        monitor.on('down', function (res) {
            //console.log(res);
            //console.log('Oh Snap!! ' + res.website + ' is down! ' + res.statusMessage);
            console.log(res.website," is down :(");
            resolve(0);
            //return response.status(200).send(res.website+" is down :(");
        });
    });
}

app.post('/check',(request,response)=>{
    const data=request.body;
    check(data.site).then((status)=>{
        console.log(status);
        if(status){
            return response.status(200).send("Site is up :)");
        }
        else if(status===undefined){
            return response.status(200).send("Can't check -_-");
        }
        if(!status){
            //console.log("=====");
            const user=new User({
                email:data.email,
                mobileNo:data.number,
                site:data.site
            });

            //console.log(user);

            user.save().then((item)=>{
                console.log(item," Stored in DB");
            }).catch(e=>{
                console.log("Can't store info in DB");
            });

            return response.status(200).send("Site is down :(");
        }
    }).catch((e)=>{
        return response.status(400).send("Error o_0");
    });

    //response.status(200).send("Site is up.");
});

app.listen(port, () => console.log(`Server running at port: ${port}`));