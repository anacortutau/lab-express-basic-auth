
const isLoggedIn = (req, res, next) =>{
    console.log(req.session)

    if(!req.session.user) {
        res.redirect("/user/login")
    } else{
        next() 
    }

}

module.exports = isLoggedIn;