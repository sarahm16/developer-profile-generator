const inquirer = require('inquirer');
const variables = require('./generateHTML');
const fs = require('fs');
const axios = require('axios');

//prompt user to provide GitHub username and favorite color
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
    const starsURL = `https://api.github.com/users/${userName}/repos?per_page=100`;
    
    //github api call
    axios.get(queryURL)
    .then(function(response) {

        //github api call to retrieve number of stars
        axios.get(starsURL)
        .then(function(starsResponse) {
            let starCount = 0;
            starsResponse.data.forEach(function(repo) {
                starCount += repo['stargazers_count'];
            })

            //construct resume.html
            const resume = variables.generateHTML(data, response, starCount);
            fs.writeFile('resume.html', resume, function(err) {
                if(err) throw err;
            })
        })
        .catch(error => {
            console.log(error.response)
        });
    })
    .catch(error => {
        console.log(error.response)
    })
})