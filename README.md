# rishimadhok.io

Personal site of **Rishi Madhok** - CEO & Co-Founder of [TerraByte](https://terrabyte.ai), building the Earth search engine.

**Live:** https://rishimadhok.github.io/

## About

A single-page personal site / CV covering current work, experience, selected projects, publications, and patents. The design is brand-matched to TerraByte: a dark, glassmorphic look with an animated star/grid backdrop, the Outfit typeface, and cyan/blue accents.

## Stack

Plain static **HTML / CSS / JS**, no build step and no runtime dependencies. Fonts load from Google Fonts; everything else is local.

```
index.html              # all page content
assets/css/site.css     # styles (design system + layout + responsive)
assets/js/site.js       # sticky header, mobile nav, scroll reveals, click-to-email
assets/images/          # headshot, company/school logos, publication PDFs
favicon.ico
tests/                  # HTML validity check (pytest + BeautifulSoup)
```

## Local development

No tooling required - serve the folder over HTTP and open it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

## Deploy

Hosted on **GitHub Pages** from the `master` branch (root). Pushing to `master` triggers a rebuild and deploys automatically:

```bash
git push origin master
```

## Notes

- **Content sources:** experience is kept in sync with [LinkedIn](https://www.linkedin.com/in/rishi-madhok-91663b82/); publications and patents with [Google Scholar](https://scholar.google.com/citations?user=1fX86jsAAAAJ&hl=en).
- **Contact:** the email address is not in the page source. The "Email me" button assembles it at click time, which keeps it from being scraped by bots.
