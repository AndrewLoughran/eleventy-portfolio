export default async function(eleventyConfig) {
	// Configure Eleventy
    eleventyConfig.setInputDirectory("src");
    eleventyConfig.setOutputDirectory("dist");
    eleventyConfig.setIncludesDirectory("_includes");
    eleventyConfig.setLayoutsDirectory("_layouts");
};

export const config = {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
