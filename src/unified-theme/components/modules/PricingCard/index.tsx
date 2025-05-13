import { ModuleMeta } from '../../types/modules.js';
import { TextFieldType, BooleanFieldType } from '@hubspot/cms-components/fields';
import HeadingComponent from '../../HeadingComponent/index.js';
import { Button } from '../../ButtonComponent/index.js';
import { Card } from '../../CardComponent/index.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../utils/content-fields.js';
import { CardVariantType } from '../../types/fields.js';
import pricingCardIconSvg from './assets/quotes.svg';
import { ButtonContentType } from '../../fieldLibrary/ButtonContent/types.js';
import { ButtonStyleFieldLibraryType } from '../../fieldLibrary/ButtonStyle/types.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { CardStyleFieldLibraryType } from '../../fieldLibrary/CardStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';

// Types

type PricingCardSummaryProps = {
  groupSummary: HeadingAndTextFieldLibraryType & {
    description: TextFieldType['default'];
    price: TextFieldType['default'];
    timePeriod: TextFieldType['default'];
  };
};

type PricingCardFeaturesProps = {
  groupPlanFeatures: HeadingAndTextFieldLibraryType & {
    featuresTitle: TextFieldType['default'];
    groupFeatures: [
      {
        feature: TextFieldType['default'];
      }
    ];
  };
};

type PricingCardButtonContentProps = {
  groupButton: ButtonContentType & {
    showButton: BooleanFieldType['default'];
  };
};

type PricingCardContentProps = PricingCardSummaryProps & PricingCardFeaturesProps & PricingCardButtonContentProps;

type GroupStyle = {
  groupCard: CardStyleFieldLibraryType;
  groupSummary: HeadingStyleFieldLibraryType;
  groupPlanFeatures: HeadingStyleFieldLibraryType;
  groupButton: ButtonStyleFieldLibraryType;
};

type PricingCardProps = {
  groupPricingCards: PricingCardContentProps[];
  groupStyle: GroupStyle;
};

// Function to generate CSS variables

type CSSPropertiesMap = { [key: string]: string };

function generateCardBorderStyles(cardVariantField: CardVariantType): CSSPropertiesMap {
  const cardBorderThicknessMap = {
    card_variant_1: 'var(--hsElevate--card--variant1__borderThickness)',
    card_variant_2: 'var(--hsElevate--card--variant2__borderThickness)',
    card_variant_3: 'var(--hsElevate--card--variant3__borderThickness)',
    card_variant_4: 'var(--hsElevate--card--variant4__borderThickness)',
  };

  const cardBorderColorMap = {
    card_variant_1: 'var(--hsElevate--card--variant1__borderColor)',
    card_variant_2: 'var(--hsElevate--card--variant2__borderColor)',
    card_variant_3: 'var(--hsElevate--card--variant3__borderColor)',
    card_variant_4: 'var(--hsElevate--card--variant4__borderColor)',
  };

  return {
    '--hsElevate--pricingCard__borderThickness': cardBorderThicknessMap[cardVariantField],
    '--hsElevate--pricingCard__borderColor': cardBorderColorMap[cardVariantField],
  };
}

function generateIconCssVars(cardVariantField: CardVariantType): CSSPropertiesMap {
  const iconColorsMap = {
    card_variant_1: 'var(--hsElevate--card--variant1__iconColor)',
    card_variant_2: 'var(--hsElevate--card--variant2__iconColor)',
    card_variant_3: 'var(--hsElevate--card--variant3__iconColor)',
    card_variant_4: 'var(--hsElevate--card--variant4__iconColor)',
  };

  return {
    '--hsElevate--cardIcon__color': iconColorsMap[cardVariantField],
  };
}

