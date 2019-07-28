import React from 'react';
import {Link} from 'gatsby';

const Template = ({pageContext}) => (<div>
  <ul>
    {pageContext.pages.map(x => <li key={x}><Link to={x}>{x}</Link></li>)}
  </ul>
</div>);

export default Template;
