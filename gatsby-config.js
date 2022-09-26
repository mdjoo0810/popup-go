/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    siteMetadata: {
        title: 'POP-UP GO | 국내 모든 팝업스토어와 전시',
        description: '국내 팝업스토어 및 전시 모음, 팝업고와 함께',
        siteUrl: 'https://popupgo.kr',
    },
    plugins: [
        {
            resolve: `gatsby-plugin-disqus`,
            options: {
                shortname: `popupgo`
            }
        },
        {
            // How to configure? https://www.gatsbyjs.com/plugins/gatsby-plugin-google-gtag/
            // Video: https://www.youtube.com/watch?v=Dwi99jtl3Fs
            resolve: 'gatsby-plugin-google-gtag',
            options: {
                trackingIds: [
                    process.env.GA_MEASUREMENT_ID || 'test', // GA Measurement
                ],
                gtagConfig: {
                    optimize_id: 'OPT_CONTAINER_ID',
                    anonymize_ip: true,
                    cookie_expires: 0,
                },
                pluginConfig: {
                    head: true,
                    respectDNT: true,
                    exclude: ['/preview/**', '/do-not-track/me/too/'],
                },
            },
        },
        {
            resolve: `gatsby-plugin-google-adsense`,
            options: {
                publisherId: `ca-pub-4051015339001057`
            },
        },
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sitemap',
        {
            resolve: 'gatsby-source-flotiq',
            options: {
                authToken: process.env.GATSBY_FLOTIQ_API_KEY,
                downloadMediaFile: true,
                forceReload: false,
                includeTypes: [
                    '_media',
                    '_tag',
                    'popup',
                ],
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'placeholder',
                path: `${__dirname}/gatsby-config.js`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'assets',
                path: `${__dirname}/src/assets`,
            },
        },
        'gatsby-plugin-image',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: 'https://flotiqgatsbyrecipe2.gatsbyjs.io',
                sitemap: 'https://flotiqgatsbyrecipe2.gatsbyjs.io/sitemap.xml',
                policy: [{ userAgent: '*', allow: '/' }],
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                icon: 'src/assets/favicons/favicon-16x16.png',
                icons: [
                    {
                        src: 'src/assets/favicons/favicon-32x32.png',
                        sizes: '32x32',
                        type: 'image/png',
                    },
                    {
                        src: 'src/assets/favicons/favicon-16x16.png',
                        sizes: '16x16',
                        type: 'image/png',
                    },
                ],
            },
        },
        'gatsby-plugin-postcss',
        {
            resolve: 'gatsby-plugin-gatsby-cloud',
            options: {
                headers: {
                    '/*': [
                        'x-frame-options: allow-from https://jamstackthemes.dev/',
                    ],
                },
            },
        },
    ],
};
