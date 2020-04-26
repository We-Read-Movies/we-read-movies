/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { arrayOf, object, string, shape } from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { withLogo } from '../hocs';

function formatUrl(site, path) {
    const formattedPath = path[0] === '/' ? path : `/${path}`;

    return `${site}${formattedPath}`;
}

function SEO({ description, lang, meta, title, image, logo, path = '' }) {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        siteUrl
                    }
                }
            }
        `
    );

    const url = formatUrl(site.siteMetadata.siteUrl, path);
    const metaDescription = description || site.siteMetadata.description;
    const metaImageSrc = image || logo.src;

    const imageMeta = [
        {
            name: 'image',
            content: metaImageSrc
        },
        {
            property: 'og:image',
            content: metaImageSrc
        },
        {
            name: 'twitter:image',
            content: metaImageSrc
        }
    ];
    const metaData = [
        {
            name: 'description',
            content: metaDescription
        },
        {
            property: 'og:title',
            content: title
        },
        {
            property: 'og:description',
            content: metaDescription
        },
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:url',
            content: url
        },
        {
            name: 'twitter:card',
            content: 'summary'
        },
        {
            name: 'twitter:creator',
            content: site.siteMetadata.author
        },
        {
            name: 'twitter:title',
            content: title
        },
        {
            name: 'twitter:description',
            content: metaDescription
        }
    ].concat(meta, imageMeta);

    return (
        <Helmet
            htmlAttributes={{
                lang
            }}
            meta={metaData}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
        />
    );
}

SEO.defaultProps = {
    lang: 'en',
    meta: [],
    description: '',
    image: ''
};

SEO.propTypes = {
    description: string,
    image: string,
    lang: string,
    logo: shape({}),
    meta: arrayOf(object),
    title: string.isRequired
};

export default withLogo(SEO);
