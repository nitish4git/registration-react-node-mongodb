import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const App = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(userDetails)
  };

  // Sending Data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/", userDetails);
      console.log("user created", res.data);
      alert("successfully created");
      setUserDetails({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.log("There is some issse", error);
      alert("failed");
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>User Registration form</h1>
      </div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="inputFields">
          <div className="inputRow">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="enter your name"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
            />
          </div>
          <div className="inputRow">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="enter your email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
            />
          </div>
          <div className="inputRow">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              placeholder="enter your phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
            />
          </div>
          <div className="inputRow">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              placeholder="enter your address"
              name="address"
              value={userDetails.address}
              onChange={handleChange}
            />
          </div>
          <input type="submit" className="button" />
        </div>
      </form>
    </div>
  );
};

export default App;
