const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const singlePopup = path.resolve('./src/templates/recipe.js');
    const result = await graphql(`
        query GetPopups {
            allPopup(sort: {order: DESC, fields: flotiqInternal___createdAt}) {
                edges {
                    node {
                        id
                    }
                }
            }
        }
`);

    if (result.errors) {
        throw result.errors;
    }
    const popups = result.data.allPopup.edges;

    // Create paginated index
    const popupsPerPage = 1000;
    const numPages = Math.ceil(popups.length / popupsPerPage);

    Array.from({ length: numPages }).forEach((item, i) => {
        createPage({
            path: i === 0 ? '/' : `/${i + 1}`,
            component: path.resolve('./src/templates/index.js'),
            context: {
                limit: popupsPerPage,
                skip: i * popupsPerPage,
                numPages,
                currentPage: i + 1,
            },
        });
    });

    // Create recipes pages.
    popups.forEach((popup, index) => {
        const previous = index === popups.length - 1 ? null : popups[index + 1].node;
        const next = index === 0 ? null : popups[index - 1].node;

        createPage({
            path: popup.node.id,
            component: singlePopup,
            context: {
                id: popup.node.id,
                previous,
                next,
            },
        });
    });
};
