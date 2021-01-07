/* eslint-disable @typescript-eslint/no-var-requires */

const prism = require("@mapbox/rehype-prism")

const withMDX = require("@next/mdx")({
    options: {
        rehypePlugins: [prism],
    },
    extension: /\.mdx?$/,
})
module.exports = withMDX({
    pageExtensions: ["tsx", "md", "mdx"],
})
