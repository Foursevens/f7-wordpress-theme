import { graphql } from 'gatsby';
import { injectIntl } from 'gatsby-plugin-intl';
import React from 'react';

import { useBreakpoint } from '../breakpoint';
import CasesGridList from '../cases/grid-list';
import { Hero, Section, SEO } from '../components';
import { MainLayout } from '../layout';
import { intlShape } from '../model';
import ApproachesGridList from '../approaches/grid-list';
import MembersGridList from '../members/grid-list';
import PostsGridList from '../posts/grid-list';

import styles from './index.module.css';

const LIMITS = {
  firstCases: { xs: 2, sm: 4, md: 4, lg: 6 },
  firstMembers: { xs: 0, sm: 1, md: 3, lg: 2 },
  firstPosts: { xs: 2, sm: 4, md: 4, lg: 6 },
};

export const query = graphql`
  query IndexQuery($language: String!) {
    allApproaches: allWordpressWpApproach(
      filter: { language: { eq: $language }, status: { eq: "publish" } }
      sort: { fields: menuOrder }
    ) {
      nodes {
        ...ApproachData
        approachIntro
      }
    }
    firstCases: allWordpressWpCases(
      filter: { language: { eq: $language }, status: { eq: "publish" } }
      limit: 8
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...CaseBaseData
        fields {
          remoteThumbnailImage {
            childImageSharp {
              fluid(maxWidth: 350) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    firstMembers: allWordpressWpMembers(
      filter: { language: { eq: $language }, status: { eq: "publish" } }
      limit: 3
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...MemberData
      }
    }
    firstPosts: allWordpressPost(
      filter: { language: { eq: $language }, status: { eq: "publish" } }
      limit: 8
      sort: { fields: date, order: DESC }
    ) {
      nodes {
        ...PostBaseData
        fields {
          remoteThumbnailImage {
            childImageSharp {
              fluid(maxWidth: 350) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    hero: file(base: { eq: "hero.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    intro: wordpressPage(language: { eq: $language }, title: { eq: "Home" }) {
      content
    }
    metadata: wordpressSiteMetadata(language: { eq: $language }) {
      description
    }
  }
`;

function IndexPage({
  data: {
    allApproaches: { nodes: allApproaches },
    firstCases: { nodes: firstCases },
    firstMembers: { nodes: firstMembers },
    firstPosts: { nodes: firstPosts },
    hero,
    intro,
    metadata,
  },
  intl,
}) {
  const breakpoint = useBreakpoint();
  return (
    <MainLayout>
      <SEO title="Homepage" />
      <Hero
        alt={intl.formatMessage({ id: 'index.hero-alt' })}
        colorize="bg-f7800"
        image={hero}
        position="top center"
      >
        <div className="mx-6 py-6 font-300 text-4xl text-right text-f7100">
          <span className="inline-block -mr-1 p-1 w-48">
            {metadata.description}
          </span>
        </div>
      </Hero>
      <Section title="Foursevens">
        <div
          className={styles.intro}
          dangerouslySetInnerHTML={{ __html: intro.content }}
        />
      </Section>
      <Section title="Approach" striped>
        <ApproachesGridList approaches={allApproaches} />
      </Section>
      <Section
        actionMessageId="index.more-cases"
        actionTo="/cases"
        title="Cases"
      >
        <CasesGridList
          cases={firstCases.slice(0, LIMITS.firstCases[breakpoint])}
        />
      </Section>
      <Section
        actionMessageId="index.meet-the-team"
        actionTo="/team"
        striped
        title="Team"
      >
        <MembersGridList
          members={firstMembers.slice(0, LIMITS.firstMembers[breakpoint])}
        />
      </Section>
      <Section
        actionMessageId="general.read-more"
        actionTo="/blog"
        title="Blog"
      >
        <PostsGridList
          posts={firstPosts.slice(0, LIMITS.firstPosts[breakpoint])}
        />
      </Section>
    </MainLayout>
  );
}

IndexPage.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(IndexPage);
