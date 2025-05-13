import { ModuleMeta } from '../../types/modules.js';
import { Icon } from '@hubspot/cms-components';
import { BooleanFieldType, IconFieldType, NumberFieldType, RichTextFieldType } from '@hubspot/cms-components/fields';
import { SectionVariantType } from '../../types/fields.js';
import HeadingComponent from '../../HeadingComponent/index.js';
import featureListIconSvg from './assets/list.svg';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';

// Types

type GroupStyle = SectionStyleFieldLibraryType & HeadingStyleFieldLibraryType;

type GroupFeatureContent = HeadingAndTextFieldLibraryType & {
  featureDescription?: RichTextFieldType['default'];
};

type GroupFeatures = {
  groupIcon?: {
    showIcon: BooleanFieldType['default'];
    icon?: IconFieldType['default'];
  };
  groupFeatureContent: GroupFeatureContent;
};

type Columns = NumberFieldType['default'];

type FeatureListProps = {
  columns: Columns;
  groupFeatures: GroupFeatures[];
  groupStyle: GroupStyle;
};

// Feature list

// Functions to pull in corresponding CSS variables on component based on field values

type CSSPropertiesMap = { [key: string]: string };

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  return {
    '--hsElevate--featureList__textColor': sectionColorsMap[sectionVariantField].textColor,
    '--hsElevate--featureList__accentColor': sectionColorsMap[sectionVariantField].accentColor,
  };
}

const FeatureList = styled.div<{ columns: Columns }>`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  row-gap: var(--hsElevate--spacing--56, 56px);

  ${props =>
    props.columns > 1 &&
    `
    @media (min-width: 479px) {
      flex-direction: row;
      column-gap: var(--hsElevate--spacing--64, 64px);
    }
  `}
`;

const calculateColumnWidth = (columns: number, gap: string) => {
  // Width = (container width - total gaps) / number of columns
  // Example with 3 columns and a 64px gap: 100% - (64px * 2) / 3
  return `calc((100% - (${gap} * ${columns - 1})) / ${columns})`;
};

const Feature = styled.div<{ columns: Columns }>`
  align-items: flex-start;
  display: flex;
  width: 100%;

  /* On tablet the layout should be 2 columns if the user has selected 2 or more columns */
  ${props =>
    props.columns > 1 &&
    `
    @media (min-width: 479px) {
      width: ${calculateColumnWidth(2, 'var(--hsElevate--spacing--64, 64px)')};
    }
  `}

  /* If the user has selected 3 or more columns, then on desktop the layout should be what the user selected */
  ${props =>
    props.columns > 2 &&
    `
    @media (min-width: 768px) {
      width: ${calculateColumnWidth(props.columns, 'var(--hsElevate--spacing--64, 64px)')};
    }
  `}
`;

const StyledIcon = styled(Icon)`
  height: 24px;
  width: 24px;
  margin-inline-end: var(--hs-elevate--spacing--12, 12px);
  flex-shrink: 0;
  fill: var(--hsElevate--featureList__accentColor);
`;

const ContentContainer = styled.div`
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
    columns,
    groupFeatures,
    groupStyle: { sectionStyleVariant, headingStyleVariant },
  } = props;

  const cssVarsMap = {
    ...generateColorCssVars(sectionStyleVariant),
  };

  return (
    <StyledComponentsRegistry>
      <FeatureList className="hs-elevate-feature-list" style={cssVarsMap} columns={columns}>
        {groupFeatures.map((feature, index) => (
          <Feature className="hs-elevate-feature-list__feature" key={index} columns={columns}>
            {feature.groupIcon.showIcon && feature.groupIcon.icon && feature.groupIcon.icon.name && (
              <StyledIcon fieldPath={`groupFeatures[${index}].groupIcon.icon`} purpose="DECORATIVE" />
            )}
            <ContentContainer className="hs-elevate-feature-list__content-container">
              {feature.groupFeatureContent.headingAndTextHeading && (
                <HeadingComponent
                  additionalClassArray={['hs-elevate-feature-list__title']}
                  headingLevel={feature.groupFeatureContent.headingAndTextHeadingLevel}
                  headingStyleVariant={headingStyleVariant}
                  heading={feature.groupFeatureContent.headingAndTextHeading}
                />
              )}
              {feature.groupFeatureContent.featureDescription && (
                <FeatureParagraph className="hs-elevate-feature-list__body">{feature.groupFeatureContent.featureDescription}</FeatureParagraph>
              )}
            </ContentContainer>
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
