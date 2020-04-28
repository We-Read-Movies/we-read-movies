import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import cx from 'classnames';

import styles from './bio.module.css';
import Headshot from '../media/headshot';
import Box from '../layout/box';
import { socialPlatformPropType } from '../../prop-types';
import SocialLink from '../navigation/social-link';

const Bio = ({ name, image, text, socialPlatforms = [] }) => (
    <div className={styles.bio}>
        <Box className={styles.imageContainer}>{image && <Headshot alt={name} src={image} />}</Box>
        <Box className={styles.textContainer}>
            <div className={cx(styles.titleBar, 'paragraph-heading')}>
                <span className={styles.bioTitle}>{name}</span>
                <span>
                    {socialPlatforms.map(({ platform, url }) => (
                        <SocialLink
                            key={platform}
                            label={`${platform}:${name}`}
                            platform={platform}
                            size={20}
                            url={url}
                        />
                    ))}
                </span>
            </div>
            <p className={styles.bioText}>{text}</p>
        </Box>
    </div>
);

Bio.propTypes = {
    image: shape({}),
    name: string.isRequired,
    socialPlatforms: arrayOf(shape(socialPlatformPropType)),
    text: string.isRequired
};

export default Bio;
