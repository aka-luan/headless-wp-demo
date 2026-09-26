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
It is safe to re-run.

On the first run the seed also creates the WordPress **Application Password** that Next.js uses for
previews and the contact form, and prints it once. Put it in `infra/.env` and recreate the web container:

```bash
# WP_APP_PASSWORD=<value printed by the seed>
docker compose up -d web
```

If you lose it, delete `tagline-next` under Users > Profile > Application Passwords and re-run the seed. The first `up` also installs the Next.js dependencies inside the `web`
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
| Contact form | heading, intro, success message |

| Type | GraphQL | Route |
|---|---|---|
| Page | `page`, `pages` | `/`, `/[...slug]` |
| Post | `post`, `posts` | `/blog`, `/blog/[slug]`, `/blog/category/[slug]` |
| Case study | `caseStudy`, `caseStudies` (+ `blocks`) | `/customers`, `/customers/[slug]` |
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
  and committed, so type-checks don't need a running CMS. `next build` does: it prerenders pages
  from WordPress. After changing a field group:

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
- **Live updates:** WordPress calls `/api/revalidate/` on every publish, update, unpublish, menu save,
  site-settings save and category edit. The route expires the matching tags immediately
  (`revalidateTag(tag, { expire: 0 })`), so the next visit renders the change: under 2 seconds locally.
- **Preview:** the editor's Preview button opens `/api/preview/`, which checks the secret, enables
  Draft Mode and redirects to the page. In Draft Mode, getters read with the Application Password, and
  the previewed post is fetched with the `X-GraphQL-Preview` header, so WPGraphQL overlays its latest
  autosave (unsaved changes, SCF fields included). Other pages the editor browses show saved content.
  Never-published drafts have no URL yet and render at `/preview/{type}/{id}/` (404 outside Draft Mode).
  Draft changelog entries show on `/changelog/` (their Preview button opens it). A banner with "Exit preview" is shown on every page.
- **SEO:** every route builds its metadata with `buildMetadata()` in `web/src/lib/seo.ts`: Yoast title and
  description, canonical and `og:url` on the site host (Yoast only knows the CMS host), full Open Graph and
  Twitter tags, robots. JSON-LD: `Organization` site-wide, `Article` on posts, `BreadcrumbList` on nested
  pages, posts, case studies and categories. `sitemap.xml` and `robots.txt` are generated.
- **Contact form:** the Contact form block posts to `/api/contact/`: zod validation, a honeypot field, a
  per-IP limit (5 per 10 minutes), an email over SMTP (Mailpit locally) and a private `lead` post in WordPress.
- **Checks:** `docker compose exec web npm run typecheck` and `docker compose exec web npm run lint`.
- `npm run build` clears Next's fetch cache first, so each build renders current WordPress content.

## WordPress behaviour (mu-plugins)

- **Headless lock:** any front-end request on the CMS host gets a 301 to the same path on the site.
  `/wp-admin`, `/wp-login.php`, `/graphql`, `/wp-json` and static files are untouched.
- **Revalidation webhook:** publishing, updating or unpublishing content, saving a menu, saving
  site settings or editing a category sends `{ type, id, uri }` to `SITE_URL/api/revalidate/` with an
  `x-revalidate-secret` header, after the editor's response has been sent. Each call is logged with its
  result (`docker compose logs wordpress | grep tagline-revalidate`).
- **Preview:** the editor's Preview button opens `SITE_URL/api/preview/?secret=…&id=…&type=…`. The block
  editor's first preview (`/?p=123&preview=true` on the CMS host) is forwarded there too, for users who
  can edit the post.
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
- **Webhook URL locally:** cURL (used by WordPress) always resolves `*.localhost` to 127.0.0.1, ignoring
  Docker's DNS, so it can't reach `tagline.localhost`. Locally, `REVALIDATE_URL` sends the webhook straight
  to the Next.js container. Leave it empty in production.
- **Yoast in lists:** the WPGraphQL Yoast addon returns the first node's SEO data for every node in a list
  query, so SEO fields are only queried on single nodes. Yoast indexables (breadcrumb ancestors) are
  enabled on every environment (`cms/theme/inc/seo.php`); by default Yoast builds them only in production.
- **Testing caching locally:** the dev server never caches. To test revalidation, swap it for a production
  build that Caddy and the webhook reach as `web` (from `infra/`):

  ```bash
  docker compose stop web
  docker compose run -d --name tagline-web-prod -e NODE_ENV=production web sh -c "npm run build && npm start -- -H 0.0.0.0"
  docker network disconnect tagline_default tagline-web-prod
  docker network connect --alias web tagline_default tagline-web-prod
  # when done: docker rm -f tagline-web-prod && docker compose up -d web
  ```

  Draft Mode cookies are `Secure` in production. Browsers accept them on `http://*.localhost`; curl doesn't.
