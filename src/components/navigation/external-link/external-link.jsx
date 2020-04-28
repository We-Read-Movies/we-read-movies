import React from 'react';
import { string, node } from 'prop-types';

const ExternalLink = ({ children, className = '', href, label = '' }) => (
    <a aria-label={label} className={className} href={href} rel="noopener noreferrer" target="_blank">
        {children}
    </a>
);

ExternalLink.propTypes = {
    children: node.isRequired,
    className: string,
    href: string.isRequired,
    label: string
};

export default ExternalLink;
