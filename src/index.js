import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const containerGallery = document.querySelector('.gallery');
const guard = document.querySelector('.guard');


const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', 
  captionDelay: 250, 
  captionPosition: 'bottom',
});


const limit = 40;
let page = 1;
const options = {
  root: null,
  rootMargin: '300px',
  threshold: 0,
};

let observer = new IntersectionObserver(handlerLoadMore, options);

form.addEventListener('submit', getImages);

function getImages(evt) {
    evt.preventDefault();
    containerGallery.innerHTML = '';
        const name = form.searchQuery.value;
    if (name !== '') {
          fetchImages(name)
              .then((resp) => {
                 createMarkup(resp.data);
       Notiflix.Notify.info(`Hooray! We found ${resp.data.totalHits} images.`)
                 const totalPage = Math.ceil(resp.data.totalHits / limit);
                 if (page < totalPage) {
                     observer.observe(guard);
                  }  
             })
              .catch((err) => {
                 console.log(err);
                  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
             })
        } 
    } 
    

function handlerLoadMore(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
        page += 1;
        const name = form.searchQuery.value;
        fetchImages(name, page)
            .then((resp) => {
                createMarkup(resp.data);
                let totalPage = Math.ceil(resp.data.totalHits / limit);
                 if (page === totalPage) {
                     observer.unobserve(guard);
                      form.reset()
                     Notiflix.Notify.info(" We're sorry, but you've reached the end of search results.");
                }
            }).catch(err => {
                console.log(err);
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            })
        }
  });
}
function createMarkup(arr) {
    const markup = arr.hits
        .map(
            item =>
                `<a class="photo-link" href="${item.largeImageURL}">
            <div class="photo-card">
            <div class="photo">
            <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy"/>
            </div>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            ${item.likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            ${item.views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            ${item.comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            ${item.downloads}
                        </p>
                    </div>
            </div>
        </a>`
        )
        .join('');
    containerGallery.insertAdjacentHTML('beforeend', markup);
    simpleLightBox.refresh();
}