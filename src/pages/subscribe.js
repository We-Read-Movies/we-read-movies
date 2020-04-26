import React from 'react';
import { graphql } from 'gatsby';
import { arrayOf, shape, string } from 'prop-types';
import { withFlattenedQuery } from '../hocs';
import PageLayout from '../components/page-layout';
import SubscriptionPlatform from '../components/subscription-platform';
import Seo from '../components/seo';
import styles from './subscribe.module.css';

const SubscribePage = ({ data }) => {
    const { platforms } = data;

    const publishedPlatforms = platforms.filter(p => !!p.url);

    return (
        <PageLayout>
            <Seo path="/subscribe" title="Subscribe" />
            <h1>Subscribe</h1>
            <div className={styles.platformList}>
                {publishedPlatforms.map(platform => (
                    <div className={styles.platformWrapper} key={platform.name}>
                        <SubscriptionPlatform name={platform.name} url={platform.url} />
                    </div>
                ))}
            </div>
        </PageLayout>
    );
};

// TODO: fix prop types to reflect query
SubscribePage.propTypes = {
    data: shape({
        platforms: arrayOf(
            shape({
                name: string.isRequired,
                url: string.isRequired
            })
        )
    })
};

export const SubscribePageQuery = graphql`
    query Platforms {
        platforms: allPlatformsJson {
            edges {
                node {
                    name
                    url
                }
            }
        }
    }
`;

export default withFlattenedQuery(SubscribePage);
