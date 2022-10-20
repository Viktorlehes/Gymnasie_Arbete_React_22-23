import Model from '../models/User.js'
import { response } from 'express'
import express from 'express'
const router = express.Router()

router.post('/signup',(request, reponse) => {
    const signedUpUser = new Model({
        fullName: request.body.fullName,
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
    })
    
    console.log(signedUpUser)

    signedUpUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(err => {
        console.log(err)
    })
})

export default router