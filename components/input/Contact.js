import React, { useState, useEffect } from "react";
import classes from "./Contact.module.css";
import Notification from "../ui/Notification";
function Contact() {
  const [info, setInfo] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [reqStatus, setReqStatus] = useState();
  const [reqError, setReqError] = useState();

  //   const [name, setName] = useState();
  //   const [message, setMessage] = useState();
  const changeHandler = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setReqStatus("pending");

    try {
      const res = await fetch(`/api/contact`, {
        method: "POST",
        body: JSON.stringify({ ...info }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went Wrong!");
      }
      setReqStatus("success");
      setInfo({ email: "", name: "", message: "" });
    } catch (error) {
      setReqError(error.message);
      setReqStatus("error");
    }
  };
  let notification;
  if (reqStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }
  if (reqStatus === "success") {
    notification = {
      status: "success",
      title: "Success",
      message: "Your message sent successfully!",
    };
  }
  if (reqStatus === "error") {
    notification = {
      status: "error",
      title: "Error",
      message: reqError,
    };
  }
  useEffect(() => {
    if (reqStatus === "success" || reqStatus === "error") {
      const timer = setTimeout(() => {
        setReqStatus(null);
        setReqError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [reqStatus]);
  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              value={info.email}
              onChange={changeHandler}
              name="email"
              type="email"
              id="email"
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              value={info.name}
              onChange={changeHandler}
              name="name"
              type="text"
              id="name"
              required
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            value={info.message}
            onChange={changeHandler}
            id="message"
            rows={5}
            name="message"
            required
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default Contact;
