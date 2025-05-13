import { ModuleMeta } from '../../types/modules.js';
import { styled } from 'styled-components';
import { withUrlPath } from '@hubspot/cms-components';
import cardIconSvg from './assets/card-icon-temp.svg';
import BlogCardComponent from '../../BlogCardComponent/index.js';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import fetchGatedPosts from '../../utils/ServerSideProps/fetchGatedBlogPosts.js';
import { HeadingLevelType } from '../../types/fields.js';
import { CardVariantType } from '../../types/fields.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { PlaceholderEmptyContent } from '../../PlaceholderComponent/PlaceholderEmptyContent.js';

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

const RecentBlogPosts = styled.div`
  container: blog-grid / inline-size;
`;

const BlogCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: var(--hsElevate--spacing--32, 32px);
  margin-bottom: var(--hsElevate--spacing--48, 48px);
  justify-content: center;
  align-items: stretch;

  @container blog-grid (inline-size >= 768px) {
    .hs-elevate-card--blog__card-wrapper {
      width: calc(50% - var(--hsElevate--spacing--32, 32px));
      max-width: calc(50% - var(--hsElevate--spacing--32, 32px));
      height: auto;
    }
  }

  @container blog-grid (inline-size >= 1001px) {
    .hs-elevate-card--blog__card-wrapper {
      width: calc(33.333% - var(--hsElevate--spacing--32, 32px));
      max-width: calc(33.333% - var(--hsElevate--spacing--32, 32px));
      height: auto;
    }
  }
`;

export const Component = (props: RecentBlogPostsProps) => {
  const {
    hublData: { posts, isInEditor },
    fieldValues: {
      headingAndTextHeadingLevel,
      groupStyle: {
        cardStyleVariant,
        headingStyleVariant: { headingStyleVariant },
      },
      groupPlaceholderText: { placeholderTitle, placeholderDescription },
    },
    serverSideProps: { gatedContentIds },
  } = props;

  const postsToUse = posts || [];

  return (
    <StyledComponentsRegistry>
      <RecentBlogPosts className="hs-elevate-recent-blog-posts">
        <BlogCardsContainer className="hs-elevate-recent-blog-posts__blog-card-container">
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
                additionalClassArray={['hs-elevate-recent-blog-posts__blog-card']}
              />
            ))
          )}
        </BlogCardsContainer>
      </RecentBlogPosts>
    </StyledComponentsRegistry>
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

export const getServerSideProps = withUrlPath(fetchGatedPosts);

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
