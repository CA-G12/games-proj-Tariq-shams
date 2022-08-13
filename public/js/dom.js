/* eslint-disable linebreak-style */

const input = document.querySelector('#search');
const dataLists = document.querySelector('#gameLists');
const submit = document.querySelector('.search');
const container = document.querySelector('.container');

function addCard(state) {
  const { value } = input;
  for (let i = 0; i < state.length; i += 1) {
    if (state[i].title.toLowerCase().includes(value.toLowerCase())) {
      const divContainer = document.createElement('div');
      divContainer.classList = 'card';
      container.appendChild(divContainer);
      const img = document.createElement('img');
      img.src = state[i].thumbnail;
      img.alt = state[i].title;
      divContainer.appendChild(img);
      const title = document.createElement('h3');
      title.textContent = state[i].title;
      divContainer.appendChild(title);
    }
  }
}

submit.addEventListener('click', (e) => {
  e.preventDefault();
  container.textContent = '';
  const { value } = input;
  if (value) {
    fetch(`/api/${value}`, (res) => {
      addCard(res);
    });
  }
});

function renderSuggestions(state) {
  dataLists.textContent = '';

  state.forEach((ele) => {
    const options = document.createElement('option');
    options.value = ele;
    dataLists.appendChild(options);
  });
}

input.addEventListener('input', () => {
  fetch(`games/${input.value}`, (res) => renderSuggestions(res));
});
