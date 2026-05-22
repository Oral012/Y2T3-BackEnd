import exepress from 'express';
const app = express();

    app.get('/', (req, res) => {
        return res.send('Welcome to the Home Page');
    });
    app.get('/contact', (req, res) => {
        return   res.send(`
          <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
          </form>
        `);
    });

    app.post('/contact', (req, res) => {
        let body = '';
        const fs = require('fs');
        const path = "./submissions.txt";
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {

            const name = body.split('=')[1];

            console.log('Name submitted:', name);
            fs.appendFile(path, name + '\n', () => {

                res.end('Got your name: ' + name);
            });
        });
    }
);
 

listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
