import { initialize, append_chunk } from "../modules/shared.js";

var n = ["89584206", "83589330", "84877389", "88078117", "92525420"];
var randomIndex = Math.floor(Math.random() * n.length);
var r = n[randomIndex];
var data;

document.addEventListener("DOMContentLoaded", () => {
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

function setup() {
  append_chunk(data, "interests");
  append_chunk(data, "games");
  append_chunk(data, "music");
  append_chunk(data, "socials");

  accurateHeight();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  UnlimitedLoad();
  var heading = document.getElementById("heading");
  heading.classList.add("scale-down");
  heading.addEventListener("transitionend", function (event) {
    heading.classList.add("resolve");
  });
  document.getElementById("secret").onclick = function () {
    alert("You are an AMAZING person!");
  };
  document.getElementById("sources").onclick = function () {
    alert(`(pixiv) credit: \n ${r}`);
  };
}

function UnlimitedLoad() {
  document.getElementById("bg").src = "https://pixiv.cat/11328410.jpg";
  document.getElementById(
    "single_image_real"
  ).src = `https://pixiv.cat/${r}.jpg`;
}

function RateLimitedLoad() {
  if (localStorage.getItem("rc")) {
    var rc = parseInt(localStorage.getItem("rc"));
    if (rc < 2) {
      document.getElementById("bg").src = "https://pixiv.cat/11328410.jpg";
      document.getElementById(
        "single_image_real"
      ).src = `https://pixiv.cat/${r}.jpg`;
    } else {
      console.log("null");
    }
    rc++;
    localStorage.setItem("rc", rc);
  } else {
    var rc = 1;
    document.getElementById("bg").src = "https://pixiv.cat/11328410.jpg";
    document.getElementById(
      "single_image_real"
    ).src = `https://pixiv.cat/${r}.jpg`;
    localStorage.setItem("rc", rc);
  }
}

function accurateHeight() {
  const container1 = document.getElementById("left-container");
  const container2 = document.getElementById("right-container");
  const maxHeight = Math.max(container1.clientHeight, container2.clientHeight);
  container1.style.height = maxHeight + "px";
  container2.style.height = maxHeight + "px";
}
