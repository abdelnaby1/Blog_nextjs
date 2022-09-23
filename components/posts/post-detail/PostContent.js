import ReactMarkdown from "react-markdown";
import PostHeader from "./PostHeader";
import classes from "./PostContent.module.css";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

function PostContent(props) {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  const cusomeRenderers = {
    img(image) {
      return (
        <Image
          src={`/images/posts/${post.slug}/${image.src}`}
          alt={image.title}
          width={600}
          height={300}
        />
      );
    },
    p(paragraph) {
      const { node } = paragraph;
      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.title}
              width={600}
              height={300}
            />
          </div>
        );
      } else {
        return <p>{paragraph.children}</p>;
      }
    },
    code(code) {
      const { className, children } = code;
      const languageProp = className.split("-");
      const language = languageProp[1];
      return (
        <SyntaxHighlighter language={language} style={a11yDark}>
          {children}
        </SyntaxHighlighter>
      );
    },
  };
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />

      <ReactMarkdown components={cusomeRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
