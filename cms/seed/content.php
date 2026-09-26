<?php
/**
 * Sample content for the demo. Run through `wp eval-file` (see seed.sh).
 * Upserts by slug, so re-running updates content instead of duplicating it.
 */

require_once __DIR__ . '/images.php';

// ---------------------------------------------------------------- helpers

function seed_post(string $type, string $slug, string $title, array $args = []): int
{
    $found = get_posts([
        'post_type'   => $type,
        'name'        => $slug,
        'post_status' => 'any',
        'numberposts' => 1,
        'fields'      => 'ids',
    ]);
    $data = array_merge([
        'post_type'   => $type,
        'post_name'   => $slug,
        'post_title'  => $title,
        'post_status' => 'publish',
    ], $args);
    if ($found) {
        $data['ID'] = $found[0];
    }
    $id = wp_insert_post(wp_slash($data), true);
    if (is_wp_error($id)) {
        WP_CLI::error("{$type} {$slug}: " . $id->get_error_message());
    }
    return (int) $id;
}

/** Sets fields by key: field_{group}_{name}. */
function seed_fields(string $group, array $values, int|string $post_id): void
{
    foreach ($values as $name => $value) {
        update_field("field_{$group}_{$name}", $value, $post_id);
    }
}

function seed_link(string $title, string $url): array
{
    return ['title' => $title, 'url' => $url, 'target' => ''];
}

function seed_seo(int $post_id, string $description): void
{
    update_post_meta($post_id, '_yoast_wpseo_metadesc', $description);
}

function seed_paragraphs(array $paragraphs): string
{
    return implode("\n\n", array_map(
        fn ($p) => str_starts_with($p, '## ')
            ? "<!-- wp:heading -->\n<h2 class=\"wp-block-heading\">" . esc_html(substr($p, 3)) . "</h2>\n<!-- /wp:heading -->"
            : "<!-- wp:paragraph -->\n<p>{$p}</p>\n<!-- /wp:paragraph -->",
        $paragraphs
    ));
}

// ---------------------------------------------------------------- cleanup

foreach ([['post', 'hello-world'], ['page', 'sample-page'], ['page', 'privacy-policy']] as [$type, $slug]) {
    $p = get_page_by_path($slug, OBJECT, $type);
    if ($p) {
        wp_delete_post($p->ID, true);
    }
}

// ---------------------------------------------------------------- media

WP_CLI::log('Images...');
$img = [
    'inbox'    => tagline_seed_image('ui-inbox', 'Tagline inbox with tagged feedback from several channels', fn () => tagline_draw_ui('inbox')),
    'board'    => tagline_seed_image('ui-board', 'Tagline board grouping feedback by theme', fn () => tagline_draw_ui('board')),
    'insights' => tagline_seed_image('ui-insights', 'Tagline insights chart showing request volume by theme', fn () => tagline_draw_ui('insights')),
];
$logoNames = ['Northwind', 'Brightpath', 'Lumen', 'Orbitly', 'Cobalt', 'Fieldnote'];
$logos     = [];
foreach ($logoNames as $i => $name) {
    $logos[$name] = tagline_seed_image('logo-' . strtolower($name), "{$name} logo", fn () => tagline_draw_logo($name, $i, TAGLINE_PALETTE[$i]));
}
$avatars = [];
foreach (['PS' => 'Priya Shah', 'DK' => 'Daniel Kim', 'AM' => 'Ana Moreira', 'JO' => 'Jonah Okafor'] as $ini => $name) {
    $avatars[$ini] = tagline_seed_image('avatar-' . strtolower($ini), $name, fn () => tagline_draw_avatar($ini, TAGLINE_PALETTE[count($avatars) + 1]));
}
$covers = [];
for ($i = 1; $i <= 5; $i++) {
    $covers[$i] = tagline_seed_image("cover-{$i}", 'Abstract cover illustration', fn () => tagline_draw_cover($i));
}

// ---------------------------------------------------------------- plans

