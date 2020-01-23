let express = require('express');
let router = express.Router();

/* GET home page. */
router.post('/api/newForm', function(req, res, next) {
  console.log(req.body)
  res.send('ok');
});

module.exports = router;
