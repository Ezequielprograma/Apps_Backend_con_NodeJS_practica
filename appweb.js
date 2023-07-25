const express = require('express')
const aplicacion = express()
const mysql = require('mysql')
const bodyParser= require('body-parser')

var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'sqluser',
    password: 'password',
    database: 'inventario'
})

aplicacion.set('view engine','ejs')
aplicacion.use(bodyParser.json())
aplicacion.use(bodyParser.urlencoded({extended:true}))


aplicacion.get('/',function(peticion,respuesta){
    pool.getConnection(function(err,connection){
        const query = `SELECT * FROM inventario.productos;`
       
        connection.query(query,function(error,filas,campos){
            respuesta.render('index',{productos:filas})
        })
       

        connection.release()
    })
})




aplicacion.listen(8080,function(){
    console.log("Servidor Iniciado")
})