const PricingCardsWrapper = styled.div`
  display: grid;
  gap: var(--hsElevate--spacing--32, 32px);
  grid-template-rows: auto 1fr;
  align-items: start;

  .hs-elevate-pricing-card-container__card {
    padding: 0;
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 2;
  }

  .hs-elevate-pricing-card-container__button {
    width: 100%;
    justify-content: center;
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const PricingCardSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--hsElevate--spacing--16, 16px);
  padding-block: var(--hsElevate--spacing--48, 48px) var(--hsElevate--spacing--32, 32px);
  padding-inline: var(--hsElevate--spacing--32, 32px);
  border-bottom-style: solid;
  border-bottom-width: var(--hsElevate--pricingCard__borderThickness);
  border-bottom-color: var(--hsElevate--pricingCard__borderColor);
  height: 100%;
  width: 100%;
  grid-row: 1;
`;

const PricingCardDescription = styled.p`
  font-size: var(--hsElevate--body--small__fontSize);
  margin: 0;
  overflow-wrap: break-word;
`;

const PricingCardPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1px;
`;

const PricingCardPrice = styled.span`
  font-size: var(--hsElevate--body--extraLarge__fontSize);
`;

const PricingCardTimePeriod = styled.span`
  font-size: var(--hsElevate--body--large__fontSize);
