import { parseISO , format} from "date-fns";
import { config as siteConfig } from "./siteconfig.mjs";


export default function(eleventyConfig) {
	// Order matters, put this at the top of your configuration file.

  eleventyConfig.addNunjucksFilter("date", (dateObj, formatString = 'MM.dd.yyyy') => format(dateObj, formatString))

  eleventyConfig.addGlobalData("layout","page");
  eleventyConfig.addGlobalData("site", {
    title: siteConfig.siteTitle ?? "Site",
    socials: siteConfig.socials
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