import api from "./mainController";

const manageUserAPI = ({ manageUser }) => ({
  createUser: api(manageUser, "createUser"),
  updateUser: api(manageUser, "updateUser", ["id"])
});