WP_CLI::log('Plans...');
$plans = [];
$planData = [
    ['starter', 'Starter', 0, 0, 'For side projects and very small teams.', false, ['1 project', 'Up to 250 feedback items / month', 'Email and widget inbox', 'Manual tagging'], 'Start free'],
    ['team', 'Team', 29, 24, 'For product teams shipping every week.', true, ['Unlimited projects', 'Unlimited feedback', 'AI auto-tagging', 'Slack, Intercom and Zendesk sync', 'Public roadmap'], 'Start 14-day trial'],
    ['business', 'Business', 79, 66, 'For companies with several product lines.', false, ['Everything in Team', 'SSO and audit log', 'Custom fields and segments', 'Priority support', 'Data export API'], 'Talk to sales'],
];
foreach ($planData as $order => [$slug, $name, $monthly, $yearly, $desc, $hl, $features, $cta]) {
    $id = seed_post('plan', $slug, $name, ['menu_order' => $order]);
    seed_fields('plan', [
        'monthly_price' => $monthly,
        'yearly_price'  => $yearly,
        'description'   => $desc,
        'features'      => array_map(fn ($f) => ['feature' => $f], $features),
        'highlighted'   => $hl ? 1 : 0,
        'cta'           => seed_link($cta, $slug === 'business' ? '/about/' : '/pricing/'),
    ], $id);
    $plans[$slug] = $id;
}

// ---------------------------------------------------------------- case studies

WP_CLI::log('Case studies...');
$cases = [];
$caseData = [
    'northwind' => [
        'title'    => 'How Northwind cut feature-request triage from days to minutes',
        'client'   => 'Northwind',
        'industry' => 'Fintech',
        'summary'  => 'We used to spend Monday mornings copying feedback into spreadsheets. Now it arrives tagged, and planning starts with real numbers.',
        'author'   => 'Priya Shah, Head of Product',
        'metrics'  => [['92%', 'less time spent on triage'], ['3x', 'more feedback captured'], ['2 weeks', 'to roll out across 4 teams']],
        'split'    => ['Every channel in one place', '<p>Northwind collected feedback in Intercom, Slack, sales call notes and a shared inbox. Nobody had the full picture. Tagline pulled all four into one inbox in an afternoon.</p><p>Auto-tagging grouped 1,400 historical requests into 38 themes, and the team saw that its most-requested feature had never made the roadmap.</p>'],
        'img'      => 'inbox',
        'logo'     => 'Northwind',
    ],
    'brightpath' => [
        'title'    => 'Brightpath closes the loop with 40,000 teachers',
        'client'   => 'Brightpath',
        'industry' => 'EdTech',
        'summary'  => 'Teachers can see what we are building and why. Support tickets about "is this coming?" dropped by half.',
        'author'   => 'Daniel Kim, VP Product',
        'metrics'  => [['48%', 'fewer roadmap tickets'], ['40k', 'teachers on the public roadmap'], ['+11', 'NPS in two quarters']],
        'split'    => ['A roadmap teachers trust', '<p>Brightpath publishes a Tagline roadmap inside its app. Teachers upvote ideas, and when a feature ships, everyone who asked for it gets an email automatically.</p><p>The product team now plans each term from vote counts and revenue data side by side.</p>'],
        'img'      => 'board',
        'logo'     => 'Brightpath',
    ],
];
foreach ($caseData as $slug => $c) {
    $id = seed_post('case_study', $slug, $c['title']);
    set_post_thumbnail($id, $img[$c['img']]);
    seed_fields('case_study', [
        'client_name'  => $c['client'],
        'industry'     => $c['industry'],
        'logo'         => $logos[$c['logo']],
        'summary'      => $c['summary'],
        'quote_author' => $c['author'],
        'metrics'      => array_map(fn ($m) => ['value' => $m[0], 'label' => $m[1]], $c['metrics']),
    ], $id);
    update_field('field_blocks_blocks', [
        ['acf_fc_layout' => 'feature_split', 'heading' => $c['split'][0], 'text' => $c['split'][1], 'image' => $img[$c['img']], 'image_side' => 'right', 'cta' => null],
        ['acf_fc_layout' => 'stats', 'stats' => array_map(fn ($m) => ['value' => $m[0], 'label' => $m[1]], $c['metrics'])],
        ['acf_fc_layout' => 'cta', 'heading' => 'See what your customers are asking for', 'text' => 'Connect your first channel in five minutes.', 'cta' => seed_link('Start free', '/pricing/')],
    ], $id);
    seed_seo($id, $c['summary']);
    $cases[$slug] = $id;
}

