import React, { useEffect, useState } from "react";
import { getUsers } from "../services/UserService";
import UserRow from "./UserRow";

export default function UserTable() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    let fetchUsers = async () => {
      let users = await getUsers();
      setUserData(users);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Date of birth</th>
            <th>Gender</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <UserRow {...user} key={user.id}></UserRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
