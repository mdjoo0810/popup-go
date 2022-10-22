import React from "react"
import { graphql } from "gatsby"
import Seo from "../components/SEO"
import BlogItem from "../components/BlogItem"
import styled from "styled-components"
import Layout from "../components/Layout"

import Banner_1 from "../images/banner1.png"

const Banners = styled.div`
  margin-bottom: 16px;
  width: 100%;
  > a {
    width: 100%;
    img {
      width: 100%;
      transition: transform var(--transSlow) ease !important;
      border-radius: 8px;
      // opacity: 1;
    }
  }
`

const HomePage = ({ data }) => {
  const { BlogPostQuery } = data
  
  const moveBannerDetail = () => {
    window.moveToDetail.postMessage(`https://humble-relative-ce7.notion.site/1-a2598ea9e66d4c12abe007a90d8fa818,비건트립과 함께해요`)
  }

  return (
    <>
      <Seo />
      <Layout>
        <Banners>
          <a onClick={moveBannerDetail}>
            <img src={Banner_1}/>
          </a>
        </Banners>
        {BlogPostQuery.edges.map(({ node }, index) => (
          <BlogItem nodeObj={node} index={index} />
        ))}
      </Layout>
    </>
  )
}

export default HomePage

export const query = graphql`
  {
    BlogPostQuery: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            description
            date(formatString: "MMMM DD, YY")
            path
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  layout: FULL_WIDTH
                  placeholder: TRACED_SVG
                  formats: [AUTO, WEBP]
                )
              }
            }
            featuredImageAlt
          }
          excerpt
        }
      }
    }
  }
`
