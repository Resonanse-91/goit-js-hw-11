import axios from 'axios';

let imgPerPage = 0;

async function fetchImages(searchQuery, page) {
  const resp = await axios(`https://pixabay.com/api/`, {
    params: {
      key: '39792368-ef45e8f9e60c37d780e3d3bf1',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 40,
    },
  });
  imgPerPage = resp.config.params.per_page;
  return resp.data;
}

export {fetchImages, imgPerPage}