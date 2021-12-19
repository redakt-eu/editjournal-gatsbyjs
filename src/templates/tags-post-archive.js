import React from "react";
import { Link } from "gatsby";
import parse from "html-react-parser";

import Layout from "../components/layout";
import Seo from "../components/seo";

const TagsIndex = ({
  data,
  pageContext,
}) => {
  // Extract tag info
  const tag = pageContext.tag;
  // Extract tag connected posts for displaying in tags archive page
  const posts = pageContext.tagPosts;
  // Handling pagination links
  const nextPagePath = pageContext.nextPagePath;
  const previousPagePath = pageContext.previousPagePath;

  return (
    <Layout isHomePage>
      <Seo title={`Tag: ${tag.name}`} />

      <h2>Tag: {tag.name}</h2>

      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.node.title;

          return (
          <li key={post.node.uri}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.node.uri} itemProp="url">
                      <span itemProp="headline">{parse(title)}</span>
                    </Link>
                  </h2>
                  <small>{post.node.date}</small>
                  <p className="tags">{post.node.tags.nodes.map(tag => {
                    return (
                      <Link to={tag.uri} itemProp="url" key={tag.id}>
                        <span>{tag.slug}</span>
                      </Link>
                    )
                  })}</p>
                </header>
                <section itemProp="description">{parse(post.node.excerpt)}</section>
              </article>
            </li>
          )
        })}
      </ol>

      {previousPagePath && (
        <>
          <Link to={previousPagePath}>Previous page</Link>
          <br />
        </>
      )}
      {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
    </Layout>
  )
}

export default TagsIndex;