const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./content/sass/");
  eleventyConfig.addPassthroughCopy("./assets/js");
  eleventyConfig.addPassthroughCopy("./content/favicon.ico");
  eleventyConfig.addPassthroughCopy("./content/robots.txt");
  eleventyConfig.addPassthroughCopy("./content/_redirects");
  eleventyConfig.addPassthroughCopy("./assets/fonts");
  eleventyConfig.addPassthroughCopy("./assets/img");
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addFilter("md", function (content = "") {
    return markdownIt({ html: true }).render(content);
  });
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "Europe/Madrid",
    }).toLocaleString(DateTime.DATE_MED);
  });
  eleventyConfig.addFilter("toISO", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "Europe/Madrid",
    }).toISODate();
  });
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!--more-->",
  });
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  return {
    dir: {
      input: "content",
      output: "_site",
    },
    markdownTemplateEngine: 'njk',
    templateFormats: ["html", "liquid", "njk", "md"]
  };
};
