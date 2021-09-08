import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { getUser, createUser, updateUser } from "../services/UserService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const dateFormatter = (date) =>
  new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function UserForm(props) {
  const id = new URLSearchParams(window.location.search).get("id");
  const { register, handleSubmit, control, reset } = useForm();

  useEffect(() => {
    const fetchUserDataForEditing = async () => {
      if (!id) return;
      let response = await getUser(id);
      if (response.status === 200) {
        let userData = await response.json();
        reset({ ...userData, datofBirth: dateFormatter(userData.dateOfBirth) });
      }
    };

    fetchUserDataForEditing();
  }, [id, reset]);

  const onSubmit = async (data) => {
    console.log(data);
    let response;
    if (id) {
      response = await updateUser(id, data);
    } else {
      response = await createUser({
        ...data,
        id: 0,
        dateOfBirth: new Date(data.dateOfBirth),
      });
    }

    if (response.status >= 200 && response.status <= 299) {
      reset();
      alert("User Created");
    } else {
      let errorMessage = await response.json();
      console.log(errorMessage);
      alert(JSON.stringify(errorMessage));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          Full Name:
          <input type="text" {...register("fullName")} />
        </div>
        <div>
          Email:
          <input type="text" {...register("email")} />
        </div>
        <div>
          Password:
          <input type="Password" {...register("password")} />
        </div>
        <div>
          Username:
          <input type="text" {...register("userName")} />
        </div>
        <div>
          Date of Birth:
          <Controller
            control={control}
            name="dateOfBirth"
            render={(props) => (
              <DatePicker
                dateFormat="Pp"
                value={props.field.value}
                onChange={(date) => {
                  console.log(date);
                  props.field.onChange(date.toString());
                }}
              />
            )}
          />
        </div>
        <div>
          Gender:
          <select {...register("gender")}>
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
        <div>
          <input type="text" hidden {...register("id")} />
        </div>
        <br></br>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}
