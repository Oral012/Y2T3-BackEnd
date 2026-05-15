// server.js
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    // if (url === '/' && method === 'GET') {
    //     res.writeHead(200, { 'Content-Type': 'text/html' });
    //     return res.end(`
    //         <html>
    //             <head><title>Home</title></head>
    //             <body>
    //                 <h1>Welcome to the Home Page</h1>
    //                 <p>This is a simple Node.js server.</p>
    //             </body>
    //         </html>
    //     `);
    // }else if (url === "/about"&& method === "GET"){
    //     return res.end(`<h1>About us: at CADT, we love node.js!</h1>`)
    // }else if (url === "/contact-us" && method === "GET"){
    //     return res.end(`You can reach us via email at contact@cadt.edu.kh`)
    // }else if (url === "/products" && method === "GET"){
    //     return res.end(`Buy one get one`)
    // }else if (url === "/projects"&& method === "GET"){
    //     console.log("Here is our awersome projects")
    //     return res.end(`Here is our awesome projects`)
    // }
    // // Implement more routes here
    // else {
    //     res.writeHead(404, { 'Content-Type': 'text/plain' });
    //     return res.end('404 Not Found');
    // }




     switch (url) {
     case '/':
         res.writeHead(200, { 'Content-Type': 'text/html' });
         res.end(`
             <html>
                 <head><title>Home</title></head>
                 <body>
                     <h1>Welcome to the Home Page</h1>
                     <p>This is a simple Node.js server.</p>
                 </body>
             </html>
        `);
        break;

    case "/about" :
        return res.end(`<h1>About us: at CADT, we love node.js!</h1>`);
    case "/contact-us" :
        return res.end(`You can reach us via email at`);
    case "/products" :
        return res.end(`Buy one get one`);
    case "/projects" :
        return res.end(`Here is our awesome projects`);
    default:
         res.writeHead(404, { 'Content-Type': 'text/plain' });
       return res.end('404 Not Found');
 }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
