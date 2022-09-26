import React, {useEffect} from 'react';
import { graphql } from 'gatsby';
import { Header, List, Paragraph } from 'flotiq-components-react';
import { Helmet } from 'react-helmet';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import ReactMarkdown from "react-markdown";
import { Disqus } from 'gatsby-plugin-disqus';

import Layout from '../layouts/layout';
import RecipeBackButton from '../components/recipe/RecipeBackButton';
import RecipeSteps from '../components/recipe/RecipeSteps';

// import HeaderImageWithText from '../components/recipe/HeaderImageWithText';
import RecipeCards from '../sections/RecipeCards';

const RecipeTemplate = ({ data }) => {
    const { popup } = data;
    const popups = data.allPopup.nodes;

    let disqusConfig = {
        url: `https://popupgo.kr/${popup.id}`,
        identifier: popup.id,
        title: popup.title,
      }
    useEffect(() => {
        const script = document.createElement('script');
    
        script.async = true;
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=0d55b50b99b8d406560d185b443f265c&autoload=false";
    
        document.head.appendChild(script);
    
        script.onload = () => {
            kakao.maps.load(() => {
                let el = document.getElementById('map');
                let map = new kakao.maps.Map(el, {
                    center: new kakao.maps.LatLng(popup.geo.lat, popup.geo.lon),
                    draggable: false
                })

                let marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(popup.geo.lat, popup.geo.lon)
                });

                marker.setMap(map);
            });
        };
    }, []);  

    return (
        <Layout additionalClass={['bg-light-gray']}>
            <Helmet>
                <title>{`${popup.title} | 국내 모든 팝업스토어와 전시`}</title>
                <meta
                    name="description"
                    content={`${popup.description.split("**")[1].split("**")[0]} | ${popup.tags.map(e => e.name).join(", ")} | 국내 팝업스토어, 전시`}
                />
                
            </Helmet>
            <div className="flex flex-wrap max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <RecipeBackButton additionalClass={['mt-12 mb-5 uppercase']} backButtonText="Go back" />
            </div>
            <div className="flex flex-wrap max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div
                    className="flex basis-full lg:basis-1/2"
                >
                    <GatsbyImage
                        image={getImage(popup.thumbnail[0].localFile)}
                        alt={popup.title}
                        className="w-full"
                    />
                </div>
                <div className="flex flex-col basis-full lg:basis-1/2 pl-0 lg:pl-12 pt-5 pb-10 bg-white">
                    <div className="flex flex-wrap justify-start text-sm font-light space-x-5 py-5">
                        <p className="px-4 py-3 bg-light-gray">
                            일정:
                            {' '}
                            <span className="font-semibold">
                                {`${popup.start_date.split("-")[1]}.${popup.start_date.split("-")[2]}-${popup.end_date.split("-")[1]}.${popup.end_date.split("-")[2]}`}
                            </span>
                        </p>
                    </div>
                    <Header additionalClasses={['text-xl md:text-5xl text-primary !font-normal']}>
                        {popup.title}
                    </Header>
                    <Paragraph>
                        {`📍 ${popup.address}`}
                    </Paragraph>
                    <Paragraph>
                        {`⏰ ${popup.open_time}`}
                    </Paragraph>
                    <Header level={4} additionalClasses={['uppercase mt-8 mb-2']}>
                        설명
                    </Header>
                    <ReactMarkdown>
                        {popup.description}
                    </ReactMarkdown>
                </div>
                <div id="map" className="flex flex-col basis-full pl-0 lg:pl-12 pt-48 pb-10 bg-white my-4" >
                    123
                </div> 
            </div>
            
            
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                
                <RecipeSteps title={popup.title} images={popup.images} />
            </div>
            {/* <HeaderImageWithText
                recipe={recipe}
                headerText1="Enjoy"
                headerText2="your"
                headerText3="meal!"
            /> */}
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                {/* <CommentCount config={disqusConfig} placeholder={'...'} /> */}
                <Disqus
                    config={disqusConfig}
                />
            </div>
            <RecipeCards popups={popups} headerText="최근 오픈한 팝업 스토어" />
            
        </Layout>
    );
};

export const pageQuery = graphql`
    query PortfolioProjectById($id: String!) {
        site {
            siteMetadata {
                title
            }
        }
        popup( id: { eq: $id } ) {
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
            geo {
                lat
                lon
            }
            images {
                localFile {
                    publicURL
                    childImageSharp {
                        gatsbyImageData(layout: FULL_WIDTH)
                    }
                }
            }
        }
        allPopup(sort: {fields: end_date, order: DESC}, limit: 3, filter: {id: {ne: $id}}) {
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
            }
        }
    }
`;

export default RecipeTemplate;
