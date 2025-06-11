import { ModuleMeta } from '../../types/modules.js';
import { RichText } from '@hubspot/cms-components';
import { TextFieldType } from '@hubspot/cms-components/fields';
import { CardVariantType } from '../../types/fields.js';
import accordionIconSvg from './assets/down.svg';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { RichTextContentFieldLibraryType } from '../../fieldLibrary/RichTextContent/types.js';
import { CardStyleFieldLibraryType } from '../../fieldLibrary/CardStyle/types.js';
import { getCardVariantClassName } from '../../utils/card-variants.js';

// Types

type Gap = 'small' | 'medium' | 'large';

type GroupAccordions = RichTextContentFieldLibraryType & {
  title: TextFieldType['default'];
};

type GroupStyle = CardStyleFieldLibraryType & {
  gap: Gap;
};

type AccordionIcon = 'chevron' | 'plus';

type AccordionProps = {
  icon: AccordionIcon;
  groupAccordions: GroupAccordions[];
  groupStyle: GroupStyle;
};

// Accordion

// Functions to pull in corresponding CSS variables on component based on field values

type CSSPropertiesMap = { [key: string]: string };

function generateGapCssVars(gapField: Gap): CSSPropertiesMap {
  const gapMap = {
    small: 'var(--hsElevate--spacing--16, 16px)',
    medium: 'var(--hsElevate--spacing--24, 24px)',
    large: 'var(--hsElevate--spacing--32, 32px)',
  };

  return { '--hsElevate--accordion__gap': gapMap[gapField] };
}

function generateIconColorCssVar(cardVariantField: CardVariantType): CSSPropertiesMap {
  const iconColorsMap = {
    card_variant_1: 'var(--hsElevate--card--variant1__iconColor)',
    card_variant_2: 'var(--hsElevate--card--variant2__iconColor)',
    card_variant_3: 'var(--hsElevate--card--variant3__iconColor)',
    card_variant_4: 'var(--hsElevate--card--variant4__iconColor)',
  };

  return {
    '--hsElevate--cardIcon__fillColor': iconColorsMap[cardVariantField],
  };
}

// Icons

const AccordionIcon = styled.svg`
  margin-inline-start: auto;
  flex-shrink: 0;
  align-self: center;
  fill: var(--hsElevate--cardIcon__fillColor);
`;

const AccordionArrowImage = styled(AccordionIcon)`
  transition: transform 0.5s;
`;

const AccordionArrow = () => {
  return (
    <AccordionArrowImage
      aria-hidden="true"
      width="28"
      height="17"
      viewBox="0 0 28 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hs-elevate-accordion__arrow"
    >
      <path d="M12.5875 15.8886C13.3687 16.6699 14.6375 16.6699 15.4187 15.8886L27.4187 3.88862C28.2 3.10737 28.2 1.83862 27.4187 1.05737C26.6375 0.276123 25.3687 0.276123 24.5875 1.05737L14 11.6449L3.41249 1.06362C2.63124 0.282372 1.36249 0.282372 0.581238 1.06362C-0.200012 1.84487 -0.200012 3.11362 0.581238 3.89487L12.5812 15.8949L12.5875 15.8886Z" />
    </AccordionArrowImage>
  );
};

const AccordionPlusImage = styled(AccordionIcon)`
  height: 27px;
`;

const AccordionPlus = () => {
  return (
    <AccordionPlusImage
      aria-hidden="true"
      width="24"
      height="27"
      viewBox="0 0 24 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hs-elevate-accordion__plus"
    >
      <path d="M13.5 4.21875C13.5 3.28535 12.7459 2.53125 11.8125 2.53125C10.8791 2.53125 10.125 3.28535 10.125 4.21875V11.8125H2.53125C1.59785 11.8125 0.84375 12.5666 0.84375 13.5C0.84375 14.4334 1.59785 15.1875 2.53125 15.1875H10.125V22.7812C10.125 23.7146 10.8791 24.4688 11.8125 24.4688C12.7459 24.4688 13.5 23.7146 13.5 22.7812V15.1875H21.0938C22.0271 15.1875 22.7812 14.4334 22.7812 13.5C22.7812 12.5666 22.0271 11.8125 21.0938 11.8125H13.5V4.21875Z" />
    </AccordionPlusImage>
  );
};

const AccordionMinusImage = styled(AccordionIcon)`
  display: none;
  height: 27px;
`;

const AccordionMinus = () => {
  return (
    <AccordionMinusImage
      aria-hidden="true"
      width="24"
      height="3"
      viewBox="0 0 24 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hs-elevate-accordion__minus"
    >
      <path d="M24 1.5C24 2.32969 23.175 3 22.1538 3H1.84615C0.825 3 0 2.32969 0 1.5C0 0.670312 0.825 0 1.84615 0H22.1538C23.175 0 24 0.670312 24 1.5Z" />
    </AccordionMinusImage>
  );
};

const Accordion = styled.details<{ icon: AccordionIcon }>`
  margin-block-end: var(--hsElevate--accordion__gap);

  &:last-of-type {
    margin-block-end: 0;
  }

  ${({ icon }) =>
    icon === 'chevron' &&
    `
    &[open] .hs-elevate-accordion__arrow {
      transform: rotate(180deg);
    }
  `}

  ${({ icon }) =>
    icon === 'plus' &&
    `
    &[open] .hs-elevate-accordion__plus {
      display: none;
    }

    &[open] .hs-elevate-accordion__minus {
      display: block;
    }
  `}
`;

const AccordionSummary = styled.summary`
  display: flex;
  padding-block: var(--hs-elevate--spacing--24, 24px);
  padding-inline: var(--hs-elevate--spacing--32, 32px);

  &:hover {
    cursor: pointer;
  }
`;

const AccordionSummaryText = styled.span`
  font-size: var(--hsElevate--body--large__fontSize);
  font-weight: 600;
  margin-inline-end: var(--hs-elevate--spacing--32, 32px);
`;

const StyledRichText = styled(RichText)`
  padding-block: 0 var(--hs-elevate--spacing--24, 24px);
  padding-inline: var(--hs-elevate--spacing--32, 32px);

  :last-child {
    margin-block-end: 0;
  }
`;

export const Component = (props: AccordionProps) => {
  const {
    icon,
    groupAccordions,
    groupStyle: { cardStyleVariant, gap },
  } = props;

  const cardClassName = getCardVariantClassName({ cardVariant: cardStyleVariant, fallbackCardVariant: 'card_variant_2' });
  const cssVarsMap = {
    ...generateGapCssVars(gap),
    ...generateIconColorCssVar(cardStyleVariant),
  };

  return (
    <StyledComponentsRegistry>
      {groupAccordions.map((accordion, index) => (
        <Accordion className={`${cardClassName} hs-elevate-accordion`} style={cssVarsMap} icon={icon} key={index}>
          <AccordionSummary className="hs-elevate-accordion__title">
            <AccordionSummaryText className="hs-elevate-accordion__title-text">{accordion.title}</AccordionSummaryText>
            {icon === 'chevron' ? (
              <AccordionArrow />
            ) : (
              <>
                <AccordionPlus />
                <AccordionMinus />
              </>
            )}
          </AccordionSummary>
          <StyledRichText className="hs-elevate-accordion__body" fieldPath={`groupAccordions[${index}].richTextContentHTML`} tag="div" />
        </Accordion>
      ))}
    </StyledComponentsRegistry>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Accordion',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY'],
  icon: accordionIconSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/accordion',
  version: 0,
  themeModule: true,
};
