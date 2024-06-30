let signupUserName = document.getElementById('signupUserName')
let signupEmail = document.getElementById('signupEmail')
let signupPassword = document.getElementById('signupPassword')

let loginEmail = document.getElementById('loginEmail')
let loginPassword = document.getElementById('loginPassword')

const localDetials = () => {
    return JSON.parse(localStorage.getItem('idArray')) || []
}

const clearInputs = () => {
    document.querySelectorAll('input').forEach(input => {
        input.value = ''
    })
}


const createAccount = () => {
    let userNameValue = signupUserName.value.trim().toLowerCase();
    let emailValue = signupEmail.value.trim().toLowerCase();
    let passwordValue = signupPassword.value.trim().toLowerCase();

    if(userNameValue.length >= 8 && emailValue.length > 0 && passwordValue.length >= 8){
        let newEntry = {
            username: userNameValue,
            email: emailValue,
            password: passwordValue,
        }
        clearInputs()

        let idArray = JSON.parse(localStorage.getItem('idArray')) || [];
        idArray.push(newEntry)

        localStorage.setItem('idArray', JSON.stringify(idArray))
    }else{
        alert('Please Fill All Inputs.')
    }
}


const loginAccount = () => {
    let loginEmailValue = loginEmail.value.trim().toLowerCase()
    let loginPasswordValue = loginPassword.value.trim().toLowerCase()
        if(loginEmailValue.length > 0 && loginPasswordValue.length > 8){
            for(let i = 0; i < localDetials().length; i++){
                localStorage.setItem('value', i)
                if(loginEmailValue == localDetials()[i].email && loginPasswordValue == localDetials()[i].password){
                    console.log(localDetials()[i]);
                    clearInputs()
                    setTimeout(() => {
                        location.href = './home.html'
                    }, 1000)
                }else{
                    alert('Invalid!\nEmail or Password')
                    break;
                }
            }
        }else{
            alert('Please Fill All Inputs.')
        }
}
const signupArea = () => {
    document.querySelector('.signupBox').style.display = 'flex';
    document.querySelector('.loginBox').style.display = 'none';
}
const loginArea = () => {
    document.querySelector('.signupBox').style.display = 'none';
    document.querySelector('.loginBox').style.display = 'flex';
}