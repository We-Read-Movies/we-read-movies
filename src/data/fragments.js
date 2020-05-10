import { graphql } from 'gatsby';

export const imageFluidLargeFragment = graphql`
    fragment imageFluidLargeFragment on EpisodesJsonCover {
        image {
            childImageSharp {
                fluid(maxWidth: 750) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`;

export const imageFluidSmallFragment = graphql`
    fragment imageFluidSmallFragment on EpisodesJsonCover {
        image {
            childImageSharp {
                fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`;

export const imageBannerFragment = graphql`
    fragment imageBannerFragment on EpisodesJsonCover {
        image {
            childImageSharp {
                resize(width: 2400, height: 1300, fit: CONTAIN, background: "rgba(255,255,255,1)") {
                    width
                    height
                    src
                }
            }
        }
    }
`;

export const episodeFullFragment = graphql`
    fragment episodeFullFragment on EpisodesJson {
        slug
        title
        date
        description
        duration
        num
        src
        topics
        links {
            text
            url
        }
        cover {
            ...imageFluidLargeFragment
            ...imageBannerFragment
        }
    }
`;

export const episodePreviewFragment = graphql`
    fragment episodePreviewFragment on EpisodesJson {
        slug
        title
        date
        num
        cover {
            ...imageFluidSmallFragment
        }
    }
`;
