const { Router } = require('express');
const router = Router();
const City = require('./models');

const cors = require('cors')

router.post('/', async (req, res) => {
    const cityData = req.body;
    console.log(cityData)
    
    const newCity = await City.cityModel.create(cityData)
    .catch(err => {
        console.log('Unable to create City.' + err.message);
        throwException(err, res);
    });

    res.status(201).json({
        message: 'City created.',
        newCity
    });
});

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
router.use(cors());



module.exports = router;