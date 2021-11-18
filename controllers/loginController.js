const {promisify} = require('util')

//cargar pagina login
module.exports.cargar = async (req, res)=>{   
    res.render('login',{alert:false})
}

//valida el usuario y contraseña y redirige a la paginas
module.exports.login = async (req, res)=>{
    try {
        const usuario = req.body.txtUsuario
        const password = req.body.txtPassword
        
        if(usuario == "admininicial" && password == "admin123456")
        {
            res.redirect('/productos')
        }
        else
        {
            //res.redirect('/login')  
            res.render('login',{
                alert:true,
                alertTitle: "Error",
                alertMessage:"Credenciales Invalidas, por favor revisar",
                alertIcon: "error",
                showConfirmButton:true,
                timer:false,
                ruta:'login'
            })
        } 
    } catch (error) {
        console.log(error)
    }
}

