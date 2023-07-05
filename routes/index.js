var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req,res,next){
  email=req.body.email;
  password=req.body.password;
console.log(password);
console.log(email);
  dbConn.query("SELECT * FROM usuario WHERE us_correo='"+email+"'AND us_password='"+password+"'",function(err,rows)     {
 
    if(err) {
        req.flash('error', err);  
        console.log(err);
    } else {
        console.log(rows);
        if(rows.length){
          req.session.idu=rows[0]["us_id"];
          req.session.user=rows[0]["us_usuario"];
          req.session.email=rows[0]["us_correo"];
          req.session.admin=true;
          res.redirect("/admin");
        }else{
          //req.flash('success', 'El usuario no existe'); 
          res.redirect("/");
          
        }
        
        //res.render('books',{data:rows});
    }
  }
);


});

router.get('/admin', function(req, res, next) {
  if(req.session.admin){
    res.render('admin/index');
  }else{
    res.redirect("/login");
  }
  
});
router.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect("/");
});

// Añadir usuario
router.post('/usuario-add', function (req, res, next) {

  let nombre = req.body.nombre;
  let dni = req.body.dni;
  let correo = req.body.correo;
  let celular = req.body.celular;
  let direccion = req.body.direccion;
  let usuario = req.body.usuario;
  let password = req.body.password;
  let apellido = req.body.apellido;  
  let nacimiento = req.body.nacimiento;
  let rol= req.body.rol;
  let genero= req.body.genero;

  var form_data = {
    us_nombre_razon_social: nombre,
    us_dni_ruc: dni,
    us_correo: correo,
    us_celular: celular,
    us_direccion: direccion,
    us_usuario: usuario,
    us_password: password,
    us_apellido: apellido,
    us_nacimiento: nacimiento,
    us_rol: rol,
    us_genero: genero
  }
 console.log(form_data);
  dbConn.query('INSERT INTO usuario SET ?', form_data, function (err, result) {
    if (err) {
      req.flash('error', err)
    } else {
      req.flash('success', 'Usuario agregado con exito');
      
      dbConn.query("SELECT * FROM usuario WHERE us_correo='"+correo+"'AND us_password='"+password+"'",function(err,rows)     {
 
        if(err) {
            req.flash('error', err);  
            console.log(err);
        } else {
            console.log(rows);
            if(rows.length){
              req.session.idu=rows[0]["us_id"];
              req.session.user=rows[0]["us_usuario"];
              req.session.email=rows[0]["us_correo"];
              req.session.admin=true;
              res.redirect("/admin");
            }else{
              //req.flash('success', 'El usuario no existe'); 
              res.redirect("/");
              
            }
            
            //res.render('books',{data:rows});
        }
      }
    );
    }
  })
})

router.get('/admin', function(req, res, next) {
  if(req.session.admin){
    res.render('admin/index');
  }else{
    res.redirect("/login");
  }
});

router.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect("/");
});


module.exports = router;