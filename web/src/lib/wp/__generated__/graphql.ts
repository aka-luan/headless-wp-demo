/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
/** Identifier types for retrieving a specific CaseStudy. Specifies which unique attribute is used to find an exact CaseStudy. */
export type CaseStudyIdType =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID'
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  | 'SLUG'
  /** Identify a resource by the URI. */
  | 'URI';

/** Identifier types for retrieving a specific Page. Specifies which unique attribute is used to find an exact Page. */
export type PageIdType =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID'
  /** Identify a resource by the URI. */
  | 'URI';

/** Identifier types for retrieving a specific Post. Specifies which unique attribute is used to find an exact Post. */
export type PostIdType =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID'
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  | 'SLUG'
  /** Identify a resource by the URI. */
  | 'URI';

/** Publishing status that controls the visibility and editorial state of content. Determines whether content is published, pending review, in draft state, or private. */
export type PostStatusEnum =
  /** Objects with the acf-disabled status */
  | 'ACF_DISABLED'
  /** Automatically saved content that has not been manually saved */
  | 'AUTO_DRAFT'
  /** Content that is saved but not yet published or visible to the public */
  | 'DRAFT'
  /** Objects with the future status */
  | 'FUTURE'
  /** Content that inherits its status from a parent object */
  | 'INHERIT'
  /** Content awaiting review before publication */
  | 'PENDING'
  /** Content only visible to authorized users with appropriate permissions */
  | 'PRIVATE'
  /** Content that is publicly visible to all visitors */
  | 'PUBLISH'
  /** Objects with the request-completed status */
  | 'REQUEST_COMPLETED'
  /** Objects with the request-confirmed status */
  | 'REQUEST_CONFIRMED'
  /** Objects with the request-failed status */
  | 'REQUEST_FAILED'
  /** Objects with the request-pending status */
  | 'REQUEST_PENDING'
  /** Content marked for deletion but still recoverable */
  | 'TRASH';

