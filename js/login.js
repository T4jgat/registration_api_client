const url = 'http://192.168.155.252:8000/auth/login'

const loginForm = document.getElementById("form")
const incorrectPassword = document.getElementById("password-compare")
incorrectPassword.style.display="none"

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
            } else if (response.status === 400) {
                incorrectPassword.style.display = "block";
                incorrectPassword.style.color = "red";
            }
        } catch (err) {
            console.log(err.message)
        }
    })
}
