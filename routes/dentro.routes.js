const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn.js")


router.get("/", isLoggedIn, (req, res, next)=>{


    res.render("user/dentro.hbs")
})


module.exports = router;