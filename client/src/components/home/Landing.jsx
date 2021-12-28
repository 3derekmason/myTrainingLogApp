import React, { useState } from "react";

const Landing = () => {
  const defaultValues = {
    username: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(defaultValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: formValues.username,
      password: formValues.password,
    };
    setFormValues(defaultValues);
    fetch("http:localhost:1703/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div>TRAINING LOG APP</div>
      <form>
        <label>
          Choose a Username:
          <input type="text" name="username" />
        </label>
        <label>
          Choose a Password:
          <input type="text" name="password" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Landing;
