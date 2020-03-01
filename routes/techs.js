const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator')
const Tech = require('../models/Tech');

// GET

router.get('/', async (req, res) => {
  try {
    const techs = await Tech.find();

    res.json(techs);
    console.log('TECHS RECEIVED');

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');

  }
});


// @route  POST api/techs
// @desc add a tech
router.post('/', [
  check('firstName', 'Please add a first name').not().isEmpty(),
  check('lastName', 'Please add a last name').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

  }

  const { lastName } = req.body;

  try {

    let newTech = await Tech.findOne({ lastName: lastName });

    if (newTech) {
      return res.status(400).json({ msg: 'Tech is alredy on list' });
    } else {
      
      newTech = new Tech(req.body);

      const tech = await newTech.save();

      res.json(tech);

      console.log('TECH ADDED');

    }



  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')

  }

});

// PUT
router.put('/:id', async (req, res) => {


});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    let tech = await Tech.findById(req.params.id);

    if (!tech) {
      res.status(404).json({ msg: 'Tech Not Found' });
    }

    await Tech.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Tech Removed' });
    console.log('TECH REMOVED');





  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');

  }
})


module.exports = router;