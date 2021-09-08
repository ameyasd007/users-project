import React, { useState } from "react";
import { updateUser } from "../services/UserService";

export default function UserRow(props) {
  const [status, setStatus] = useState(props.status);
  const formatDate = (date) => {
    if (date)
      return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

    return date;
  };

  const changeStatus = async (e) => {
    let response = await updateUser(props.id, {
      ...props,
      status: !status,
    });

    if (response.status === 200) {
      let user = await response.json();
      setStatus(user.status);
    } else {
      let error = await response.json();
      console.log(error);
    }
  };

  return (
    <tr>
      <td>
        <a href={`mailto:${props.email}`}>{props.fullName}</a>
      </td>
      <td>{props.userName}</td>
      <td>{formatDate(props.dateOfBirth)}</td>
      <td>{props.gender}</td>
      <td>
        <input type="checkbox" checked={status} onChange={changeStatus} />
      </td>
      <td>
        <a href={`/user?id=${props.id}`}>Edit</a>
      </td>
    </tr>
  );
}
