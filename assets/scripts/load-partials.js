function loadHTML(selector, url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return response.text();
    })
    .then(html => {
      document.querySelector(selector).innerHTML = html;
      const shouldShowCards = document.body.classList.contains('showFooterCards');
      const footerCards = document.querySelector('#footer-cards-wrapper');
      if (footerCards) {
        footerCards.style.display = shouldShowCards ? 'block' : 'none';
      }
    })
    .catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.querySelector("#footer-placeholder");
  if (!placeholder) return;

  const bodyId = document.body.id;
  let url;

  if (bodyId === "home-page") {
    url = "partials/footer.html";
  } else {
    url = "../partials/footer.html";
  }

  loadHTML("#footer-placeholder", url);
});

