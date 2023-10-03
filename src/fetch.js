import axios from 'axios';

const API_KEY = '39792368-ef45e8f9e60c37d780e3d3bf1';
const URL = 'https://pixabay.com/api/';

// async function fetchImg(searchQuery, page) {
//   const {data} = await axios.get(
//     `${URL}?page=${page}&per_page=40&image_type=photo&orientation=horizontal&key=${API_KEY}&q=${searchQuery}&safesearch=true`
//   );
//   return data;
// }

async function fetchImages(name, page) {
  const options = {
            params: {
                key: '39792368-ef45e8f9e60c37d780e3d3bf1',
                q: name ,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                page: page,
                per_page: 40,
            },
        }
        const baseUrl = 'https://pixabay.com/api/';
        const {data} = await axios.get(baseUrl, options)
    return data
    }   

export { fetchImages };