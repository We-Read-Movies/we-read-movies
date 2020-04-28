import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

// TODO: Clean up, use fragments, or split into square/share for better perf
const withLogo = C => props => {
    const data = useStaticQuery(graphql`
        query LogoQuery {
            logo: file(relativePath: { eq: "logo/logo.jpg" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            logoWide: file(relativePath: { eq: "logo/logo-wide.jpg" }) {
                childImageSharp {
                    fluid {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    return <C {...props} logo={data.logo.childImageSharp.fluid} logoWide={data.logoWide.childImageSharp.fluid} />;
};

export default withLogo;
