/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const url = '../api.json';
const fetch = (argUrl, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        cb(data);
      }
    }
  };

  xhr.open('GET', argUrl);
  xhr.send();
};

function buildCards(data) {
  data.forEach((e, i) => {
    if (i % 5 === 0) {
      const divContainer = document.createElement('div');
      divContainer.classList = 'card';
      container.appendChild(divContainer);
      const img = document.createElement('img');
      img.src = e.thumbnail;
      img.alt = e.title;
      divContainer.appendChild(img);
      const title = document.createElement('h3');
      title.textContent = e.title;
      divContainer.appendChild(title);
    }
  });
}

fetch(url, (res) => {
  const state = [];
  state.push(...res);
  buildCards(state);
});
