import React from 'react';
import { node, string } from 'prop-types';
import { Link } from 'gatsby';

const EpisodeLink = ({ children, slug }) => (
    <Link aria-label={slug} to={`/episodes/${slug.toLowerCase()}`}>
        {children}
    </Link>
);

EpisodeLink.propTypes = {
    children: node.isRequired,
    slug: string.isRequired
};

export default EpisodeLink;
