import React from 'react';
import { graphql } from 'gatsby';
import { arrayOf, shape } from 'prop-types';
import { episodePropType } from '../prop-types';
import { withFlattenedQuery } from '../hocs';
import PageLayout from '../components/page-layout';
import Seo from '../components/seo';
import CurrentEpisode from '../components/current-episode';
import EpisodePreview from '../components/episode-preview';
import styles from './index.module.css';

const IndexPage = ({ data }) => {
    const currentEpisode = data.currentEpisodes[0];
    const { episodes } = data;

    return (
        <PageLayout>
            <Seo title="Episodes" />
            <h1 className={styles.currentEpisodeHeading}>Current Episode</h1>
            <CurrentEpisode {...currentEpisode} />
            <h2 className="section-heading">Past Episodes</h2>
            <div className={styles.episodeList}>
                {episodes.map(ep => (
                    <div className={styles.previewWrapper} key={ep.title}>
                        <EpisodePreview {...ep} />
                    </div>
                ))}
            </div>
        </PageLayout>
    );
};

// TODO: fix prop types to reflect query
IndexPage.propTypes = {
    data: shape({
        currentEpisodes: arrayOf(shape(episodePropType))
    })
};

export const IndexPageQuery = graphql`
    query CurrentEpisode {
        currentEpisodes: allEpisodesJson(sort: { fields: [num], order: DESC }, limit: 1) {
            edges {
                node {
                    ...episodeFullFragment
                }
            }
        }
        episodes: allEpisodesJson(sort: { fields: [num], order: DESC }, skip: 1) {
            edges {
                node {
                    ...episodePreviewFragment
                }
            }
        }
    }
`;

export default withFlattenedQuery(IndexPage);
