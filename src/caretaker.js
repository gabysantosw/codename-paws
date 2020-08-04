const Cfonts = require('cfonts');

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
${this.name}
Animals in care: ${this.animals.map(animal => `${animal.name}`).join(', ')}
Posts (${this.posts.length}):
${this.posts.map(post => `- ${post.title}`).join('\n')}
        `;
  }
}

module.exports = Caretaker;
