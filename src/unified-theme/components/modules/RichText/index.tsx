import { ModuleMeta } from '../../types/modules.js';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { RichText } from '@hubspot/cms-components';
import { SectionVariantType } from '../../types/fields.js';
import richTextIconSvg from './assets/rich-text.svg';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';

type RichTextProps = {
  groupStyle: SectionStyleFieldLibraryType;
};

const StyledRichText = styled(RichText)`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  li,
  span,
  div {
    color: var(--hsElevate--richText__textColor);
  }

  a:not(.hs-elevate-button) {
    color: var(--hsElevate--richText__linkColor);
    text-decoration: var(--hsElevate--richText__textDecoration);
    text-decoration-color: var(--hsElevate--richText__textDecorationColor);
  }

  a:not(.hs-elevate-button):hover,
  a:not(.hs-elevate-button):focus {
    color: var(--hsElevate--richText__linkHoverColor);
    text-decoration: var(--hsElevate--richText__linkHoverTextDecoration);
    text-decoration-color: var(--hsElevate--richText__linkHoverTextDecorationColor);
  }
`;

// Function to generate CSS variables for colors

type CSSPropertiesMap = { [key: string]: string };

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  return {
    '--hsElevate--richText__textColor': sectionColorsMap[sectionVariantField].textColor,
    '--hsElevate--richText__accentColor': sectionColorsMap[sectionVariantField].accentColor,
    '--hsElevate--richText__linkColor': sectionColorsMap[sectionVariantField].linkColor,
    '--hsElevate--richText__textDecoration': sectionColorsMap[sectionVariantField].textDecoration,
    '--hsElevate--richText__textDecorationColor': sectionColorsMap[sectionVariantField].textDecorationColor,
    '--hsElevate--richText__linkHoverColor': sectionColorsMap[sectionVariantField].linkHoverColor,
    '--hsElevate--richText__linkHoverTextDecoration': sectionColorsMap[sectionVariantField].linkHoverTextDecoration,
    '--hsElevate--richText__linkHoverTextDecorationColor': sectionColorsMap[sectionVariantField].linkHoverTextDecorationColor,
    '--hsElevate--blockquote__textColor': sectionColorsMap[sectionVariantField].blockquoteTextColor,
    '--hsElevate--blockquote__backgroundColor': sectionColorsMap[sectionVariantField].blockquoteBackgroundColor,
    '--hsElevate--blockquote__accentColor': sectionColorsMap[sectionVariantField].blockquoteAccentColor,
  };
}

export const Component = (props: RichTextProps) => {
  const {
    groupStyle: { sectionStyleVariant },
  } = props;

  const cssVarsMap = {
    ...generateColorCssVars(sectionStyleVariant),
  };

  return (
    <StyledComponentsRegistry>
      <StyledRichText className="hs-elevate-rich-text" fieldPath="richTextContentHTML" style={cssVarsMap} />
    </StyledComponentsRegistry>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Rich text',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: richTextIconSvg,
  categories: ['text'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/rich_text',
  version: 0,
  themeModule: true,
};
