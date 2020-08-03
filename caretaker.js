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
  constructor(name, email, city) {
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
    this.animals.push(new Animal(...animal));
  }

  /**
   * Add new post to posts list
   * @param {Object} post
   */
  addPost(post) {
    this.posts.push(new Post(...post));
  }
}

