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

        //separate city and state, construct dynamic google maps link
        let word = 'firstWord';
        let city = '';
        let state = '';

        for(let i=0; i<response.data.location.length; i++) {
            let char = response.data.location[i];
            //console.log(char);
            if(char == ',' && response.data.location[i+1] == ' ') {
                word = 'secondWord';
                i++;
            }
            else if(word == 'firstWord') {
                city += char;
            }
            else {
                state += char;
            }
        }
        word = 'firstWord';
        let cityQuery = city;
        let stateQuery = state;
        let mapsLink = `https://www.google.com/maps/search/?api=1&query=${cityQuery}%2c${stateQuery}`;
    
        //github api call to retrieve number of stars
        axios.get(starsURL)
        .then(function(starsResponse) {
            let starCount = 0;
            starsResponse.data.forEach(function(repo) {
                starCount += repo['stargazers_count'];
            })

            //construct resume.html
            const resume = variables.generateHTML(data, response, starCount, mapsLink);
            fs.writeFile('resume.html', resume, function(err) {
                if(err) throw err;
            })
        })
        .catch(error => {
            console.log(error.response)
        });
    })
})