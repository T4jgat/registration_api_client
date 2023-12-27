const url = 'http://192.168.0.100:8000/auth/login'

const loginForm = document.getElementById("form")

if (loginForm) {
    loginForm.addEventListener('submit', async event => {
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
                console.log(responseJson)
                window.location.assign("index.html")
            }
        } catch (err) {
            console.log(err.message)
        }
    })
}
