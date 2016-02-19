function User(id, name) {
  this.id = id.toString();
  this.name = name;
}

const users = [
  new User(1, 'Hoge'),
  new User(2, 'Fuga')
];

module.exports = {
  User,
  getUser: (id) => users.filter(user => user.id == id)[0],
}


