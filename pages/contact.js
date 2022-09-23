import Head from "next/head";
import React, { Fragment } from "react";
import Contact from "../components/input/Contact";

function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>Contact Me</title>
        <meta name="description" content="send me a message" />
      </Head>
      <Contact />
    </Fragment>
  );
}

export default ContactPage;
