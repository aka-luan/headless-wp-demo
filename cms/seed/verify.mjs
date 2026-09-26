// Checks the M1 "done when": every type and block field is queryable and the sample content exists.
// Usage: node cms/seed/verify.mjs [graphql-url]   (default http://cms.tagline.localhost/graphql)
import { readFileSync } from 'node:fs';
import http from 'node:http';
import https from 'node:https';

const url = new URL(process.argv[2] ?? process.env.WP_GRAPHQL_URL ?? 'http://cms.tagline.localhost/graphql');
const query = readFileSync(new URL('./verify.graphql', import.meta.url), 'utf8');

// Windows does not resolve *.localhost, so connect to loopback and send the Host header.
function post(body) {
  const lib = url.protocol === 'https:' ? https : http;
  const host = url.hostname.endsWith('.localhost') ? '127.0.0.1' : url.hostname;
  return new Promise((resolve, reject) => {
    const req = lib.request(
      { host, port: url.port || (url.protocol === 'https:' ? 443 : 80), path: url.pathname, method: 'POST',
        headers: { host: url.host, 'content-type': 'application/json', 'content-length': Buffer.byteLength(body) } },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => { try { resolve(JSON.parse(data)); } catch { reject(new Error(`Non-JSON response (${res.statusCode}): ${data.slice(0, 300)}`)); } });
      },
    );
    req.on('error', reject);
    req.end(body);
  });
}

const res = await post(JSON.stringify({ query }));
if (res.errors) {
  console.error('GraphQL errors:\n' + res.errors.map((e) => ' - ' + e.message).join('\n'));
  process.exit(1);
}
const d = res.data;
const failures = [];
const check = (ok, msg) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`); if (!ok) failures.push(msg); };

// Counts from the spec.
const pages = d.pages.nodes.filter((p) => p.pageBuilder?.blocks?.length);
check(pages.length === 3, `3 block-built pages (got ${pages.length}: ${pages.map((p) => p.uri).join(', ')})`);
check(d.posts.nodes.length === 5, `5 posts (got ${d.posts.nodes.length})`);
check(d.caseStudies.nodes.length === 2, `2 case studies (got ${d.caseStudies.nodes.length})`);
check(d.plans.nodes.length === 3, `3 plans (got ${d.plans.nodes.length})`);
check(d.changelogEntries.nodes.length === 5, `5 changelog entries (got ${d.changelogEntries.nodes.length})`);

check(pages.some((p) => p.uri === '/' && p.isFrontPage), 'Home is the front page at URI "/"');
for (const uri of ['/pricing/', '/about/']) check(pages.some((p) => p.uri === uri), `Page ${uri} exists`);

// Every block type appears at least once, with every field filled.
const LAYOUTS = ['Hero', 'LogoCloud', 'FeatureGrid', 'FeatureSplit', 'Stats', 'Testimonials', 'PricingTable', 'Faq', 'Cta', 'RichText']
  .map((n) => `PageBuilderBlocks${n}Layout`);
const allBlocks = [...pages, ...d.caseStudies.nodes].flatMap((n) => n.pageBuilder?.blocks ?? []);
// Link `target` is usually blank; testimonials fill either caseStudies or testimonials, depending on `source`.
const EXEMPT = new Set(['target', 'caseStudies', 'testimonials']);
function missing(obj, path = '') {
  if (obj === null || obj === undefined || obj === '') return [path];
  if (Array.isArray(obj)) return obj.length ? obj.flatMap((v, i) => missing(v, `${path}[${i}]`)) : [path];
  if (typeof obj === 'object') {
    return Object.entries(obj).flatMap(([k, v]) => (EXEMPT.has(k) ? [] : missing(v, path ? `${path}.${k}` : k)));
  }
  return [];
}
for (const layout of LAYOUTS) {
  const instances = allBlocks.filter((b) => b.__typename === layout);
  const full = instances.find((b) => missing(b).length === 0);
  check(!!full, `${layout}: ${instances.length} instance(s), one with every field filled${full ? '' : ` — empty: ${missing(instances[0] ?? {}).join(', ')}`}`);
}
const t = allBlocks.filter((b) => b.__typename === 'PageBuilderBlocksTestimonialsLayout');
check(t.some((b) => b.source === 'case_studies' && b.caseStudies?.nodes?.length), 'Testimonials sourced from case studies');
check(t.some((b) => b.source === 'manual' && b.testimonials?.length), 'Testimonials entered manually');
const pt = allBlocks.find((b) => b.__typename === 'PageBuilderBlocksPricingTableLayout');
check(pt?.plans?.nodes?.length === 3, 'Pricing table links 3 plans');

// Other types: no empty fields.
const nonEmpty = (label, obj) => { const m = missing(obj); check(m.length === 0, `${label}${m.length ? ' — empty: ' + m.slice(0, 6).join(', ') : ''}`); };
d.posts.nodes.forEach((p) => nonEmpty(`Post ${p.uri}`, p));
d.caseStudies.nodes.forEach(({ pageBuilder, ...c }) => nonEmpty(`Case study ${c.uri}`, c));
d.plans.nodes.forEach((p) => nonEmpty(`Plan ${p.title}`, { ...p, menuOrder: 1, planDetails: { ...p.planDetails, highlighted: true, monthlyPrice: 1, yearlyPrice: 1 } }));
d.changelogEntries.nodes.forEach((e) => nonEmpty(`Changelog ${e.changelogDetails?.version}`, e));
check(d.changeTypes.nodes.map((n) => n.name).sort().join() === 'Fixed,Improved,New', 'change_type terms: New, Improved, Fixed');
check(d.categories.nodes.every((c) => c.uri.startsWith('/blog/category/')), 'Category URIs are /blog/category/{slug}/');
check(d.posts.nodes.every((p) => p.uri.startsWith('/blog/')), 'Post URIs are /blog/{slug}/');
check(d.caseStudies.nodes.every((c) => c.uri.startsWith('/customers/')), 'Case study URIs are /customers/{slug}/');
nonEmpty('Global settings', d.globals?.siteSettings);
check(d.primary.nodes.length > 0, `Primary menu (${d.primary.nodes.map((n) => n.label).join(', ')})`);
check(d.footer.nodes.length > 0, `Footer menu (${d.footer.nodes.map((n) => n.label).join(', ')})`);
check(d.primary.nodes.every((n) => n.path?.startsWith('/')), 'Menu items resolve to site-relative paths');
check(pages.every((p) => p.seo?.metaDesc), 'Yoast meta description on every page');
check(d.generalSettings.title === 'Tagline', `Site title is "${d.generalSettings.title}"`);

console.log(failures.length ? `\n${failures.length} check(s) failed.` : '\nAll M1 checks passed.');
process.exit(failures.length ? 1 : 0);
