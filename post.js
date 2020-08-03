/**
 * Class to represent a post
 * @class Post
 */
class Post {
  /**
   * Creates an instance of Post
   * @param {string} photo
   * @param {string} title
   * @param {string} content
   * @param {Array} animals
   * @param {Array} tags
   */
  constructor(photo, title, content, animals, tags) {
    this.photo = photo;
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.animals = animals;
    this.creationDate = new Date();
  }
}
