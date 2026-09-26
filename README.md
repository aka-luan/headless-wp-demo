# Tagline: headless WordPress + Next.js

A fictional SaaS marketing site (Tagline, a customer-feedback tool) built to show that a
marketing team can edit freely in WordPress while visitors get a fast Next.js site.

| Layer | Choice |
|---|---|
| CMS | WordPress (latest) with a minimal theme and no front-end templates |
| Fields | [Secure Custom Fields](https://wordpress.org/plugins/secure-custom-fields/): Flexible Content, Repeater, Gallery, Options page |
| API | WPGraphQL + WPGraphQL for ACF |
| SEO | Yoast SEO + WPGraphQL Yoast SEO Addon |
| Front end | Next.js (App Router), TypeScript, Tailwind *(milestone 2)* |
| Hosting | Docker Compose, Caddy, MariaDB |

## Repo layout

```
cms/theme          Headless theme: CPTs, taxonomy, menus, options page
cms/theme/acf-json Field groups as JSON (the content model, versioned in git)
cms/mu-plugins     Headless lock, revalidation webhook, preview link, GraphQL hardening
cms/seed           Seed script, sample content, M1 verification query
infra              docker-compose.yml, Caddyfile, .env.example
web                Next.js app (milestone 2)
```

## Run it locally

Requires Docker. Local hosts are `tagline.localhost` (site) and `cms.tagline.localhost` (WordPress).

```bash
cd infra
cp .env.example .env
docker compose up -d
docker compose run --rm seed
```

The seed installs pinned plugin versions and the theme, sets permalinks, and loads sample content.
It is safe to re-run.

- WordPress admin: http://cms.tagline.localhost/wp-admin (user `admin`, password `admin-local-only`, from `.env.example`)
- GraphiQL IDE: http://cms.tagline.localhost/wp-admin/admin.php?page=graphiql-ide
- GraphQL endpoint: http://cms.tagline.localhost/graphql
- Mailpit (caught email): http://localhost:8025

Check that the whole content model is queryable and the sample content exists:

```bash
node cms/seed/verify.mjs
```

Run WP-CLI commands with `docker compose run --rm wpcli <command>`, for example `docker compose run --rm wpcli post list --post_type=page`.

## Content model

Every marketing page is a WordPress **Page** built from one Flexible Content field, `blocks`.
Editors add, remove and reorder blocks without a developer.

| Block | Fields |
|---|---|
| Hero | eyebrow, heading, subheading, primary CTA, secondary CTA, image |
| Logo cloud | heading, logos |
| Feature grid | heading, intro, features (icon, title, text) |
| Feature split | heading, text, image, image side, CTA |
| Stats | stats (value, label) |
| Testimonials | source: linked case studies, or manual quotes (quote, name, role, avatar) |
| Pricing table | heading, plans, billing toggle |
| FAQ | heading, questions (question, answer) |
| CTA | heading, text, CTA |
| Rich text | content |

| Type | GraphQL | Route |
|---|---|---|
| Page | `page`, `pages` | `/`, `/[...slug]` |
| Post | `post`, `posts` | `/blog/[slug]`, `/blog/category/[slug]` |
| Case study | `caseStudy`, `caseStudies` (+ `blocks`) | `/customers/[slug]` |
| Changelog entry | `changelogEntry`, `changelogEntries`, taxonomy `changeTypes` | `/changelog` |
| Plan | `plan`, `plans` | used by the Pricing table block |
| Lead | REST only (`/wp-json/wp/v2/leads`) | created by the contact form |
| Site settings | `globals { siteSettings { … } }` | announcement bar, footer, social links, default CTA |
| Menus | `menuItems(where: { location: PRIMARY \| FOOTER })` | header, footer |

WordPress URIs match the Next.js routes (`/blog/%postname%/`, category base `blog/category`,
case studies under `/customers/`), so the front end resolves any content by its `uri`.

## WordPress behaviour (mu-plugins)

- **Headless lock:** any front-end request on the CMS host gets a 301 to the same path on the site.
  `/wp-admin`, `/wp-login.php`, `/graphql`, `/wp-json` and static files are untouched.
- **Revalidation webhook:** publishing, updating or unpublishing content, saving a menu, or saving
  site settings sends `{ type, id, uri }` to `SITE_URL/api/revalidate` with an `x-revalidate-secret`
  header. Each event is also logged (`docker compose logs wordpress | grep tagline-revalidate`).
- **Preview:** the editor's Preview button opens `SITE_URL/api/preview?secret=…&id=…&type=…`.
- **GraphQL hardening:** public introspection is on only when `WP_ENVIRONMENT_TYPE` is `local` or `development`.

## Notes

- **Windows and `*.localhost`:** browsers and curl resolve `*.localhost` to 127.0.0.1, but some
  tools (for example Node's `fetch`) don't. Either add both hosts to your hosts file, or use
  `verify.mjs`, which connects to 127.0.0.1 itself.
- **Field-name choices:** repeaters have block-specific names (`features`, `stats`, `questions`,
  `testimonials`) instead of a shared `items`, which keeps GraphQL type names unique. Plan name is
  the post title. Changelog body is a WYSIWYG field.
- **Zero values:** WPGraphQL for ACF returns `null` for any empty value, including `0`. A filter in
  `cms/theme/inc/fields.php` restores zeros for number fields, so the free plan's price is `0`.
- Placeholder images are drawn at seed time (GD), so no binaries live in git.
