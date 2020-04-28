import React from 'react';
import { number } from 'prop-types';
import { Facebook, Instagram, Twitter, ItunesNote } from '../../icons';
import { SOCIAL_PLATFORMS } from '../../../constants';
import { socialPlatformPropType } from '../../../prop-types';
import ExternalLink from '../external-link';
import styles from './social-link.module.css';

const ICON_COMPONENTS = {
    [SOCIAL_PLATFORMS.TWITTER]: Twitter,
    [SOCIAL_PLATFORMS.FACEBOOK]: Facebook,
    [SOCIAL_PLATFORMS.INSTAGRAM]: Instagram,
    [SOCIAL_PLATFORMS.ITUNES]: ItunesNote
};

const SocialLink = ({ platform, size, url, label = '' }) => {
    const IconComponent = ICON_COMPONENTS[platform];
    if (!IconComponent) return null;

    return (
        <ExternalLink className={styles.link} href={url} label={label || platform}>
            <IconComponent aria-hidden={true} size={size} />
        </ExternalLink>
    );
};

SocialLink.propTypes = {
    size: number,
    ...socialPlatformPropType
};

export default SocialLink;
