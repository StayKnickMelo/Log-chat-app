const express = require('express');

const router = express.Router();

const Log = require('../models/Log');

const { check, validationResult } = require('express-validator')


router.get('/',async (req, res) => {

  try{
    const logs = await Log.find();

    res.json(logs);
    console.log('LOGS RECEIVED');



  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');

  }
  
})

// @route api/logs
// POST
router.post('/', [
  check('message', 'message is required').not().isEmpty(),
  check('tech', 'add a tech').not().isEmpty(),
  
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }


  try {

    const log = new Log(req.body);

    await log.save();

    res.json(log);
    console.log('LOG ADDED')


  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')

  }


});

// PUT
router.put('/:id', async (req, res) => {

  const { message, attention, tech } = req.body;

  const logFields = {}
    if(tech) logFields.tech = tech;
    if(message) logFields.message = message;
    if(attention) logFields.attention = attention; 
  

  try {
    let log = await Log.findById(req.params.id);

    if(!log){
      return res.json({msg: 'Log Not Found'});
    }

    log = await Log.findByIdAndUpdate(
      req.params.id,
      {$set: logFields},
      {new: true}
    );

    res.json(log);
    console.log('LOG UPDATED');
    

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');

  }

});

// DELETE
router.delete('/:id', async (req, res) => {

  try {
    let log = Log.findById(req.params.id);

    if(!log){
      return res.status(400).json({msg: 'Log Not Found'});

    }

    await Log.findByIdAndRemove(req.params.id);

    res.json({msg: 'Log Removed'});
    console.log('LOG REMOVED');

  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');

  }
})


module.exports = router;