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

aplicacion.get('/actualizar-formulario', function(peticion,respuesta){

    pool.getConnection(function(err,connection){

        const query = `SELECT * FROM inventario.productos WHERE id = ${connection.escape(peticion.query.id)}`

        connection.query(query,function(error,filas,campos){
            respuesta.render('actualizar',{producto:filas[0]})
        })
        connection.release()

    }

    )

})

aplicacion.post('/actualizar-tarea',function(peticion,respuesta){

    pool.getConnection(function(err,connection){

        const query = `UPDATE inventario.productos SET nombre=${connection.escape(peticion.body.nombre)},
                                                    precio=${connection.escape(peticion.body.precio)},
                                                    cantidad=${connection.escape(peticion.body.cantidad)}
                                                    WHERE id=${connection.escape(peticion.body.id)} `

        connection.query(query,function(error,filas,campos){
            respuesta.redirect("/")
        })

        connection.release()
    })

})

aplicacion.get('/formulario-Xprecio',function(peticion,respuesta){

    pool.getConnection(function(err,connection){
        const query = `SELECT * FROM inventario.productos ORDER BY productos.precio;`

        connection.query(query,function(error,filas,campos){
                respuesta.render('index',{productos:filas})
        })

        connection.release()
    })

}
)

aplicacion.get('/formulario-Xnombre',function(peticion,respuesta){

    pool.getConnection(function(err,connection){
        const query = `SELECT * FROM inventario.productos ORDER BY productos.nombre ASC;`

        connection.query(query,function(error,filas,campos){
                respuesta.render('index',{productos:filas})
        })

        connection.release()
    })

}

)

aplicacion.get('/formulario-Xcantidad',function(peticion,respuesta){

    pool.getConnection(function(err,connection){
        const query = `SELECT * FROM inventario.productos ORDER BY productos.cantidad ASC;`

        connection.query(query,function(error,filas,campos){
                respuesta.render('index',{productos:filas})
        })

        connection.release()
    })

}

)

aplicacion.get('/formulario-Xid',function(peticion,respuesta){

    pool.getConnection(function(err,connection){
        const query = `SELECT * FROM inventario.productos ORDER BY productos.id ASC;`

        connection.query(query,function(error,filas,campos){
                respuesta.render('index',{productos:filas})
        })

        connection.release()
    })

}

)

aplicacion.listen(8080,function(){

    console.log("Servidor Iniciado")

})