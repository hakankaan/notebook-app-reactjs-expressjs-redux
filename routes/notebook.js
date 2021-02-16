var express = require("express");
var router = express.Router();
const fs = require("fs");


router.post("/create", function (req, res) {

    try {
      const name = req.body.name;
      if (fs.existsSync(`notebooks/${name}.txt`)) {
        res.status(409).end();
      } else {
        fs.appendFile(`notebooks/${name}.txt`, "", (err) => {
          if (err) res.status(403).send(err);
          res.status(201).send(name);
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  router.put("/edit", function (req, res) {
    try {
      const name = req.body.name;
      const text = req.body.text;
      if (!fs.existsSync(`notebooks/${name}.txt`)) {
        res.status(204).end();
      } else {
        fs.writeFile(`notebooks/${name}.txt`, text, (err, data) => {
          if (err) res.status(400).send(err);
          res.sendStatus(200);
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router;
