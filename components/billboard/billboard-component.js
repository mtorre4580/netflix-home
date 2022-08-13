export default class BillboardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.createTemplate().content.cloneNode(true));
    this.observer = null;
  }

  createTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
       <link rel="stylesheet" href="/netflix-home/components/billboard/billboard-style.css">
        <section class="row-billboard">
          <img loading="lazy" importance="high" class="billboard-background" />
          <article class="billboard-metadata">
            <img loading="lazy" importance="low" class="billboard-metadata-logo" alt="logo" />
          </article>
        </section>
    `;
    return template;
  }

  static get observedAttributes() {
    return ["logo", "synopsis", "background", "title", "buttons", "type"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue != newValue) {
      if (attrName === "logo") {
        this.shadowRoot.querySelector(".billboard-metadata-logo").src =
          newValue;
      }
      if (attrName === "background") {
        this.shadowRoot.querySelector(".billboard-background").src = newValue;
      }
      if (attrName === "title") {
        this.shadowRoot.querySelector(".billboard-background").alt = newValue;
      }
      if (attrName === "synopsis") {
        const paragraph = document.createElement("p");
        paragraph.classList.add("billboard-metadata-synopsis");
        paragraph.textContent = newValue;
        this.shadowRoot
          .querySelector(".billboard-metadata")
          .appendChild(paragraph);
      }
      if (attrName === "buttons") {
        this.createButtons(JSON.parse(newValue));
      }
      if (attrName === "type" && newValue === "inline") {
        this.shadowRoot
          .querySelector(".row-billboard")
          .classList.add("row-billboard-inline");
        this.shadowRoot
          .querySelector(".billboard-metadata")
          .classList.add("hidden");
      }
    }
  }

  connectedCallback() {
    if (this.getAttribute("type") === "inline") {
      this.applyAnimation();
    }
  }

  disconnectedCallback() {
    // remove the observer if exists
    this.observer?.disconnect();
  }

  applyAnimation() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const inline = entry.target.querySelector(".billboard-metadata");
        if (entry.isIntersecting) {
          inline.classList.remove("hidden");
          return;
        }
      });
    });
    const list = this.shadowRoot.querySelectorAll(".row-billboard-inline");
    list.forEach((element) => {
      this.observer.observe(element);
    });
  }

  createButtons(buttons) {
    const fragment = document.createDocumentFragment();

    buttons.forEach((button) => {
      const linkComponent = document.createElement("link-component");
      linkComponent.setAttribute("type", button.type);
      linkComponent.setAttribute("text", button.text);
      fragment.appendChild(linkComponent);
    });

    this.shadowRoot.querySelector(".billboard-metadata").appendChild(fragment);
  }
}
