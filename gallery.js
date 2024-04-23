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

    updateURLParams();

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
    alert(`Error:${error}`);
    localStorage.setItem('page', 1);
    getGallery(1);
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

// get value from URL
function getPageParameter() {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.get('page');
}

// handle page load event
window.onload = function () {
  const pageNumber = getPageParameter();
  if (pageNumber !== null) {
    getGallery(pageNumber);
  }
};

// generate new url
function updateURLParams() {
  const params = new URLSearchParams(window.location.search);
  params.set('page', currentPage);
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, '', newUrl);
}

export {};
