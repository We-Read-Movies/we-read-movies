import React from 'react';
import { graphql } from 'gatsby';
import { arrayOf, shape, string } from 'prop-types';
import PageLayout from '../components/page-layout';
import ContentContainer from '../components/layout/content-container';
import Seo from '../components/seo';
import Bio from '../components/bio';
import List from '../components/layout/list';
import { withFlattenedQuery } from '../hocs';
import { getFluidImage } from '../util';

const AboutPage = ({ data }) => {
    const { hosts } = data;

    return (
        <PageLayout>
            <Seo path="/about" title="About" />
            <ContentContainer>
                <h1>About</h1>
                <p>
                    We Read Movies is a podcast where three friends watch the very worst of gay cinema so that you
                    don&apos;t have to. Then we discuss these films in agonizing but hilarious detail for your listening
                    pleasure. At We Read Movies, we don&apos;t just watch movies. We read them, to filth.
                </p>
                <h2 className="section-heading">Your Beautiful Hosts</h2>
                <List>
                    {hosts.map(({ name, text, image, social = [] }) => {
                        const fluidImage = getFluidImage(image);

                        return <Bio image={fluidImage} key={name} name={name} socialPlatforms={social} text={text} />;
                    })}
                </List>
            </ContentContainer>
        </PageLayout>
    );
};

AboutPage.propTypes = {
    data: shape({
        hosts: arrayOf(
            shape({
                image: shape({}),
                name: string.isRequired,
                text: string.isRequired,
                social: arrayOf(
                    shape({
                        platform: string.isRequired,
                        url: string.isRequired
                    })
                )
            })
        )
    })
};

export const AboutPageQuery = graphql`
    query Hosts {
        hosts: allHostsJson {
            edges {
                node {
                    name
                    text
                    social {
                        platform
                        url
                    }
                    image {
                        childImageSharp {
                            fluid(maxWidth: 200) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default withFlattenedQuery(AboutPage);
