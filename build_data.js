var emojiData = require('emoji-datasource-google');
var fs = require('fs');

const filtered = emojiData.filter(emoji => emoji.has_img_google === true);

var key = `has_img_google`;

const data = [];
data.images = [];

filtered.map((e, i) => {
  if (e[key]) {
    data.push({
      name: e.name,
      unified: e.unified,
      category: e.category,
      images: [
        `require('./node_modules/emoji-datasource-google/img/google/64/${e.image}')`,
      ],
    });
  }

  if (e.skin_variations) {
    Object.values(e.skin_variations).map(tone => {
      if (tone[key]) {
        (data[i].skin_variations = true),
          data[i].images.push(
            `require('./node_modules/emoji-datasource-google/img/google/64/${tone.image}')`,
          );
      }
    });
  }
});

// console.log(data);

// const newData = filtered.map(e => ({
//   name: e.name,
//   category: e.category,
//   unified: e.unified,
//   image: `require('./node_modules/emoji-datasource-google/img/google/64/${e.image}')`,
//   skin_variations: e.skin_variations || null,
// }));

var stringified = JSON.stringify(data)
  .replace(/\"([A-Za-z_]+)\":/g, '$1:')
  .replace(/(["'])require(?:(?=(\\?))\2.)*?\1/g, value =>
    value.replace(/"/g, ''),
  );

fs.writeFile('google.js', `export const emojis = ${stringified}`, err => {
  if (err) throw err;
});
