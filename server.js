const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  if (request.url === "/create-directory" && request.method ==="POST") {
    // Create a directory named 'content'
    fs.mkdir('content', { recursive: true }, (err) => {
      if (err) {
        console.error(err);
        response.end('Error creating directory');
        return;
      }
      console.log('content folder created');
      response.end('content folder created');
    });
  } else if (request.url === "/create-text" && request.method ==="POST") {
    // Create a file named 'randomText.txt' and write a short string to it
    fs.writeFile('randomText.txt', 'This is some random text.', (err) => {
      if (err) {
        console.error(err);
        response.end('Error creating file');
        return;
      }
      console.log('randomText.txt created');
      response.end('randomText.txt created');
    });
  } else if (request.url === "/new-folder-and-file" && request.method ==="POST") {
    // Read data from 'randomText.txt'
    fs.readFile('randomText.txt', (readErr, data) => {
      if (readErr) {
        console.error(readErr);
        response.end('Error reading from randomText.txt');
        return;
      }
      // Write data to 'verbage.txt' inside the 'content' folder
      fs.writeFile('content/verbage.txt', data, (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          response.end('Error writing verbage.txt');
          return;
        }
        console.log('verbage.txt created');
        response.end('verbage.txt created');

        // Set a timeout to delete the 'content' directory after 7 seconds
        setTimeout(() => {
          fs.rm('content', { recursive: true }, (err) => {
            if (err) {
              console.error('Error deleting content directory', err);
              return;
            }
            console.log('content directory deleted');
          });
        }, 7000);
      });
    });
  } else {
    // Handle all other URLs
    response.end('Invalid request');
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
