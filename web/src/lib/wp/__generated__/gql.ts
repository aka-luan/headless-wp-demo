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
    "fragment PageBuilder on PageBuilder {\n  blocks {\n    __typename\n    ...HeroBlock\n    ...LogoCloudBlock\n    ...FeatureGridBlock\n    ...FeatureSplitBlock\n    ...StatsBlock\n    ...TestimonialsBlock\n    ...PricingTableBlock\n    ...FaqBlock\n    ...CtaBlock\n    ...RichTextBlock\n  }\n}": typeof types.PageBuilderFragmentDoc,
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
    "fragment Media on MediaItem {\n  sourceUrl\n  altText\n  mediaDetails {\n    width\n    height\n  }\n}\n\nfragment Link on AcfLink {\n  title\n  url\n  target\n}": typeof types.MediaFragmentDoc,
    "query Layout {\n  generalSettings {\n    title\n    description\n  }\n  globals {\n    siteSettings {\n      announcementEnabled\n      announcementText\n      announcementLink {\n        ...Link\n      }\n      footerText\n      socialLinks {\n        network\n        url\n      }\n      defaultCta {\n        ...Link\n      }\n    }\n  }\n  primaryMenu: menuItems(where: {location: PRIMARY}, first: 50) {\n    nodes {\n      ...MenuItem\n    }\n  }\n  footerMenu: menuItems(where: {location: FOOTER}, first: 50) {\n    nodes {\n      ...MenuItem\n    }\n  }\n}\n\nfragment MenuItem on MenuItem {\n  id\n  label\n  url\n  path\n  target\n  parentId\n}": typeof types.LayoutDocument,
    "query PageByUri($uri: ID!) {\n  page(id: $uri, idType: URI) {\n    databaseId\n    title\n    uri\n    isFrontPage\n    pageBuilder {\n      ...PageBuilder\n    }\n  }\n}\n\nquery PageUris {\n  pages(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n    }\n  }\n}": typeof types.PageByUriDocument,
};
const documents: Documents = {
    "fragment PageBuilder on PageBuilder {\n  blocks {\n    __typename\n    ...HeroBlock\n    ...LogoCloudBlock\n    ...FeatureGridBlock\n    ...FeatureSplitBlock\n    ...StatsBlock\n    ...TestimonialsBlock\n    ...PricingTableBlock\n    ...FaqBlock\n    ...CtaBlock\n    ...RichTextBlock\n  }\n}": types.PageBuilderFragmentDoc,
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
    "fragment Media on MediaItem {\n  sourceUrl\n  altText\n  mediaDetails {\n    width\n    height\n  }\n}\n\nfragment Link on AcfLink {\n  title\n  url\n  target\n}": types.MediaFragmentDoc,
    "query Layout {\n  generalSettings {\n    title\n    description\n  }\n  globals {\n    siteSettings {\n      announcementEnabled\n      announcementText\n      announcementLink {\n        ...Link\n      }\n      footerText\n      socialLinks {\n        network\n        url\n      }\n      defaultCta {\n        ...Link\n      }\n    }\n  }\n  primaryMenu: menuItems(where: {location: PRIMARY}, first: 50) {\n    nodes {\n      ...MenuItem\n    }\n  }\n  footerMenu: menuItems(where: {location: FOOTER}, first: 50) {\n    nodes {\n      ...MenuItem\n    }\n  }\n}\n\nfragment MenuItem on MenuItem {\n  id\n  label\n  url\n  path\n  target\n  parentId\n}": types.LayoutDocument,
    "query PageByUri($uri: ID!) {\n  page(id: $uri, idType: URI) {\n    databaseId\n    title\n    uri\n    isFrontPage\n    pageBuilder {\n      ...PageBuilder\n    }\n  }\n}\n\nquery PageUris {\n  pages(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n    }\n  }\n}": types.PageByUriDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PageBuilder on PageBuilder {\n  blocks {\n    __typename\n    ...HeroBlock\n    ...LogoCloudBlock\n    ...FeatureGridBlock\n    ...FeatureSplitBlock\n    ...StatsBlock\n    ...TestimonialsBlock\n    ...PricingTableBlock\n    ...FaqBlock\n    ...CtaBlock\n    ...RichTextBlock\n  }\n}"): typeof import('./graphql').PageBuilderFragmentDoc;
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
export function graphql(source: "fragment Media on MediaItem {\n  sourceUrl\n  altText\n  mediaDetails {\n    width\n    height\n  }\n}\n\nfragment Link on AcfLink {\n  title\n  url\n  target\n}"): typeof import('./graphql').MediaFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Layout {\n  generalSettings {\n    title\n    description\n  }\n  globals {\n    siteSettings {\n      announcementEnabled\n      announcementText\n      announcementLink {\n        ...Link\n      }\n      footerText\n      socialLinks {\n        network\n        url\n      }\n      defaultCta {\n        ...Link\n      }\n    }\n  }\n  primaryMenu: menuItems(where: {location: PRIMARY}, first: 50) {\n    nodes {\n      ...MenuItem\n    }\n  }\n  footerMenu: menuItems(where: {location: FOOTER}, first: 50) {\n    nodes {\n      ...MenuItem\n    }\n  }\n}\n\nfragment MenuItem on MenuItem {\n  id\n  label\n  url\n  path\n  target\n  parentId\n}"): typeof import('./graphql').LayoutDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query PageByUri($uri: ID!) {\n  page(id: $uri, idType: URI) {\n    databaseId\n    title\n    uri\n    isFrontPage\n    pageBuilder {\n      ...PageBuilder\n    }\n  }\n}\n\nquery PageUris {\n  pages(first: 100, where: {status: PUBLISH}) {\n    nodes {\n      uri\n    }\n  }\n}"): typeof import('./graphql').PageByUriDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
