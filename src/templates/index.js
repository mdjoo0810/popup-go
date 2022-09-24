import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../layouts/layout';
import RecipeCards from '../sections/RecipeCards';
// import RecipeFeaturedCard from '../components/RecipeFeaturedCard';

const IndexPage = ({ data, pageContext }) => {
    const popups = data.allPopup.nodes;
    const popupMap = {};

    let now = new Date();
    let date = new Date(now.setMonth(now.getMonth()+1));
    for (let index = 1; index <= 6; index++) {
        const month = date.getMonth() + 1
        const key = `${date.getFullYear()}.${month >= 10 ? month : '0' + month}`
        popupMap[key] = []
        
        var newDate = new Date(date.setMonth(date.getMonth()-1));
        date = newDate
    }

    popups.forEach(ele => {
        const startMonth = Date.parse(`${ele.start_date.split("-")[0]}-${ele.start_date.split("-")[1]}-01`);
        const endMonth = Date.parse(`${ele.end_date.split("-")[0]}-${ele.end_date.split("-")[1]}-01`);
        
        Object.keys(popupMap).forEach(pm => {
            const year = pm.split(".")[0];
            const month = pm.split(".")[1];

            const s = Date.parse(`${year}-${month}-01`)
            if (startMonth <= s && endMonth >= s) {
                popupMap[pm].push(ele);
            }
        })
        
    });
    
    return (
        <Layout additionalClass={['bg-light-gray']}>
            <Helmet>
                <title>{data.site.siteMetadata.title}</title>
                <meta
                    name="description"
                    content={data.site.siteMetadata.description}
                />
            </Helmet>
            {Object.keys(popupMap).map((ele, index) => {
                if (popupMap[ele].length === 0) return
                return <RecipeCards popups={popupMap[ele]} headerText={ele} key={index}/>
            })}
            
        </Layout>
    );
};

export const pageQuery = graphql`
    query indexQuery($skip: Int!, $limit: Int!) {
        site {
            siteMetadata {
                title
                description
            }
        }
        allPopup(sort: {fields: end_date, order: DESC}, limit: $limit, skip: $skip) {
            nodes {
                id
                title
                description
                thumbnail {
                    extension
                    url
                    width
                    height
                    localFile {
                        publicURL
                        childImageSharp {
                            gatsbyImageData(layout: FULL_WIDTH)
                        }
                    }
                }
                address
                end_date
                start_date
                open_time
                tags {
                    name
                }
            }
        }
        file(name: {eq: "thumbnail"}) {
            childImageSharp {
                gatsbyImageData(height: 375, layout: CONSTRAINED)
            }
        }
    }
`;

export default IndexPage;
