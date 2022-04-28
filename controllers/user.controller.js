const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

let functions = {}

const userModel = require('./../models/user.model')


functions.register = async function (req, res) {

    let response = {}

    try {
        console.log('HOLA10', req.body)

        let body = req.body


        //campo-email
        if (body.email == '' || body.email == null || body.email.includes('@') == false || body.email.includes('.') == false) {
            response = {
                success: false,
                error: 'El email es invalido.',
                message: 'Error',
                code: 400
            }
            res.status(400).json(response)
            return 0
        }
        //Contraseña
        if (body.password != body.password2) {
            response = {
                success: false,
                error: 'Las contraseñas no coinciden.',
                message: 'Error',
                code: 400
            }
            res.status(400).json(response)
            return 0
        }

        if (body.password.length <= 7) {
            response = {
                success: false,
                error: 'La contraseña debe contener al menos 8 caracteres.',
                message: 'Error',
                code: 400
            }
            res.status(400).json(response)
            return 0
        }


        const saltRounds = 10;


        let hash = await bcrypt.hash(body.password, saltRounds)

        let user = new userModel({
            userName: body.name,
            password: hash,
            country: body.pais,
            whatsApp: body.whapp,
            sex: body.genero,
            email: body.email,
            born_date: body.bday
        })
        
        user = await user.save()
        console.log('HOLA11', user)

        response = {
            success: true,
            data: user,
            message: 'Ok',
            code: 200
        }
        res.status(200).json(response)

    }
    catch (e) {
        console.error(e)
        response = {
            success: false,
            error: e,
            message: 'Error',
            code: 500
        }
        res.status(500).json(response)

    }


}

//LOGIN/////////////////////////////////////////////////////////////////////////////////
functions.login = async function (req, res) {
    let response = {}

    try {
        let { email, password } = req.body
        console.log(email)
        console.log(req.params)
        console.log(req.query)
        console.log(req.body)
        let user_ = await userModel.findOne({ email: email })


        if (!user_) {
            response = {
                success: false,
                error: 'El correo no existe.',
                message: 'Error',
                code: 400
            }
            res.status(500).json(response)
            return 0
        }

        let match = await bcrypt.compare(password, user_.password);

        if (!match) {
            response = {
                success: false,
                error: 'La contraseña es incorrecta.',
                message: 'Error',
                code: 400
            }
            res.status(400).json(response)
            return 0
        }
        let body = {
            email: user_.email,
            password: user_.password
        }

        var token = jwt.sign(body, 'key',{expiresIn: '1h'})
        console.log('101010', token)
        
        response = {
            success: true,
            data: token,
            message: 'Success',
            code: 200
        }
        res.status(200).json(response)
    }
    catch (e) {
        console.error(e)
        response = {
            success: false,
            error: e,
            message: 'Error',
            code: 500
        }
        res.status(500).json(response)
    }
}


module.exports = functions 