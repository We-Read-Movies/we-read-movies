/* eslint-disable import/no-commonjs */
module.exports = {
    pathPrefix: '/we-read-movies',
    siteMetadata: {
        title: 'We Read Movies',
        description: "We don't just watch movies, we read them to filth.",
        author: 'Eric Henke',
        siteUrl: 'https://wereadmovies.com',
        social: [
            {
                name: 'FACEBOOK',
                url: ''
            },
            {
                name: 'TWITTER',
                url: ''
            },
            {
                name: 'INSTAGRAM',
                url: ''
            }
        ]
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: `${__dirname}/src/images`
            }
        },
        'gatsby-transformer-json',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'data',
                path: `${__dirname}/src/data`
            }
        },
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'we-read-movies',
                short_name: 'we-read-movies',
                start_url: '/',
                display: 'minimal-ui',
                icon: 'src/images/favicon.png' // This path is relative to the root of the site.
            }
        },
        {
            resolve: 'gatsby-plugin-google-fonts',
            options: {
                fonts: ['Montserrat:400,500', 'Lora:400'],
                display: 'swap'
            }
        }
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ]
};
