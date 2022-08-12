/* eslint-disable linebreak-style */
const url = "../api.json";
const fetch = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        cb(data);
      }
    }
  };

  xhr.open("GET", url);
  xhr.send();
};

function buildCards(data) {
  data.forEach((e, i) => {
    if (i % 5 === 0) {
      let divContainer = document.createElement("div");
      divContainer.classList = "card";
      container.appendChild(divContainer);
      let img = document.createElement("img");
      img.src = e["thumbnail"];
      img.alt = e["title"];
      divContainer.appendChild(img);
      let title = document.createElement("h3");
      title.textContent = e["title"];
      divContainer.appendChild(title);
    }
  });
}

fetch(`../api.json`, (res) => {
  state.push(...res);
  buildCards(res);
});
