import Image from "next/image";
import classes from "./Hero.module.css";
function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/myImage.jpg"
          alt="my Image"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I am Abdelnaby</h1>
      <p>I blog about web development and some topics in Computer Science </p>
    </section>
  );
}

export default Hero;
