import { ModuleMeta } from '../../types/modules.js';
import { TextAlignmentFieldType, TextFieldType } from '@hubspot/cms-components/fields';
import headingIconSvg from './assets/heading.svg';
import HeadingComponent from '../../HeadingComponent/index.js';
import { HeadingLevelType, SectionVariantType } from '../../types/fields.js';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';

// Types

type GroupStyle = SectionStyleFieldLibraryType &
  HeadingStyleFieldLibraryType & {
    alignment?: TextAlignmentFieldType['default'];
  };
type HeadingProps = HeadingAndTextFieldLibraryType & {
  groupStyle: GroupStyle;
};

// Heading

// Functions to pull in corresponding CSS variables on component based on field values

type CSSPropertiesMap = { [key: string]: string };

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  return {
    '--hsElevate--heading__textColor': sectionColorsMap[sectionVariantField].textColor,
  };
}

const HeadingContainer = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--hsElevate--heading__textColor);
  }
`;

export const Component = (props: HeadingProps) => {
  const {
    headingAndTextHeadingLevel,
    headingAndTextHeading,
    groupStyle: { alignment, headingStyleVariant, sectionStyleVariant },
  } = props;

  const cssVarsMap = {
    ...generateColorCssVars(sectionStyleVariant),
  };

  return (
    <StyledComponentsRegistry>
      <HeadingContainer style={cssVarsMap} className="hs-elevate-heading-container">
        <HeadingComponent
          additionalClassArray={['hs-elevate-heading-container__heading']}
          headingLevel={headingAndTextHeadingLevel}
          heading={headingAndTextHeading}
          alignment={alignment}
          headingStyleVariant={headingStyleVariant}
        />
      </HeadingContainer>
    </StyledComponentsRegistry>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Heading',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: headingIconSvg,
  categories: ['text'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/heading',
  version: 0,
  themeModule: true,
};
