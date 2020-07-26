const express = require('express');
const router = express.Router();

// test
router.get('/', async (req, res) => {
  const mytestvar = 'yes';
  console.log('test ran');
  try {
    res.send(mytestvar);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('servererrer');
  }
});
module.exports = router;
