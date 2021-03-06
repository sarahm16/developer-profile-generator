const colors = {
    green: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    pink: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "white"
    }
  };
  
  function generateHTML(data, response, starCount, mapsLink) {
    return `<!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js"></script>
        <script type="text/javascript" src="html2canvas.js"></script>
        <script type="text/javascript" src="canvas2image.js"></script>
        <script type='text/javascript'>
          let submit = function() {
            html2canvas(document.body, {
                useCORS: true,
                allowTaint : false,
                foreignObjectRendering: true,
                onrendered: function(canvas) {
                //document.body.appendChild(canvas);
                Canvas2Image.saveAsJPEG(canvas);
                }
            });
          };
        </script>
        
        <title>Resume</title>
        <style>
            @page {
              margin: 0;
            }
           *,
           *::after,
           *::before {
           box-sizing: border-box;
           }
           html, body {
           padding: 0;
           margin: 0;
           }
           html, body, .wrapper {
           height: 100%;
           }
           .wrapper {
           background-color: ${colors[data.color].wrapperBackground};
           padding-top: 100px;
           }
           body {
           background-color: white;
           -webkit-print-color-adjust: exact !important;
           font-family: 'Cabin', sans-serif;
           }
           .main {
           background-color: #E9EDEE;
           height: auto;
           padding-top: 30px;
           }
           h1, h2, h3, h4, h5, h6 {
           font-family: 'BioRhyme', serif;
           margin: 0;
           }
           h1 {
           font-size: 3em;
           }
           h2 {
           font-size: 2.5em;
           }
           h3 {
           font-size: 2em;
           }
           h4 {
           font-size: 1.5em;
           }
           h5 {
           font-size: 1.3em;
           }
           h6 {
           font-size: 1.2em;
           }
           .photo-header {
           position: relative;
           margin: 0 auto;
           margin-bottom: -50px;
           display: flex;
           justify-content: center;
           flex-wrap: wrap;
           background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
           padding: 10px;
           width: 95%;
           border-radius: 6px;
           }
           .photo-header img {
           width: 250px;
           height: 250px;
           border-radius: 50%;
           object-fit: cover;
           margin-top: -75px;
           border: 6px solid ${colors[data.color].photoBorderColor};
           box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
           }
           .photo-header h1, .photo-header h2 {
           width: 100%;
           text-align: center;
           }
           .photo-header h1 {
           margin-top: 10px;
           }
           .links-nav {
           width: 100%;
           text-align: center;
           padding: 20px 0;
           font-size: 1.1em;
           }
           .nav-link {
           display: inline-block;
           margin: 5px 10px;
           }
           .workExp-date {
           font-style: italic;
           font-size: .7em;
           text-align: right;
           margin-top: 10px;
           }
           .container {
           padding: 50px;
           padding-left: 100px;
           padding-right: 100px;
           }

           #pdf-button {
             display: block;
             margin: 0 auto;
           }
  
           .row {
             display: flex;
             flex-wrap: wrap;
             justify-content: space-between;
             margin-top: 20px;
             margin-bottom: 20px;
           }
  
           .card {
             padding: 20px;
             border-radius: 6px;
             background-color: ${colors[data.color].headerBackground};
             color: ${colors[data.color].headerColor};
             margin: 20px;
           }
           
           .col {
           flex: 1;
           text-align: center;
           }
  
           a, a:hover {
           text-decoration: none;
           color: inherit;
           font-weight: bold;
           }
  
           @media print { 
            body { 
              zoom: .75; 
            } 
           }
        </style>
      </head>
    <body>
      <div class='wrapper'>
          <div class='photo-header'>
              <img alt='photo' src="${response.data['avatar_url']}">
              <h1>Hi!</h1>
              <h2>My name is <span id='name'>${response.data['name']}</span></h2>
              <div class='links-nav'>
                  <a href='${mapsLink}' class='nav-link'><i class="fas fa-location-arrow"></i> ${response.data['location']}</a>
                  <a href='${response.data['html_url']}' class='nav-link'><i class="fab fa-github-alt"></i> GitHub</a>
                  <a href='${response.data['blog']}' class='nav-link'><i class="fas fa-rss"></i> Blog</a>
              </div>
          </div>
          <div class='container main'>
              <div class='row text-center'>
                  <div class='col-lg-12'>
                      <div class='row'>
                          <h2 class='text-center'>${response.data['bio']}</h2>
                      </div>
                  </div>
                  <div class='col-lg-6'>
                      <div class='row card'>Public Repositories
                          <span>${response.data['public_repos']}</span>
                      </div>
                      <div class='row card'>Github Stars
                          <span>${starCount}</span>
                      </div>
                  </div>
                  <div class='col-lg-6'>
                      <div class='row card'>Followers
                          <span>${response.data['followers']}</span>
                      </div>
                      <div class='row card'>Following
                          <span>${response.data['following']}</span>
                      </div>
                  </div>
              </div>
              <div class='row'>
                <button class='card' id='pdf-button' onclick='submit();'>Generate PDF resume!</button>
              </div>
          </div>
      </div>

      <script src="index.js"></script>
    </body>
  </html>`
          }

module.exports = {
  colors: colors,
  generateHTML: generateHTML
}
  