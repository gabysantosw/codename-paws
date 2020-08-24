const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

/**
 * Class to represent an animal
 * @class Animal
 */
// class Animal {
//   /**
//    *Creates an instance of Animal
//    * @param {string} name
//    * @param {string} photo
//    * @param {string} description
//    * @param {Boolean} isAdoptable
//    */
//   constructor(name, photo = '', description = '', isAdoptable = true) {
//     this.name = name;
//     this.photo = photo;
//     this.description = description;
//     this.isAdoptable = isAdoptable;
//     this.isAdopted = false;
//     this.postIncludedIn = [];
//   }
// }

module.exports = mongoose.model('Animal', animalSchema);
