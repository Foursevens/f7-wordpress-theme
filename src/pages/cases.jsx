import { graphql } from 'gatsby';
import React from 'react';

import '../components/layout.css';

import CasesGridList from '../cases/grid-list';
import Layout from '../components/layout';
import SEO from '../components/seo';

export const query = graphql`
  query($language: String!) {
    allCases: allWordpressWpCases(filter: { language: { eq: $language } }) {
      nodes {
        ...CaseData
      }
    }
  }
`;

export default function CasesPage({
  data: {
    allCases: { nodes: allCases },
  },
}) {
  return (
    <Layout>
      <SEO title="Cases" />
      <div className="mainCases">
        <h3>Cases</h3>
        <CasesGridList cases={allCases} />
      </div>
    </Layout>
  );
}