`;

const PricingCardSummary = (props: PricingCardSummaryProps & HeadingStyleFieldLibraryType) => {
  const {
    groupSummary: { headingAndTextHeadingLevel, headingAndTextHeading, description, price, timePeriod },
    headingStyleVariant,
  } = props;

  return (
    <PricingCardSummaryContainer className="hs-elevate-pricing-card-container__summary">
      {headingAndTextHeading && (
        <HeadingComponent
          additionalClassArray={['hs-elevate-pricing-card-container__title']}
          headingLevel={headingAndTextHeadingLevel}
          heading={headingAndTextHeading}
          headingStyleVariant={headingStyleVariant}
        />
      )}
      {description && 
        <PricingCardDescription className="hs-elevate-pricing-card-container__description">
          {description}
        </PricingCardDescription>
      }
      <PricingCardPriceContainer className="hs-elevate-pricing-card-container__price-container">
        <PricingCardPrice className="hs-elevate-pricing-card-container__price">{price}</PricingCardPrice>
        <PricingCardTimePeriod className="hs-elevate-pricing-card-container__time-period">{timePeriod}</PricingCardTimePeriod>
      </PricingCardPriceContainer>
    </PricingCardSummaryContainer>
  );
};

const PricingCardFeaturesContainer = styled.div`
  padding-block: var(--hsElevate--spacing--32, 32px) var(--hsElevate--spacing--72, 72px);
  padding-inline: var(--hsElevate--spacing--32, 32px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-row: 2;
  height: 100%;
  margin-bottom: var(--hsElevate--spacing--32, 32px);
`;

const PricingCardFeaturesList = styled.ul`
  list-style: none;
  padding-inline-start: 0;
`;

const PricingCardFeaturesListItem = styled.li`
  width: 100%;
  margin-block: 0 var(--hsElevate--spacing--20, 20px);
  display: flex;
  align-items: flex-start;

  svg {
    fill: var(--hsElevate--cardIcon__color);
    margin-block-start: var(--hsElevate--spacing--4, 4px);
    margin-inline-end: var(--hsElevate--spacing--12, 12px);
    flex: 0 0 auto;
  }
`;

const ListArrow = () => {
  return (
    <svg className="hs-elevate-pricing-card-container__features-list-item-icon" width="18" height="14" viewBox="0 0 18 14" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.6328 1.11719C18.1211 1.60547 18.1211 2.39844 17.6328 2.88672L7.63281 12.8867C7.14453 13.375 6.35156 13.375 5.86328 12.8867L0.863281 7.88672C0.375 7.39844 0.375 6.60547 0.863281 6.11719C1.35156 5.62891 2.14453 5.62891 2.63281 6.11719L6.75 10.2305L15.8672 1.11719C16.3555 0.628906 17.1484 0.628906 17.6367 1.11719H17.6328Z" />
    </svg>
  );
};

const PricingCardFeatures = (props: PricingCardFeaturesProps & HeadingStyleFieldLibraryType) => {
  const {
    groupPlanFeatures: { headingAndTextHeadingLevel, headingAndTextHeading, groupFeatures },
    headingStyleVariant,
  } = props;

  return (
    <PricingCardFeaturesContainer className="hs-elevate-pricing-card-container__features">
      {headingAndTextHeading && (
        <HeadingComponent
          additionalClassArray={['hs-elevate-pricing-card-container__features-title']}
          headingLevel={headingAndTextHeadingLevel}
          heading={headingAndTextHeading}
          headingStyleVariant={headingStyleVariant}
        />
      )}
      <PricingCardFeaturesList className="hs-elevate-pricing-card-container__features-list">
        {groupFeatures.map((features, index) => (
          <PricingCardFeaturesListItem key={index} className="hs-elevate-pricing-card-container__features-list-item">
            <ListArrow />
            {features.feature}
          </PricingCardFeaturesListItem>
        ))}
      </PricingCardFeaturesList>
    </PricingCardFeaturesContainer>
  );
};

const ButtonWrapper = styled.div`
  margin-block: auto 0;
  padding-block: 0 var(--hsElevate--spacing--48, 48px);
  padding-inline: var(--hsElevate--spacing--32, 32px);
  width: 100%;
`;

export const Component = (props: PricingCardProps) => {
  const {
    groupPricingCards,
    groupStyle: {
      groupCard: { cardStyleVariant },
      groupSummary: { headingStyleVariant: summaryHeadingStyleVariant },
      groupPlanFeatures: { headingStyleVariant: planFeaturesHeadingStyleVariant },
      groupButton: { buttonStyleVariant, buttonStyleSize },
    },
  } = props;

  const cssVarsMap = {
    ...generateCardBorderStyles(cardStyleVariant),
    ...generateIconCssVars(cardStyleVariant),
  };

  return (
    <StyledComponentsRegistry>
      <PricingCardsWrapper style={cssVarsMap} className="hs-elevate-pricing-card-container">
        {groupPricingCards.map((pricingCard, index) => (
          <Card key={index} additionalClassArray={['hs-elevate-pricing-card-container__card']} cardStyleVariant={cardStyleVariant} cardOrientation="column">
            <PricingCardSummary groupSummary={pricingCard.groupSummary} headingStyleVariant={summaryHeadingStyleVariant} />
            <PricingCardFeatures groupPlanFeatures={pricingCard.groupPlanFeatures} headingStyleVariant={planFeaturesHeadingStyleVariant} />
            {pricingCard.groupButton.showButton && (
              <ButtonWrapper className="hs-elevate-pricing-card-container__button-container">
                <Button
                  additionalClassArray={['hs-elevate-pricing-card-container__button']}
                  buttonStyle={buttonStyleVariant}
                  buttonSize={buttonStyleSize}
                  href={getLinkFieldHref(pricingCard.groupButton.buttonContentLink)}
                  rel={getLinkFieldRel(pricingCard.groupButton.buttonContentLink)}
                  target={getLinkFieldTarget(pricingCard.groupButton.buttonContentLink)}
                  iconFieldPath={`groupPricingCards[${index}].groupButton.buttonContentIcon`}
                  showIcon={pricingCard.groupButton.buttonContentShowIcon}
                  iconPosition={pricingCard.groupButton.buttonContentIconPosition}
                >
                  {pricingCard.groupButton.buttonContentText}
                </Button>
              </ButtonWrapper>
            )}
          </Card>
        ))}
      </PricingCardsWrapper>
    </StyledComponentsRegistry>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Pricing card',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY'],
  icon: pricingCardIconSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/pricing_card',
  version: 0,
  themeModule: true,
};
