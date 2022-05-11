const router = require("express").Router();

const UserModel = require("../models/User.model.js");
const bcryptjs= require("bcryptjs")




//GET "/user/signup" =>renderizar el formulario

router.get("/signup", (req, res, next)=>{
    res.render("user/user.hbs")
})


// POST "/user/signup" => recibir los datis y registrarlo

router.post("/signup", async (req, res, next)=>{

    const {username, password}= req.body

    // Mensajito si faltan datos

    if(username === "" || password === "" ){
        res.render("user/user", {
            errorMessage: "tienes que rellenar todos los datos"
        })

        return; 
    }
    // aqui estamos encriptando la contraseña del usuario
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if(passwordRegex.test(password) === false){
        res.render("user/user", {
            errorMessage: "contraseña no válida, necesita ocho caracteres, una letra y un numero"
        })
        return; 

    }
        // validacion IMPORTANTE que no haya dos usuarios iguales
    try{
        const foundUser = await UserModel.findOne({username: username})

        if(foundUser !== null){
            res.render("user/user", {
                errorMessage: "usuario ya existe"
            })
            return;

        }

        // crear el usuario
    const salt = await bcryptjs.genSalt(12)

    const hashPassword = await bcryptjs.hash(password, salt)

    const createdUser = await UserModel.create({
        username,
        password: hashPassword
    })


    res.redirect("/user/login")

} catch(err){
    next (err)
}
    
})

// GET "user/login" => renderizar el login
router.get("/login", (req, res, next)=>{
    res.render("user/login.hbs")
})

//POST "user/login" => recibir la informacion del usuario y logarlo

router.post("/login", async (req, res, next)=>{

    const {username, password} = req.body


    if(!username|| !password ){
        res.render("user/login.hbs", {
            errorMessage: "debes rellenar todos los datos"
        })
        return; 
    }
    // mensajito para ver si el usuario es valido o no
    try{
    const foundUser = await UserModel.findOne({username: username})
    

    if(!foundUser){
        res.render("user/login", {
            errorMessage: "El usuario no existe"
        })
        return; 
    }

    
    const passwordCheck = await bcryptjs.compare(password, foundUser.password)
    console.log(passwordCheck)
    if(!passwordCheck){
        res.render("user/login", {
            errorMessage: "contraseña errónea"
        })
        return; 

    }
     
    
    req.session.user = foundUser;
    

    // llevar al usuario dentro de su pagina

    res.redirect("/dentro")

    } catch(err){
        next(err)
    }
  
})






module.exports = router;
