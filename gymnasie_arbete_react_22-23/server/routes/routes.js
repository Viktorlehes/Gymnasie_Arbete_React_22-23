// const express = require('express')
// const Model = require("../models/User.js")
// const router = express.Router()

// router.post('/sign-up',(request, response) => {
//     const signedUpUser = new Model({
//         fname: request.body.fullName,
//         lname: request.body.username,
//         email: request.body.email,
//         password: request.body.password
//     })
    
//     console.log(signedUpUser)

//     signedUpUser.save()
//     .then(data => {
//         response.json(data)
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })

// router.get('/sign-in')
// module.exports  = router