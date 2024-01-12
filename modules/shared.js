export function initialize() {
  return new Promise((resolve, reject) => {
    fetch("../index.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error`);
        }
        return response.json();
      })
      .then((initializedData) => {
        console.log(initializedData);
        resolve(initializedData); // Good
      })
      .catch((error) => {
        console.error(error);
        reject(error); // Bad
      });
  });
}

export function json_get(category, index) {
  if (data[category] && data[category][index]) {
    return {
      display: data[category][index]["display"],
      url: data[category][index]["url"],
    };
  } else {
    return null;
  }
}

export function append_chunk(data, id) {
  const block = data[id];
  if (block && block.length > 0) {
    const list = document.createElement("ul");
    list.classList.add("bulletless-list");

    block.forEach((interest) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");

      link.textContent = interest.display;

      if (interest.url) {
        list.classList.add("hyperlinks", "socials");
        link.href = interest.url;

        listItem.addEventListener("click", () => {
          link.click();
        });
      }

      listItem.appendChild(link);
      list.appendChild(listItem);
    });
    const container = document.getElementById(id);
    container.appendChild(list);
  }
}
