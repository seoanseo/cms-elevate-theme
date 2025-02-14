import { ModuleMeta } from '../../types/modules.js';
import { RichText } from '@hubspot/cms-components';
import {
  TextFieldType,
} from '@hubspot/cms-components/fields';
import { CardVariantType } from '../../types/fields.js';
import accordionIconSvg from './assets/down.svg';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { RichTextContentFieldLibraryType } from '../../fieldLibrary/RichTextContent/types.js';
import { CardStyleFieldLibraryType } from '../../fieldLibrary/CardStyle/types.js';

// Types

type Gap = 'small' | 'medium' | 'large';

type GroupAccordions = RichTextContentFieldLibraryType & {
  title: TextFieldType['default'];
};

type GroupStyle = CardStyleFieldLibraryType & {
  gap: Gap;
};

type AccordionProps = {
  groupAccordions: GroupAccordions[];
  groupStyle: GroupStyle;
};

// Accordion

// Function to generate CSS class for accordions

function getCardVariantClassName(cardVariant: CardVariantType) {
  const cardVariants = {
    card_variant_1: 'hs-elevate-card--variant-1',
    card_variant_2: 'hs-elevate-card--variant-2',
    card_variant_3: 'hs-elevate-card--variant-3',
    card_variant_4: 'hs-elevate-card--variant-4',
  };

  return cardVariants[cardVariant] || 'hs-elevate-card--variant-2';
}

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

const AccordionArrowImage = styled.svg`
  margin-inline-start: auto;
  transition: transform 0.5s;
  align-self: center;
  fill: var(--hsElevate--cardIcon__fillColor);
`;

const AccordionArrow = () => {
  return (
    <AccordionArrowImage
      aria-hidden='true'
      width='28'
      height='17'
      viewBox='0 0 28 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='hs-elevate-accordion__arrow'
    >
      <path d='M12.5875 15.8886C13.3687 16.6699 14.6375 16.6699 15.4187 15.8886L27.4187 3.88862C28.2 3.10737 28.2 1.83862 27.4187 1.05737C26.6375 0.276123 25.3687 0.276123 24.5875 1.05737L14 11.6449L3.41249 1.06362C2.63124 0.282372 1.36249 0.282372 0.581238 1.06362C-0.200012 1.84487 -0.200012 3.11362 0.581238 3.89487L12.5812 15.8949L12.5875 15.8886Z' />
    </AccordionArrowImage>
  );
};

const Accordion = styled.details`
  margin-block-end: var(--hsElevate--accordion__gap);
  padding-block: var(--hs-elevate--spacing--24, 24px);
  padding-inline: var(--hs-elevate--spacing--32, 32px);

  &:last-of-type {
    margin-block-end: 0;
  }

  &[open] .hs-elevate-accordion__arrow {
    transform: rotate(180deg);
  }
`;

const AccordionSummary = styled.summary`
  display: flex;
`;

const AccordionSummaryText = styled.span`
  font-size: var(--hsElevate--body--large__fontSize);
  font-weight: 600;
  margin-inline-end: var(--hs-elevate--spacing--32, 32px);
`;


const StyledRichText = styled(RichText)`
  margin-block-start: var(--hs-elevate--spacing--20, 20px);

  :last-child {
    margin-block-end: 0;
  }
`;

export const Component = (props: AccordionProps) => {
  const {
    groupAccordions,
    groupStyle: {
      cardStyleVariant,
      gap
    },
  } = props;

  const cardClassName = getCardVariantClassName(cardStyleVariant);
  const cssVarsMap = {
    ...generateGapCssVars(gap),
    ...generateIconColorCssVar(cardStyleVariant),
  };

  return (
    <StyledComponentsRegistry>
      {groupAccordions.map((accordion, index) => (
        <Accordion className={cardClassName} style={cssVarsMap} key={index}>
          <AccordionSummary>
            <AccordionSummaryText>{accordion.title}</AccordionSummaryText>
            <AccordionArrow />
          </AccordionSummary>
          <StyledRichText
            fieldPath={`groupAccordions[${index}].richTextContentHTML`}
            tag='div'
          />
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
