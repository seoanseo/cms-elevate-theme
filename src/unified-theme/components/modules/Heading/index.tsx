import { ModuleMeta } from '../../types/modules.js';
import {
  TextAlignmentFieldType,
  TextFieldType,
} from '@hubspot/cms-components/fields';
import headingIconSvg from './assets/heading.svg';
import HeadingComponent from '../../HeadingComponent/index.js';
import { HeadingLevelType, SectionVariantType } from '../../types/fields.js';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';

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
  const sectionColorsMap = {
    section_variant_1: {
      textColor: 'var(--hsElevate--section--lightSection--1__textColor)',
    },
    section_variant_2: {
      textColor: 'var(--hsElevate--section--lightSection--2__textColor)',
    },
    section_variant_3: {
      textColor: 'var(--hsElevate--section--lightSection--3__textColor)',
    },
    section_variant_4: {
      textColor: 'var(--hsElevate--section--darkSection--1__textColor)',
    },
  };

  return {
    '--hsElevate--heading__textColor': sectionColorsMap[sectionVariantField].textColor,
  };
}

const HeadingWrapper = styled.div`
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
      <HeadingWrapper style={cssVarsMap}>
        <HeadingComponent
          headingLevel={headingAndTextHeadingLevel}
          heading={headingAndTextHeading}
          alignment={alignment}
          headingStyleVariant={headingStyleVariant}
        />
      </HeadingWrapper>
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
  themeModule: true
};
