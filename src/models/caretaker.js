const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const Cfonts = require('cfonts');
require('colors');

const caretakerSchema = new mongoose.Schema({
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
 * Class to represent a caretaker
 * @class Caretaker
 */
class Caretaker {
  /**
   * Creates an instance of Caretaker
   * @param {string} name
   * @param {string} email
   * @param {string} city
   */
  /*
  constructor(name, email = '', city = '') {
    this.name = name;
    this.city = city;
    this.email = email;

    this.creationDate = new Date();
    this.photo = '';
    this.description = '';
    this.links = [];
    this.socials = [];
    this.acceptsVolunteers = true;
    this.acceptsDonations = true;

    this.animals = [];
    this.posts = [];
  }
  */

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

  get info() {
    Cfonts.say('  - Dashboard -  ', {
      font: 'tiny',
      colors: ['cyan'],
      letterSpacing: 2,
      background: 'black',
    });
    return `
${'Name'.rainbow.bold}: ${this.name.bold.cyan}
${'Animals in care'.rainbow.bold}: ${this.animals.map(animal => `${animal.name}`).join(', ').bold.cyan}
${'Posts'.rainbow.bold} (${String(this.posts.length).bold.cyan}):
${this.posts.map(post => `${'- '.bold.cyan}${post.title}`).join('\n')}
        `;
  }
}

caretakerSchema.loadClass(Caretaker);
caretakerSchema.plugin(autopopulate);

module.exports = mongoose.model('Caretaker', caretakerSchema);
