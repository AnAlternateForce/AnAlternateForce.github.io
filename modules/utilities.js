export function isMobileDevice() {
  return window.innerWidth <= 768;
}

export function accurateHeight(elem1, elem2) {
  const container1 = document.getElementById("left-container");
  const container2 = document.getElementById("right-container");
  const maxHeight = Math.max(container1.clientHeight, container2.clientHeight);
  container1.style.height = maxHeight + "px";
  container2.style.height = maxHeight + "px";
}
