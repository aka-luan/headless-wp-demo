/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type PageBuilderFragment = { blocks: Array<
    | { __typename: 'PageBuilderBlocksCtaLayout', heading: string | null, text: string | null, cta: { title: string | null, url: string | null, target: string | null } | null }
    | { __typename: 'PageBuilderBlocksFaqLayout', heading: string | null, questions: Array<{ question: string | null, answer: string | null } | null> | null }
    | { __typename: 'PageBuilderBlocksFeatureGridLayout', heading: string | null, intro: string | null, features: Array<{ icon: Array<string | null> | null, title: string | null, text: string | null } | null> | null }
    | { __typename: 'PageBuilderBlocksFeatureSplitLayout', heading: string | null, text: string | null, imageSide: string | null, image: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, cta: { title: string | null, url: string | null, target: string | null } | null }
    | { __typename: 'PageBuilderBlocksHeroLayout', eyebrow: string | null, heading: string | null, subheading: string | null, primaryCta: { title: string | null, url: string | null, target: string | null } | null, secondaryCta: { title: string | null, url: string | null, target: string | null } | null, image: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
    | { __typename: 'PageBuilderBlocksLogoCloudLayout', heading: string | null, logos: { nodes: Array<{ sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null }> } | null }
    | { __typename: 'PageBuilderBlocksPricingTableLayout', heading: string | null, billingToggle: boolean | null, plans: { nodes: Array<
          | { id: string, title: string | null, planDetails: { monthlyPrice: number | null, yearlyPrice: number | null, description: string | null, highlighted: boolean | null, features: Array<{ feature: string | null } | null> | null, cta: { title: string | null, url: string | null, target: string | null } | null } | null }
          | Record<PropertyKey, never>
        > } | null }
    | { __typename: 'PageBuilderBlocksRichTextLayout', content: string | null }
    | { __typename: 'PageBuilderBlocksStatsLayout', stats: Array<{ value: string | null, label: string | null } | null> | null }
    | { __typename: 'PageBuilderBlocksTestimonialsLayout', source: string | null, caseStudies: { nodes: Array<
          | { id: string, uri: string | null, caseStudyDetails: { clientName: string | null, summary: string | null, quoteAuthor: string | null, logo: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null }
          | Record<PropertyKey, never>
        > } | null, testimonials: Array<{ quote: string | null, name: string | null, role: string | null, avatar: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null> | null }
   | null> | null };

export type CtaBlockFragment = { heading: string | null, text: string | null, cta: { title: string | null, url: string | null, target: string | null } | null };

export type FaqBlockFragment = { heading: string | null, questions: Array<{ question: string | null, answer: string | null } | null> | null };

export type FeatureGridBlockFragment = { heading: string | null, intro: string | null, features: Array<{ icon: Array<string | null> | null, title: string | null, text: string | null } | null> | null };

export type FeatureSplitBlockFragment = { heading: string | null, text: string | null, imageSide: string | null, image: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, cta: { title: string | null, url: string | null, target: string | null } | null };

export type HeroBlockFragment = { eyebrow: string | null, heading: string | null, subheading: string | null, primaryCta: { title: string | null, url: string | null, target: string | null } | null, secondaryCta: { title: string | null, url: string | null, target: string | null } | null, image: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null };

export type LogoCloudBlockFragment = { heading: string | null, logos: { nodes: Array<{ sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null }> } | null };

export type PricingTableBlockFragment = { heading: string | null, billingToggle: boolean | null, plans: { nodes: Array<
      | { id: string, title: string | null, planDetails: { monthlyPrice: number | null, yearlyPrice: number | null, description: string | null, highlighted: boolean | null, features: Array<{ feature: string | null } | null> | null, cta: { title: string | null, url: string | null, target: string | null } | null } | null }
      | Record<PropertyKey, never>
    > } | null };

export type RichTextBlockFragment = { content: string | null };

export type StatsBlockFragment = { stats: Array<{ value: string | null, label: string | null } | null> | null };

export type TestimonialsBlockFragment = { source: string | null, caseStudies: { nodes: Array<
      | { id: string, uri: string | null, caseStudyDetails: { clientName: string | null, summary: string | null, quoteAuthor: string | null, logo: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null }
      | Record<PropertyKey, never>
    > } | null, testimonials: Array<{ quote: string | null, name: string | null, role: string | null, avatar: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null> | null };

export type MediaFragment = { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null };

export type LinkFragment = { title: string | null, url: string | null, target: string | null };

export type LayoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LayoutQuery = { generalSettings: { title: string | null, description: string | null } | null, globals: { siteSettings: { announcementEnabled: boolean | null, announcementText: string | null, footerText: string | null, announcementLink: { title: string | null, url: string | null, target: string | null } | null, socialLinks: Array<{ network: Array<string | null> | null, url: string | null } | null> | null, defaultCta: { title: string | null, url: string | null, target: string | null } | null } | null } | null, primaryMenu: { nodes: Array<{ id: string, label: string | null, url: string | null, path: string | null, target: string | null, parentId: string | null }> } | null, footerMenu: { nodes: Array<{ id: string, label: string | null, url: string | null, path: string | null, target: string | null, parentId: string | null }> } | null };

export type MenuItemFragment = { id: string, label: string | null, url: string | null, path: string | null, target: string | null, parentId: string | null };

export type PageByUriQueryVariables = Exact<{
  uri: string | number;
}>;


export type PageByUriQuery = { page: { databaseId: number, title: string | null, uri: string | null, isFrontPage: boolean, pageBuilder: { blocks: Array<
        | { __typename: 'PageBuilderBlocksCtaLayout', heading: string | null, text: string | null, cta: { title: string | null, url: string | null, target: string | null } | null }
        | { __typename: 'PageBuilderBlocksFaqLayout', heading: string | null, questions: Array<{ question: string | null, answer: string | null } | null> | null }
        | { __typename: 'PageBuilderBlocksFeatureGridLayout', heading: string | null, intro: string | null, features: Array<{ icon: Array<string | null> | null, title: string | null, text: string | null } | null> | null }
        | { __typename: 'PageBuilderBlocksFeatureSplitLayout', heading: string | null, text: string | null, imageSide: string | null, image: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, cta: { title: string | null, url: string | null, target: string | null } | null }
        | { __typename: 'PageBuilderBlocksHeroLayout', eyebrow: string | null, heading: string | null, subheading: string | null, primaryCta: { title: string | null, url: string | null, target: string | null } | null, secondaryCta: { title: string | null, url: string | null, target: string | null } | null, image: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null }
        | { __typename: 'PageBuilderBlocksLogoCloudLayout', heading: string | null, logos: { nodes: Array<{ sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null }> } | null }
        | { __typename: 'PageBuilderBlocksPricingTableLayout', heading: string | null, billingToggle: boolean | null, plans: { nodes: Array<
              | { id: string, title: string | null, planDetails: { monthlyPrice: number | null, yearlyPrice: number | null, description: string | null, highlighted: boolean | null, features: Array<{ feature: string | null } | null> | null, cta: { title: string | null, url: string | null, target: string | null } | null } | null }
              | Record<PropertyKey, never>
            > } | null }
        | { __typename: 'PageBuilderBlocksRichTextLayout', content: string | null }
        | { __typename: 'PageBuilderBlocksStatsLayout', stats: Array<{ value: string | null, label: string | null } | null> | null }
        | { __typename: 'PageBuilderBlocksTestimonialsLayout', source: string | null, caseStudies: { nodes: Array<
              | { id: string, uri: string | null, caseStudyDetails: { clientName: string | null, summary: string | null, quoteAuthor: string | null, logo: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null }
              | Record<PropertyKey, never>
            > } | null, testimonials: Array<{ quote: string | null, name: string | null, role: string | null, avatar: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null> | null }
       | null> | null } | null } | null };

export type PageUrisQueryVariables = Exact<{ [key: string]: never; }>;


export type PageUrisQuery = { pages: { nodes: Array<{ uri: string | null }> } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const LinkFragmentDoc = new TypedDocumentString(`
    fragment Link on AcfLink {
  title
  url
  target
}
    `, {"fragmentName":"Link"}) as unknown as TypedDocumentString<LinkFragment, unknown>;
export const MediaFragmentDoc = new TypedDocumentString(`
    fragment Media on MediaItem {
  sourceUrl
  altText
  mediaDetails {
    width
    height
  }
}
    `, {"fragmentName":"Media"}) as unknown as TypedDocumentString<MediaFragment, unknown>;
export const HeroBlockFragmentDoc = new TypedDocumentString(`
    fragment HeroBlock on PageBuilderBlocksHeroLayout {
  eyebrow
  heading
  subheading
  primaryCta {
    ...Link
  }
  secondaryCta {
    ...Link
  }
  image {
    node {
      ...Media
    }
  }
}
    fragment Media on MediaItem {
  sourceUrl
  altText
  mediaDetails {
    width
    height
  }
}
fragment Link on AcfLink {
  title
  url
  target
}`, {"fragmentName":"HeroBlock"}) as unknown as TypedDocumentString<HeroBlockFragment, unknown>;
export const LogoCloudBlockFragmentDoc = new TypedDocumentString(`
    fragment LogoCloudBlock on PageBuilderBlocksLogoCloudLayout {
  heading
  logos {
    nodes {
      ...Media
    }
  }
}
    fragment Media on MediaItem {
  sourceUrl
  altText
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"LogoCloudBlock"}) as unknown as TypedDocumentString<LogoCloudBlockFragment, unknown>;
export const FeatureGridBlockFragmentDoc = new TypedDocumentString(`
    fragment FeatureGridBlock on PageBuilderBlocksFeatureGridLayout {
  heading
  intro
  features {
    icon
    title
    text
  }
}
    `, {"fragmentName":"FeatureGridBlock"}) as unknown as TypedDocumentString<FeatureGridBlockFragment, unknown>;
export const FeatureSplitBlockFragmentDoc = new TypedDocumentString(`
    fragment FeatureSplitBlock on PageBuilderBlocksFeatureSplitLayout {
  heading
  text
  imageSide
  image {
    node {
      ...Media
    }
  }
  cta {
    ...Link
  }
}
    fragment Media on MediaItem {
  sourceUrl
  altText
  mediaDetails {
    width
    height
  }
}
fragment Link on AcfLink {
  title
  url
  target
}`, {"fragmentName":"FeatureSplitBlock"}) as unknown as TypedDocumentString<FeatureSplitBlockFragment, unknown>;
export const StatsBlockFragmentDoc = new TypedDocumentString(`
    fragment StatsBlock on PageBuilderBlocksStatsLayout {
  stats {
    value
    label
  }
}
    `, {"fragmentName":"StatsBlock"}) as unknown as TypedDocumentString<StatsBlockFragment, unknown>;
export const TestimonialsBlockFragmentDoc = new TypedDocumentString(`
    fragment TestimonialsBlock on PageBuilderBlocksTestimonialsLayout {
  source
  caseStudies {
    nodes {
      ... on CaseStudy {
        id
        uri
        caseStudyDetails {
          clientName
          summary
          quoteAuthor
          logo {
            node {
              ...Media
            }
          }
        }
      }
    }
  }
  testimonials {
    quote
    name
    role
    avatar {
      node {
        ...Media
      }
    }
  }
}
    fragment Media on MediaItem {
  sourceUrl
  altText
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"TestimonialsBlock"}) as unknown as TypedDocumentString<TestimonialsBlockFragment, unknown>;
export const PricingTableBlockFragmentDoc = new TypedDocumentString(`
    fragment PricingTableBlock on PageBuilderBlocksPricingTableLayout {
  heading
  billingToggle
  plans {
    nodes {
      ... on Plan {
        id
        title
        planDetails {
          monthlyPrice
          yearlyPrice
          description
          highlighted
          features {
            feature
          }
          cta {
            ...Link
          }
        }
      }
    }
  }
}
    fragment Link on AcfLink {
  title
  url
  target
}`, {"fragmentName":"PricingTableBlock"}) as unknown as TypedDocumentString<PricingTableBlockFragment, unknown>;
export const FaqBlockFragmentDoc = new TypedDocumentString(`
    fragment FaqBlock on PageBuilderBlocksFaqLayout {
  heading
  questions {
    question
    answer
  }
}
    `, {"fragmentName":"FaqBlock"}) as unknown as TypedDocumentString<FaqBlockFragment, unknown>;
export const CtaBlockFragmentDoc = new TypedDocumentString(`
    fragment CtaBlock on PageBuilderBlocksCtaLayout {
  heading
  text
  cta {
    ...Link
  }
}
    fragment Link on AcfLink {
  title
  url
  target
}`, {"fragmentName":"CtaBlock"}) as unknown as TypedDocumentString<CtaBlockFragment, unknown>;
export const RichTextBlockFragmentDoc = new TypedDocumentString(`
    fragment RichTextBlock on PageBuilderBlocksRichTextLayout {
  content
}
    `, {"fragmentName":"RichTextBlock"}) as unknown as TypedDocumentString<RichTextBlockFragment, unknown>;
export const PageBuilderFragmentDoc = new TypedDocumentString(`
    fragment PageBuilder on PageBuilder {
  blocks {
    __typename
    ...HeroBlock
    ...LogoCloudBlock
    ...FeatureGridBlock
    ...FeatureSplitBlock
    ...StatsBlock
    ...TestimonialsBlock
    ...PricingTableBlock
    ...FaqBlock
    ...CtaBlock
    ...RichTextBlock
  }
}
    fragment CtaBlock on PageBuilderBlocksCtaLayout {
  heading
  text
  cta {
    ...Link
  }
}
fragment FaqBlock on PageBuilderBlocksFaqLayout {
  heading
  questions {
    question
    answer
  }
}
fragment FeatureGridBlock on PageBuilderBlocksFeatureGridLayout {
  heading
  intro
  features {
    icon
    title
    text
  }
}
fragment FeatureSplitBlock on PageBuilderBlocksFeatureSplitLayout {
  heading
  text
  imageSide
  image {
    node {
      ...Media
    }
  }
  cta {
    ...Link
  }
}
fragment HeroBlock on PageBuilderBlocksHeroLayout {
  eyebrow
  heading
  subheading
  primaryCta {
    ...Link
  }
  secondaryCta {
    ...Link
  }
  image {
    node {
      ...Media
    }
  }
}
fragment LogoCloudBlock on PageBuilderBlocksLogoCloudLayout {
  heading
  logos {
    nodes {
      ...Media
    }
  }
}
fragment PricingTableBlock on PageBuilderBlocksPricingTableLayout {
  heading
  billingToggle
  plans {
    nodes {
      ... on Plan {
        id
        title
        planDetails {
          monthlyPrice
          yearlyPrice
          description
          highlighted
          features {
            feature
          }
          cta {
            ...Link
          }
        }
      }
    }
  }
}
fragment RichTextBlock on PageBuilderBlocksRichTextLayout {
  content
}
fragment StatsBlock on PageBuilderBlocksStatsLayout {
  stats {
    value
    label
  }
}
fragment TestimonialsBlock on PageBuilderBlocksTestimonialsLayout {
  source
  caseStudies {
    nodes {
      ... on CaseStudy {
        id
        uri
        caseStudyDetails {
          clientName
          summary
          quoteAuthor
          logo {
            node {
              ...Media
            }
          }
        }
      }
    }
  }
  testimonials {
    quote
    name
    role
    avatar {
      node {
        ...Media
      }
    }
  }
}
fragment Media on MediaItem {
  sourceUrl
  altText
  mediaDetails {
    width
    height
  }
}
fragment Link on AcfLink {
  title
  url
  target
}`, {"fragmentName":"PageBuilder"}) as unknown as TypedDocumentString<PageBuilderFragment, unknown>;
export const MenuItemFragmentDoc = new TypedDocumentString(`
    fragment MenuItem on MenuItem {
  id
  label
  url
  path
  target
  parentId
}
    `, {"fragmentName":"MenuItem"}) as unknown as TypedDocumentString<MenuItemFragment, unknown>;
export const LayoutDocument = new TypedDocumentString(`
    query Layout {
  generalSettings {
    title
    description
  }
  globals {
    siteSettings {
      announcementEnabled
      announcementText
      announcementLink {
        ...Link
      }
      footerText
      socialLinks {
        network
        url
      }
      defaultCta {
        ...Link
      }
    }
  }
  primaryMenu: menuItems(where: { location: PRIMARY }, first: 50) {
    nodes {
      ...MenuItem
    }
  }
  footerMenu: menuItems(where: { location: FOOTER }, first: 50) {
    nodes {
      ...MenuItem
    }
  }
}
    fragment Link on AcfLink {
  title
  url
  target
}
fragment MenuItem on MenuItem {
  id
  label
  url
  path
  target
  parentId
}`) as unknown as TypedDocumentString<LayoutQuery, LayoutQueryVariables>;
export const PageByUriDocument = new TypedDocumentString(`
    query PageByUri($uri: ID!) {
  page(id: $uri, idType: URI) {
    databaseId
    title
    uri
    isFrontPage
    pageBuilder {
      ...PageBuilder
    }
  }
}
    fragment PageBuilder on PageBuilder {
  blocks {
    __typename
    ...HeroBlock
    ...LogoCloudBlock
    ...FeatureGridBlock
    ...FeatureSplitBlock
    ...StatsBlock
    ...TestimonialsBlock
    ...PricingTableBlock
    ...FaqBlock
    ...CtaBlock
    ...RichTextBlock
  }
}
fragment CtaBlock on PageBuilderBlocksCtaLayout {
  heading
  text
  cta {
    ...Link
  }
}
fragment FaqBlock on PageBuilderBlocksFaqLayout {
  heading
  questions {
    question
    answer
  }
}
fragment FeatureGridBlock on PageBuilderBlocksFeatureGridLayout {
  heading
  intro
  features {
    icon
    title
    text
  }
}
fragment FeatureSplitBlock on PageBuilderBlocksFeatureSplitLayout {
  heading
  text
  imageSide
  image {
    node {
      ...Media
    }
  }
  cta {
    ...Link
  }
}
fragment HeroBlock on PageBuilderBlocksHeroLayout {
  eyebrow
  heading
  subheading
  primaryCta {
    ...Link
  }
  secondaryCta {
    ...Link
  }
  image {
    node {
      ...Media
    }
  }
}
fragment LogoCloudBlock on PageBuilderBlocksLogoCloudLayout {
  heading
  logos {
    nodes {
      ...Media
    }
  }
}
fragment PricingTableBlock on PageBuilderBlocksPricingTableLayout {
  heading
  billingToggle
  plans {
    nodes {
      ... on Plan {
        id
        title
        planDetails {
          monthlyPrice
          yearlyPrice
          description
          highlighted
          features {
            feature
          }
          cta {
            ...Link
          }
        }
      }
    }
  }
}
fragment RichTextBlock on PageBuilderBlocksRichTextLayout {
  content
}
fragment StatsBlock on PageBuilderBlocksStatsLayout {
  stats {
    value
    label
  }
}
fragment TestimonialsBlock on PageBuilderBlocksTestimonialsLayout {
  source
  caseStudies {
    nodes {
      ... on CaseStudy {
        id
        uri
        caseStudyDetails {
          clientName
          summary
          quoteAuthor
          logo {
            node {
              ...Media
            }
          }
        }
      }
    }
  }
  testimonials {
    quote
    name
    role
    avatar {
      node {
        ...Media
      }
    }
  }
}
fragment Media on MediaItem {
  sourceUrl
  altText
  mediaDetails {
    width
    height
  }
}
fragment Link on AcfLink {
  title
  url
  target
}`) as unknown as TypedDocumentString<PageByUriQuery, PageByUriQueryVariables>;
export const PageUrisDocument = new TypedDocumentString(`
    query PageUris {
  pages(first: 100, where: { status: PUBLISH }) {
    nodes {
      uri
    }
  }
}
    `) as unknown as TypedDocumentString<PageUrisQuery, PageUrisQueryVariables>;