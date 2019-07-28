const path = require('path');

const createPagesComponent = path.resolve(__dirname, './src/templates/page-context.jsx');
const pageQueryComponent = path.resolve(__dirname, './src/templates/page-query.jsx');
const indexComponent = path.resolve(__dirname, './src/templates/index.jsx');

exports.createPages = async ({
  actions,
  graphql
}) => {
  const {createPage} = actions;

  if (process.env.USE_CREATE_PAGES) {
    let results = await graphql(`
      {
        allDataJson {
          nodes {
            id,
            data
          }
        }
      }
    `);

    for (const {id, data} of results.data.allDataJson.nodes) {
      createPage({path: `/${id}`, component: createPagesComponent, context: {data}});
    }

    createPage({
      path: '/',
      component: indexComponent,
      context: {pages: results.data.allDataJson.nodes.map(({id}) => `/${id}`)}
    });

  } else {
    let results = await graphql(`
      {
        allDataJson {
          nodes {
            id
          }
        }
      }
    `);

    for (const {id} of results.data.allDataJson.nodes) {
      createPage({path: `/${id}`, component: pageQueryComponent, context: {id}});
    }

    createPage({
      path: '/',
      component: indexComponent,
      context: {pages: results.data.allDataJson.nodes.map(({id}) => `/${id}`)}
    });

  }

}
