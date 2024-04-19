const TOKEN_KEY = 'token';
const TOKEN_LIFE_TIME = 10 * 60 * 1000;
const btnLogin = document.querySelector('.btnLogin');

function clearLocalStorage() {
  localStorage.removeItem(TOKEN_KEY);
  location.reload();
}

async function login(user) {
  try {
    const responseLogin = await fetch(
      'https://hjdjs55gol.execute-api.us-east-1.amazonaws.com/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
      }
    );

    const resultLogin = await responseLogin.json();
    const resultToken = resultLogin.token;

    if (resultToken === TOKEN_KEY) {
      localStorage.setItem(TOKEN_KEY, resultToken);
      setTimeout(clearLocalStorage, TOKEN_LIFE_TIME);

      const token = {
        Authorization: resultToken,
      };
      alert('You have successfully logged in!');
    }
  } catch (error) {
    alert(error);
    //console.error('Error:', error);
  }
}

//po3FGas8

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  const passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,8}$/;
  const mail = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!passwordValid.test(password)) {
    return alert('Password is not valid');
  }

  const user = {
    email: mail,
    password: password,
  };

  //console.log(JSON.stringify(user));
  login(user);
});
