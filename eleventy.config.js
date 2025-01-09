// register dotenv for process.env.* variables to pickup
import dotenv from 'dotenv';
dotenv.config();

//  config import
// import {getAllPosts, onlyMarkdown, tagList} from './src/_config/collections.js';
import events from './src/_config/events.js';
import filters from './src/_config/filters.js';
import plugins from './src/_config/plugins.js';
import shortcodes from './src/_config/shortcodes.js';

export default async function(eleventyConfig) {
    eleventyConfig.addWatchTarget('./src/assets/**/*.{css,js,svg,png,jpeg}');
    eleventyConfig.addWatchTarget('./src/_includes/**/*.{webc}');

    // ---------------------  Plugins
    eleventyConfig.addPlugin(plugins.htmlConfig);
    eleventyConfig.addPlugin(plugins.cssConfig);
    // eleventyConfig.addPlugin(plugins.jsConfig);
    // eleventyConfig.addPlugin(plugins.drafts);

    eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
    eleventyConfig.addPlugin(plugins.rss);
    eleventyConfig.addPlugin(plugins.syntaxHighlight);

    eleventyConfig.addPlugin(plugins.webc, {
        components: ['./src/_includes/webc/*.webc'],
        useTransform: true
    });

    // ---------------------  bundle
    eleventyConfig.addBundle('css', {hoist: true});

    // 	--------------------- Library and Data
    eleventyConfig.setLibrary('md', plugins.markdownLib);
    eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

    // --------------------- Filters
    eleventyConfig.addFilter('toIsoString', filters.toISOString);
    eleventyConfig.addFilter('formatDate', filters.formatDate);
    eleventyConfig.addFilter('markdownFormat', filters.markdownFormat);
    eleventyConfig.addFilter('splitlines', filters.splitlines);
    eleventyConfig.addFilter('striptags', filters.striptags);
    eleventyConfig.addFilter('shuffle', filters.shuffleArray);
    eleventyConfig.addFilter('alphabetic', filters.sortAlphabetically);
    eleventyConfig.addFilter('slugify', filters.slugifyString);

    // --------------------- Shortcodes
    eleventyConfig.addShortcode('svg', shortcodes.svgShortcode);
    eleventyConfig.addShortcode('image', shortcodes.imageShortcode);
    eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

    // --------------------- Passthrough File Copy

    // -- same path
    ['src/assets/fonts/'].forEach(path =>
        eleventyConfig.addPassthroughCopy(path)
    );

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
