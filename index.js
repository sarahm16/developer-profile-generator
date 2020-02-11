const inquirer = require('inquirer');
const variables = require('./generateHTML');
const fs = require('fs');
console.log(typeof variables.generateHTML);

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
    const resume = variables.generateHTML(data);
    //console.log(data.color);
    fs.writeFile('resume.html', resume, function(err) {
        if(err) {
            throw err;
        }
     })
}).then(function(data) {
    
})