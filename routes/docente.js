var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');

/* GET home page. */
router.get('/docente', function (req, res, next) {
    dbConn.query('SELECT * FROM docente ORDER BY id desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            
            res.render('admin/docente-list',{data:''});   
        } else {
          
            res.render('admin/docente-list',{data:rows});
        }
    });

  });
  module.exports = router;