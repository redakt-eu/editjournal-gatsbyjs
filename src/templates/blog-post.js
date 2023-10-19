import React from "react"
import { Link, graphql } from "gatsby"
// import Image from "gatsby-image"
import { GatsbyImage } from 'gatsby-plugin-image';
import parse from "html-react-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"

var md = require('markdown-it')({
    breaks: process.env.MARKDOWNIT_BREAKS
        ? process.env.MARKDOWNIT_BREAKS.toLowerCase() === 'true' : true,
    html: process.env.MARKDOWNIT_HTML
        ? process.env.MARKDOWNIT_HTML.toLowerCase() === 'true' : true,
    linkify: process.env.MARKDOWNIT_LINKIFY
        ? process.env.MARKDOWNIT_LINKIFY.toLowerCase() === 'true' : true,
    typographer: process.env.MARKDOWNIT_TYPOGRAPHER
        ? process.env.MARKDOWNIT_TYPOGRAPHER.toLowerCase() === 'true' : true
});

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: post.featuredImage?.node?.alt || ``,
  }

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} />

      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{parse(post.title)}</h1>
          <p>{post.excerpt}</p>

          <p>{post.date}</p>

          <p className="tags">{post.tags.nodes.map(tag => {
            return (
              <Link to={tag.uri} itemProp="url" key={tag.id}>
                <span>{tag.slug}</span>
              </Link>
            )
          })}</p>

          {/* if we have a featured image for this post let's display it */}
          {featuredImage?.fluid && (
            <GatsbyImage
              fluid={featuredImage.fluid}
              alt={featuredImage.alt}
              style={{ marginBottom: 50 }}
            />
          )}
        </header>

        {!!post.content && (
          <section itemProp="articleBody">{parse(md.render(post.content))}</section>
        )}
        <hr />
      </article>

      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.uri} rel="prev">
                ← {parse(previous.title)}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link to={next.uri} rel="next">
                {parse(next.title)} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current post by id
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")
      tags {
        nodes {
          id
          slug
          uri
          link
        }
      }

      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }

    # this gets us the previous post by id (if it exists)
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }

    # this gets us the next post by id (if it exists)
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
