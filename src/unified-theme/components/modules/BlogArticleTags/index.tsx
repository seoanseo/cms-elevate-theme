import React from 'react';
import cx from '../../utils/classnames.js';
import styles from './styles.module.css';
import { fields } from './fields.js';
import { TagComponent } from '../../TagComponent/index.js';

interface ModuleProps {
  hublData: {
    // TODO: update to Tag type once we have it
    hsTags: string[];
    isInPreviewer: boolean;
  };
}

interface TagsProps {
  tags: string[];
}

interface BlogArticleTagsContainerProps {
  children: React.ReactNode;
}

const defaultTags = ['Tag One', 'Tag Two', 'Tag Three'];

const BlogArticleTagsContainer = (props: BlogArticleTagsContainerProps) => {
  const { children } = props;

  return <div className={cx(styles.blogArticleTagContainer, 'hs-elevate-blog-article-tags')}>{children}</div>;
};

const Tags = (props: TagsProps) => {
  const { tags } = props;

  if (!tags?.length) return null;

  return (
    <>
      {tags.map(tag => (
        // TODO: update to use theme styles once established
        <TagComponent key={tag} additionalClassArray={[styles.tag, 'hs-elevate-blog-article-tags__tag']}>
          {tag}
        </TagComponent>
      ))}
    </>
  );
};

export const Component = (props: ModuleProps) => {
  const {
    hublData: { hsTags, isInPreviewer },
  } = props;

  if (!isInPreviewer) {
    return (
      <BlogArticleTagsContainer>
        <Tags tags={hsTags} />
      </BlogArticleTagsContainer>
    );
  }

  const tags = hsTags ? hsTags : defaultTags;

  return (
    <BlogArticleTagsContainer>
      <Tags tags={tags} />
    </BlogArticleTagsContainer>
  );
};

// Module Configuration
export const meta = {
  label: 'Blog Tags',
  content_types: ['BLOG_POST', 'SITE_PAGE', 'BLOG_ARTICLE'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/blog_article_tags',
  version: 0,
  themeModule: true,
};

export const hublDataTemplate = `
  {% set hublData = {
    "isInPreviewer": is_in_previewer,
    "hsTags": dynamic_page_hubdb_row.hs_tags,
  }
  %}
`;

export { fields };
