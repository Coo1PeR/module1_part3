const TOKEN_KEY = 'token'; // expected token
const TOKEN_LIFE_TIME = 10 * 60 * 1000; // 10 minutes

const btnLogin = document.querySelector('.btnLogin');
const btnShowGallery = document.querySelector('.btnShowGallery');
const btnPrev = document.querySelector('.previos');
const btnNext = document.querySelector('.next');

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

async function getGallery(i) {
  try {
    const responseGallery = await fetch(
      `https://hjdjs55gol.execute-api.us-east-1.amazonaws.com/api/gallery?page=${i}`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );

    const resultGallery = await responseGallery.json();
    console.log(resultGallery);

    const images = resultGallery.objects;

    images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.width = '300';
      img.id = 'img';

      document.querySelector('#imgs').append(img);
    });
  } catch (error) {
    alert(error);
  }
}

btnShowGallery.addEventListener('click', e => {
  e.preventDefault();

  if (localStorage.getItem('token')) {
    getGallery(2);
  }
});

function cleanGallery() {
  document.querySelectorAll('#img').forEach(el => el.remove());
}

btnNext.addEventListener('click', e => {
  e.preventDefault();

  cleanGallery();
});

btnPrev.addEventListener('click', e => {
  e.preventDefault();

  cleanGallery();
});
