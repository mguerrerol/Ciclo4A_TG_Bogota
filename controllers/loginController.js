
//cargar pagina login
module.exports.cargar = (req, res)=>{
    res.render('login')
}

//valida el usuario y contraseña y redirige a la paginas
module.exports.validar = (req, res)=>{
    
    const usuario = req.body.txtUsuario
    const password = req.body.txtPassword
    
    if(usuario == "admininicial" && password == "admin123456")
    {
        res.redirect('/productos')
    }
    else
    {
        res.redirect('/login')
    }
   
}

