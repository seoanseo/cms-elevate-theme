import { ModuleMeta } from '../../types/modules.js';
import { Icon } from '@hubspot/cms-components';
import {
  BooleanFieldType,
  IconFieldType,
  RichTextFieldType
} from '@hubspot/cms-components/fields';
import { SectionVariantType } from '../../types/fields.js';
import HeadingComponent from '../../HeadingComponent/index.js';
import featureListIconSvg from './assets/list.svg';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';

// Types

type GroupStyle = SectionStyleFieldLibraryType & HeadingStyleFieldLibraryType;

type GroupFeatureContent = HeadingAndTextFieldLibraryType & {
  featureDescription?: RichTextFieldType['default'];
}

type GroupFeatures = {
  groupIcon?: {
    showIcon: BooleanFieldType['default'];
    icon?: IconFieldType['default'];
  };
  groupFeatureContent: GroupFeatureContent;
}

type FeatureListProps = {
  groupFeatures: GroupFeatures[];
  groupStyle: GroupStyle;
};

// Feature list

// Functions to pull in corresponding CSS variables on component based on field values

type CSSPropertiesMap = { [key: string]: string };

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  const sectionColorsMap = {
    section_variant_1: {
      textColor: 'var(--hsElevate--section--lightSection--1__textColor)',
      accentColor: 'var(--hsElevate--section--lightSection--1__accentColor)',
    },
    section_variant_2: {
      textColor: 'var(--hsElevate--section--lightSection--2__textColor)',
      accentColor: 'var(--hsElevate--section--lightSection--2__accentColor)',
    },
    section_variant_3: {
      textColor: 'var(--hsElevate--section--lightSection--3__textColor)',
      accentColor: 'var(--hsElevate--section--lightSection--3__accentColor)',
    },
    section_variant_4: {
      textColor: 'var(--hsElevate--section--darkSection--1__textColor)',
      accentColor: 'var(--hsElevate--section--darkSection--1__accentColor)',
    },
  };

  return {
    '--hsElevate--featureList__textColor': sectionColorsMap[sectionVariantField].textColor,
    '--hsElevate--featureList__accentColor': sectionColorsMap[sectionVariantField].accentColor,
  };
}

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  row-gap: var(--hsElevate--spacing--56, 56px);

  @media (min-width: 767px) {
    flex-direction: row;
    column-gap: var(--hsElevate--spacing--64, 64px);
  }
`;

const Feature = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 0 1 100%;

  @media (min-width: 767px) {
    flex: 0 1 calc(50% - (var(--hsElevate--spacing--64, 64px) / 2));
  }
`;

const StyledIcon = styled(Icon)`
  height: 24px;
  width: 24px;
  margin-inline-end: var(--hs-elevate--spacing--12, 12px);
  fill: var(--hsElevate--featureList__accentColor);
`;

const ContentWrapper = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    color: var(--hsElevate--featureList__textColor);
  }
`;

const FeatureParagraph = styled.p`
  font-size: var(--hsElevate--body--small__fontSize);
  margin-block-end: 0;
`;

export const Component = (props: FeatureListProps) => {
  const {
    groupFeatures,
    groupStyle: { sectionStyleVariant, headingStyleVariant },
  } = props;

  const cssVarsMap = {
    ...generateColorCssVars(sectionStyleVariant),
  };

  return (
    <StyledComponentsRegistry>
      <FeatureList style={cssVarsMap}>
        {groupFeatures.map((feature, index) => (
          <Feature key={index}>
            {feature.groupIcon.showIcon && feature.groupIcon.icon && feature.groupIcon.icon.name &&
              <StyledIcon
                fieldPath={`groupFeatures[${index}].groupIcon.icon`}
                purpose='DECORATIVE'
              />
            }
            <ContentWrapper>
              {feature.groupFeatureContent.headingAndTextHeading && (
                <HeadingComponent
                  headingLevel={feature.groupFeatureContent.headingAndTextHeadingLevel}
                  headingStyleVariant={headingStyleVariant}
                  heading={feature.groupFeatureContent.headingAndTextHeading}
                />
              )}
              {feature.groupFeatureContent.featureDescription && (
                <FeatureParagraph>{feature.groupFeatureContent.featureDescription}</FeatureParagraph>
              )}
            </ContentWrapper>
          </Feature>
        ))}
      </FeatureList>
    </StyledComponentsRegistry>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Feature list',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY'],
  icon: featureListIconSvg,
  categories: ['body_content'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/feature_list',
  version: 0,
  themeModule: true,
};
