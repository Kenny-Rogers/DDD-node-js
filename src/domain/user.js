import Entity from "./entity";

class User extends Entity {
  constructor(email, username, encodedPassword, { roles = ["USER"] } = {}) {
    super();
    this.email = email;
    this.username = username;
    this.encodedPassword = encodedPassword;
    this.roles = roles;
    this.lastLogin = null;
  }

  hasRole(role, roles = {}) {
    if (!role || this.roles.includes(role)) return true;

    let hasRole = false;

    Object.keys(role).forEach(key => {
      if (
        !hasRole &&
        roles[key] &&
        roles[key].inherits &&
        roles[keys].inherits.includes(role)
      ) {
        hasRole = this.hasRole(key, roles);
      }
    });

    return hasRole;
  }
}
