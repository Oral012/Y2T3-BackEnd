// server.js
const  express = require ('express');
const app = express();
    app.get('/', (req,res)=>{
        const {method, url} = req;
        res.send(`<h1>Welcome to the Home Page</h1>`);
});

        app.get('/about', (req,res)=>{
             res.send(`
             <html>
                 <head><title>Home</title></head>
                 <body>
                     <h1>Welcome to the Home Page</h1>
                     <p>This is a simple Node.js server.</p>
                 </body>
             </html>
        `);});
   
    app.get('/about', (req,res)=>{
        res.send(`<h1>About us: at CADT, we love node.js!</h1>`);
    });
    app.get('/contact-us', (req,res)=>{
        res.send(`You can reach us via email at`);
    });
    app.get('/products', (req,res)=>{
        res.send(`Buy one get one`);
    });
    app.get('/projects', (req,res)=>{
        res.send(`Here is our awesome projects`);
    });


app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
