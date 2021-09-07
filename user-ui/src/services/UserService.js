const getUsers = async () => {
  let response = await fetch("https://localhost:5001/User");
  return await response.json();
};

export { getUsers };
