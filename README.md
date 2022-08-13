# Netflix Home

Example nextflix home page using standard web APIs

# Start

- Install dependencies `npm i`
- Run the local server `npm start`

# How to handle a huge list without virtualization technique?

Using the new CSS property **content-visibility** and **contain-intrinsic-size**

This helps with both load and interactions on the page, since the content outside of the viewport is not rendered

Example

```json
.row-videos {
  margin: 10px 0;
  display: grid;
  content-visibility: auto;
  contain-intrinsic-size: 1px 400px;
}
```

# Why use web-components?

Web components is an standand in web development allows to reuse the components similar to React.js, Angular or Vue, instead using a framework
this solution is agnostic.

For large projects I recommend using Lit https://lit.dev/ is easy for react developers same life cycle, reactive to props

# What is your solution for handle a lot of images without using a library?

Using the loading property in the image tag, loading="lazy" for new browsers, if the browser is old you need to apply a polyfill to support this solution

``<img loading="lazy" importance="low" class="billboard-metadata-logo" alt="logo" />``

# How to avoid colission between components?

Using web-components it's allows to encapsulate the CSS using the shadow DOM, using the Element.attachShadow() allows to open or close

# How to avoid renders and reflow when attach nodes in DOM?

If you need to iterate for example in a forEach and create new elements, one solution is use a DocumentFragment, this allows
to store the elements in memory, because the document fragment is not part of the currrent document

``const fragment = new DocumentFragment();``

