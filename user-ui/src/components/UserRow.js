import React from "react";

export default function UserRow({
  fullName,
  status,
  gender,
  userName,
  dateOfBirth,
  email,
}) {
  const formatDate = (date) => {
    if (date)
      return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

    return date;
  };

  const changeStatus = (e) => {
    console.log(e);
  };
  return (
    <tr>
      <td>
        <a href={`mailto:${email}`}>{fullName}</a>
      </td>
      <td>{userName}</td>
      <td>{formatDate(dateOfBirth)}</td>
      <td>{gender}</td>
      <td>
        <input
          type="checkbox"
          defaultChecked={status}
          onChange={changeStatus}
        />
      </td>
    </tr>
  );
}
