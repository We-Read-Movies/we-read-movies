import React from 'react';
import { shape, string } from 'prop-types';
import { graphql } from 'gatsby';
import { episodePropType } from '../../prop-types';
import PageLayout from '../../components/page-layout';
import EpisodeTitle from '../../components/episode-title';
import EpisodeCover from '../../components/episode-cover';
import AudioPlayer from '../../components/media/audio-player';
import ContentContainer from '../../components/layout/content-container';
import styles from './episode.module.css';
import TopicsDiscussed from '../../components/topics-discussed';
import LinksDiscussed from '../../components/links-discussed';
import Seo from '../../components/seo';
import { getFluidImage } from '../../util';

const Episode = ({ data }) => {
    const { name: artistName, url: artistUrl } = data.artistsJson;
    const { title, num, description, src, date, duration, topics = [], links = [], cover, slug } = data.episodesJson;
    const imageFluid = getFluidImage(cover.image);
    const path = `/episodes/${slug}`;

    return (
        <PageLayout>
            <Seo description={description} image={imageFluid.src} path={path} title={`Episode ${num}: ${title}`} />
            <ContentContainer>
                <h1 className={styles.title}>
                    <EpisodeTitle num={num} title={title} />
                </h1>
                <EpisodeCover main={true} src={imageFluid} text={artistName} url={artistUrl} />
                <AudioPlayer src={src} />
                <div className={styles.meta}>
                    <span className={styles.date}>{date}</span>
                    <span className={styles.duration}>Duration: {duration}</span>
                </div>
                <p>{description}</p>
                <TopicsDiscussed topics={topics} />
                <LinksDiscussed links={links} />
            </ContentContainer>
        </PageLayout>
    );
};

export const query = graphql`
    query EpisodeWithCover($slug: String!, $artist: String) {
        episodesJson(slug: { eq: $slug }) {
            ...episodeFullFragment
        }
        artistsJson(name: { eq: $artist }) {
            name
            url
        }
    }
`;

Episode.propTypes = {
    data: shape({
        episodesJson: shape(episodePropType),
        artistJson: shape({
            name: string,
            url: string
        })
    })
};

export default Episode;
