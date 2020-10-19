// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

module.exports = config => {

	// Add filters
	config.addFilter('dateFilter', dateFilter);
	config.addFilter('w3DateFilter', w3DateFilter);

	config.addPassthroughCopy('./src/img/');
	config.addPassthroughCopy('./src/css/');
	config.addPassthroughCopy('./src/js/');
	config.setDataDeepMerge(true);

	// Returns a collection of blog posts in reverse date order
	// meer over de spread syntax hier: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
	config.addCollection('blog', collection => {
	  return [...collection.getFilteredByGlob('./src/post/*.md')].reverse();
	});

	// Returns work items, sorted by display order
	config.addCollection('work', collection => {
  return collection
    .getFilteredByGlob('./src/work/*.md')
    .sort((a, b) => (Number(a.data.displayOrder) > Number(b.data.displayOrder) ? 1 : -1));
	});

	// Returns "featured" work items, sorted by display order
	config.addCollection('featuredWork', collection => {
  return collection
    .getFilteredByGlob('./src/work/*.md')
    .sort((a, b) => (Number(a.data.displayOrder) > Number(b.data.displayOrder) ? 1 : -1))
    .filter(x => x.data.featured);
	});

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
