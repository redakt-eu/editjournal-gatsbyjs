import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet"

import Layout from "../components/layout";

const SearchPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const search = new URLSearchParams(location.search).get('q');

  return (
    <Layout location={location} title={siteTitle}>
      <h1>Search &ndash; {search}</h1>
      <div id="search-results" data-search={search} data-src={"https://ui.customsearch.ai/api/ux/rendering-js?customConfig="+process.env.GATSBY_BING_CUSTOM_CONFIGURATION_ID+"&market="+process.env.GATSBY_BING_MARKET+"&version=latest&q="+search}></div>
      <Helmet>
        <script defer>
          {`var bingWrapper=document.getElementById('search-results');bingScript=document.createElement('script');bingScript.async=true;bingScript.id='bcs_js_snippet';bingScript.src=bingWrapper.dataset.src;bingWrapper.appendChild(bingScript);`}
        </script>
      </Helmet>
    </Layout>
  );
}

export default SearchPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
