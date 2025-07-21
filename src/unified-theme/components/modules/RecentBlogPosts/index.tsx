import { ModuleMeta } from '../../types/modules.js';
import styles from './recent-blog-posts.module.css';
import cx from '../../utils/classnames.js';
import { createComponent } from '../../utils/create-component.js';
import { withUrlPath } from '@hubspot/cms-components';
import cardIconSvg from './assets/card-icon-temp.svg';
import BlogCardComponent from '../../BlogCardComponent/index.js';
import fetchGatedPosts from '../../utils/ServerSideProps/fetchGatedBlogPosts.js';
import { HeadingLevelType } from '../../types/fields.js';
import { CardVariantType } from '../../types/fields.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { PlaceholderEmptyContent } from '../../PlaceholderComponent/PlaceholderEmptyContent.js';

// Types

type RecentBlogPostsProps = {
  hublData: {
    posts: {
      id: number;
      title: string;
      featuredImage: string;
      featuredImageAltText: string;
      featuredImageWidth: number;
      featuredImageHeight: number;
      topicNames: string[];
      absoluteUrl: string;
    }[];
    isInEditor: boolean;
  };
  fieldValues: {
    headingAndTextHeadingLevel: HeadingLevelType;
    groupStyle: {
      cardStyleVariant: CardVariantType;
      headingStyleVariant: HeadingStyleFieldLibraryType;
    };
    groupPlaceholderText: {
      placeholderTitle: string;
      placeholderDescription: string;
    };
  };
  serverSideProps: {
    gatedContentIds: number[];
  };
};

// Components

const RecentBlogPosts = createComponent('div');
const BlogCardsContainer = createComponent('div');

export const Component = (props: RecentBlogPostsProps) => {
  const {
    hublData: { posts, isInEditor },
    fieldValues: {
      headingAndTextHeadingLevel,
      groupStyle: { cardStyleVariant, headingStyleVariant },
      groupPlaceholderText: { placeholderTitle, placeholderDescription },
    },
    serverSideProps: { gatedContentIds },
  } = props;

  const postsToUse = posts || [];

  return (
    <RecentBlogPosts className={cx('hs-elevate-recent-blog-posts', styles['hs-elevate-recent-blog-posts'])}>
      <BlogCardsContainer className={cx('hs-elevate-recent-blog-posts__blog-card-container', styles['hs-elevate-recent-blog-posts__blog-card-container'])}>
        {postsToUse.length === 0 && isInEditor ? (
          <PlaceholderEmptyContent title={placeholderTitle} description={placeholderDescription} icon={meta.icon} />
        ) : (
          postsToUse.map(post => (
            <BlogCardComponent
              key={post.id}
              post={{
                ...post,
                id: post.id.toString(),
              }}
              headingAndTextHeadingLevel={headingAndTextHeadingLevel}
              headingStyleVariant={headingStyleVariant}
              cardStyleVariant={cardStyleVariant}
              gatedContentIds={gatedContentIds.map(id => id.toString())}
              additionalClassArray={['hs-elevate-recent-blog-posts__blog-card', styles['hs-elevate-recent-blog-posts__blog-card']]}
            />
          ))
        )}
      </BlogCardsContainer>
    </RecentBlogPosts>
  );
};

export { fields } from './fields.js';

export const hublDataTemplate = `
  {% if module.blog is number %}
    {% set blog = module.blog %}
  {% else %}
    {% set blog = 'default' %}
  {% endif %}

  {% set blog_post_ids = [] %}
  {% set blog_posts = [] %}

  {% for post in blog_recent_posts(blog, 3) %}
    {% do blog_post_ids.append(post.id) %}

    {% set temp_post = {
        id: post.id,
        absoluteUrl: post.absoluteUrl|escape_url,
        featuredImage: post.featuredImage,
        featuredImageAltText: post.featuredImageAltText,
        featuredImageWidth: post.featuredImageWidth,
        featuredImageHeight: post.featuredImageHeight,
        title: post.label,
        topicNames: post.topicNames
      }
    %}
    {% do blog_posts.append(temp_post) %}
  {% endfor %}

  {% set hublData = {
    'posts': blog_posts,
    'blogPostIds': blog_post_ids,
    'isInEditor': is_in_editor
    }
  %}
`;

export const getStaticProps = withUrlPath(fetchGatedPosts);

export const meta: ModuleMeta = {
  label: 'Recent blog posts',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: cardIconSvg,
  categories: ['blog'],
  is_available_for_new_content: true,
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/recent_blog_posts',
  version: 0,
  themeModule: true,
};
