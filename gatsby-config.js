const remarkHighlight = require('remark-highlight.js');
const fs = require('fs');



module.exports = {
  siteMetadata: {
    title: 'Paytm Developer Network',
    githubProject: 'https://github.com/Paytm-Payments/paytm-payments-developer/tree/master/src/pages'
  },
  plugins: [{
      resolve: `gatsby-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        mdPlugins: [remarkHighlight],
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
        background_color: '#fff',
        theme_color: '#223e99',
        display: 'minimal-ui',
        icon: 'static/assets/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-48995472-6",
        // Puts tracking script in the head instead of the body
        head: true
      },
    }

  ],
}


fs.readFile(`${__dirname}/googledd4b1c937794cbdf.html`, function (err, data) {
  if (err) {
    throw err;
  }
  fs.writeFile(`${__dirname}/public/googledd4b1c937794cbdf.html`, data, function (err) {
    if (err) {
      return console.log(err);
  }

    console.log("The file was saved!");
  });
})
