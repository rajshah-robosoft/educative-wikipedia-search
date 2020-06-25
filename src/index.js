import "bootstrap/dist/css/bootstrap.min.css";

import R, { pipe, isEmpty } from "ramda";
import getInputValue from "./getInputValue";
import getUrl from "./getUrl";
import Results from "./Results";

const doNothing = () => {};

const render = (markup) => {
  const resultsElement = document.getElementById("results");

  resultsElement.innerHTML = markup;
};

const makeSearchRequestIfValid = pipe(getInputValue, (value) => {
  if (isEmpty(value)) {
    doNothing;
  } else {
    searchAndRenderResults(value);
  }
});

const searchAndRenderResults = pipe(getUrl, (url) =>
  fetch(url)
    .then((res) => res.json())
    .then(Results)
    .then(render)
);

const inputElement = document.querySelector("input");

inputElement.addEventListener("keyup", makeSearchRequestIfValid);
