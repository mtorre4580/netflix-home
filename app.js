export function render(data) {
  // Destructuring the payload for handle
  const { rows, billboards, videos } = data;

  // Create the main element to attach all the rows and boxshots
  const main = document.createElement("main");

  // Add the class for CSS
  main.classList.add("gallery");

  // Check if has any videos to render...
  if (videos.length > 0) {
    // hash with all the movies for access via "id"
    const videosMap = getMap(videos, "id");

    // hash with all the billboards for access via "row"
    const billboardsMap = getMap(billboards, "row");

    // Iterate each row and render the billboard or videos
    rows.forEach((row, indexRow) => {
      const billboard = billboardsMap[indexRow] || null;
      // Check if the videos is a billboard
      if (billboard) {
        const billboardRow = createRowBillboard(billboard, videosMap[row]);
        main.appendChild(billboardRow);
      } else {
        const videosRow = createRowVideos({
          array: row,
          videos: videosMap,
        });
        main.appendChild(videosRow);
      }
    });

    // Apply all the rows only 1 reflow
    document.body.appendChild(main);
  }
}

/**
 * Create a hashmap for easy access constant-time O(1)
 * @param {array} array
 * @param {string} key
 * @returns Object
 */
function getMap(array, key) {
  return array.reduce((hash, object) => {
    const { [key]: test, ...props } = object;
    hash[test] = props;
    return hash;
  }, {});
}

/**
 * Create a row with <video-component /> dynamic columns and rows
 * @param {object}
 * @returns HTMLElement
 */
function createRowVideos({
  array = [],
  videos = {},
  columnsSize = "1fr",
}) {
  const row = document.createElement("div");

  // Add the class for CSS
  row.classList.add("row-videos");

  // Add the style to dynamic rows and columns (1 reflow style recalc)
  row.style = `grid-template-columns: repeat(auto-fill, minmax(253px, 1fr)); grid-template-rows: ${columnsSize}`;

  // Create the component <video-component />
  const videoComponent = document.createElement("video-component");

  // Iterate to create the row with the videos
  array.forEach((id) => {
    const video = videos[id] || null;
    // Validate if the video exists
    if (video) {
      const { boxart, title } = video;
      // better performance than "createElement"
      let cloneComponent = videoComponent.cloneNode(true);
      cloneComponent.setAttribute("boxart", boxart);
      cloneComponent.setAttribute("title", title);
      row.appendChild(cloneComponent);
    } else {
      console.warn(`Not exist's the current id for the video ${id}`);
    }
  });

  return row;
}

/**
 * Create a billboard component <billboard-component />
 * @param {object} billboard
 * @param {object} video
 * @returns HTMLElement
 */
function createRowBillboard(billboard, video) {
  const { type, buttons } = billboard || {};
  const { synopsis, logo } = video || {};

  const typesBackground = {
    header: "background",
    inline: "backgroundShort",
  };

  const billboardComponent = document.createElement("billboard-component");

  // check if has synopsis to avoid render the element
  if (synopsis) billboardComponent.setAttribute("synopsis", synopsis);

  billboardComponent.setAttribute("background", video[typesBackground[type]]);
  billboardComponent.setAttribute("logo", logo);
  billboardComponent.setAttribute("buttons", JSON.stringify(buttons));
  billboardComponent.setAttribute("type", type);

  return billboardComponent;
}
