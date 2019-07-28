import {graphql} from 'gatsby';
import React from 'react';

const Template = ({ data }) => (<div>{data.dataJson.data}</div>);

export default Template;

export const pageQuery = graphql`
  query PageById($id: String!) {
    dataJson(id: { eq: $id }) {
      data
    }
  }
`;
