import styles from './styles.module.css';

export const Component = props => {
  return <div className={styles.backButtonContainer}>Blog Back button</div>;
};

export const meta = {
  label: 'Blog back button',
  content_types: ['BLOG_ARTICLE'],
};

export { fields } from './fields.js';

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/blog_article_back_button',
  version: 0,
  themeModule: true,
};
