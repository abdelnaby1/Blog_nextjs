import Head from "next/head";
import { Fragment } from "react";
import AllPosts from "../../components/posts/AllPosts";
import { getAllPosts } from "../../helpers/posts-util";

function AllPostsPage(props) {
  // console.log(props.posts);
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="all posts i wrot about css topics and programming"
        />
      </Head>
      <AllPosts posts={props.posts} />;
    </Fragment>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts,
    },
    revalidate: 1800,
  };
}
export default AllPostsPage;
