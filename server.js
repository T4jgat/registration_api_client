import http from 'http'
import fs from "fs"
import path from 'path'
const port = 3001

const server = http.createServer(function (req, res) {
    let filePath = '.' + req.url;
    if (filePath === './registration') {
        filePath = './registration.html';
    } else if (filePath === './login') {
        filePath = './login.html';
    }


    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        ".css": "text/css"
        // add more MIME types as needed
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            res.writeHead(500);
            res.end("Sorry, check with the site admin for error: "+error.code+" ..\n");
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, function(error) {
    if (error) {
        console.log("Something went wrong: " + error)
    } else {
        console.log("Frontend server is listening on port=" + port)
    }
})
