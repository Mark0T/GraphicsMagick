var express = require('express');
var multer = require('multer');
var gm = require('gm').subClass({imageMagic: true});
var router = express.Router();
var bodyParser = require('body-parser');



var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/uploads');
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now());
  }
})

var upload = multer({storage: storage}).single('image');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GraphicsMagick' });

});

router.post('/', upload, function(req, res, next){
  var width = req.body.resX + '!';
  var height = req.body.resY + '!';
  gm(req.file.path)
    .resize(width, height)
    .noProfile()
    .write('./public/uploads/' + req.file.fieldname + '-' + Date.now() + '.png', function(err){
      if(!err){
        res.redirect('/')
      }
    })
});


module.exports = router;
