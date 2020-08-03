/**
 * Class to represent an animal
 * @class Animal
 */
class Animal {
  /**
   *Creates an instance of Animal
   * @param {string} name
   * @param {string} photo
   * @param {string} description
   * @param {Boolean} isAdoptable
   * @param {Boolean} adoptionStatus
   */
  constructor(name, photo, description, isAdoptable, adoptionStatus) {
    this.name = name;
    this.photo = photo;
    this.description = description;
    this.isAdoptable = isAdoptable;
    this.adoptionStatus = false;
    this.postIncludedIn = []
  }
}
