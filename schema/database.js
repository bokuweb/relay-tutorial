function User(id, name) {
  this.id = id.toString();
  this.name = name;
}

const users = [
  new User(1, 'Ryan'),
  new User(2, 'George')
];

module.exports = {
  User,
  getUser(id) {
    return users.filter(user => user.id == id)[0]; 
  },
}


