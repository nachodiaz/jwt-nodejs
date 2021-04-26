const { Router } = require('express') 
const jwt = require('jsonwebtoken')
const router = Router()

const config = require('./../config')
const verifyToken = require('./verifyToken')
const User = require('./../models/User')


router.post('/signup', async  (req, res, next) => {
    const { username, email, password } = req.body
    const user = new User({
        username: username,
        email: email,
        password: password
    })
    user.password = await user.encryptPassword(user.password)
    console.log(user)
    await user.save()

    const access_token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 60 * 60 * 24 
    })

    res.json({ 
        auth: true,
        access_token: access_token
    });
    
    console.log(req.body)
})

router.get('/profile',  verifyToken, async (req, res) => {
    

    const user = await User.findById(req.userId, { password: 0 })
    if (!user) {
        return res.status(404).send('No user found')
    }
    
    res.json(user)

})

router.post('/signin', verifyToken, async (req, res) => {
    
    const { email, password } = req.body;
    console.log(email, password)

    const user = await  User.findOne({email: email})

    if (!user) {
        return res.status(404).send("The email dosen't exists")
    }

    const validPassword = await user.validatePassword(password)
    if (!validPassword) {
        res.status(401).json({auth: false, token: null})
    }

    const access_token = jwt.sign({id: user._id}, config.secret, {expiresIn: 60 * 60 * 24})

    console.log(validPassword)
    return res.json({ auth: true, access_token: access_token})
})

module.exports = router