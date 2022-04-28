$(document).ready(function () {
    console.log('funciona')

    let clear = function () {
        $('#email').val('')
        $('#password').val('')
    }

    clear()
    $('#add').click(async function () {
        let email = $('#email').val()
        let password = $('#password').val()
        console.log(email, password)

        if (email == '' || email == null || email.includes('@') == false || email.includes('.') == false) {
            alert('El email es incorrecto, favor de ingresarlo nuevamente.')
            return 0
        }
        //Contraseña
        if (password.length <= 7) { 
            alert("La contrseña debe tener al menos 8 caracteres.");
            return 0;
        }

        let body = {
            "email": email,
            "password": password
        }
        
        try {
            let response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }

            })
            response = await response.json()
            console.log(response)

            if (response.success) {
                alert('Sesión Iniciada.')
                location.href = '/'
            }
            else {
                alert(response.error)
            }
        }
        catch (e) {
            alert('Ocurrió un error al iniciar sesión.')

        }
        clear()
    })

    clear()


})