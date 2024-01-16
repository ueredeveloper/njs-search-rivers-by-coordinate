
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = './public' + req.url;

    if (filePath === './public/') {
        filePath = './public/index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'image/svg+xml',
    }[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});



/*let turf = require('@turf/turf');

var center = [-75, 40];
var xSemiAxis = 5;
var ySemiAxis = 2;
var ellipse = turf.ellipse(center, xSemiAxis, ySemiAxis);

//console.log(ellipse.geometry.coordinates);


var line1 = turf.lineString([[126, -11], [129, -21]]);
var line2 = turf.lineString([[123, -18], [131, -14]]);
var intersects = turf.lineIntersect(line1, line2);


console.log(intersects.features[0].geometry);*/