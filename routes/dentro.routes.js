
const router = require("express").Router();

const isLoggedIn = require("../middlewares/isLoggedIn.js")


router.get("/", isLoggedIn, (req, res, next)=>{


    res.render("pagina/dentro.hbs")
})


module.exports = router;