// ---------------------------------------------------------------- pages

WP_CLI::log('Pages...');
$home = seed_post('page', 'home', 'Home');
update_field('field_blocks_blocks', [
    [
        'acf_fc_layout' => 'hero',
        'eyebrow'       => 'Customer feedback, sorted',
        'heading'       => 'Know what to build next.',
        'subheading'    => 'Tagline collects feedback from every channel, tags it automatically and shows your team which requests matter most.',
        'primary_cta'   => seed_link('Start free', '/pricing/'),
        'secondary_cta' => seed_link('Read customer stories', '/customers/'),
        'image'         => $img['inbox'],
    ],
    ['acf_fc_layout' => 'logo_cloud', 'heading' => 'Trusted by product teams at', 'logos' => array_values($logos)],
    [
        'acf_fc_layout' => 'feature_grid',
        'heading'       => 'All your feedback in one inbox',
        'intro'         => 'Stop digging through Slack threads and support tickets. Tagline brings every request into one place and keeps it organised.',
        'features'      => [
            ['icon' => 'inbox', 'title' => 'One inbox', 'text' => 'Email, in-app widget, Slack, Intercom and Zendesk, all in one searchable stream.'],
            ['icon' => 'tag', 'title' => 'Auto-tagging', 'text' => 'Every item is tagged by theme, product area and sentiment as it arrives.'],
            ['icon' => 'chart', 'title' => 'Trends', 'text' => 'See which themes are growing and which customers are asking.'],
            ['icon' => 'users', 'title' => 'Customer context', 'text' => 'Plan, revenue and account owner next to every request.'],
            ['icon' => 'target', 'title' => 'Prioritise', 'text' => 'Score ideas by reach, revenue and effort, then commit with confidence.'],
            ['icon' => 'message', 'title' => 'Close the loop', 'text' => 'Notify everyone who asked when a feature ships.'],
        ],
    ],
    [
        'acf_fc_layout' => 'feature_split',
        'heading'       => 'Tags that write themselves',
        'text'          => '<p>Tagline reads each piece of feedback and files it under the right theme. You review and correct, and it learns your product vocabulary.</p><ul><li>Works in 30+ languages</li><li>Merges duplicates automatically</li><li>Your data never trains shared models</li></ul>',
        'image'         => $img['board'],
        'image_side'    => 'right',
        'cta'           => seed_link('See pricing', '/pricing/'),
    ],
    ['acf_fc_layout' => 'stats', 'stats' => [
        ['value' => '2,300+', 'label' => 'product teams'],
        ['value' => '41M', 'label' => 'feedback items tagged'],
        ['value' => '6 min', 'label' => 'average setup time'],
        ['value' => '4.8/5', 'label' => 'G2 rating'],
    ]],
    [
        'acf_fc_layout' => 'feature_split',
        'heading'       => 'Decide with numbers, not the loudest voice',
        'text'          => '<p>Insights show request volume by theme, weighted by revenue. Share a live view with leadership instead of rebuilding slides every quarter.</p>',
        'image'         => $img['insights'],
        'image_side'    => 'left',
        'cta'           => null,
    ],
    ['acf_fc_layout' => 'testimonials', 'source' => 'case_studies', 'case_studies' => array_values($cases), 'testimonials' => []],
    ['acf_fc_layout' => 'cta', 'heading' => 'Start listening today', 'text' => 'Free for small teams. No credit card required.', 'cta' => seed_link('Start free', '/pricing/')],
], $home);
seed_seo($home, 'Tagline collects customer feedback from every channel, tags it automatically and shows product teams what to build next.');

