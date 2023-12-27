const url = 'http://192.168.155.252:8000/auth/registration'

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


function hasMinLength(password) {
    return password.length >= 8;
}

function hasUppercase(password) {
    return /[A-Z]/.test(password);
}

function hasLowercase(password) {
    return /[a-z]/.test(password);
}

function hasNumber(password) {
    return /[0-9]/.test(password);
}

function hasSymbol(password) {
    return /[-\/!@#$%^&*()_+|~=`{}\[\]:";'<>?,./]/.test(password);
}

function hasNoConsecutiveChars(password) {
    for (let i = 0; i < password.length - 1; i++) {
        if (password[i] === password[i + 1]) {
            return false;
        }
    }
    return true;
}

function updateStrengthMeter(strength) {
    const meter = document.getElementById("password-strength");
    switch (strength) {
        case 2:
            meter.textContent = "Weak";
            break;
        case 3:
            meter.textContent = "Moderate";
            break;
        case 4:
            meter.textContent = "Strong";
            break;
    }
}

const passwordInput = document.getElementById("password");
const submitButton = document.querySelector(".form-submit");

passwordInput.addEventListener("keyup", () => {
    let strength = 0;
    if (hasMinLength(passwordInput.value)) strength++;
    if (hasUppercase(passwordInput.value)) strength++;
    if (hasLowercase(passwordInput.value)) strength++;
    if (hasNumber(passwordInput.value)) strength++;
    if (hasSymbol(passwordInput.value)) strength++;
    if (!hasNoConsecutiveChars(passwordInput.value)) strength--;
    updateStrengthMeter(strength);
    submitButton.disabled = strength < 4;
});