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

  if (isMobileDevice()) {
    alert(
      "For the most accurate experience, please use 1920x1080. BASICALLY don't use a phone."
    );
  }

  setup();
});

function portalTo(x) {
  var portal = document.getElementById("portal");
  var tutorial = document.getElementById("tutorial");
  var caution = document.getElementById("caution");

  tutorial.textContent = "Hold on tight";
  tutorial.style.color = "red";

  portal.classList.add("play");
  setTimeout(() => {
    window.location.href = `https://driftinghaze.github.io/${x}/index.html`;
  }, 5 * 1000);
  portal.addEventListener("animationend", function (event) {
    // window.location.href = `https://driftinghaze.github.io/${x}/index.html`;
  });

  shakeAll(3);
}

function setup() {
  document.getElementById("2023").addEventListener("click", function () {
    portalTo("2023");
  });
  document.getElementById("2024").addEventListener("click", function () {
    portalTo("2024");
  });
}
