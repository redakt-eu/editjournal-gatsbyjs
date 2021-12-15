import React from "react";
import { Link, graphql } from "gatsby";
import parse from "html-react-parser";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";

const TagsIndex = ({
  data,
  pageContext,
}) => {
  // const posts = data.allWpPost.nodes;
  const tag = pageContext.tag;

  return (
    <Layout isHomePage>
      <Seo title={`Tag: ${tag.name}`} />

      <h2>Tag: {tag.name}</h2>

      <ol>
        <li>
          <article
            className="post-list-item"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header>
              <h2>
                <Link to={'/'} itemProp="url">
                  <span itemProp="headline">Title</span>
                </Link>
              </h2>
              <small>date</small>
              <p className="tags">
                <span>tag</span>
                <span>tag</span>
              </p>
            </header>
            <section itemProp="description">Excerpt ...</section>
          </article>
        </li>
      </ol>

      {/*<ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title;

          return (
            <li key={post.uri}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.uri} itemProp="url">
                      <span itemProp="headline">{parse(title)}</span>
                    </Link>
                  </h2>
                  <small>{post.date}</small>
                  <p class="tags">{post.tags.nodes.map(tag => {
                    return (
                      <span>{tag.name}</span>
                    )
                  })}</p>
                </header>
                <section itemProp="description">{parse(post.excerpt)}</section>
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
      {nextPagePath && <Link to={nextPagePath}>Next page</Link>} */}
    </Layout>
  )
}

export default TagsIndex;