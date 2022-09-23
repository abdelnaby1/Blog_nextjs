import Head from "next/head";
import { Fragment } from "react";
import PostContent from "../../components/posts/post-detail/PostContent";
import { getPostData, getPostsFiles } from "../../helpers/posts-util";
function SinglePostPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const fileNames = getPostsFiles();
  const slugs = fileNames.map((fileName) => fileName.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);
  return {
    props: {
      post: postData,
    },
    revalidate: 1800,
  };
  console.log(params);
}

export default SinglePostPage;
