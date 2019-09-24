const { LOCALE_DEFAULT, LOCALES } = require('./options');

const config = {
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    ...LOCALES.map((language) => ({
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: process.env.MEMENTO
          ? `localhost:3344/${language}`
          : `foursevens.be/${language}`,
        excludedRoutes: [
          '**/search',
          '**/settings',
          '**/themes',
          '**/users/me',
        ],
        hostingWPCOM: false, // It is not hosted on wordpress.com
        normalizer: ({ entities }) =>
          entities.map((entity) => {
            const normalizedEntity = { ...entity, language };
            if (entity.path && language !== LOCALE_DEFAULT) {
              // All non default languages have a Wordpress path prefix like
              // '/fr' or '/en'. We don't need this as localisation is handled
              // by gatsby-plugin-intl. So we strip it here.
              normalizedEntity.path = entity.path.replace(/\/.{2}/, '');
            }
            return normalizedEntity;
          }),
        protocol: process.env.MEMENTO ? 'http' : 'https',
        useACF: false, // Don't fetch the "Advanced Custom Fields" fields.
      },
    })),
    {
      resolve: 'gatsby-plugin-intl',
      options: {
        defaultLanguage: LOCALE_DEFAULT,
        languages: LOCALES,
        redirect: true,
      },
    },
    'gatsby-plugin-postcss',
  ],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push({
    resolve: 'gatsby-plugin-purgecss',
    options: { tailwind: true },
  });
}

module.exports = config;
