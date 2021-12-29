import React, { useState } from "react";

const Landing = () => {
  const defaultValues = {
    username: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: formValues.username,
      password: formValues.password,
    };
    setFormValues(defaultValues);
    fetch("/users", {
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
      <form onSubmit={handleSubmit}>
        <label>
          Choose a Username:
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Choose a Password:
          <input
            type="text"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Landing;
