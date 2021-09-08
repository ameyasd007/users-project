import React from "react";
import UserForm from "../components/UserForm";

export default function UserPage(props) {
  return (
    <div style={{ marginTop: "100px" }}>
      <UserForm {...props}></UserForm>
    </div>
  );
}
