import "./styles.css";
const data = require("../data/koenawin.json");

/**
 * Menu Template
 */
const Menu = () => {
  let listData = data.data;
  let list = "";

  for (let step in listData) {
    list += `<h3 class="step">${step}</h3>`;
    for (let day in listData[step]) {
      list += `
        <a
          href="#${step}-${day}"
          class="day"
          id="${step}-${day}"
          data-step="${step}"
          data-day="${day}"
          >
        ${day}
        </a>
      `;
    }
  }

  return `
    <div id="menu" class="menu">
      ${list}
    </div>
  `;
};

/**
 * Counter Template
 */
const Counter = () => {
  return `
  <div id="counter" class="counter">
    <h1 class="title" id="title"></h1>
    <p class="vegetarian-day" id="vegetarian-day"></p>
    <h5 class="count-loop" id="count-loop"></h5>
    <h2 class="count-text" id="count-text"></h2>
    <button class="count-btn" id="count-btn">Count</button>
  </div>
`;
};

/**
 * Main App Template
 */
const App = () => `
  <div class="wrapper">
    <div class="menu-btn-wrap">
      <button class="menu-btn" id="menu-btn">Menu</button>
    </div>
    ${Menu()}
    ${Counter()}
  </div>
`;

// Inject into html
document.getElementById("app").innerHTML = App();

/**
 * State
 */
let state = {
  countLoop: 0,
  maxCountLoop: 0,
  maxCount: 108,
  count: 0
};

/**
 * DOM Refrences
 */
const countBtn = document.getElementById("count-btn");
const countText = document.getElementById("count-text");
const countLoop = document.getElementById("count-loop");
const title = document.getElementById("title");
const vegetarianDay = document.getElementById("vegetarian-day");
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

/**
 * Menu Items Logic
 */
function MenuItemsLogic() {
  const step = this.getAttribute("data-step");
  const day = this.getAttribute("data-day");
  const dataInside = data.data[step][day];

  title.innerText = dataInside.title;
  vegetarianDay.innerText = dataInside.isVegetarianDay ? "Vegetarian Day" : "";
  state.maxCountLoop = dataInside.countLoop;
  countLoop.innerText = `${state.countLoop}/${state.maxCountLoop}`;
  state.count = 0;
  countText.innerText = `${state.count}`;
  menu.style.display = "none";
}

/**
 * Counter Logic
 */
function CounterLogic() {
  if (state.countLoop < state.maxCountLoop) {
    if (state.count === state.maxCount) {
      state.countLoop = state.countLoop + 1;
      countLoop.innerText = `${state.countLoop}/${state.maxCountLoop}`;
      state.count = 0;
    } else {
      state.count = state.count + 1;
    }
    countText.innerText = state.count;
  }

  if (state.countLoop === state.maxCountLoop)
    countText.innerText = "Done for Today!";
}

/**
 * Invoke function
 * Add Event Listener
 */
(function() {
  /**
   * Menu template Logic
   */
  menu.style.display = "none";
  menuBtn.addEventListener("click", () => {
    if (menu.style.display !== "none") menu.style.display = "none";
    else menu.style.display = "block";
  });

  /**
   * Counter template logic
   */
  countLoop.innerText = `${state.countLoop}/${state.maxCountLoop}`;
  countText.innerText = state.count;
  countBtn.addEventListener("click", CounterLogic);

  /**
   * Menu template logic
   */
  for (let step in data.data) {
    for (let day in data.data[step]) {
      const menuItem = document.getElementById(`${step}-${day}`);
      menuItem.addEventListener("click", MenuItemsLogic);
    }
  }
})();
