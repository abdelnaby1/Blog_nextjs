import { Fragment } from "react";
import FeaturedPosts from "../components/home-page/FeaturedPosts";
import { getFeaturedPosts } from "../helpers/posts-util";
import Hero from "../components/home-page/Hero";
import Head from "next/head";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Abdelnaby Blog</title>
        <meta
          name="description"
          content="posts about programming and css topics and web developement"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 600,
  };
}
export default HomePage;
