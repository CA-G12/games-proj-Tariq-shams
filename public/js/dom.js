const input = document.querySelector("#search");
const dataLists = document.querySelector("#gameLists");
const submit = document.querySelector(".search");
const container = document.querySelector(".container");
let state = [];

function addCard(state) {
  const { value } = input;
  for (let i = 0; i < state.length; i++) {
    if (state[i]["title"].toLowerCase().includes(value.toLowerCase())) {
      let divContainer = document.createElement("div");
      divContainer.classList = "card";
      container.appendChild(divContainer);
      let img = document.createElement("img");
      img.src = state[i]["thumbnail"];
      img.alt = state[i]["title"];
      divContainer.appendChild(img);
      let title = document.createElement("h3");
      title.textContent = state[i]["title"];
      divContainer.appendChild(title);
    }
  }
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  container.textContent = "";
  const { value } = input;
  if (value) {
    fetch(`../api.json`, (res) => {
      addCard(res);
    });
  } else {
    return;
  }
});

function renderSuggestions(state) {
  dataLists.textContent = "";

  state.forEach((ele) => {
    const options = document.createElement("option");
    options.value = ele["name"];
    dataLists.appendChild(options);
  });
}

input.addEventListener("input", () => {
  fetch(`../data.json`, (res) => renderSuggestions(res));
});
