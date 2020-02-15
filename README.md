# Developer Profile Generator

AS A product manager

I WANT a developer profile generator

SO THAT I can easily prepare reports for stakeholders

This app is designed to dynamically create resumes based on information provided by users. First, the user is prompted to provide their GitHub username and their favorite color. Then a unique resume.html is created for the user that includes their photo, bio, number of repositories, number of followers, number following, and number of stars. A navigation bar appears under the users photo with links to users location, GitHub, and blog.
At the bottom of their resume, the user may click a button to generate a pdf from resume.html.

<img src='resume.png' alt='resume'>

## Technologies Used

Inquirer (to prompt user) <br/>
html2canvas (to convert html to canvas) <br/>
canvas2image (to convert canvas to image) <br/>
axios (to make api calls to retrieve information about user from their github account)
node.js