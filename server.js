const express = require('express');

const path = require('path');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const { urlencoded } = require('express');
const app = express();

  app.use(express.static('public'));
  app.use(express.json());
  
  // GET request for notes
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

    app.get('/api/notes', (req, res) => {
      fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
        if (err) {
          res.send('file could not be read.')
        }
        else {
          res.json(JSON.parse(data));
        }
      });

    });

  // GET request for index.html file
app.get ('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
  });

// POST request to add a note
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
    if (err) {
      throw err;
    }
    else {
      const parsedData = JSON.parse(data)
      parsedData.push({
        title: req.body.title,
        text: req.body.text
      })
      const stringify = JSON.stringify(parsedData);
      fs.writeFile(path.join(__dirname, './db/db.json'), stringify, (err) => {
        if (err) {
          throw err;
        }
        else {
          res.send('success! file written.')
        }
      })
    }
  });
});


  app.listen(PORT, () => {
    console.log ('server is up and running.', PORT);
  }) 