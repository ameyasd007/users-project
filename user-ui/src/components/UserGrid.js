import React, { useEffect } from "react";
import { getUsers } from "../services/UserService";

export default function UserGrid() {
  useEffect(() => {
    let fetchUsers = async () => {
      let users = await getUsers();
      console.log(users);
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <p>Grid here</p>
    </div>
  );
}
