---
title: Finally replaced NGINX's Autoindex
keywords: autoindex nginx css
date: 2026-07-07
---

Jeez, I've been dreading this moment for so long, and it wasn't even a hassle.

So I finally set up FancyIndex for NGINX because the built-in autoindex honestly sucks genuine ass. Okay, maybe that's a little harsh. It works. It lists files. It does exactly what it says on the tin. But aesthetically? It's basically a directory listing with unstyled HTML from the stone age.

For the longest time I'd been putting this off because I assumed it'd be one of those projects where you spend six hours reading documentation, rebuilding NGINX with some obscure module, sacrificing a goat to the package manager, and still end up with a blank page and three cryptic error messages.

Instead, it took me a few minutes.

Most of the work wasn't even getting FancyIndex running. The hardest part was deciding how I wanted it to look. It supports custom headers, footers, CSS, sorting, hiding files, and a bunch of little quality-of-life features that make a file index feel like it actually belongs on your website instead of looking like your web server accidentally exposed a folder.

The best part is that it's still just a directory listing. No JavaScript monstrosity, no database, no fancy backend. Drop files into a directory (well, only I have FTP access so sucks to be you) and they're immediately available. That's exactly what I wanted.

I don't know why I kept procrastinating on this one. I guess "I'll do it later" eventually became "I've been saying that for over a year." Turns out the solution was just... reading the documentation for once.

As usual, the thing I'd built up in my head as an enormous nightmare turned out to be one of the easiest upgrades I've made to the server.

I probably should stop doing that.

...Nah.

### slight note here

The only issue I had was that the CSS href didn't want to work so I just caved and shoved a `<link>` in the header.html
