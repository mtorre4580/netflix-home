export default class VideoComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.createTemplate().content.cloneNode(true));
  }

  createTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <link rel="stylesheet" href="/components/video/video-style.css">
      <img loading="lazy" importance="low" class="boxshot" />
    `;
    return template;
  }

  static get observedAttributes() {
    return ["boxart", "title"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue != newValue) {
      if (attrName === "boxart") {
        this.shadowRoot.querySelector(".boxshot").src = newValue;
      }
      if (attrName === "title") {
        this.shadowRoot.querySelector(".boxshot").alt = newValue;
      }
    }
  }
}
