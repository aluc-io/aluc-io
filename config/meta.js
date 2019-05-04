module.exports = {
  siteTitle: "aluc.io", // <title>
  shortSiteTitle: "aluc.io", // <title> ending for posts and pages
  siteDescription: "aluc.io is Alfred UC's blog",
  siteUrl: process.env.ALUCIO_SITE_URL,
  pathPrefix: "",
  siteImage: "preview.jpg",
  siteLanguage: "ko",
  // author
  authorName: "Alfred UC",
  authorTwitterAccount: "b6pzeusbc54tvhw",
  // info
  infoTitle: "alfreduc",
  infoTitleNote: "Alfred UC",
  fullName: "Alfred UC",
  nickName: "alfreduc",
  // manifest.json
  manifestName: "Alfred UC - SW designer",
  manifestShortName: "aluc.io", // max 12 characters
  manifestStartUrl: "/",
  //manifestBackgroundColor: colors.bg,
  //manifestThemeColor: colors.bg,
  manifestDisplay: "standalone",
  // social
  authorSocialLinks: [
    { name: "github", url: "https://github.com/b6pzeusbc54tvhw5jgpyw8pwz2x6gs" },
    { name: "facebook", url: "https://www.facebook.com/b6pzeusbc54tvhw5jgpyw8pwz2x6gs" },
    { name: "twitter", url: "https://twitter.com/b6pzeusbc54tvhw" },
  ],

  algolia: {
    appId: process.env.ALGOLIA_APP_ID || "",
    searchOnlyApiKey: process.env.ALGOLIA_SEARCH_ONLY_API_KEY || "",
    indexName: process.env.ALGOLIA_INDEX_NAME || "",
  },
  facebook: {
    appId: process.env.ALUCIO_FACEBOOK_APP_ID || '',
  },
}
