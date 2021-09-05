const getUsers = async () => {
  let response = await fetch("https://localhost:5001/User");
  console.log(response);
  return await response.json();
};

export { getUsers };