$pricing = seed_post('page', 'pricing', 'Pricing');
update_field('field_blocks_blocks', [
    ['acf_fc_layout' => 'hero', 'eyebrow' => 'Pricing', 'heading' => 'Simple plans that grow with your team', 'subheading' => 'Start free. Upgrade when feedback starts to pile up.', 'primary_cta' => null, 'secondary_cta' => null, 'image' => null],
    ['acf_fc_layout' => 'pricing_table', 'heading' => 'Choose a plan', 'plans' => array_values($plans), 'billing_toggle' => 1],
    ['acf_fc_layout' => 'faq', 'heading' => 'Frequently asked questions', 'questions' => [
        ['question' => 'Is there a free trial?', 'answer' => 'Yes. Team and Business include a 14-day trial with every feature unlocked. No credit card needed.'],
        ['question' => 'What counts as a feedback item?', 'answer' => 'Any single message, ticket, survey answer or note that lands in your inbox. Merged duplicates count once.'],
        ['question' => 'Can I change plans later?', 'answer' => 'Any time. Upgrades apply immediately, and downgrades apply at the next billing date.'],
        ['question' => 'Where is my data stored?', 'answer' => 'In the EU or US, your choice. Data is encrypted at rest and in transit.'],
        ['question' => 'Do you offer discounts for non-profits?', 'answer' => 'Yes, 50% off Team and Business for registered non-profits and education.'],
    ]],
    ['acf_fc_layout' => 'cta', 'heading' => 'Not sure which plan fits?', 'text' => 'Tell us about your team and we will suggest one.', 'cta' => seed_link('Contact us', '/about/')],
], $pricing);
seed_seo($pricing, 'Tagline pricing: free for small teams, Team at $29/month and Business at $79/month. 14-day free trial, no credit card.');

$about = seed_post('page', 'about', 'About');
update_field('field_blocks_blocks', [
    ['acf_fc_layout' => 'hero', 'eyebrow' => 'About us', 'heading' => 'We build tools for teams who listen', 'subheading' => 'Tagline started in 2021 when three product managers got tired of losing feedback in spreadsheets.', 'primary_cta' => seed_link('See open roles', '/blog/'), 'secondary_cta' => null, 'image' => null],
    ['acf_fc_layout' => 'rich_text', 'content' => '<h2>Our story</h2><p>Every product team says it listens to customers, but most feedback never reaches the people who decide what to build. It sits in a support ticket, a sales call note or a Slack thread that scrolled away.</p><p>We built Tagline to fix that: one place where every request lands, gets understood and turns into a decision. Today more than 2,000 teams use it to plan their roadmaps.</p><h2>What we believe</h2><ul><li><strong>Feedback is data.</strong> Treat it with the same rigour as analytics.</li><li><strong>Close the loop.</strong> Customers who hear back trust you more.</li><li><strong>Small teams, big leverage.</strong> The best tools stay out of the way.</li></ul>'],
    ['acf_fc_layout' => 'stats', 'stats' => [['value' => '2021', 'label' => 'founded'], ['value' => '34', 'label' => 'people'], ['value' => '12', 'label' => 'countries'], ['value' => '100%', 'label' => 'remote']]],
    ['acf_fc_layout' => 'feature_split', 'heading' => 'Built in the open', 'text' => '<p>We publish our own roadmap and changelog, powered by Tagline. See what we are working on and tell us what we are missing.</p>', 'image' => $img['insights'], 'image_side' => 'left', 'cta' => seed_link('Read the changelog', '/changelog/')],
    ['acf_fc_layout' => 'testimonials', 'source' => 'manual', 'case_studies' => [], 'testimonials' => [
        ['quote' => 'The first tool our support and product teams both actually like.', 'name' => 'Ana Moreira', 'role' => 'Support Lead, Lumen', 'avatar' => $avatars['AM']],
        ['quote' => 'We replaced three tools and a spreadsheet with Tagline in one week.', 'name' => 'Jonah Okafor', 'role' => 'PM, Orbitly', 'avatar' => $avatars['JO']],
    ]],
    ['acf_fc_layout' => 'cta', 'heading' => 'Want to work with us?', 'text' => 'We are hiring engineers and designers who care about craft.', 'cta' => seed_link('Get in touch', 'mailto:hello@tagline.localhost')],
], $about);
seed_seo($about, 'Tagline is a remote team of 34 people building customer-feedback tools for product teams.');

update_option('show_on_front', 'page');
update_option('page_on_front', $home);

// ---------------------------------------------------------------- posts

