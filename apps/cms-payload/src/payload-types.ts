/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    pages: Page;
    'error-pages': ErrorPage;
    articles: Article;
    categories: Category;
    difficulties: Difficulty;
    genres: Genre;
    instruments: Instrument;
    people: Person;
    users: User;
    media: Media;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    pages: PagesSelect<false> | PagesSelect<true>;
    'error-pages': ErrorPagesSelect<false> | ErrorPagesSelect<true>;
    articles: ArticlesSelect<false> | ArticlesSelect<true>;
    categories: CategoriesSelect<false> | CategoriesSelect<true>;
    difficulties: DifficultiesSelect<false> | DifficultiesSelect<true>;
    genres: GenresSelect<false> | GenresSelect<true>;
    instruments: InstrumentsSelect<false> | InstrumentsSelect<true>;
    people: PeopleSelect<false> | PeopleSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {
    footer: Footer;
    'site-settings': SiteSetting;
    navigation: Navigation;
  };
  globalsSelect: {
    footer: FooterSelect<false> | FooterSelect<true>;
    'site-settings': SiteSettingsSelect<false> | SiteSettingsSelect<true>;
    navigation: NavigationSelect<false> | NavigationSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  /**
   * Automatically generated from the title if left empty
   */
  slug: string;
  blocks?:
    | {
        content?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'richText';
      }[]
    | null;
  metadata: {
    /**
     * Meta title (open graph) for SEO
     */
    title: string;
    /**
     * Meta description (open graph) for SEO
     */
    description: string;
    ogImage?: (number | null) | Media;
    /**
     * If checked, the page will not be indexed by search engines
     */
    noindex?: boolean | null;
    /**
     * If checked, the page will not be followed by search engines
     */
    nofollow?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "error-pages".
 */
export interface ErrorPage {
  id: number;
  errorType?: ('404' | '500') | null;
  title: string;
  metadata: {
    /**
     * Meta title (open graph) for SEO
     */
    title: string;
    /**
     * Meta description (open graph) for SEO
     */
    description: string;
    ogImage?: (number | null) | Media;
    /**
     * If checked, the page will not be indexed by search engines
     */
    noindex?: boolean | null;
    /**
     * If checked, the page will not be followed by search engines
     */
    nofollow?: boolean | null;
  };
  blocks?:
    | {
        content?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'richText';
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "articles".
 */
export interface Article {
  id: number;
  /**
   * The title of the article.
   */
  title: string;
  /**
   * Automatically generated from the title if left empty
   */
  slug: string;
  /**
   * Author, or authors, of the article.
   */
  authors?:
    | {
        author?: (number | null) | Person;
        id?: string | null;
      }[]
    | null;
  contentMetadata?: {
    categories?:
      | {
          category?: (number | null) | Category;
          id?: string | null;
        }[]
      | null;
    genres?:
      | {
          genre?: (number | null) | Genre;
          id?: string | null;
        }[]
      | null;
    difficulties?:
      | {
          difficulty?: (number | null) | Difficulty;
          id?: string | null;
        }[]
      | null;
    instruments?:
      | {
          instrument?: (number | null) | Instrument;
          id?: string | null;
        }[]
      | null;
  };
  publishedDate: string;
  /**
   * Leave blank if the article has not been updated.
   */
  updatedDate?: string | null;
  excerpt?: string | null;
  blocks?:
    | {
        content?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'richText';
      }[]
    | null;
  metadata: {
    /**
     * Meta title (open graph) for SEO
     */
    title: string;
    /**
     * Meta description (open graph) for SEO
     */
    description: string;
    ogImage?: (number | null) | Media;
    /**
     * If checked, the page will not be indexed by search engines
     */
    noindex?: boolean | null;
    /**
     * If checked, the page will not be followed by search engines
     */
    nofollow?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "people".
 */
export interface Person {
  id: number;
  name: string;
  /**
   * Automatically generated from the title if left empty
   */
  slug: string;
  socialLinks?:
    | {
        socialLink?: {
          platform?:
            | (
                | 'facebook'
                | 'instagram'
                | 'twitter-x'
                | 'youtube'
                | 'tiktok'
                | 'twitch'
                | 'soundcloud'
                | 'spotify'
                | 'website'
              )
            | null;
          url?: string | null;
        };
        id?: string | null;
      }[]
    | null;
  image?: (number | null) | Media;
  avatar?: (number | null) | Media;
  metadata: {
    /**
     * Meta title (open graph) for SEO
     */
    title: string;
    /**
     * Meta description (open graph) for SEO
     */
    description: string;
    ogImage?: (number | null) | Media;
    /**
     * If checked, the page will not be indexed by search engines
     */
    noindex?: boolean | null;
    /**
     * If checked, the page will not be followed by search engines
     */
    nofollow?: boolean | null;
  };
  blocks?:
    | {
        content?: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        } | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'richText';
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: number;
  title: string;
  metadata: {
    /**
     * Meta title (open graph) for SEO
     */
    title: string;
    /**
     * Meta description (open graph) for SEO
     */
    description: string;
    ogImage?: (number | null) | Media;
    /**
     * If checked, the page will not be indexed by search engines
     */
    noindex?: boolean | null;
    /**
     * If checked, the page will not be followed by search engines
     */
    nofollow?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "genres".
 */
export interface Genre {
  id: number;
  title: string;
  metadata: {
    /**
     * Meta title (open graph) for SEO
     */
    title: string;
    /**
     * Meta description (open graph) for SEO
     */
    description: string;
    ogImage?: (number | null) | Media;
    /**
     * If checked, the page will not be indexed by search engines
     */
    noindex?: boolean | null;
    /**
     * If checked, the page will not be followed by search engines
     */
    nofollow?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "difficulties".
 */
export interface Difficulty {
  id: number;
  title: string;
  metadata: {
    /**
     * Meta title (open graph) for SEO
     */
    title: string;
    /**
     * Meta description (open graph) for SEO
     */
    description: string;
    ogImage?: (number | null) | Media;
    /**
     * If checked, the page will not be indexed by search engines
     */
    noindex?: boolean | null;
    /**
     * If checked, the page will not be followed by search engines
     */
    nofollow?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "instruments".
 */
export interface Instrument {
  id: number;
  title: string;
  metadata: {
    /**
     * Meta title (open graph) for SEO
     */
    title: string;
    /**
     * Meta description (open graph) for SEO
     */
    description: string;
    ogImage?: (number | null) | Media;
    /**
     * If checked, the page will not be indexed by search engines
     */
    noindex?: boolean | null;
    /**
     * If checked, the page will not be followed by search engines
     */
    nofollow?: boolean | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'error-pages';
        value: number | ErrorPage;
      } | null)
    | ({
        relationTo: 'articles';
        value: number | Article;
      } | null)
    | ({
        relationTo: 'categories';
        value: number | Category;
      } | null)
    | ({
        relationTo: 'difficulties';
        value: number | Difficulty;
      } | null)
    | ({
        relationTo: 'genres';
        value: number | Genre;
      } | null)
    | ({
        relationTo: 'instruments';
        value: number | Instrument;
      } | null)
    | ({
        relationTo: 'people';
        value: number | Person;
      } | null)
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  blocks?:
    | T
    | {
        richText?:
          | T
          | {
              content?: T;
              id?: T;
              blockName?: T;
            };
      };
  metadata?:
    | T
    | {
        title?: T;
        description?: T;
        ogImage?: T;
        noindex?: T;
        nofollow?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "error-pages_select".
 */
export interface ErrorPagesSelect<T extends boolean = true> {
  errorType?: T;
  title?: T;
  metadata?:
    | T
    | {
        title?: T;
        description?: T;
        ogImage?: T;
        noindex?: T;
        nofollow?: T;
      };
  blocks?:
    | T
    | {
        richText?:
          | T
          | {
              content?: T;
              id?: T;
              blockName?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "articles_select".
 */
export interface ArticlesSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  authors?:
    | T
    | {
        author?: T;
        id?: T;
      };
  contentMetadata?:
    | T
    | {
        categories?:
          | T
          | {
              category?: T;
              id?: T;
            };
        genres?:
          | T
          | {
              genre?: T;
              id?: T;
            };
        difficulties?:
          | T
          | {
              difficulty?: T;
              id?: T;
            };
        instruments?:
          | T
          | {
              instrument?: T;
              id?: T;
            };
      };
  publishedDate?: T;
  updatedDate?: T;
  excerpt?: T;
  blocks?:
    | T
    | {
        richText?:
          | T
          | {
              content?: T;
              id?: T;
              blockName?: T;
            };
      };
  metadata?:
    | T
    | {
        title?: T;
        description?: T;
        ogImage?: T;
        noindex?: T;
        nofollow?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories_select".
 */
export interface CategoriesSelect<T extends boolean = true> {
  title?: T;
  metadata?:
    | T
    | {
        title?: T;
        description?: T;
        ogImage?: T;
        noindex?: T;
        nofollow?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "difficulties_select".
 */
export interface DifficultiesSelect<T extends boolean = true> {
  title?: T;
  metadata?:
    | T
    | {
        title?: T;
        description?: T;
        ogImage?: T;
        noindex?: T;
        nofollow?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "genres_select".
 */
export interface GenresSelect<T extends boolean = true> {
  title?: T;
  metadata?:
    | T
    | {
        title?: T;
        description?: T;
        ogImage?: T;
        noindex?: T;
        nofollow?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "instruments_select".
 */
export interface InstrumentsSelect<T extends boolean = true> {
  title?: T;
  metadata?:
    | T
    | {
        title?: T;
        description?: T;
        ogImage?: T;
        noindex?: T;
        nofollow?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "people_select".
 */
export interface PeopleSelect<T extends boolean = true> {
  name?: T;
  slug?: T;
  socialLinks?:
    | T
    | {
        socialLink?:
          | T
          | {
              platform?: T;
              url?: T;
            };
        id?: T;
      };
  image?: T;
  avatar?: T;
  metadata?:
    | T
    | {
        title?: T;
        description?: T;
        ogImage?: T;
        noindex?: T;
        nofollow?: T;
      };
  blocks?:
    | T
    | {
        richText?:
          | T
          | {
              content?: T;
              id?: T;
              blockName?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: number;
  categories?:
    | {
        category?: {
          title?: string | null;
          links?:
            | {
                link?: {
                  location?: ('internal' | 'customInternal' | 'external' | 'email' | 'phone') | null;
                  text?: string | null;
                  newTab?: boolean | null;
                  internalLink?:
                    | ({
                        relationTo: 'pages';
                        value: number | Page;
                      } | null)
                    | ({
                        relationTo: 'articles';
                        value: number | Article;
                      } | null)
                    | ({
                        relationTo: 'categories';
                        value: number | Category;
                      } | null)
                    | ({
                        relationTo: 'difficulties';
                        value: number | Difficulty;
                      } | null)
                    | ({
                        relationTo: 'genres';
                        value: number | Genre;
                      } | null)
                    | ({
                        relationTo: 'instruments';
                        value: number | Instrument;
                      } | null)
                    | ({
                        relationTo: 'people';
                        value: number | Person;
                      } | null);
                  url?: string | null;
                  internalPath?: string | null;
                  phoneNumber?: string | null;
                  emailAddress?: string | null;
                };
                id?: string | null;
              }[]
            | null;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site-settings".
 */
export interface SiteSetting {
  id: number;
  siteName?: string | null;
  siteDescription?: string | null;
  defaultOGImage?: (number | null) | Media;
  socialLinks?:
    | {
        socialLink?: {
          platform?:
            | (
                | 'facebook'
                | 'instagram'
                | 'twitter-x'
                | 'youtube'
                | 'tiktok'
                | 'twitch'
                | 'soundcloud'
                | 'spotify'
                | 'website'
              )
            | null;
          url?: string | null;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "navigation".
 */
export interface Navigation {
  id: number;
  links?:
    | {
        link?: {
          location?: ('internal' | 'customInternal' | 'external' | 'email' | 'phone') | null;
          text?: string | null;
          newTab?: boolean | null;
          internalLink?:
            | ({
                relationTo: 'pages';
                value: number | Page;
              } | null)
            | ({
                relationTo: 'articles';
                value: number | Article;
              } | null)
            | ({
                relationTo: 'categories';
                value: number | Category;
              } | null)
            | ({
                relationTo: 'difficulties';
                value: number | Difficulty;
              } | null)
            | ({
                relationTo: 'genres';
                value: number | Genre;
              } | null)
            | ({
                relationTo: 'instruments';
                value: number | Instrument;
              } | null)
            | ({
                relationTo: 'people';
                value: number | Person;
              } | null);
          url?: string | null;
          internalPath?: string | null;
          phoneNumber?: string | null;
          emailAddress?: string | null;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer_select".
 */
export interface FooterSelect<T extends boolean = true> {
  categories?:
    | T
    | {
        category?:
          | T
          | {
              title?: T;
              links?:
                | T
                | {
                    link?:
                      | T
                      | {
                          location?: T;
                          text?: T;
                          newTab?: T;
                          internalLink?: T;
                          url?: T;
                          internalPath?: T;
                          phoneNumber?: T;
                          emailAddress?: T;
                        };
                    id?: T;
                  };
            };
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site-settings_select".
 */
export interface SiteSettingsSelect<T extends boolean = true> {
  siteName?: T;
  siteDescription?: T;
  defaultOGImage?: T;
  socialLinks?:
    | T
    | {
        socialLink?:
          | T
          | {
              platform?: T;
              url?: T;
            };
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "navigation_select".
 */
export interface NavigationSelect<T extends boolean = true> {
  links?:
    | T
    | {
        link?:
          | T
          | {
              location?: T;
              text?: T;
              newTab?: T;
              internalLink?: T;
              url?: T;
              internalPath?: T;
              phoneNumber?: T;
              emailAddress?: T;
            };
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}