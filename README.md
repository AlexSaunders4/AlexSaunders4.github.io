# Personal site

Plain HTML and CSS. No build step, no dependencies.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Résumé (the landing page) |
| `personal.html` | About you |
| `sports.html` | Index of sports pieces |
| `industry.html` | Index of professional pieces |
| `post-example.html` | Template for a single article |
| `style.css` | All styling for every page |

## Putting it on GitHub Pages

1. Create a repo named `yourusername.github.io` (using your exact GitHub username). A repo with that name publishes at the root domain and needs no extra config.
2. Upload these six files to the top level of the repo — not inside a folder.
3. Go to **Settings → Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. Wait a minute or two, then visit `https://yourusername.github.io`.

If you'd rather use a repo with a different name, it works the same way but publishes at `https://yourusername.github.io/repo-name/`.

## Making it yours

**Start with the rail.** The block between `<header class="rail">` and `</header>` is identical in all five pages: your name, the one-line description, the nav, and your contact links. Edit it once in `index.html`, then paste it over the same block in the other four files. Leave each page's `aria-current="page"` on its own nav item — that's what marks the current page with the blue square.

**Résumé entries** are `<article class="entry">` blocks: a date on the left, everything else on the right. Copy one to add a job.

**Adding an article:**
1. Duplicate `post-example.html` and rename it something descriptive — `bears-oline.html`. Lowercase, hyphens, no spaces.
2. Replace the title, date, and body. Point its `.back` link at the right index page.
3. Add an `<article class="entry">` block at the top of the list in `sports.html` or `industry.html`, linking to the new file.

**Colours and fonts** are the `:root` variables at the top of `style.css`. Change `--accent` and every marker, link, and quote rule follows.

The résumé page is set up to print cleanly — Cmd/Ctrl-P drops the nav and gives you a PDF.
