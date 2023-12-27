const url = 'http://192.168.0.100:8000/auth/registration'

const form = document.getElementById("form")

if (form) {
    form.addEventListener('submit', async event => {
        event.preventDefault()

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(new FormData(form))),
            })
            const responseJson = await response.json()

            if (response.status === 200) {
                alert("Registration successful")
                console.log(responseJson)
                window.location.assign("../login")
            } else if (response.status === 409) {
                alert("User is already exists")
                console.log(responseJson())
            }


        } catch (err) {
            console.log(err.message)
        }
    })
}
