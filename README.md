# towerbells-web

## Important Links

- Link to original website: [towerbells.org](http://towerbells.org/)
- Link to current build of this project: [GitHub Pages](https://ganglyimp.github.io/towerbells-web/)

> **Note**: this repository will contain a few dead links as it only contains pages from the "top" portion of the website. Anything that links to the `/data/` subdirectory will be a dead link.

---

## So, what is TowerBells.org?

TowerBells is a gigantic database of bell towers (obviously) spanning carillons, chimes, rings, and so on. It has been primarily managed by Carl Scott Zimmerman for the past few decades. He's written about the website's history [here](https://towerbells.org/WebsiteHistory.html). He also talks about some other people who have contributed to the site on [this page](https://towerbells.org/data/Cred_Disc.html).

## So how are *you* involved with TowerBells?

So glad you asked. Back when I was a university student, I got *very* involved in carillons (y'know, those giant bells played by a giant wooden keyboard). I often used TowerBells.org as a resource whenever traveling, and it was invaluable in helping me figure out *which exact* church I would need to harass into letting me inside of their belfry.

Looking at this site, a few things begun to weigh on my mind. The design is a bit... dated. The site's structured like a winding labyrinth. And the entire front-end is written in glorious HTML4 (for reference, [HTML5 was published as a W3C Recommendation in 2014](https://www.w3.org/press-releases/2014/html5-rec/)). Carl explains some of these design choices on [this page here](https://towerbells.org/data/maintenance.html). I've been told that people have spent *years* trying to convince him to modernize, but to no avail. So as a tragically inexperienced comp sci graduate, I thought maybe I could try sending him an email.

I sent my initial email in the Fall of 2022. At the time, I didn't have the expertise to offer any advice on how he might modernize his database. So I kept my initial offer pretty modest in scope: "Hey, Carl, how 'bout modernizing that front-end?" I honestly didn't expect a response. But, to my surprise, he eagerly agreed and sent me over a ZIP file of the entire "top" portion of his website (which means all the HTML pages that were in his site's root directory).

The original files he sent me can be found on the [main](https://github.com/ganglyimp/towerbells-web/tree/main) branch of this repository (as of right now). I organized those files into separate folders to make it easier to sift through them, but other than that, the files on that branch remain unchanged.

## What are the goals of this redesign project?

- [x] Update all pages to HTML5, removing all deprecated tags and standardizing the code for readability
- [ ] Make the website responsive on smaller devices
  - Most of the website currently plays nice with mobile devices. However, some very large tables are very awkward to view on smaller screens.
- [ ] Improve accessibility (improving contrast, larger font-sizes, accessibility labeling where ever necessary, etc.)
  - Many of the pages have been rewritten with semantic HTML to make it easier for a screen-reader to traverse through them.
- [ ] Make quality-of-life design changes to make it easier to navigate through the website

## Some limitations

TowerBells.org currently does not run on any kind of front-end framework. It's all raw HTML and vanilla JavaScript. While slapping everything into a React project would certainly make *my* life easier, that kind of massive change is out of scope for this project. By keeping everything vanilla, this would allow Carl to easily drag-and-drop and pages from this repository into his live site repo without any major disruptions.

There are some benefits to his minimalist approach to web design. His web pages are very small and compact and don't require a lot of excessive network calls in order to display things properly. The lack of JavaScript dependency also helps to make the site load pretty fast. I try to keep these benefits in mind when working on these redesigns—trying to not add more than is necessary.

Carl has been recently convinced to try to move his database into a NoSQL database. He's currently working on developing a JSON schema to help make this move possible (see the postscript at the bottom of [this page](https://towerbells.org/data/maintenance.html)). He's been toying around with some *massive* ideas for restructuring the `/data/` portion of the site. But until he finishes his data conversion efforts, there's not much I can do with the whole other half of his website. We gotta let the man cook.

## Other Contributors

Favicons were designed by Rendell L.

Header images from the home page were drawn by Baylee Bell

Card icons seen on the home page were drawn by Margot M.