export type PageBuilderFragment = { blocks: Array<
    | { __typename: 'PageBuilderBlocksContactFormLayout', heading: string | null, intro: string | null, successMessage: string | null }
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

export type ContactFormBlockFragment = { heading: string | null, intro: string | null, successMessage: string | null };

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

export type CaseStudyCardFragment = { id: string, title: string | null, uri: string | null, caseStudyDetails: { clientName: string | null, industry: string | null, summary: string | null, logo: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null };

export type CaseStudyByQueryVariables = Exact<{
  id: string | number;
  idType: CaseStudyIdType;
}>;


export type CaseStudyByQuery = { caseStudy: { databaseId: number, title: string | null, uri: string | null, featuredImage: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, caseStudyDetails: { clientName: string | null, industry: string | null, summary: string | null, quoteAuthor: string | null, logo: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, metrics: Array<{ value: string | null, label: string | null } | null> | null } | null, pageBuilder: { blocks: Array<
        | { __typename: 'PageBuilderBlocksContactFormLayout', heading: string | null, intro: string | null, successMessage: string | null }
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
       | null> | null } | null, seo: { title: string | null, metaDesc: string | null, metaRobotsNoindex: string | null, metaRobotsNofollow: string | null, opengraphTitle: string | null, opengraphDescription: string | null, opengraphType: string | null, opengraphPublishedTime: string | null, opengraphModifiedTime: string | null, twitterTitle: string | null, twitterDescription: string | null, opengraphImage: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, twitterImage: { sourceUrl: string | null } | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null } | null } | null };

export type CaseStudyListQueryVariables = Exact<{ [key: string]: never; }>;


export type CaseStudyListQuery = { caseStudies: { nodes: Array<{ id: string, title: string | null, uri: string | null, caseStudyDetails: { clientName: string | null, industry: string | null, summary: string | null, logo: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null } | null }> } | null };

export type ChangelogEntriesQueryVariables = Exact<{
  stati?: Array<PostStatusEnum | null | undefined> | PostStatusEnum | null | undefined;
}>;


export type ChangelogEntriesQuery = { changelogEntries: { nodes: Array<{ databaseId: number, title: string | null, status: string | null, changelogDetails: { version: string | null, releaseDate: string | null, body: string | null } | null, changeTypes: { nodes: Array<{ name: string | null, slug: string | null }> } | null }> } | null };

export type MediaFragment = { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null };

export type LinkFragment = { title: string | null, url: string | null, target: string | null };

export type SeoFragment = { title: string | null, metaDesc: string | null, metaRobotsNoindex: string | null, metaRobotsNofollow: string | null, opengraphTitle: string | null, opengraphDescription: string | null, opengraphType: string | null, opengraphPublishedTime: string | null, opengraphModifiedTime: string | null, twitterTitle: string | null, twitterDescription: string | null, opengraphImage: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, twitterImage: { sourceUrl: string | null } | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null };

export type TaxonomySeoFragment = { title: string | null, metaDesc: string | null, metaRobotsNoindex: string | null, metaRobotsNofollow: string | null, opengraphTitle: string | null, opengraphDescription: string | null, opengraphImage: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null };

export type LayoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LayoutQuery = { generalSettings: { title: string | null, description: string | null } | null, globals: { siteSettings: { announcementEnabled: boolean | null, announcementText: string | null, footerText: string | null, announcementLink: { title: string | null, url: string | null, target: string | null } | null, socialLinks: Array<{ network: Array<string | null> | null, url: string | null } | null> | null, defaultCta: { title: string | null, url: string | null, target: string | null } | null } | null } | null, primaryMenu: { nodes: Array<{ id: string, label: string | null, url: string | null, path: string | null, target: string | null, parentId: string | null }> } | null, footerMenu: { nodes: Array<{ id: string, label: string | null, url: string | null, path: string | null, target: string | null, parentId: string | null }> } | null };

export type MenuItemFragment = { id: string, label: string | null, url: string | null, path: string | null, target: string | null, parentId: string | null };

export type PageByQueryVariables = Exact<{
  id: string | number;
  idType: PageIdType;
}>;


export type PageByQuery = { page: { databaseId: number, title: string | null, uri: string | null, isFrontPage: boolean, seo: { title: string | null, metaDesc: string | null, metaRobotsNoindex: string | null, metaRobotsNofollow: string | null, opengraphTitle: string | null, opengraphDescription: string | null, opengraphType: string | null, opengraphPublishedTime: string | null, opengraphModifiedTime: string | null, twitterTitle: string | null, twitterDescription: string | null, opengraphImage: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, twitterImage: { sourceUrl: string | null } | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null } | null, pageBuilder: { blocks: Array<
        | { __typename: 'PageBuilderBlocksContactFormLayout', heading: string | null, intro: string | null, successMessage: string | null }
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

export type PostCardFragment = { id: string, title: string | null, uri: string | null, date: string | null, excerpt: string | null, featuredImage: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, categories: { nodes: Array<{ name: string | null, uri: string | null }> } | null };

export type PostByQueryVariables = Exact<{
  id: string | number;
  idType: PostIdType;
}>;


export type PostByQuery = { post: { databaseId: number, title: string | null, uri: string | null, date: string | null, modified: string | null, content: string | null, excerpt: string | null, featuredImage: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, author: { node: { name: string | null, description: string | null } } | null, categories: { nodes: Array<{ name: string | null, uri: string | null }> } | null, seo: { title: string | null, metaDesc: string | null, metaRobotsNoindex: string | null, metaRobotsNofollow: string | null, opengraphTitle: string | null, opengraphDescription: string | null, opengraphType: string | null, opengraphPublishedTime: string | null, opengraphModifiedTime: string | null, twitterTitle: string | null, twitterDescription: string | null, opengraphImage: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, twitterImage: { sourceUrl: string | null } | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null } | null } | null };

export type PostListQueryVariables = Exact<{
  first: number;
}>;


export type PostListQuery = { posts: { nodes: Array<{ id: string, title: string | null, uri: string | null, date: string | null, excerpt: string | null, featuredImage: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, categories: { nodes: Array<{ name: string | null, uri: string | null }> } | null }> } | null, categories: { nodes: Array<{ name: string | null, uri: string | null }> } | null };

export type CategoryByUriQueryVariables = Exact<{
  uri: string | number;
}>;


export type CategoryByUriQuery = { category: { name: string | null, description: string | null, uri: string | null, seo: { title: string | null, metaDesc: string | null, metaRobotsNoindex: string | null, metaRobotsNofollow: string | null, opengraphTitle: string | null, opengraphDescription: string | null, opengraphImage: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, breadcrumbs: Array<{ text: string | null, url: string | null } | null> | null } | null, posts: { nodes: Array<{ id: string, title: string | null, uri: string | null, date: string | null, excerpt: string | null, featuredImage: { node: { sourceUrl: string | null, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } } | null, categories: { nodes: Array<{ name: string | null, uri: string | null }> } | null }> } | null } | null, categories: { nodes: Array<{ name: string | null, uri: string | null }> } | null };

export type PostUrisQueryVariables = Exact<{ [key: string]: never; }>;


export type PostUrisQuery = { posts: { nodes: Array<{ uri: string | null }> } | null, categories: { nodes: Array<{ uri: string | null }> } | null };

export type PreviewNodeQueryVariables = Exact<{
  id: string | number;
}>;


export type PreviewNodeQuery = { contentNode:
    | { __typename: 'CaseStudy', databaseId: number, status: string | null, uri: string | null, contentTypeName: string }
    | { __typename: 'ChangelogEntry', databaseId: number, status: string | null, uri: string | null, contentTypeName: string }
    | { __typename: 'MediaItem', databaseId: number, status: string | null, uri: string | null, contentTypeName: string }
    | { __typename: 'Page', databaseId: number, status: string | null, uri: string | null, contentTypeName: string }
    | { __typename: 'Plan', databaseId: number, status: string | null, uri: string | null, contentTypeName: string }
    | { __typename: 'Post', databaseId: number, status: string | null, uri: string | null, contentTypeName: string }
   | null };

export type PreviewIdByUriQueryVariables = Exact<{
  uri: string;
}>;


export type PreviewIdByUriQuery = { nodeByUri:
    | { databaseId: number }
    | { databaseId: number }
    | { databaseId: number }
    | { databaseId: number }
    | { databaseId: number }
    | { databaseId: number }
    | Record<PropertyKey, never>
   | null };

export type SitemapEntriesQueryVariables = Exact<{ [key: string]: never; }>;


export type SitemapEntriesQuery = { pages: { nodes: Array<{ uri: string | null, modified: string | null }> } | null, posts: { nodes: Array<{ uri: string | null, modified: string | null }> } | null, caseStudies: { nodes: Array<{ uri: string | null, modified: string | null }> } | null, categories: { nodes: Array<{ uri: string | null }> } | null };

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
export const ContactFormBlockFragmentDoc = new TypedDocumentString(`
    fragment ContactFormBlock on PageBuilderBlocksContactFormLayout {
  heading
  intro
  successMessage
}
    `, {"fragmentName":"ContactFormBlock"}) as unknown as TypedDocumentString<ContactFormBlockFragment, unknown>;
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
    ...ContactFormBlock
  }
}
    fragment ContactFormBlock on PageBuilderBlocksContactFormLayout {
  heading
  intro
  successMessage
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
export const CaseStudyCardFragmentDoc = new TypedDocumentString(`
    fragment CaseStudyCard on CaseStudy {
  id
  title
  uri
  caseStudyDetails {
    clientName
    industry
    summary
    logo {
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
}`, {"fragmentName":"CaseStudyCard"}) as unknown as TypedDocumentString<CaseStudyCardFragment, unknown>;
export const SeoFragmentDoc = new TypedDocumentString(`
    fragment Seo on PostTypeSEO {
  title
  metaDesc
  metaRobotsNoindex
  metaRobotsNofollow
  opengraphTitle
  opengraphDescription
  opengraphType
  opengraphPublishedTime
  opengraphModifiedTime
  opengraphImage {
    ...Media
  }
  twitterTitle
  twitterDescription
  twitterImage {
    sourceUrl
  }
  breadcrumbs {
    text
    url
  }
}
    fragment Media on MediaItem {
  sourceUrl
  altText
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"Seo"}) as unknown as TypedDocumentString<SeoFragment, unknown>;
export const TaxonomySeoFragmentDoc = new TypedDocumentString(`
    fragment TaxonomySeo on TaxonomySEO {
  title
  metaDesc
  metaRobotsNoindex
  metaRobotsNofollow
  opengraphTitle
  opengraphDescription
  opengraphImage {
    ...Media
  }
  breadcrumbs {
    text
    url
  }
}
    fragment Media on MediaItem {
  sourceUrl
  altText
  mediaDetails {
    width
    height
  }
}`, {"fragmentName":"TaxonomySeo"}) as unknown as TypedDocumentString<TaxonomySeoFragment, unknown>;
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
export const PostCardFragmentDoc = new TypedDocumentString(`
    fragment PostCard on Post {
  id
  title
  uri
  date
  excerpt
  featuredImage {
    node {
      ...Media
    }
  }
  categories {
    nodes {
      name
      uri
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
}`, {"fragmentName":"PostCard"}) as unknown as TypedDocumentString<PostCardFragment, unknown>;
export const CaseStudyByDocument = new TypedDocumentString(`
    query CaseStudyBy($id: ID!, $idType: CaseStudyIdType!) {
  caseStudy(id: $id, idType: $idType) {
    databaseId
    title
    uri
    featuredImage {
      node {
        ...Media
      }
    }
    caseStudyDetails {
      clientName
      industry
      summary
      quoteAuthor
      logo {
        node {
          ...Media
        }
      }
      metrics {
        value
        label
      }
    }
    pageBuilder {
      ...PageBuilder
    }
    seo {
      ...Seo
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
    ...ContactFormBlock
  }
}
fragment ContactFormBlock on PageBuilderBlocksContactFormLayout {
  heading
  intro
  successMessage
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
}
fragment Seo on PostTypeSEO {
  title
  metaDesc
  metaRobotsNoindex
  metaRobotsNofollow
  opengraphTitle
  opengraphDescription
  opengraphType
  opengraphPublishedTime
  opengraphModifiedTime
  opengraphImage {
    ...Media
  }
  twitterTitle
  twitterDescription
  twitterImage {
    sourceUrl
  }
  breadcrumbs {
    text
    url
  }
}`) as unknown as TypedDocumentString<CaseStudyByQuery, CaseStudyByQueryVariables>;
export const CaseStudyListDocument = new TypedDocumentString(`
    query CaseStudyList {
  caseStudies(first: 100, where: { status: PUBLISH }) {
    nodes {
      ...CaseStudyCard
    }
  }
}
    fragment CaseStudyCard on CaseStudy {
  id
  title
  uri
  caseStudyDetails {
    clientName
    industry
    summary
    logo {
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
}`) as unknown as TypedDocumentString<CaseStudyListQuery, CaseStudyListQueryVariables>;
export const ChangelogEntriesDocument = new TypedDocumentString(`
    query ChangelogEntries($stati: [PostStatusEnum]) {
  changelogEntries(first: 100, where: { stati: $stati }) {
    nodes {
      databaseId
      title
      status
      changelogDetails {
        version
        releaseDate
        body
      }
      changeTypes {
        nodes {
          name
          slug
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<ChangelogEntriesQuery, ChangelogEntriesQueryVariables>;
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
export const PageByDocument = new TypedDocumentString(`
    query PageBy($id: ID!, $idType: PageIdType!) {
  page(id: $id, idType: $idType) {
    databaseId
    title
    uri
    isFrontPage
    seo {
      ...Seo
    }
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
    ...ContactFormBlock
  }
}
fragment ContactFormBlock on PageBuilderBlocksContactFormLayout {
  heading
  intro
  successMessage
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
}
fragment Seo on PostTypeSEO {
  title
  metaDesc
  metaRobotsNoindex
  metaRobotsNofollow
  opengraphTitle
  opengraphDescription
  opengraphType
  opengraphPublishedTime
  opengraphModifiedTime
  opengraphImage {
    ...Media
  }
  twitterTitle
  twitterDescription
  twitterImage {
    sourceUrl
  }
  breadcrumbs {
    text
    url
  }
}`) as unknown as TypedDocumentString<PageByQuery, PageByQueryVariables>;
export const PageUrisDocument = new TypedDocumentString(`
    query PageUris {
  pages(first: 100, where: { status: PUBLISH }) {
    nodes {
      uri
    }
  }
}
    `) as unknown as TypedDocumentString<PageUrisQuery, PageUrisQueryVariables>;
export const PostByDocument = new TypedDocumentString(`
    query PostBy($id: ID!, $idType: PostIdType!) {
  post(id: $id, idType: $idType) {
    databaseId
    title
    uri
    date
    modified
    content
    excerpt
    featuredImage {
      node {
        ...Media
      }
    }
    author {
      node {
        name
        description
      }
    }
    categories {
      nodes {
        name
        uri
      }
    }
    seo {
      ...Seo
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
fragment Seo on PostTypeSEO {
  title
  metaDesc
  metaRobotsNoindex
  metaRobotsNofollow
  opengraphTitle
  opengraphDescription
  opengraphType
  opengraphPublishedTime
  opengraphModifiedTime
  opengraphImage {
    ...Media
  }
  twitterTitle
  twitterDescription
  twitterImage {
    sourceUrl
  }
  breadcrumbs {
    text
    url
  }
}`) as unknown as TypedDocumentString<PostByQuery, PostByQueryVariables>;
export const PostListDocument = new TypedDocumentString(`
    query PostList($first: Int!) {
  posts(first: $first, where: { status: PUBLISH }) {
    nodes {
      ...PostCard
    }
  }
  categories(first: 50, where: { hideEmpty: true }) {
    nodes {
      name
      uri
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
fragment PostCard on Post {
  id
  title
  uri
  date
  excerpt
  featuredImage {
    node {
      ...Media
    }
  }
  categories {
    nodes {
      name
      uri
    }
  }
}`) as unknown as TypedDocumentString<PostListQuery, PostListQueryVariables>;
export const CategoryByUriDocument = new TypedDocumentString(`
    query CategoryByUri($uri: ID!) {
  category(id: $uri, idType: URI) {
    name
    description
    uri
    seo {
      ...TaxonomySeo
    }
    posts(first: 50, where: { status: PUBLISH }) {
      nodes {
        ...PostCard
      }
    }
  }
  categories(first: 50, where: { hideEmpty: true }) {
    nodes {
      name
      uri
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
fragment TaxonomySeo on TaxonomySEO {
  title
  metaDesc
  metaRobotsNoindex
  metaRobotsNofollow
  opengraphTitle
  opengraphDescription
  opengraphImage {
    ...Media
  }
  breadcrumbs {
    text
    url
  }
}
fragment PostCard on Post {
  id
  title
  uri
  date
  excerpt
  featuredImage {
    node {
      ...Media
    }
  }
  categories {
    nodes {
      name
      uri
    }
  }
}`) as unknown as TypedDocumentString<CategoryByUriQuery, CategoryByUriQueryVariables>;
export const PostUrisDocument = new TypedDocumentString(`
    query PostUris {
  posts(first: 100, where: { status: PUBLISH }) {
    nodes {
      uri
    }
  }
  categories(first: 100, where: { hideEmpty: true }) {
    nodes {
      uri
    }
  }
}
    `) as unknown as TypedDocumentString<PostUrisQuery, PostUrisQueryVariables>;
export const PreviewNodeDocument = new TypedDocumentString(`
    query PreviewNode($id: ID!) {
  contentNode(id: $id, idType: DATABASE_ID) {
    __typename
    databaseId
    status
    uri
    contentTypeName
  }
}
    `) as unknown as TypedDocumentString<PreviewNodeQuery, PreviewNodeQueryVariables>;
export const PreviewIdByUriDocument = new TypedDocumentString(`
    query PreviewIdByUri($uri: String!) {
  nodeByUri(uri: $uri) {
    ... on ContentNode {
      databaseId
    }
  }
}
    `) as unknown as TypedDocumentString<PreviewIdByUriQuery, PreviewIdByUriQueryVariables>;
export const SitemapEntriesDocument = new TypedDocumentString(`
    query SitemapEntries {
  pages(first: 100, where: { status: PUBLISH }) {
    nodes {
      uri
      modified
    }
  }
  posts(first: 100, where: { status: PUBLISH }) {
    nodes {
      uri
      modified
    }
  }
  caseStudies(first: 100, where: { status: PUBLISH }) {
    nodes {
      uri
      modified
    }
  }
  categories(first: 100, where: { hideEmpty: true }) {
    nodes {
      uri
    }
  }
}
    `) as unknown as TypedDocumentString<SitemapEntriesQuery, SitemapEntriesQueryVariables>;