//===============================
// PUERTO
// ==============================
process.env.PORT = process.env.PORT || 3000;


//===============================
// ENTORNO
// ==============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//===============================
// Vencimiento del token|
// ==============================
process.env.CADUCIDAD_TOKEN =  60 * 60 * 24 * 30


//===============================
// SEED DE autenticacion
// ==============================
process.env.SEED = process.env.SEED || 'este-es-el-SEED-del-desarrollo'


//===============================
// BASE DE DATOS
// ==============================

let urlDB;
if(process.env.NODE_ENV === 'dev'){
     urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = process.env.MONGO_URI;
}


process.env.URLDB = urlDB


//===============================
// Google client id
// ==============================

process.env.CLIENT_ID = process.env.CLIENT_ID || '571220928978-0fvke699epqtpcsjju80k2sus97pigvo.apps.googleusercontent.com';