import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export default {
  siteMetadata: {
    title: "Slick's Slices",
    siteUrl: "https://gatsby.pizza",
    description: "The best pizza place in Hamilton",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-plugin-typegen`,
      options: {
        emitSchema: {
          "src/__generated__/gatsby-introspection.json": true,
        },
        emitPluginDocuments: {
          "src/__generated__/gatsby-plugin-documents.graphql": true,
        },
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "0sjpba6w",
        dataset: "production",
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
