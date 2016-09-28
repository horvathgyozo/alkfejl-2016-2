"use strict";

const fs = require('fs');
const jimp = require('jimp');
const DataStore = require('nedb-promise');
const co = require('co');

const db = new DataStore({
  filename: 'images.nedb',
  autoload: true,
});

function readdir(path) {
  return new Promise(function (resolve, reject) {
    fs.readdir('gyak02/images/', function (err, files) {
      if (err) return reject(err);
      resolve(files);
    });
  });
}

co(function* () {
  try {
    const numRemoved = yield db.remove({}, {multi: true});
    console.log(numRemoved, 'törölve');
    const files = yield readdir('gyak02/images/');
    yield Promise.all(files.map(co.wrap(function* (fileName) {
      const image = yield jimp.read(`gyak02/images/${fileName}`);
      const {width, height} = image.bitmap;
      const insertedImage = yield db.insert({fileName, width, height});
      image.resize(100, jimp.AUTO);
      image.write(`gyak02/converted/${insertedImage._id}.png`);
      console.log(fileName, 'feldolgozva');
    })));
    console.log('VEGE');
  }
  catch (err) {
    console.log(err);
  }
});






    
