export const getUserById = (allUsers, id) => {
  return allUsers.filter((user) => user.uid === id)[0];
};
