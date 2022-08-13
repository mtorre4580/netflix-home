export default class LinkComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.createTemplate().content.cloneNode(true));
  }

  createTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="/netflix-home/components/link/link-style.css">
      <a class="billboard-metadata-button" role="button"></a>
    `;
    return template;
  }

  static get observedAttributes() {
    return ["type", "text"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue != newValue) {
      if (attrName === "text") {
        this.shadowRoot.querySelector(
          ".billboard-metadata-button"
        ).textContent = newValue;
      }
      if (attrName === "type" && newValue === "play") {
        this.shadowRoot
          .querySelector(".billboard-metadata-button")
          .classList.add("billboard-metadata-button-play");
      }
    }
  }
}
