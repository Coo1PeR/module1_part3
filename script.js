const btnLogin = document.querySelector('.btnLogin');

let xhr = new XMLHttpRequest();
xhr.open(
  'POST',
  'https://hjdjs55gol.execute-api.us-east-1.amazonaws.com/api/login'
);

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  const user = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  console.log(user);
  xhr.send(JSON.stringify(user));
});

xhr.onload = () => {
  const res = JSON.parse(xhr.response);

  if (res.token === 'token') {
    localStorage.setItem('token', res.token);
  } else {
    alert(xhr.response);
  }
};

//localStorage.clear()

//po3FGas8;
