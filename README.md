# Tagline: headless WordPress + Next.js

A fictional SaaS marketing site (Tagline, a customer-feedback tool) built to show that a
marketing team can edit freely in WordPress while visitors get a fast Next.js site.

| Layer | Choice |
|---|---|
| CMS | WordPress (latest) with a minimal theme and no front-end templates |
| Fields | [Secure Custom Fields](https://wordpress.org/plugins/secure-custom-fields/): Flexible Content, Repeater, Gallery, Options page |
| API | WPGraphQL + WPGraphQL for ACF |
| SEO | Yoast SEO + WPGraphQL Yoast SEO Addon |
| Front end | Next.js 16 (App Router), TypeScript strict, Tailwind CSS 4 |
| Hosting | Docker Compose, Caddy, MariaDB |

## Repo layout

```
cms/theme          Headless theme: CPTs, taxonomy, menus, options page
cms/theme/acf-json Field groups as JSON (the content model, versioned in git)
cms/mu-plugins     Headless lock, revalidation webhook, preview link, GraphQL hardening
cms/seed           Seed script, sample content, M1 verification query
infra              docker-compose.yml, Caddyfile, .env.example
web                Next.js app
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
It is safe to re-run. The first `up` also installs the Next.js dependencies inside the `web`
container, which takes a minute or two (`docker compose logs -f web`).

- Site (Next.js dev server): http://tagline.localhost
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

## Front end (`web/`)

- **Data layer:** every request goes through `wpFetch(query, variables, { tags })` in
  `web/src/lib/wp/client.ts`, server side only. In production, responses are cached with the tags
  `wp:type:{postType}`, `wp:uri:{uri}`, `wp:menus` and `wp:options`. In development they are never cached.
- **Types:** queries and fragments live in `.graphql` files. Types are generated from the live schema
  and committed, so type-checks and builds don't need a running CMS. After changing a field group:

  ```bash
  docker compose exec web npm run codegen
  ```

- **Blocks:** `<Blocks blocks={page.pageBuilder.blocks} />` maps each layout's `__typename` to a component
  in `web/src/components/blocks/`. A layout the front end doesn't know yet renders nothing in production
  and a placeholder in development. To add a block: create the layout in WordPress, add a component and
  a `.graphql` fragment next to it, spread the fragment in `blocks.graphql`, run codegen, and register the
  component in `Blocks.tsx`.
- **Design tokens:** colours, radii and fonts are semantic tokens in `web/src/app/globals.css`
  (`bg-surface`, `text-muted`, `bg-accent`...). Components use only those names.
- **Checks:** `docker compose exec web npm run typecheck` and `docker compose exec web npm run lint`.
- `npm run build` clears Next's fetch cache first, so each build renders current WordPress content.

## WordPress behaviour (mu-plugins)

- **Headless lock:** any front-end request on the CMS host gets a 301 to the same path on the site.
  `/wp-admin`, `/wp-login.php`, `/graphql`, `/wp-json` and static files are untouched.
- **Revalidation webhook:** publishing, updating or unpublishing content, saving a menu, or saving
  site settings sends `{ type, id, uri }` to `SITE_URL/api/revalidate` with an `x-revalidate-secret`
  header. Each event is also logged (`docker compose logs wordpress | grep tagline-revalidate`).
- **Preview:** the editor's Preview button opens `SITE_URL/api/preview?secret=…&id=…&type=…`.
- **GraphQL hardening:** public introspection is on only when `WP_ENVIRONMENT_TYPE` is `local` or `development`.

## Notes

- **Windows and `*.localhost`:** browsers and curl resolve `*.localhost` to 127.0.0.1, but Node
  doesn't. That's why the Next.js dev server runs inside Docker, where both hosts resolve to Caddy.
  `verify.mjs` connects to 127.0.0.1 itself.
- **Dev server file watching:** file events don't cross a Windows-to-Docker bind mount, so the Docker
  dev server uses webpack with polling (`next dev --webpack`, `WATCHPACK_POLLING`). Production builds
  use Next's default bundler.
- **Field-name choices:** repeaters have block-specific names (`features`, `stats`, `questions`,
  `testimonials`) instead of a shared `items`, which keeps GraphQL type names unique. Plan name is
  the post title. Changelog body is a WYSIWYG field.
- **Zero values:** WPGraphQL for ACF returns `null` for any empty value, including `0`. A filter in
  `cms/theme/inc/fields.php` restores zeros for number fields, so the free plan's price is `0`.
- Placeholder images are drawn at seed time (GD), so no binaries live in git.
