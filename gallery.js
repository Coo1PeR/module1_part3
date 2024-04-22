///////////////////////////////////////
// Gallery
const btnShowGallery = document.querySelector('.btnShowGallery');
const btnPrev = document.querySelector('.previos');
const btnNext = document.querySelector('.next');
const btnPages = document.querySelectorAll('#pages');

// Will be recorded in the getGallery
let currentPage = 1;
let maxPage;
let currentUrl = new URL(window.location);

async function getGallery(i) {
  try {
    cleanGallery();
    const responseGallery = await fetch(
      `https://hjdjs55gol.execute-api.us-east-1.amazonaws.com/api/gallery?page=${i}`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );

    const resultGallery = await responseGallery.json();
    currentPage = resultGallery.page;
    maxPage = resultGallery.total;
    localStorage.setItem('page', resultGallery.page);

    currentUrl = new URL(`${window.location}gallery?page=${i}`);
    console.log(currentUrl);

    console.log(resultGallery);

    // Rendering images
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

btnShowGallery.addEventListener('click', element => {
  element.preventDefault();

  if (localStorage.getItem('token')) {
    getGallery(localStorage.getItem('page') || currentPage);
  }
});

function cleanGallery() {
  document.querySelectorAll('#img').forEach(element => element.remove());
}

btnNext.addEventListener('click', element => {
  element.preventDefault();

  nextPage();
});

btnPrev.addEventListener('click', element => {
  element.preventDefault();

  prevPage();
});

function nextPage() {
  if (currentPage === maxPage) {
    currentPage = 1;
  } else {
    currentPage++;
  }

  getGallery(currentPage);
}

function prevPage() {
  if (currentPage === 1) {
    currentPage = maxPage;
  } else {
    currentPage--;
  }

  getGallery(currentPage);
}

// Open last page after reload
function reloadPage() {
  if (localStorage.getItem('token')) {
    getGallery(localStorage.getItem('page'));
  }
}

btnPages.forEach(element => {
  element.addEventListener('click', () => {
    getGallery(element.innerHTML);
  });
});

export {};
