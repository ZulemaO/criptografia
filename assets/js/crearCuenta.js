$(document).ready(function(){
    console.log('funciona')
    //Limpiar
    let clean = function(){
        $('#name').val('')
        $('#email').val('')
        $('#password').val('')
        $('#bday').val('')
    }

    clean()
    //Agregar
    $('#add').click(async function () { 
        let name = $('#name').val()
        let email = $('#email').val()
          let password = $('#password').val()
        let bday = $('#bday').val()

        console.log(name,email,password,bday)

         let body = {
            "name": name,
            "email": email,
            "password": password,
            "bday": bday
        }
        console.log(body)
        let response = await fetch('http://localhost:3100/api/formulario',{
            method:'POST',
            body: JSON.stringify(body),
            headers:{
                'Content-Type': 'application/json'
              }

        })
        response = await response.json()
        console.log(response)
    
        clean()
        
    })

   

})