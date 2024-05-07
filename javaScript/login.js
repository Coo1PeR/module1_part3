var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const TOKEN_KEY = 'token'; // expected token
const TOKEN_LIFE_TIME = 10 * 60 * 1000; // 10 minutes
const btnLogin = document.querySelector('.btnLogin');
function clearLocalStorage() {
    localStorage.removeItem(TOKEN_KEY);
    location.reload();
}
function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const responseLogin = yield fetch('https://hjdjs55gol.execute-api.us-east-1.amazonaws.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(user),
            });
            const resultLogin = yield responseLogin.json();
            const resultToken = resultLogin.token;
            if (resultToken === TOKEN_KEY) {
                localStorage.setItem(TOKEN_KEY, resultToken);
                setTimeout(clearLocalStorage, TOKEN_LIFE_TIME);
                alert('You have successfully logged in!');
            }
        }
        catch (error) {
            alert(error);
        }
    });
}
btnLogin.addEventListener('click', element => {
    element.preventDefault();
    const passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}$/;
    const mail = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!passwordValid.test(password)) {
        return alert('Password is not valid');
    }
    const user = {
        email: mail,
        password: password,
    };
    login(user);
});
export {};
