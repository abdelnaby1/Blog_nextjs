import Link from "next/link";
import Logo from "./Logo";
import classes from "./MainNavigation.module.css";
function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <nav className={classes.nav}>
        <ul className={classes.ul}>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/podcasts">Podcasts</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className={classes.auth}>
        <Link href="/login">Login</Link>
        <Link href="/login">Register</Link>
      </div>
    </header>
  );
}

export default MainNavigation;
