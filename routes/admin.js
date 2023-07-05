var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');

/* GET home page. */
router.get('/categorias', function (req, res, next) {
    dbConn.query('SELECT * FROM categorias ORDER BY id desc',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            
            res.render('admin/categories-list',{data:''});   
        } else {
          
            res.render('admin/categories-list',{data:rows});
        }
    });

  });


router.get('/categorias-add', function(req, res, next) {    
    res.render('admin/categories-add');
})

router.post('/categorias-add', function(req, res, next) {    
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;

    var form_data = {
        nombre: nombre,
        descripcion: descripcion
    }

    dbConn.query('INSERT INTO categorias SET ?', form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
        } else {            
            console.log('Llego aqui');    
            req.flash('success','Categoria agregada correctamente');
            res.redirect('../admin/categorias');
        }
    })

})

router.get('/categorias-edit/(:id)', function(req, res, next) {

    let id = req.params.id;

    dbConn.query('SELECT * FROM categorias WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'No se encontro el registro con el id = ' + id)
            res.redirect('/categorias')
        }
        else {
            res.render('admin/categorias-edit', {
                id: rows[0].id,
                nombre: rows[0].nombre,
                descripcion: rows[0].descripcion
            })
        }
    })
})

router.post('/categorias-edit/:id', function(req, res, next) {

    let id = req.params.id;
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;

    var form_data = {
        nombre: nombre,
        descripcion: descripcion
    }
    // update query
    dbConn.query('UPDATE categorias SET ? WHERE id = ' + id, form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
        } else {
            req.flash('success', 'categoria editada correctamente');
            res.redirect('../../admin/categorias');
        }
    })
    
})

router.get('/categorias-del/(:id)', function(req, res, next) {
    let id = req.params.id;
    dbConn.query('DELETE FROM categorias WHERE id = ' + id, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/categorias')
        } else {
            req.flash('success', 'categoria eliminada! ID = ' + id)
            res.redirect('../categorias')
        }
    })
})


module.exports = router;