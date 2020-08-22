window.addEventListener("load", async () => {
  // Spread the `NodeList` to make it an array.
  const loadEls = [...document.querySelectorAll("load")];
  const templates = await Promise.all(
    loadEls.map(async el => await getTemplate(el))
  );

  templates.forEach((t, idx) => renderTemplate(t, loadEls[idx]));
});

// Extracts a textual template from a `load` element.
// TODO: cache templates here.
async function getTemplate(el) {
  const path = el.getAttribute("path");
  const template = await fetchTemplate(path);
  return template;
}

async function fetchTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`template ${path} not found`);
  return await res.text();
}

function renderTemplate(template, el) {
  el.innerHTML = template;
  replaceParentWithChildren(el);
}

function replaceParentWithChildren(el) {
  el.replaceWith(...el.childNodes);
}
