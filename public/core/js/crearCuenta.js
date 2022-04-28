$(document).ready(function () {

    let verifica = function (password) {

        let AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let az = AZ.toLowerCase()
        let numeros = '0123456789'
        let caracter = '/!¡?¿.-_#$%&'

        AZ = AZ.split('') 
        az = az.split('')
        numeros = numeros.split('')
        caracter = caracter.split('')

        let isMayus = false
        let isMinus = false
        let isNumber = false
        let isCaracter = false

        let passw = password.split('')

        for (let item of passw) {
            if (AZ.includes(item)) {
                isMayus = true
            }
            if (az.includes(item)) {
                isMinus = true
            }
            if (numeros.includes(item)) {
                isNumber = true
            }
            if (caracter.includes(item)) {
                isCaracter = true
            }
        }

        return (isMayus && isMinus && isNumber && isCaracter)
    }



    console.log('funciona')
    //Limpiar
    let clean = function () {
        $('#name').val('')
        $('#email').val('')
        $('#password').val('')
        $('#password2').val('')
        $('#pais').val('')
        $('#whapp').val('')
        $('#genero').val('')
        $('#bday').val('')
    }
    clean()

    //Agregar
    $('#add').click(async function () {
        let name = $('#name').val()
        let email = $('#email').val()
        var password = $('#password').val()
        let password2 = $('#password2').val()
        let pais = $('#pais').val()
        let whapp = $('#whapp').val()
        let genero = $('#genero').val()
        let bday = $('#bday').val()

        //campo-email
        email = email.toLowerCase()
        if (email == '' || email == null || email.includes('@') == false || email.includes('.') == false) {
            alert('El email es incorrecto, favor de ingresarlo nuevamente.')
            return 0;
        }

        //Contraseña
        if (password != password2) {
            alert("Las contraseñas no coinciden");
            return 0;
        }

        if (password.length <= 7) {
            alert('La contrseña debe tener al menos 8 caracteres.');
            return 0;
        }

        if(verifica(password) == false){
            alert('La contraseña debe contener al menos una letra mayúscula [A-Z], una letra minúscula [a-z], un número [0-9] y un caracter [/!¡?¿.-_#$%&]')
            return 0;
        }
        
        //WhatsApp
        if (whapp.length <= 9) {
            alert('El número de telefóno es incorrecto.');
            return 0;
        }

        console.log('HOLA2',name, email, password, password2, pais, whapp, genero, bday)

        c           
        console.log('HOLA',body)

        try {
            let response = await fetch('http://localhost:3000/api/user/crearCuenta', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }

            })
            response = await response.json()
            alert('Usuario registrado correctamente.')
            location.href = '/login'
        }
        catch (e) {
            alert('Ocurrió un error al registrar al usuario.')

        }

    })
    



})