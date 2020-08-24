const Caretaker = require('./caretaker');
const Animal = require('./animal');
const Post = require('./post');

const gaby = new Caretaker('Gaby');
gaby.addAnimal(new Animal('Luke'));
gaby.addAnimal(new Animal('Brownie'));
gaby.addPost(new Post('Awwww'));
gaby.addPost(new Post('Update'));
gaby.addPost(new Post('Look at this!'));

console.log(gaby.info);
