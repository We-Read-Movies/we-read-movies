/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { arrayOf, number, object, string, shape } from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { withLogo } from '../hocs';

function formatUrl(site, path) {
    const formattedPath = path[0] === '/' ? path : `/${path}`;

    return `${site}${formattedPath}`;
}

function SEO({ description, lang, meta, title, image, logoWide, path = '' }) {
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

    const { siteUrl } = site.siteMetadata;
    const url = formatUrl(siteUrl, path);
    const metaDescription = description || site.siteMetadata.description;
    const metaImage = image || logoWide;
    const absoluteMetaImageSrc = `${siteUrl}${metaImage.src}`;

    const imageMeta = [
        {
            name: 'image',
            content: absoluteMetaImageSrc
        },
        {
            property: 'og:image',
            content: absoluteMetaImageSrc
        },
        {
            property: 'og:image:width',
            content: metaImage.width
        },
        {
            property: 'og:image:height',
            content: metaImage.height
        },
        {
            name: 'twitter:image',
            content: absoluteMetaImageSrc
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
    description: ''
};

SEO.propTypes = {
    description: string,
    image: shape({
        src: string.isRequired,
        width: number.isRequired,
        height: number.isRequired
    }),
    lang: string,
    logoWide: shape({}),
    meta: arrayOf(object),
    path: string,
    title: string.isRequired
};

export default withLogo(SEO);
