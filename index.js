const inquirer = require('inquirer');

inquirer.prompt(
    [
        {
            type: "input",
            message: "What is your favorite color?",
            name: "fav-color"
        }
    ]
).then(function(responses) {
    
})