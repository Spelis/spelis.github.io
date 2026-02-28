import { parseISO , format} from "date-fns";
import { config as siteConfig } from "./siteconfig.mjs";


export default function(eleventyConfig) {
	// Order matters, put this at the top of your configuration file.

  eleventyConfig.addNunjucksFilter("date", (dateObj, formatString = 'MM.dd.yyyy') => format(dateObj, formatString))

  eleventyConfig.addCollection("navItems", function (collectionsApi) {
		return collectionsApi.getAll().filter(i =>  {
      if (i.data.nav) {
        return i.data.nav > 0
      }
    }).sort(function (a, b) {
			return (a.data.nav ?? -1000) - (b.data.nav ?? -1000);
		});
	});

  eleventyConfig.addBundle("css", {
    toFileDirectory: "assets/css/bundles/",

		// (Optional) File extension used for bundle file output, defaults to bundle name
		outputFileExtension: "css",
  });

  eleventyConfig.addBundle("js", {
    toFileDirectory: "assets/js/bundles/",

		// (Optional) File extension used for bundle file output, defaults to bundle name
		outputFileExtension: "js",
  });

  eleventyConfig.addGlobalData("layout","page");
  eleventyConfig.addGlobalData("site", {
    title: siteConfig.siteTitle ?? "Site",
    headerLinks: siteConfig.headerLinks ?? [],
    footerLinks: siteConfig.footerLinks ?? []
  })

  eleventyConfig
		.addPassthroughCopy({"./public/": "/"})
		.addPassthroughCopy({"./assets/": "/assets"})

};
export const config = {
  dir: {
    input: "content",
    output: "_dist",
    includes: "../_includes",
    layouts: "../_layouts",
  },
  templateFormats: ["md", "njk"],
  htmlTemplateEngine: "njk",
  markdownTemplateEngine: "njk"
};