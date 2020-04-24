class User {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    // access:
    // viewer - not allowed to edit anything, cannot view users
    // tournament admin - edit everything except users
    // tournament owner - admin + able to delete/add tournament + delete/add admins
  }
}

module.exports = User;
