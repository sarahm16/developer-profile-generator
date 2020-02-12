const inquirer = require('inquirer');
const variables = require('./generateHTML');
const fs = require('fs');
const axios = require('axios');

inquirer.prompt(
    [
        {
            type: 'input',
            message: 'What is your GitHub username?',
            name: 'username'

        },
        {
            type: 'input',
            message: 'What is your favorite color?',
            name: 'color'
        }
    ]
).then(function(data) {

    const userName = data.username;
    const queryURL = `https://api.github.com/users/${userName}`;

    //github api call
    axios.get(queryURL)
    .then(function(response) {

        //construct resume.html
        const resume = variables.generateHTML(data, response);
        fs.writeFile('resume.html', resume, function(err) {
            if(err) throw err;
        })

        // //append body.html to resume.html
        // fs.readFile('./body.html', 'utf8', function(err, content) {
        //     fs.appendFile('resume.html', content, function(err) {
        //         if(err) throw err;
        //     });
        // });

    });

    return data;

}).then(function(data) {

    // //construct resume.html
    // const resume = variables.generateHTML(data);
    // fs.writeFile('resume.html', resume, function(err) {
    //     if(err) throw err;
    // })
    
    // append body.html to resume.html
    // fs.readFile('./body.html', 'utf8', function(err, content) {
    //     fs.appendFile('resume.html', content, function(err) {
    //         if(err) throw err;
    //     });
    // });

})