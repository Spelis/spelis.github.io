import { parseISO , format} from "date-fns";
import { config as siteConfig } from "./siteconfig.mjs";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import markdownIt from "markdown-it";
import EleventyPluginOgImage from 'eleventy-plugin-og-image';
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import fs from "fs"
import { OgImage } from 'eleventy-plugin-og-image/og-image';
import path from "path";
import sitemap from "@quasibit/eleventy-plugin-sitemap";
import { DateTime } from "luxon";

export class CustomOgImage extends OgImage {
  async shortcodeOutput() {
    return this.outputUrl();
  }
}

export default function(eleventyConfig) {
	// Order matters, put this at the top of your configuration file.
  eleventyConfig.addFilter("embedSVG", function(filePath) {
    const fullPath = path.join("./", filePath);
    return fs.readFileSync(fullPath, "utf-8");
  });
	eleventyConfig.addNunjucksFilter("date", (dateObj, formatString) => {
		return DateTime.fromJSDate(dateObj).toFormat(
			formatString || "cccc, LLLL dd yyyy"
		);
	});

  eleventyConfig.addCollection("navItems", function (collectionsApi) {
		return collectionsApi.getAll().filter(i =>  {
      if (i.data.nav) {
        return i.data.nav > 0
      }
    }).sort(function (a, b) {
			return (a.data.nav ?? -1000) - (b.data.nav ?? -1000);
		});
	});

  eleventyConfig.addPlugin(syntaxHighlight);
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
        {
          name: 'Kode Mono',
          data: fs.readFileSync('./assets/fonts/KodeMono/Regular.ttf'),
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Kode Mono',
          data: fs.readFileSync('./assets/fonts/KodeMono/Bold.ttf'),
          weight: 800,
          style: 'normal',
        },
      ],
    },
    OgImage: CustomOgImage,
  });

	eleventyConfig.addPlugin(sitemap, {
		sitemap: {
			hostname: "https://spelis.li",
		},
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

  let options = {
		html: true,
		breaks: true,
		linkify: true,
    langPrefix: 'codeblock language-',
	};

	eleventyConfig.setLibrary("md", markdownIt(options));
  
  eleventyConfig
		.addPassthroughCopy({"./public/": "/"})
		.addPassthroughCopy({"./assets/": "/assets"})
		.addPassthroughCopy({"./assets/images/favicon.ico": "/favicon.ico"})

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
