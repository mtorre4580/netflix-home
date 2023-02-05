export function render(data) {
  const { rows, billboards, videos } = data;

  const main = document.createElement("main");

  main.classList.add("gallery");

  if (videos.length > 0) {
    const videosMap = getMap(videos, "id");

    const billboardsMap = getMap(billboards, "row");

    rows.forEach((row, indexRow) => {
      const billboard = billboardsMap[indexRow] || null;
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

  row.classList.add("row-videos");

  row.style = `grid-template-columns: repeat(auto-fill, minmax(253px, 1fr)); grid-template-rows: ${columnsSize}`;

  const videoComponent = document.createElement("video-component");

  array.forEach((id) => {
    const video = videos[id] || null;
    if (video) {
      const { boxart, title } = video;
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

  if (synopsis) billboardComponent.setAttribute("synopsis", synopsis);

  billboardComponent.setAttribute("background", video[typesBackground[type]]);
  billboardComponent.setAttribute("logo", logo);
  billboardComponent.setAttribute("buttons", JSON.stringify(buttons));
  billboardComponent.setAttribute("type", type);

  return billboardComponent;
}