WP_CLI::log('Posts...');
$author = get_user_by('login', 'maya');
if (!$author) {
    $uid = wp_insert_user([
        'user_login'   => 'maya',
        'user_pass'    => wp_generate_password(24),
        'user_email'   => 'maya@tagline.localhost',
        'display_name' => 'Maya Lindqvist',
        'first_name'   => 'Maya',
        'last_name'    => 'Lindqvist',
        'role'         => 'author',
        'description'  => 'Product lead at Tagline. Writes about research, prioritisation and shipping.',
    ]);
    $author = get_user_by('id', $uid);
}

$cats = [];
foreach (['Product' => 'product', 'Guides' => 'guides', 'Company' => 'company'] as $name => $slug) {
    $term       = term_exists($slug, 'category') ?: wp_insert_term($name, 'category', ['slug' => $slug]);
    $cats[$slug] = (int) $term['term_id'];
}
wp_update_term(1, 'category', ['name' => 'Uncategorized', 'slug' => 'uncategorized']);

$posts = [
    ['feedback-inbox-zero', 'Inbox zero for customer feedback', 'guides', '2026-09-18',
        'A weekly routine that keeps a feedback inbox under control without a full-time triager.',
        ['Most teams set up a feedback inbox with good intentions. Six months later it has 3,000 unread items and nobody opens it.', '## Triage in batches, not in real time', 'Block 30 minutes twice a week. Tag, merge duplicates and archive noise. Anything that needs a reply goes to support with one click.', '## Let tags do the sorting', 'With auto-tagging on, most items arrive already filed. Your job becomes reviewing, not reading everything from scratch.', 'Teams that follow this routine keep their inbox under 50 open items, and they trust the numbers when planning starts.']],
    ['introducing-auto-tagging', 'Introducing auto-tagging', 'product', '2026-09-02',
        'Tagline now tags every piece of feedback by theme, product area and sentiment as it arrives.',
        ['Today we are launching auto-tagging for every Team and Business workspace.', 'Tagline reads each item and suggests themes based on your existing tags. Accept or correct a suggestion and it learns your vocabulary.', '## Private by default', 'Your feedback is never used to train shared models. Tagging runs on a model tuned per workspace.', 'Turn it on under Settings, then Tagging. It also processes your backlog of existing items.']],
    ['rice-scoring-without-spreadsheets', 'RICE scoring without the spreadsheet', 'guides', '2026-08-21',
        'How to score reach, impact, confidence and effort straight from real feedback data.',
        ['RICE is a good framework held back by bad inputs. Reach is usually a guess, and impact is whoever argued loudest.', '## Reach from real requests', 'In Tagline, reach is the number of unique accounts that asked for a theme, weighted by plan if you choose.', '## Keep effort honest', 'Ask engineering for T-shirt sizes and map them to numbers. Precision matters less than consistency.', 'The result is a ranked list you can defend in a planning meeting.']],
    ['we-raised-our-series-a', 'We raised our Series A', 'company', '2026-07-30',
        'Tagline has raised $14M to help more product teams turn feedback into decisions.',
        ['We are excited to share that Tagline has raised a $14M Series A.', 'The money goes into three areas: deeper integrations, better insights and a bigger support team so every customer gets a fast answer.', 'Thank you to the 2,300 teams who trusted us early. We are just getting started.']],
    ['closing-the-feedback-loop', 'Closing the loop: why telling customers matters', 'product', '2026-07-12',
        'Customers who hear back about their feedback are more likely to renew. Here is how to make it automatic.',
        ['When a customer takes the time to request a feature, the worst outcome is silence.', '## Automatic ship notes', 'Link a feedback theme to a roadmap item. When the item ships, Tagline emails everyone who asked, with your release note.', '## Measure the effect', 'Across our customers, accounts that received a ship note renewed at a 9% higher rate than those that did not.']],
];
foreach ($posts as $i => [$slug, $title, $cat, $date, $excerpt, $body]) {
    $id = seed_post('post', $slug, $title, [
        'post_content'  => seed_paragraphs($body),
        'post_excerpt'  => $excerpt,
        'post_date'     => "{$date} 09:00:00",
        'post_author'   => $author->ID,
        'post_category' => [$cats[$cat]],
    ]);
    set_post_thumbnail($id, $covers[$i + 1]);
    seed_seo($id, $excerpt);
}

// ---------------------------------------------------------------- changelog

