/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment PageBuilder on PageBuilder {\n  blocks {\n    __typename\n    ...HeroBlock\n    ...LogoCloudBlock\n    ...FeatureGridBlock\n    ...FeatureSplitBlock\n    ...StatsBlock\n    ...TestimonialsBlock\n    ...PricingTableBlock\n    ...FaqBlock\n    ...CtaBlock\n    ...RichTextBlock\n    ...ContactFormBlock\n  }\n}": typeof types.PageBuilderFragmentDoc,
    "fragment ContactFormBlock on PageBuilderBlocksContactFormLayout {\n  heading\n  intro\n  successMessage\n}": typeof types.ContactFormBlockFragmentDoc,
    "fragment CtaBlock on PageBuilderBlocksCtaLayout {\n  heading\n  text\n  cta {\n    ...Link\n  }\n}": typeof types.CtaBlockFragmentDoc,
    "fragment FaqBlock on PageBuilderBlocksFaqLayout {\n  heading\n  questions {\n    question\n    answer\n  }\n}": typeof types.FaqBlockFragmentDoc,
    "fragment FeatureGridBlock on PageBuilderBlocksFeatureGridLayout {\n  heading\n  intro\n  features {\n    icon\n    title\n    text\n  }\n}": typeof types.FeatureGridBlockFragmentDoc,
    "fragment FeatureSplitBlock on PageBuilderBlocksFeatureSplitLayout {\n  heading\n  text\n  imageSide\n  image {\n    node {\n      ...Media\n    }\n  }\n  cta {\n    ...Link\n  }\n}": typeof types.FeatureSplitBlockFragmentDoc,
    "fragment HeroBlock on PageBuilderBlocksHeroLayout {\n  eyebrow\n  heading\n  subheading\n  primaryCta {\n    ...Link\n  }\n  secondaryCta {\n    ...Link\n  }\n  image {\n    node {\n      ...Media\n    }\n  }\n}": typeof types.HeroBlockFragmentDoc,
    "fragment LogoCloudBlock on PageBuilderBlocksLogoCloudLayout {\n  heading\n  logos {\n    nodes {\n      ...Media\n    }\n  }\n}": typeof types.LogoCloudBlockFragmentDoc,
    "fragment PricingTableBlock on PageBuilderBlocksPricingTableLayout {\n  heading\n  billingToggle\n  plans {\n    nodes {\n      ... on Plan {\n        id\n        title\n        planDetails {\n          monthlyPrice\n          yearlyPrice\n          description\n          highlighted\n          features {\n            feature\n          }\n          cta {\n            ...Link\n          }\n        }\n      }\n    }\n  }\n}": typeof types.PricingTableBlockFragmentDoc,
    "fragment RichTextBlock on PageBuilderBlocksRichTextLayout {\n  content\n}": typeof types.RichTextBlockFragmentDoc,
    "fragment StatsBlock on PageBuilderBlocksStatsLayout {\n  stats {\n    value\n    label\n  }\n}": typeof types.StatsBlockFragmentDoc,
    "fragment TestimonialsBlock on PageBuilderBlocksTestimonialsLayout {\n  source\n  caseStudies {\n    nodes {\n      ... on CaseStudy {\n        id\n        uri\n        caseStudyDetails {\n          clientName\n          summary\n          quoteAuthor\n          logo {\n            node {\n              ...Media\n            }\n          }\n        }\n      }\n    }\n  }\n  testimonials {\n    quote\n    name\n    role\n    avatar {\n      node {\n        ...Media\n      }\n    }\n  }\n}": typeof types.TestimonialsBlockFragmentDoc,
    "fragment CaseStudyCard on CaseStudy {\n  id\n  title\n  uri\n  caseStudyDetails {\n    clientName\n    industry\n    summary\n    logo {\n      node {\n        ...Media\n      }\n    }\n  }\n}\n\nquery CaseStudyBy($id: ID!, $idType: CaseStudyIdType!) {\n  caseStudy(id: $id, idType: $idType) {\n    databaseId\n    title\n    uri\n    featuredImage {\n      node {\n        ...Media\n      }\n    }\n    caseStudyDetails {\n      clientName\n      industry\n      summary\n      quoteAuthor\n      logo {\n        node {\n          ...Media\n        }\n      }\n      metrics {\n        value\n        label\n      }\n    }\n    pageBuilder {\n      ...PageBuilder\n    }\n    seo {\n      ...Seo\n    }\n  }\n}\n\nquery CaseStudyList {\n  caseStudies(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      ...CaseStudyCard\n    }\n  }\n}": typeof types.CaseStudyCardFragmentDoc,
    "query ChangelogEntries($stati: [PostStatusEnum]) {\n  changelogEntries(first: 100, where: {stati: $stati}) {\n    nodes {\n      databaseId\n      title\n      status\n      changelogDetails {\n        version\n        releaseDate\n        body\n      }\n      changeTypes {\n        nodes {\n          name\n          slug\n        }\n      }\n    }\n  }\n}": typeof types.ChangelogEntriesDocument,
    "fragment Media on MediaItem {\n  sourceUrl\n  altText\n  mediaDetails {\n    width\n    height\n  }\n}\n\nfragment Link on AcfLink {\n  title\n  url\n  target\n}\n\nfragment Seo on PostTypeSEO {\n  title\n  metaDesc\n  metaRobotsNoindex\n  metaRobotsNofollow\n  opengraphTitle\n  opengraphDescription\n  opengraphType\n  opengraphPublishedTime\n  opengraphModifiedTime\n  opengraphImage {\n    ...Media\n  }\n  twitterTitle\n  twitterDescription\n  twitterImage {\n    sourceUrl\n  }\n  breadcrumbs {\n    text\n    url\n  }\n}\n\nfragment TaxonomySeo on TaxonomySEO {\n  title\n  metaDesc\n  metaRobotsNoindex\n  metaRobotsNofollow\n  opengraphTitle\n  opengraphDescription\n  opengraphImage {\n    ...Media\n  }\n  breadcrumbs {\n    text\n    url\n  }\n}": typeof types.MediaFragmentDoc,
    "query Layout {\n  generalSettings {\n    title\n    description\n  }\n  globals {\n    siteSettings {\n      announcementEnabled\n      announcementText\n      announcementLink {\n        ...Link\n      }\n      footerText\n      socialLinks {\n        network\n        url\n      }\n      defaultCta {\n        ...Link\n      }\n    }\n  }\n  primaryMenu: menuItems(where: {location: PRIMARY}, first: 50) {\n    nodes {\n      ...MenuItem\n    }\n  }\n  footerMenu: menuItems(where: {location: FOOTER}, first: 50) {\n    nodes {\n      ...MenuItem\n    }\n  }\n}\n\nfragment MenuItem on MenuItem {\n  id\n  label\n  url\n  path\n  target\n  parentId\n}": typeof types.LayoutDocument,
    "query PageBy($id: ID!, $idType: PageIdType!) {\n  page(id: $id, idType: $idType) {\n    databaseId\n    title\n    uri\n    isFrontPage\n    seo {\n      ...Seo\n    }\n    pageBuilder {\n      ...PageBuilder\n    }\n  }\n}\n\nquery PageUris {\n  pages(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n    }\n  }\n}": typeof types.PageByDocument,
    "fragment PostCard on Post {\n  id\n  title\n  uri\n  date\n  excerpt\n  featuredImage {\n    node {\n      ...Media\n    }\n  }\n  categories {\n    nodes {\n      name\n      uri\n    }\n  }\n}\n\nquery PostBy($id: ID!, $idType: PostIdType!) {\n  post(id: $id, idType: $idType) {\n    databaseId\n    title\n    uri\n    date\n    modified\n    content\n    excerpt\n    featuredImage {\n      node {\n        ...Media\n      }\n    }\n    author {\n      node {\n        name\n        description\n      }\n    }\n    categories {\n      nodes {\n        name\n        uri\n      }\n    }\n    seo {\n      ...Seo\n    }\n  }\n}\n\nquery PostList($first: Int!) {\n  posts(first: $first, where: {status: PUBLISH}) {\n    nodes {\n      ...PostCard\n    }\n  }\n  categories(first: 50, where: {hideEmpty: true}) {\n    nodes {\n      name\n      uri\n    }\n  }\n}\n\nquery CategoryByUri($uri: ID!) {\n  category(id: $uri, idType: URI) {\n    name\n    description\n    uri\n    seo {\n      ...TaxonomySeo\n    }\n    posts(first: 50, where: {status: PUBLISH}) {\n      nodes {\n        ...PostCard\n      }\n    }\n  }\n  categories(first: 50, where: {hideEmpty: true}) {\n    nodes {\n      name\n      uri\n    }\n  }\n}\n\nquery PostUris {\n  posts(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n    }\n  }\n  categories(first: 100, where: {hideEmpty: true}) {\n    nodes {\n      uri\n    }\n  }\n}": typeof types.PostCardFragmentDoc,
    "query PreviewNode($id: ID!) {\n  contentNode(id: $id, idType: DATABASE_ID) {\n    __typename\n    databaseId\n    status\n    uri\n    contentTypeName\n  }\n}\n\nquery PreviewIdByUri($uri: String!) {\n  nodeByUri(uri: $uri) {\n    ... on ContentNode {\n      databaseId\n    }\n  }\n}": typeof types.PreviewNodeDocument,
    "query SitemapEntries {\n  pages(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n      modified\n    }\n  }\n  posts(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n      modified\n    }\n  }\n  caseStudies(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n      modified\n    }\n  }\n  categories(first: 100, where: {hideEmpty: true}) {\n    nodes {\n      uri\n    }\n  }\n}": typeof types.SitemapEntriesDocument,
};
const documents: Documents = {
    "fragment PageBuilder on PageBuilder {\n  blocks {\n    __typename\n    ...HeroBlock\n    ...LogoCloudBlock\n    ...FeatureGridBlock\n    ...FeatureSplitBlock\n    ...StatsBlock\n    ...TestimonialsBlock\n    ...PricingTableBlock\n    ...FaqBlock\n    ...CtaBlock\n    ...RichTextBlock\n    ...ContactFormBlock\n  }\n}": types.PageBuilderFragmentDoc,
    "fragment ContactFormBlock on PageBuilderBlocksContactFormLayout {\n  heading\n  intro\n  successMessage\n}": types.ContactFormBlockFragmentDoc,
    "fragment CtaBlock on PageBuilderBlocksCtaLayout {\n  heading\n  text\n  cta {\n    ...Link\n  }\n}": types.CtaBlockFragmentDoc,
    "fragment FaqBlock on PageBuilderBlocksFaqLayout {\n  heading\n  questions {\n    question\n    answer\n  }\n}": types.FaqBlockFragmentDoc,
    "fragment FeatureGridBlock on PageBuilderBlocksFeatureGridLayout {\n  heading\n  intro\n  features {\n    icon\n    title\n    text\n  }\n}": types.FeatureGridBlockFragmentDoc,
    "fragment FeatureSplitBlock on PageBuilderBlocksFeatureSplitLayout {\n  heading\n  text\n  imageSide\n  image {\n    node {\n      ...Media\n    }\n  }\n  cta {\n    ...Link\n  }\n}": types.FeatureSplitBlockFragmentDoc,
    "fragment HeroBlock on PageBuilderBlocksHeroLayout {\n  eyebrow\n  heading\n  subheading\n  primaryCta {\n    ...Link\n  }\n  secondaryCta {\n    ...Link\n  }\n  image {\n    node {\n      ...Media\n    }\n  }\n}": types.HeroBlockFragmentDoc,
    "fragment LogoCloudBlock on PageBuilderBlocksLogoCloudLayout {\n  heading\n  logos {\n    nodes {\n      ...Media\n    }\n  }\n}": types.LogoCloudBlockFragmentDoc,
    "fragment PricingTableBlock on PageBuilderBlocksPricingTableLayout {\n  heading\n  billingToggle\n  plans {\n    nodes {\n      ... on Plan {\n        id\n        title\n        planDetails {\n          monthlyPrice\n          yearlyPrice\n          description\n          highlighted\n          features {\n            feature\n          }\n          cta {\n            ...Link\n          }\n        }\n      }\n    }\n  }\n}": types.PricingTableBlockFragmentDoc,
    "fragment RichTextBlock on PageBuilderBlocksRichTextLayout {\n  content\n}": types.RichTextBlockFragmentDoc,
    "fragment StatsBlock on PageBuilderBlocksStatsLayout {\n  stats {\n    value\n    label\n  }\n}": types.StatsBlockFragmentDoc,
    "fragment TestimonialsBlock on PageBuilderBlocksTestimonialsLayout {\n  source\n  caseStudies {\n    nodes {\n      ... on CaseStudy {\n        id\n        uri\n        caseStudyDetails {\n          clientName\n          summary\n          quoteAuthor\n          logo {\n            node {\n              ...Media\n            }\n          }\n        }\n      }\n    }\n  }\n  testimonials {\n    quote\n    name\n    role\n    avatar {\n      node {\n        ...Media\n      }\n    }\n  }\n}": types.TestimonialsBlockFragmentDoc,
    "fragment CaseStudyCard on CaseStudy {\n  id\n  title\n  uri\n  caseStudyDetails {\n    clientName\n    industry\n    summary\n    logo {\n      node {\n        ...Media\n      }\n    }\n  }\n}\n\nquery CaseStudyBy($id: ID!, $idType: CaseStudyIdType!) {\n  caseStudy(id: $id, idType: $idType) {\n    databaseId\n    title\n    uri\n    featuredImage {\n      node {\n        ...Media\n      }\n    }\n    caseStudyDetails {\n      clientName\n      industry\n      summary\n      quoteAuthor\n      logo {\n        node {\n          ...Media\n        }\n      }\n      metrics {\n        value\n        label\n      }\n    }\n    pageBuilder {\n      ...PageBuilder\n    }\n    seo {\n      ...Seo\n    }\n  }\n}\n\nquery CaseStudyList {\n  caseStudies(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      ...CaseStudyCard\n    }\n  }\n}": types.CaseStudyCardFragmentDoc,
    "query ChangelogEntries($stati: [PostStatusEnum]) {\n  changelogEntries(first: 100, where: {stati: $stati}) {\n    nodes {\n      databaseId\n      title\n      status\n      changelogDetails {\n        version\n        releaseDate\n        body\n      }\n      changeTypes {\n        nodes {\n          name\n          slug\n        }\n      }\n    }\n  }\n}": types.ChangelogEntriesDocument,
    "fragment Media on MediaItem {\n  sourceUrl\n  altText\n  mediaDetails {\n    width\n    height\n  }\n}\n\nfragment Link on AcfLink {\n  title\n  url\n  target\n}\n\nfragment Seo on PostTypeSEO {\n  title\n  metaDesc\n  metaRobotsNoindex\n  metaRobotsNofollow\n  opengraphTitle\n  opengraphDescription\n  opengraphType\n  opengraphPublishedTime\n  opengraphModifiedTime\n  opengraphImage {\n    ...Media\n  }\n  twitterTitle\n  twitterDescription\n  twitterImage {\n    sourceUrl\n  }\n  breadcrumbs {\n    text\n    url\n  }\n}\n\nfragment TaxonomySeo on TaxonomySEO {\n  title\n  metaDesc\n  metaRobotsNoindex\n  metaRobotsNofollow\n  opengraphTitle\n  opengraphDescription\n  opengraphImage {\n    ...Media\n  }\n  breadcrumbs {\n    text\n    url\n  }\n}": types.MediaFragmentDoc,
    "query Layout {\n  generalSettings {\n    title\n    description\n  }\n  globals {\n    siteSettings {\n      announcementEnabled\n      announcementText\n      announcementLink {\n        ...Link\n      }\n      footerText\n      socialLinks {\n        network\n        url\n      }\n      defaultCta {\n        ...Link\n      }\n    }\n  }\n  primaryMenu: menuItems(where: {location: PRIMARY}, first: 50) {\n    nodes {\n      ...MenuItem\n    }\n  }\n  footerMenu: menuItems(where: {location: FOOTER}, first: 50) {\n    nodes {\n      ...MenuItem\n    }\n  }\n}\n\nfragment MenuItem on MenuItem {\n  id\n  label\n  url\n  path\n  target\n  parentId\n}": types.LayoutDocument,
    "query PageBy($id: ID!, $idType: PageIdType!) {\n  page(id: $id, idType: $idType) {\n    databaseId\n    title\n    uri\n    isFrontPage\n    seo {\n      ...Seo\n    }\n    pageBuilder {\n      ...PageBuilder\n    }\n  }\n}\n\nquery PageUris {\n  pages(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n    }\n  }\n}": types.PageByDocument,
    "fragment PostCard on Post {\n  id\n  title\n  uri\n  date\n  excerpt\n  featuredImage {\n    node {\n      ...Media\n    }\n  }\n  categories {\n    nodes {\n      name\n      uri\n    }\n  }\n}\n\nquery PostBy($id: ID!, $idType: PostIdType!) {\n  post(id: $id, idType: $idType) {\n    databaseId\n    title\n    uri\n    date\n    modified\n    content\n    excerpt\n    featuredImage {\n      node {\n        ...Media\n      }\n    }\n    author {\n      node {\n        name\n        description\n      }\n    }\n    categories {\n      nodes {\n        name\n        uri\n      }\n    }\n    seo {\n      ...Seo\n    }\n  }\n}\n\nquery PostList($first: Int!) {\n  posts(first: $first, where: {status: PUBLISH}) {\n    nodes {\n      ...PostCard\n    }\n  }\n  categories(first: 50, where: {hideEmpty: true}) {\n    nodes {\n      name\n      uri\n    }\n  }\n}\n\nquery CategoryByUri($uri: ID!) {\n  category(id: $uri, idType: URI) {\n    name\n    description\n    uri\n    seo {\n      ...TaxonomySeo\n    }\n    posts(first: 50, where: {status: PUBLISH}) {\n      nodes {\n        ...PostCard\n      }\n    }\n  }\n  categories(first: 50, where: {hideEmpty: true}) {\n    nodes {\n      name\n      uri\n    }\n  }\n}\n\nquery PostUris {\n  posts(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n    }\n  }\n  categories(first: 100, where: {hideEmpty: true}) {\n    nodes {\n      uri\n    }\n  }\n}": types.PostCardFragmentDoc,
    "query PreviewNode($id: ID!) {\n  contentNode(id: $id, idType: DATABASE_ID) {\n    __typename\n    databaseId\n    status\n    uri\n    contentTypeName\n  }\n}\n\nquery PreviewIdByUri($uri: String!) {\n  nodeByUri(uri: $uri) {\n    ... on ContentNode {\n      databaseId\n    }\n  }\n}": types.PreviewNodeDocument,
    "query SitemapEntries {\n  pages(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n      modified\n    }\n  }\n  posts(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n      modified\n    }\n  }\n  caseStudies(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n      modified\n    }\n  }\n  categories(first: 100, where: {hideEmpty: true}) {\n    nodes {\n      uri\n    }\n  }\n}": types.SitemapEntriesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PageBuilder on PageBuilder {\n  blocks {\n    __typename\n    ...HeroBlock\n    ...LogoCloudBlock\n    ...FeatureGridBlock\n    ...FeatureSplitBlock\n    ...StatsBlock\n    ...TestimonialsBlock\n    ...PricingTableBlock\n    ...FaqBlock\n    ...CtaBlock\n    ...RichTextBlock\n    ...ContactFormBlock\n  }\n}"): typeof import('./graphql').PageBuilderFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ContactFormBlock on PageBuilderBlocksContactFormLayout {\n  heading\n  intro\n  successMessage\n}"): typeof import('./graphql').ContactFormBlockFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CtaBlock on PageBuilderBlocksCtaLayout {\n  heading\n  text\n  cta {\n    ...Link\n  }\n}"): typeof import('./graphql').CtaBlockFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FaqBlock on PageBuilderBlocksFaqLayout {\n  heading\n  questions {\n    question\n    answer\n  }\n}"): typeof import('./graphql').FaqBlockFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FeatureGridBlock on PageBuilderBlocksFeatureGridLayout {\n  heading\n  intro\n  features {\n    icon\n    title\n    text\n  }\n}"): typeof import('./graphql').FeatureGridBlockFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment FeatureSplitBlock on PageBuilderBlocksFeatureSplitLayout {\n  heading\n  text\n  imageSide\n  image {\n    node {\n      ...Media\n    }\n  }\n  cta {\n    ...Link\n  }\n}"): typeof import('./graphql').FeatureSplitBlockFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment HeroBlock on PageBuilderBlocksHeroLayout {\n  eyebrow\n  heading\n  subheading\n  primaryCta {\n    ...Link\n  }\n  secondaryCta {\n    ...Link\n  }\n  image {\n    node {\n      ...Media\n    }\n  }\n}"): typeof import('./graphql').HeroBlockFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment LogoCloudBlock on PageBuilderBlocksLogoCloudLayout {\n  heading\n  logos {\n    nodes {\n      ...Media\n    }\n  }\n}"): typeof import('./graphql').LogoCloudBlockFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PricingTableBlock on PageBuilderBlocksPricingTableLayout {\n  heading\n  billingToggle\n  plans {\n    nodes {\n      ... on Plan {\n        id\n        title\n        planDetails {\n          monthlyPrice\n          yearlyPrice\n          description\n          highlighted\n          features {\n            feature\n          }\n          cta {\n            ...Link\n          }\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').PricingTableBlockFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RichTextBlock on PageBuilderBlocksRichTextLayout {\n  content\n}"): typeof import('./graphql').RichTextBlockFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment StatsBlock on PageBuilderBlocksStatsLayout {\n  stats {\n    value\n    label\n  }\n}"): typeof import('./graphql').StatsBlockFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment TestimonialsBlock on PageBuilderBlocksTestimonialsLayout {\n  source\n  caseStudies {\n    nodes {\n      ... on CaseStudy {\n        id\n        uri\n        caseStudyDetails {\n          clientName\n          summary\n          quoteAuthor\n          logo {\n            node {\n              ...Media\n            }\n          }\n        }\n      }\n    }\n  }\n  testimonials {\n    quote\n    name\n    role\n    avatar {\n      node {\n        ...Media\n      }\n    }\n  }\n}"): typeof import('./graphql').TestimonialsBlockFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CaseStudyCard on CaseStudy {\n  id\n  title\n  uri\n  caseStudyDetails {\n    clientName\n    industry\n    summary\n    logo {\n      node {\n        ...Media\n      }\n    }\n  }\n}\n\nquery CaseStudyBy($id: ID!, $idType: CaseStudyIdType!) {\n  caseStudy(id: $id, idType: $idType) {\n    databaseId\n    title\n    uri\n    featuredImage {\n      node {\n        ...Media\n      }\n    }\n    caseStudyDetails {\n      clientName\n      industry\n      summary\n      quoteAuthor\n      logo {\n        node {\n          ...Media\n        }\n      }\n      metrics {\n        value\n        label\n      }\n    }\n    pageBuilder {\n      ...PageBuilder\n    }\n    seo {\n      ...Seo\n    }\n  }\n}\n\nquery CaseStudyList {\n  caseStudies(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      ...CaseStudyCard\n    }\n  }\n}"): typeof import('./graphql').CaseStudyCardFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ChangelogEntries($stati: [PostStatusEnum]) {\n  changelogEntries(first: 100, where: {stati: $stati}) {\n    nodes {\n      databaseId\n      title\n      status\n      changelogDetails {\n        version\n        releaseDate\n        body\n      }\n      changeTypes {\n        nodes {\n          name\n          slug\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').ChangelogEntriesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Media on MediaItem {\n  sourceUrl\n  altText\n  mediaDetails {\n    width\n    height\n  }\n}\n\nfragment Link on AcfLink {\n  title\n  url\n  target\n}\n\nfragment Seo on PostTypeSEO {\n  title\n  metaDesc\n  metaRobotsNoindex\n  metaRobotsNofollow\n  opengraphTitle\n  opengraphDescription\n  opengraphType\n  opengraphPublishedTime\n  opengraphModifiedTime\n  opengraphImage {\n    ...Media\n  }\n  twitterTitle\n  twitterDescription\n  twitterImage {\n    sourceUrl\n  }\n  breadcrumbs {\n    text\n    url\n  }\n}\n\nfragment TaxonomySeo on TaxonomySEO {\n  title\n  metaDesc\n  metaRobotsNoindex\n  metaRobotsNofollow\n  opengraphTitle\n  opengraphDescription\n  opengraphImage {\n    ...Media\n  }\n  breadcrumbs {\n    text\n    url\n  }\n}"): typeof import('./graphql').MediaFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Layout {\n  generalSettings {\n    title\n    description\n  }\n  globals {\n    siteSettings {\n      announcementEnabled\n      announcementText\n      announcementLink {\n        ...Link\n      }\n      footerText\n      socialLinks {\n        network\n        url\n      }\n      defaultCta {\n        ...Link\n      }\n    }\n  }\n  primaryMenu: menuItems(where: {location: PRIMARY}, first: 50) {\n    nodes {\n      ...MenuItem\n    }\n  }\n  footerMenu: menuItems(where: {location: FOOTER}, first: 50) {\n    nodes {\n      ...MenuItem\n    }\n  }\n}\n\nfragment MenuItem on MenuItem {\n  id\n  label\n  url\n  path\n  target\n  parentId\n}"): typeof import('./graphql').LayoutDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query PageBy($id: ID!, $idType: PageIdType!) {\n  page(id: $id, idType: $idType) {\n    databaseId\n    title\n    uri\n    isFrontPage\n    seo {\n      ...Seo\n    }\n    pageBuilder {\n      ...PageBuilder\n    }\n  }\n}\n\nquery PageUris {\n  pages(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n    }\n  }\n}"): typeof import('./graphql').PageByDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PostCard on Post {\n  id\n  title\n  uri\n  date\n  excerpt\n  featuredImage {\n    node {\n      ...Media\n    }\n  }\n  categories {\n    nodes {\n      name\n      uri\n    }\n  }\n}\n\nquery PostBy($id: ID!, $idType: PostIdType!) {\n  post(id: $id, idType: $idType) {\n    databaseId\n    title\n    uri\n    date\n    modified\n    content\n    excerpt\n    featuredImage {\n      node {\n        ...Media\n      }\n    }\n    author {\n      node {\n        name\n        description\n      }\n    }\n    categories {\n      nodes {\n        name\n        uri\n      }\n    }\n    seo {\n      ...Seo\n    }\n  }\n}\n\nquery PostList($first: Int!) {\n  posts(first: $first, where: {status: PUBLISH}) {\n    nodes {\n      ...PostCard\n    }\n  }\n  categories(first: 50, where: {hideEmpty: true}) {\n    nodes {\n      name\n      uri\n    }\n  }\n}\n\nquery CategoryByUri($uri: ID!) {\n  category(id: $uri, idType: URI) {\n    name\n    description\n    uri\n    seo {\n      ...TaxonomySeo\n    }\n    posts(first: 50, where: {status: PUBLISH}) {\n      nodes {\n        ...PostCard\n      }\n    }\n  }\n  categories(first: 50, where: {hideEmpty: true}) {\n    nodes {\n      name\n      uri\n    }\n  }\n}\n\nquery PostUris {\n  posts(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n    }\n  }\n  categories(first: 100, where: {hideEmpty: true}) {\n    nodes {\n      uri\n    }\n  }\n}"): typeof import('./graphql').PostCardFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query PreviewNode($id: ID!) {\n  contentNode(id: $id, idType: DATABASE_ID) {\n    __typename\n    databaseId\n    status\n    uri\n    contentTypeName\n  }\n}\n\nquery PreviewIdByUri($uri: String!) {\n  nodeByUri(uri: $uri) {\n    ... on ContentNode {\n      databaseId\n    }\n  }\n}"): typeof import('./graphql').PreviewNodeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SitemapEntries {\n  pages(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n      modified\n    }\n  }\n  posts(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n      modified\n    }\n  }\n  caseStudies(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n      modified\n    }\n  }\n  categories(first: 100, where: {hideEmpty: true}) {\n    nodes {\n      uri\n    }\n  }\n}"): typeof import('./graphql').SitemapEntriesDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
