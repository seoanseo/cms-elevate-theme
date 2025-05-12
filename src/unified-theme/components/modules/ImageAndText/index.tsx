import { ModuleMeta } from '../../types/modules.js';
import { RichText } from '@hubspot/cms-components';
import HeadingComponent from '../../HeadingComponent/index.js';
import { Button } from '../../ButtonComponent/index.js';
import { ImageFieldType, BooleanFieldType, AlignmentFieldType } from '@hubspot/cms-components/fields';
import { ElementPositionType, SectionVariantType } from '../../types/fields.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { getAlignmentFieldCss } from '../../utils/style-fields.js';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import imageAndTextIconSvg from './assets/image.svg';
import { ButtonContentType } from '../../fieldLibrary/ButtonContent/types.js';
import { ButtonStyleFieldLibraryType } from '../../fieldLibrary/ButtonStyle/types.js';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { RichTextContentFieldLibraryType } from '../../fieldLibrary/RichTextContent/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';

// Types

interface GroupButton extends ButtonContentType {
  showButton: BooleanFieldType['default'];
}

type GroupButtonStyle = ButtonStyleFieldLibraryType;

type GroupContentStyle = SectionStyleFieldLibraryType &
  HeadingStyleFieldLibraryType & {
    verticalAlignment: AlignmentFieldType['default'];
  };

type GroupStyle = {
  groupContent: GroupContentStyle;
  groupButton: GroupButtonStyle;
};

type GroupContent = RichTextContentFieldLibraryType & HeadingAndTextFieldLibraryType;

type ImageAndTextProps = {
  groupImage: {
    image?: ImageFieldType['default'];
    imagePosition: ElementPositionType;
  };
  groupContent: GroupContent;
  groupButton: GroupButton;
  groupStyle: GroupStyle;
};

// Image and text component

// Functions to pull in corresponding CSS variables on component based on field values

type CSSPropertiesMap = { [key: string]: string };

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  return {
    '--hsElevate--imageAndText__textColor': sectionColorsMap[sectionVariantField].textColor,
    '--hsElevate--imageAndText__accentColor': sectionColorsMap[sectionVariantField].accentColor,
    '--hsElevate--blockquote__textColor': sectionColorsMap[sectionVariantField].blockquoteTextColor,
    '--hsElevate--blockquote__backgroundColor': sectionColorsMap[sectionVariantField].blockquoteBackgroundColor,
    '--hsElevate--blockquote__accentColor': sectionColorsMap[sectionVariantField].blockquoteAccentColor,
  };
}

function generateImagePositionCssVars(imagePositionField: ElementPositionType): CSSPropertiesMap {
  const imagePositionMap = {
    left: '0',
    right: '1',
  };

  return {
    '--hsElevate--imageAndText__order': imagePositionMap[imagePositionField],
  };
}

type ImageAndTextWrapperProps = {
  $alignment: AlignmentFieldType['default'];
};

const ImageAndText = styled.section<ImageAndTextWrapperProps>`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  column-gap: var(--hsElevate--spacing--80, 80px);
  ${props => getAlignmentFieldCss(props.$alignment)};

  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  margin-block-end: var(--hsElevate--spacing--32, 32px);

  @media (min-width: 767px) {
    order: var(--hsElevate--imageAndText__order, 0);
    width: 55%;
    margin-block-end: 0;
  }
`;

const ImageContent = styled.img`
  height: auto;
  width: 100%;
`;

const ContentContainer = styled.div`
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
    color: var(--hsElevate--imageAndText__textColor);
  }

  @media (min-width: 767px) {
    width: 45%;
  }
`;

export const Component = (props: ImageAndTextProps) => {
  const {
    groupImage: { imagePosition, image },
    groupContent: { headingAndTextHeadingLevel, headingAndTextHeading, richTextContentHTML },
    groupButton: { showButton, buttonContentText: text, buttonContentLink: link, buttonContentShowIcon: showIcon, buttonContentIconPosition: iconPosition },
    groupStyle: {
      groupContent: { sectionStyleVariant, headingStyleVariant, verticalAlignment },
      groupButton: { buttonStyleSize, buttonStyleVariant },
    },
  } = props;

  const buttonHref = getLinkFieldHref(link);
  const buttonRel = getLinkFieldRel(link);
  const buttonTarget = getLinkFieldTarget(link);
  const hasContent = headingAndTextHeading || richTextContentHTML || showButton;

  const cssVarsMap = {
    ...generateImagePositionCssVars(imagePosition),
    ...generateColorCssVars(sectionStyleVariant),
  };

  return (
    <StyledComponentsRegistry>
      <ImageAndText className="hs-elevate-image-and-text" $alignment={verticalAlignment} style={cssVarsMap}>
        {image.src && (
          <ImageContainer className="hs-elevate-image-and-text__image-container">
            <ImageContent
              className="hs-elevate-image-and-text__image"
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading={image.loading !== 'disabled' ? image.loading : 'eager'}
            />
          </ImageContainer>
        )}
        {hasContent && (
          <ContentContainer className="hs-elevate-image-and-text__content-container">
            {headingAndTextHeading && (
              <HeadingComponent
                additionalClassArray={['hs-elevate-image-and-text__title']}
                headingLevel={headingAndTextHeadingLevel}
                headingStyleVariant={headingStyleVariant}
                heading={headingAndTextHeading}
              />
            )}
            {richTextContentHTML && <RichText className="hs-elevate-image-and-text__body" fieldPath="groupContent.richTextContentHTML" />}
            {showButton && (
              <Button
                additionalClassArray={['hs-elevate-image-and-text__button']}
                buttonSize={buttonStyleSize}
                buttonStyle={buttonStyleVariant}
                href={buttonHref}
                rel={buttonRel}
                target={buttonTarget}
                showIcon={showIcon}
                iconFieldPath="groupButton.buttonContentIcon"
                iconPosition={iconPosition}
              >
                {text}
              </Button>
            )}
          </ContentContainer>
        )}
      </ImageAndText>
    </StyledComponentsRegistry>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Image and text',
  content_types: ['SITE_PAGE', 'LANDING_PAGE'],
  icon: imageAndTextIconSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/image_and_text',
  version: 0,
  themeModule: true,
};
