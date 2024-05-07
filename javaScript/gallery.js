var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
///////////////////////////////////////
// Gallery
const btnShowGallery = document.querySelector('.btnShowGallery');
const btnPrev = document.querySelector('.previous');
const btnNext = document.querySelector('.next');
const btnPages = document.querySelector('#pages').querySelectorAll('button');
// Will be recorded in the getGallery
let currentPage = 1;
let maxPage;
function getGallery(i) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            cleanGallery();
            const responseGallery = yield fetch(`https://hjdjs55gol.execute-api.us-east-1.amazonaws.com/api/gallery?page=${i}`, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            const resultGallery = yield responseGallery.json();
            currentPage = resultGallery.page;
            maxPage = resultGallery.total;
            localStorage.setItem('page', resultGallery.page);
            updateURLParams();
            // Rendering images
            const images = resultGallery.objects;
            images.forEach((src) => {
                const img = document.createElement('img');
                img.src = src;
                img.width = 300;
                img.id = 'img';
                document.querySelector('#imgs').append(img);
            });
        }
        catch (error) {
            alert(`Error:${error}`);
            localStorage.setItem('page', '1');
            yield getGallery(1);
        }
    });
}
btnShowGallery.addEventListener('click', element => {
    element.preventDefault();
    if (localStorage.getItem('token')) {
        getGallery((localStorage.getItem('page') || currentPage));
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
    }
    else {
        currentPage++;
    }
    getGallery(currentPage);
}
function prevPage() {
    if (currentPage === 1) {
        currentPage = maxPage;
    }
    else {
        currentPage--;
    }
    getGallery(currentPage);
}
btnPages.forEach(element => {
    element.addEventListener('click', () => {
        getGallery(Number(element.innerHTML));
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
        getGallery(Number(pageNumber));
    }
};
// generate new url
function updateURLParams() {
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(currentPage));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
}
export {};
