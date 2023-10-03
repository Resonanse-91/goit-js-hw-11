import { fetchImages } from "./fetch.js";
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

form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
    evt.preventDefault();
    observer.unobserve(guard);
    containerGallery.innerHTML = '';
    page = 1;
        const name = form.searchQuery.value.trim();
    if (name === '') {
        return;
    }

    try {
        const {hits, totalHits} = await fetchImages(name, page);
              
                 createMarkup(hits);
       Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`)
        const totalPage = Math.ceil(totalHits / limit);
        observer.observe(guard);
                 if (page === totalPage) {
                     observer.unobserve(guard);
                     Notiflix.Notify.info(" We're sorry, but you've reached the end of search results.");
                  }
    } catch (error) {
        console.log(error);
                  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
} 
    
    

function handlerLoadMore(entries) {
  entries.forEach((async entry) => {
      if (entry.isIntersecting) {
          console.log(page);
          page += 1;
          console.leg(page);
          const name = form.searchQuery.value.trim();
          
        try {
            const { hits, totalHits } = await fetchImages(name, page);
            
                createMarkup(hits);
                let totalPage = Math.ceil(totalHits / limit);
                 if (page === totalPage) {
                     observer.unobserve(guard);
                      form.reset()
                     Notiflix.Notify.info(" We're sorry, but you've reached the end of search results.");
                }
        } catch (error) {
            console.log(error);
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        }
  });
}
function createMarkup(images) {
    const markup = images
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