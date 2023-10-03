import axios from 'axios';

const API_KEY = '39792368-ef45e8f9e60c37d780e3d3bf1';
const URL = 'https://pixabay.com/api/';

async function fetchImg(searchQuery, page, perPage) {
  const response = await axios.get(
    `${URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
  return response.data;
}
export { fetchImg };