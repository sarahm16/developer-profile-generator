const inquirer = require('inquirer');
const variables = require('./generateHTML');
const fs = require('fs');
const axios = require('axios');

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
    const userName = data.username;
    const queryURL = `https://api.github.com/users/${userName}/repos?per_page=100`;
    const resume = variables.generateHTML(data);
    
    axios.get(queryURL)
        .then(function(response) {
            console.log(response);
            const results = response.data[0]['owner'];
            const avatar = results['avatar_url'];
            //console.log(avatar);
            const followers = results['followers_url'];
            const following = results['followers_url'];
            const stars = results['starred_url'];
            //console.log(followers);
        });
    
    fs.writeFile('resume.html', resume, function(err) {
        if(err) {
            throw err;
        }
     })
})