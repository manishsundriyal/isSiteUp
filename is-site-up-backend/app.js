const express = require('express');
const Monitor = require('ping-monitor');

const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running at port: ${port}`));

app.get('/check/:site', (request, response) => {
    const siteName = "https://www."+request.params.site;
    const newMonitor = new Monitor({
        website: siteName,
        interval: 1
    });

    newMonitor.on('error', function (error) {
        console.log(error);
    });

    newMonitor.on('up', function (res, state) {
        //console.log(res);

        console.log(res.website," is up :)");
        //response.status(200).send(res.website + " is up :)");
        
        newMonitor.on('stop', function (website) {
            console.log(website + ' monitoring stopped :)');
            //return response.status(200).send(website+" monitoring stopped :)");
        });
    });

    newMonitor.on('down', function (res) {
        //console.log(res);
        //console.log('Oh Snap!! ' + res.website + ' is down! ' + res.statusMessage);
        console.log(res.website," is down :(");
        //return response.status(200).send(res.website+" is down :(");
    });

    //console.log(request.params.site);
    response.status(400).send("Failed o_0");
});




