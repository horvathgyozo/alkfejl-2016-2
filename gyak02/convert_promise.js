"use strict";

const fs = require('fs');
const jimp = require('jimp');
const DataStore = require('nedb-promise');

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

function processFile(fileName) {
  let theImage;
  return jimp.read(`gyak02/images/${fileName}qqq`)
    .then(function (image) {
      theImage = image;
      const {width, height} = image.bitmap;
      return db.insert({fileName, width, height});
    })
    .then(function (insertedImage) {
      theImage.resize(100, jimp.AUTO);
      return theImage.write(`gyak02/converted/${insertedImage._id}.png`);
    })
    .then(function () {
      console.log(fileName, 'feldolgozva');
    })
    // .catch(function (err) {
    //   console.log(err);
    // })
}

db.remove({}, {multi: true})
  .then(function (numRemoved) {
    console.log(numRemoved, 'törölve');
    return;
  })
  .then(function () {
    return readdir('gyak02/images/')
  })
  .then(function (files) {
    return Promise.all(files.map(processFile))
  })
  .then(function () {
    console.log('VEGE');
  })
  .catch(function (err) {
    console.log(err);
  });





    
