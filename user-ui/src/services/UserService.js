const getUser = async (id) => {
  return await fetch(`https://localhost:5001/User/${id}`);
};

const getUsers = async () => {
  let response = await fetch("https://localhost:5001/User");
  return await response.json();
};

const createUser = async (user) => {
  return await fetch(`https://localhost:5001/User`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const updateUser = async (id, user) => {
  return await fetch(`https://localhost:5001/User/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

export { getUser, getUsers, updateUser, createUser };
