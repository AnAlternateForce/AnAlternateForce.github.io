var bg;
var overlay;
var interval_1;
var interval_2;
var viewport;
var distortion_layer_1;

document.addEventListener("DOMContentLoaded", () => {
  bg = document.getElementById("bg");
  overlay = document.getElementById("overlay");
  viewport = document.getElementById("permanent-viewport");
  distortion_layer_1 = document.getElementById("distortion-layer-1");
});

export function rotate(div, deg) {
  div.style.webkitTransform = "rotate(" + deg + "deg)";
  div.style.mozTransform = "rotate(" + deg + "deg)";
  div.style.msTransform = "rotate(" + deg + "deg)";
  div.style.oTransform = "rotate(" + deg + "deg)";
  div.style.transform = "rotate(" + deg + "deg)";
}

export function shake(div, duration) {
  div.style.animation = `shake ${duration}s ease-in-out`;

  div.addEventListener("animationend", function (event) {
    div.style.animation = "";
  });
}

export function shakeAll(duration) {
  const x = document.querySelectorAll(".shakeable");
  x.forEach((container) => {
    shake(container, duration);
  });
}

export function spawn_rotate_image(container, url) {
  const rotatingImage = document.createElement("img");
  rotatingImage.src = url;
  rotatingImage.classList.add("rotate2");
  container.appendChild(rotatingImage);
}

export function spawn_at_random(duration) {
  distortion_layer_1.classList.add("active");

  const div = document.createElement("div");
  div.classList.add("viewport");
  div.style.backdropFilter = "blur(10px)";

  const image = document.createElement("img");
  image.classList.add("shakeable", "explosion");
  image.src = "../assets/explosion.gif";

  const rotatingImage = document.createElement("img");
  rotatingImage.src = "../assets/sparks.png";
  rotatingImage.classList.add("rotate2");

  /*
  sub_div.appendChild(rotatingImage);
  sub_div.appendChild(image);
  div.appendChild(sub_div);
  */

  div.appendChild(image);
  div.appendChild(rotatingImage);
  document.body.appendChild(div);

  // Use requestAnimationFrame to wait for layout changes to be applied
  requestAnimationFrame(() => {
    const { width, height } = calculateContainerSize(div);
    const randomX = Math.random() * (width - 100);
    const randomY = Math.random() * (height - 100);
    image.style.left = randomX + "px";
    image.style.top = randomY + "px";

    rotatingImage.style.left = randomX + "px";
    rotatingImage.style.top = randomY + "px";
    rotatingImage.style.opacity = "1";
  });

  setTimeout(() => {
    image.style.opacity = "0";

    setTimeout(() => {
      rotatingImage.style.opacity = "0";
      distortion_layer_1.classList.remove("active");

      setTimeout(() => {
        document.body.removeChild(div);
      }, 4 * 1000);
    }, 1 * 1000);
  }, duration);

  // spawn_rotate_image(sub_div, "../assets/particles.png");

  // Apply Shake
  shakeAll(1);
}

export function calculateContainerSize(container) {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  return { width: containerWidth, height: containerHeight };
}

export function simulate_explosion() {}

export function transitionScene(id) {
  console.log("Transition Scene", id);
  switch (id) {
    case "safe":
      bg.src = "../assets/BG_CityOffice_Night_kr.jpg";
      document.getElementById("safe-zone").style.display = "block";
      document.getElementById("danger-zone").style.display = "none";
      break;

    case "danger":
      const x = document.querySelectorAll(".container");
      x.forEach((container) => {
        shake(container, 2);
        rotate(container, Math.floor(Math.random() * 15));
      });
      // shakeAll(2);

      setTimeout(() => {
        overlay.style.opacity = "1";
        overlay.addEventListener("transitionend", function (event) {
          viewport.classList.remove("entering-danger");
          bg.src = "../assets/BG_CityOffice_Ruin_kr.jpg";
          document.getElementById("safe-zone").style.display = "none";
          document.getElementById("danger-zone").style.display = "block";
          overlay.style.opacity = "0";
        });
      }, 1000);
      break;
  }
}

export function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function trigger_effect(id) {
  switch (id) {
    case "heli":
      const heli = document.getElementById("heli");
      heli.classList.add("active");
      setTimeout(() => {
        heli.classList.remove("active");
      }, 5000);
      break;
  }
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
