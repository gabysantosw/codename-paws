/**
 * Class to represent a post
 * @class Post
 */
class Post {
  /**
   * Creates an instance of Post
   * @param {string} title
   * @param {string} photo
   * @param {string} content
   * @param {Array} animals
   * @param {Array} tags
   */
  constructor(title, photo = '', content = '', animals = [], tags = []) {
    this.title = title;
    this.photo = photo;
    this.content = content;
    this.tags = tags;
    this.animals = animals;
    this.creationDate = new Date();
  }
}

module.exports = Post;
