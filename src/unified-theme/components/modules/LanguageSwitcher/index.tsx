import { ModuleMeta } from '../../types/modules.js';
import { TextFieldType } from '@hubspot/cms-components/fields';
import { Island } from '@hubspot/cms-components';
import LanguageSwitcherIsland from '../../LanguageSwitcherComponent/index.jsx?island';
import languageSwitcherIconSvg from './assets/language.svg';
import { useAvailableTranslations } from '@hubspot/cms-components';

type LanguageSwitcherProps = {
  languageSwitcher: TextFieldType['default'];
};

export const Component = (props: LanguageSwitcherProps) => {
  return <Island module={LanguageSwitcherIsland} myAvailableTranslations={useAvailableTranslations()} {...props} langSwitcherIconFieldPath="globe_icon" />;
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Language switcher',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'BLOG_POST', 'BLOG_LISTING'],
  icon: languageSwitcherIconSvg,
  categories: ['functionality'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/language_switcher',
  version: 0,
  themeModule: true,
};