WP_CLI::log('Changelog...');
foreach (['New' => 'new', 'Improved' => 'improved', 'Fixed' => 'fixed'] as $name => $slug) {
    term_exists($slug, 'change_type') || wp_insert_term($name, 'change_type', ['slug' => $slug]);
}
$entries = [
    ['2-5-0', 'Auto-tagging for everyone', '2.5.0', '2026-09-02', ['new'], '<p>Every Team and Business workspace can now turn on auto-tagging. Suggestions learn from your corrections.</p>'],
    ['2-4-2', 'Faster inbox search', '2.4.2', '2026-08-19', ['improved'], '<p>Search results now load up to 4x faster on large workspaces, and you can filter by date range.</p>'],
    ['2-4-1', 'Slack thread import fixes', '2.4.1', '2026-08-05', ['fixed'], '<p>Fixed an issue where replies in long Slack threads were imported out of order.</p>'],
    ['2-4-0', 'Public roadmap themes', '2.4.0', '2026-07-22', ['new', 'improved'], '<p>Public roadmaps can now use your brand colours and logo. Voting widgets load 30% faster.</p>'],
    ['2-3-3', 'CSV export for segments', '2.3.3', '2026-07-08', ['improved', 'fixed'], '<p>Export any segment to CSV, including custom fields. Also fixed an issue with timezones in weekly digests.</p>'],
];
foreach ($entries as [$slug, $title, $version, $date, $types, $body]) {
    $id = seed_post('changelog_entry', $slug, $title, ['post_date' => "{$date} 12:00:00"]);
    seed_fields('changelog', ['version' => $version, 'release_date' => str_replace('-', '', $date), 'body' => $body], $id);
    wp_set_object_terms($id, $types, 'change_type');
}

// ---------------------------------------------------------------- global settings

WP_CLI::log('Site settings...');
seed_fields('site_settings', [
    'announcement_enabled' => 1,
    'announcement_text'    => 'New: auto-tagging is now available on every plan.',
    'announcement_link'    => seed_link('Read the announcement', '/blog/introducing-auto-tagging/'),
    'footer_text'          => 'Tagline helps product teams collect, tag and act on customer feedback.',
    'social_links'         => [
        ['network' => 'x', 'url' => 'https://x.com/'],
        ['network' => 'linkedin', 'url' => 'https://www.linkedin.com/'],
        ['network' => 'github', 'url' => 'https://github.com/aka-luan'],
    ],
    'default_cta'          => seed_link('Start free', '/pricing/'),
], 'option');

// ---------------------------------------------------------------- menus

WP_CLI::log('Menus...');
$menuSpec = [
    'primary' => ['Main', [
        ['page', $pricing, 'Pricing'],
        ['custom', '/customers/', 'Customers'],
        ['custom', '/changelog/', 'Changelog'],
        ['custom', '/blog/', 'Blog'],
        ['page', $about, 'About'],
    ]],
    'footer'  => ['Footer', [
        ['page', $pricing, 'Pricing'],
        ['custom', '/customers/', 'Customers'],
        ['custom', '/changelog/', 'Changelog'],
        ['custom', '/blog/', 'Blog'],
        ['page', $about, 'About'],
    ]],
];
$locations = get_theme_mod('nav_menu_locations', []);
foreach ($menuSpec as $location => [$name, $items]) {
    $menu = wp_get_nav_menu_object($name);
    if ($menu) {
        foreach (wp_get_nav_menu_items($menu->term_id) ?: [] as $item) {
            wp_delete_post($item->ID, true);
        }
        $menuId = $menu->term_id;
    } else {
        $menuId = wp_create_nav_menu($name);
    }
    foreach ($items as $pos => [$kind, $target, $label]) {
        $args = ['menu-item-title' => $label, 'menu-item-status' => 'publish', 'menu-item-position' => $pos + 1];
        $args += $kind === 'page'
            ? ['menu-item-type' => 'post_type', 'menu-item-object' => 'page', 'menu-item-object-id' => $target]
            : ['menu-item-type' => 'custom', 'menu-item-url' => $target];
        wp_update_nav_menu_item($menuId, 0, $args);
    }
    $locations[$location] = $menuId;
}
set_theme_mod('nav_menu_locations', $locations);

WP_CLI::success('Content seeded.');
