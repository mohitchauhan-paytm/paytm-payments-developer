const remarkHighlight = require('remark-highlight.js')


module.exports = {
  siteMetadata: {
    title: 'Paytm Developer Network',
  },
  plugins: [
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        mdPlugins: [remarkHighlight] ,
        defaultLayouts: {
          default: require.resolve("./src/components/layout.js")
        }
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/static/assets`
      }
    },
    `gatsby-plugin-sass`,
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Paytm Developer Network',
        short_name: 'Paytm',
        start_url: 'docs',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'static/assets/favicon.png', // This path is relative to the root of the site.
      },
    },
    
  ],
}
