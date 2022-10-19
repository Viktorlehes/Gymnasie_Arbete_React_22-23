const { response } = require('express')
const express = require('express')
const router = express.Router()
const signUpTempcopy = require('../models/SignUpModles')

router.post('/signup', (request, reponse) => {
    const signedUpUser = new signUpTempcopy({
        fullName: request.body.fullName,
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
    })
    signedUpUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(err => {
        response.json(err)
    })
})

module.exports = router