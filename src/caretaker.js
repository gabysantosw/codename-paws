const Cfonts = require('cfonts');
require('colors');

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
  constructor(name, email = '', city = '') {
    this.name = name;
    this.email = email;
    this.city = city;

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

  /**
   * Add a new animal to animals list
   * @param {Object} animal
   */
  addAnimal(animal) {
    this.animals.push(animal);
  }

  /**
   * Add new post to posts list
   * @param {Object} post
   */
  addPost(post) {
    this.posts.push(post);
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

module.exports = Caretaker;
