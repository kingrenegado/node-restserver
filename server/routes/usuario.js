const express = require('express');
const bcrypt = require('bcryptjs');
const _= require('underscore');
const Usuario = require('../models/usuario');
const app = express();

app.get('/usuario', function (req, res) {

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limit || 5;
  limite = Number(limite);

    Usuario.find({estado:true},'nombre email role estado google')
          .skip(desde)
          .limit(limite)
          .exec((err,usuarios) => {
            if(err){
              return res.status(400).json({
                ok:false,
                err
              })
            }
            
    Usuario.count({estado:true},(err,conteo) => {
      res.json({
        ok:true,
        usuarios,
        cuantos:conteo
      })
    })

          
           })
});
  
app.post('/usuario', function (req, res) {
  
    const {nombre,email,password,role} = req.body;
    

    const newUsuario = new Usuario({nombre,email,password:bcrypt.hashSync(password,10),role});
    newUsuario.save((err,usaurioDB) => {
      if(err){
        return res.status(400).json({
          ok:false,
          err
        })
      }  

      res.json({
        ok:true,
        usuario:usaurioDB
      })
    });


});
  
app.put('/usuario/:id', async(req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['nombre','email','img','role','estado']);
 

  delete body.password;
  delete body.google;

  Usuario.findByIdAndUpdate(id,body, {new:true,runValidators:true}, (err,usaurioDB) => {
    if(err){
      return res.status(400).json({
        ok:false,
        err
      });
    }

    res.json({
      ok:true,
      usuario: usaurioDB
    })
  })
    
});
  
app.delete('/usuario/:id', function (req, res) {
  let id = req.params.id;

 //Usuario.findByIdAndRemove(id,(err,usuarioBorrado) => {

 let cambiaEstado = {
   estado:false
 }
  Usuario.findByIdAndUpdate(id,cambiaEstado,{new:true},(err,usuarioBorrado) => {

    if(err){
      return res.status(400).json({
        ok:false,
        err
      });
    }

    if(!usuarioBorrado){
      return res.status(400).json({
        ok:false,
        error: {
          message: 'Usuario no encontrado'
        }
      });
    }

    res.json({
      ok:true,
      usuario:usuarioBorrado
    })
  })
});
  

module.exports = app;
