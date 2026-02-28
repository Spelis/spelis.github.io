import { parseISO , format} from "date-fns";
import { config as siteConfig } from "./siteconfig.mjs";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import EleventyPluginOgImage from 'eleventy-plugin-og-image';
import fs from "fs"
import { OgImage } from 'eleventy-plugin-og-image/og-image';

export class CustomOgImage extends OgImage {
  async shortcodeOutput() {
    return this.outputUrl();
  }
}

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

  eleventyConfig.addPlugin(EleventyPluginOgImage, {
    satoriOptions: {
      fonts: [
        {
          name: 'JetBrains Mono',
          data: fs.readFileSync('./assets/fonts/JetBrains/OG-Regular.ttf'),
          weight: 400,
          style: 'normal',
        },
        {
          name: 'JetBrains Mono',
          data: fs.readFileSync('./assets/fonts/JetBrains/OG-Bold.ttf'),
          weight: 800,
          style: 'normal',
        },
      ],
    },
    OgImage: CustomOgImage,
  });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    widths: [200, "auto"],
    htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
			pictureAttributes: {}
		},
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