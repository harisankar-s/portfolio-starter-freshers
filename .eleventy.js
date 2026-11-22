module.exports = function (eleventyConfig) {
  // Static files copied as-is to _site/
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/files");

  // Current year, for the footer
  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  // "Alex Morgan" → "AM" (shown when an item has no logo)
  eleventyConfig.addFilter("initials", (str) =>
    String(str || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("")
  );

  return {
    dir: { input: "src", output: "_site", includes: "_includes", layouts: "_includes" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
