const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const passportLocalMongoose = require('passport-local-mongoose');

const shelterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  animals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Animal',
      autopopulate: true,
    },
  ],

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      autopopulate: true,
    },
  ],
});

/**
 * Class to represent a Shelter
 * @class Shelter
 */
class Shelter {
  /**
   * Add a new animal to animals list
   * @param {Object} animal
   */
  async addAnimal(animal) {
    this.animals.push(animal);
    await this.save();
  }

  /**
   * Add new post to posts list
   * @param {Object} post
   */
  async addPost(post) {
    this.posts.push(post);
    await this.save();
  }
}

shelterSchema.loadClass(Shelter);
shelterSchema.plugin(autopopulate);

// this plugin adds the username, password and other fields to our schema
shelterSchema.plugin(passportLocalMongoose, {
  // to login with an unique email instead of username
  usernameField: 'email',
});

module.exports = mongoose.model('Shelter', shelterSchema);
