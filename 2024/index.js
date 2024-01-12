import {
  trigger_effect,
  getRandomDelay,
  simulate_explosion,
  spawn_at_random,
  calculateContainerSize,
  shake,
  shakeAll,
  rotate,
  transitionScene,
} from "../modules/scene.js";

import { isMobileDevice, accurateHeight } from "../modules/utilities.js";

import { initialize, append_chunk } from "../modules/shared.js";

var data;
var bg;
var overlay;
var interval_1;
var interval_2;
var viewport;

document.addEventListener("DOMContentLoaded", () => {
  bg = document.getElementById("bg");
  overlay = document.getElementById("overlay");
  viewport = document.getElementById("permanent-viewport");

  initialize()
    .then((initializedData) => {
      console.log(initializedData);
      data = initializedData;
      setup();
    })
    .catch((error) => {
      console.error("Initialization failed:", error);
    });
});

var debug = false;

function setup() {
  append_chunk(data, "interests");
  append_chunk(data, "games");
  append_chunk(data, "music");
  append_chunk(data, "socials");

  if (debug) {
    transitionScene("danger");
    interval_1 = setInterval(
      () => spawn_at_random(750),
      getRandomDelay(3000, 6000)
    );

    interval_2 = setInterval(
      () => trigger_effect("heli"),
      getRandomDelay(8000, 20000)
    );
  } else {
    transitionScene("safe");
    setTimeout(() => {
      viewport.classList.add("entering-danger");

      setTimeout(() => {
        transitionScene("danger");
        interval_1 = setInterval(
          () => spawn_at_random(750),
          getRandomDelay(2000, 10000)
        );

        interval_2 = setInterval(
          () => trigger_effect("heli"),
          getRandomDelay(8000, 20000)
        );
      }, 3000);
    }, 10 * 1000);
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/*
  spawn_rotate_image(
    "interests",
    "https://webstockreview.net/images/dust-clipart-film-3.png"
  );
  spawn_rotate_image(
    "games",
    "https://webstockreview.net/images/dust-clipart-film-3.png"
  );
  */
