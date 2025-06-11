import { Splide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { TestimonialLinkProps, TestimonialMetaProps, TestimonialProps, TestimonialSliderProps } from '../types.js';
import { CardVariantType } from '../../../types/fields.js';
import { getLinkFieldHref, getLinkFieldRel, getLinkFieldTarget } from '../../../utils/content-fields.js';
import { useEffect, useId, useState } from 'react';
import { getCardVariantClassName } from '../../../utils/card-variants.js';

// Checks if an image path corresponds to one of the default images used on the testimonial slider module in one of our sections/templates
function isDefaultTestimonialImage(imagePath: string): boolean {
  if (!imagePath) return false;
  return /testimonial-user-image-[1-5]/.test(imagePath);
}

// Navigation

const NavigationButton = styled.button`
  background: transparent !important;
  fill: var(--hsElevate--cardIcon__fillColor);
`;

const NavigationArrowImage = styled.svg`
  height: 38px !important;
  width: 24px !important;
  fill: var(--hsElevate--cardIcon__fillColor, #000) !important;
`;

type NavigationArrowProps = {
  altText?: string;
};

const NavigationArrow = (props: NavigationArrowProps) => {
  const { altText } = props;

  const uniqueInstanceId = useId();
  const ariaLabelledBy = altText ? uniqueInstanceId : undefined;

  return (
    <NavigationArrowImage
      aria-labelledby={ariaLabelledBy}
      aria-label={altText}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="39"
      viewBox="0 0 24 39"
      fill="none"
      className="hs-elevate-testimonial-slider__navigation-icon"
    >
      {altText && (
        <title className="hs-elevate-testimonial-slider__navigation-icon-title" id={uniqueInstanceId}>
          {altText}
        </title>
      )}
      <path d="M23.2946 17.505C24.2321 18.4425 24.2321 19.965 23.2946 20.9025L8.89457 35.3025C7.95707 36.24 6.43457 36.24 5.49707 35.3025C4.55957 34.365 4.55957 32.8425 5.49707 31.905L18.2021 19.2L5.50457 6.49503C4.56707 5.55753 4.56707 4.03503 5.50457 3.09753C6.44207 2.16003 7.96457 2.16003 8.90207 3.09753L23.3021 17.4975L23.2946 17.505Z" />
    </NavigationArrowImage>
  );
};

type NavigationProps = {
  previousAltText: string;
  nextAltText: string;
};

const Navigation = ({ previousAltText, nextAltText }: NavigationProps) => {
  return (
    <div className="splide__arrows hs-elevate-testimonial-slider__navigation">
      <NavigationButton className="splide__arrow splide__arrow--prev hs-elevate-testimonial-slider__prev">
        <NavigationArrow altText={previousAltText} />
      </NavigationButton>
      <NavigationButton className="splide__arrow splide__arrow--next hs-elevate-testimonial-slider__next">
        <NavigationArrow altText={nextAltText} />
      </NavigationButton>
    </div>
  );
};

// Testimonial link

const Link = styled.a<{ $contentCentered?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.$contentCentered ? 'center' : 'flex-start')};
  font-size: var(--hsElevate--body--small__fontSize);
  gap: 8px;
`;

const LinkArrowImage = styled.svg`
  fill: var(--hsElevate--links__fontColor);
`;

const LinkArrow = () => {
  return (
    <LinkArrowImage
      width="8"
      height="15"
      viewBox="0 0 8 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hs-elevate-testimonial-slider__link-icon"
    >
      <path d="M7.70625 6.79414C8.09688 7.18477 8.09688 7.81914 7.70625 8.20977L1.70625 14.2098C1.31563 14.6004 0.681251 14.6004 0.290626 14.2098C-0.0999985 13.8191 -0.0999985 13.1848 0.290626 12.7941L5.58438 7.50039L0.293751 2.20664C-0.0968735 1.81602 -0.0968735 1.18164 0.293751 0.791016C0.684376 0.400391 1.31875 0.400391 1.70938 0.791016L7.70938 6.79102L7.70625 6.79414Z" />
    </LinkArrowImage>
  );
};

const TestimonialLink = (props: TestimonialLinkProps) => {
  const { contentCentered, linkText, link } = props;

  const linkHref = getLinkFieldHref(link);
  const linkRel = getLinkFieldRel(link);
  const linkTarget = getLinkFieldTarget(link);
  return (
    <>
      {linkText && (
        <Link className="hs-elevate-testimonial-slider__link" $contentCentered={contentCentered} href={linkHref} rel={linkRel} target={linkTarget}>
          {linkText} <LinkArrow />
        </Link>
      )}
    </>
  );
};

// Testimonial meta (author and link)

const Footer = styled.footer`
  margin-block: var(--hsElevate--text--large__margin, 0 32px);
`;

const AuthorContainer = styled.div<{ $contentCentered?: boolean }>`
  margin-block-end: var(--hsElevate--spacing--24, 24px);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: ${props => (props.$contentCentered ? 'center' : 'flex-start')};
  gap: var(--hsElevate--gap--large, 20px);
`;

const AuthorImageContainer = styled.div`
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  flex: 0 0 80px;
  aspect-ratio: 1 / 1;
`;

const AuthorImage = styled.img<{ $isDefaultImage?: boolean }>`
  height: 100%;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center;
  object-position: center;
  ${props => props.$isDefaultImage && `background-color: var(--hsElevate--color--accent--3)`};
`;

const AuthorName = styled.span`
  display: block;
  margin-block: var(--hsElevate--text--extraSmall__margin, 0 12px);
  font-size: var(--hsElevate--body--large__fontSize);
  line-height: 1;
`;

const AuthorTitle = styled.span`
  display: block;
  font-size: var(--hsElevate--body--small__fontSize);
`;

const TestimonialMeta = (props: TestimonialMetaProps) => {
  const { contentCentered, authorName, authorTitle, authorImage, linkText, link } = props;

  const hasAuthorElement = authorName || authorTitle || authorImage.src;

  const isDefaultAuthorImage = authorImage.src && isDefaultTestimonialImage(authorImage.src);

  return (
    <>
      {(hasAuthorElement || linkText) && (
        <Footer className="hs-elevate-testimonial-slider__footer">
          {hasAuthorElement && (
            <AuthorContainer className="hs-elevate-testimonial-slider__author-container" $contentCentered={contentCentered}>
              {authorImage.src && (
                <AuthorImageContainer className="hs-elevate-testimonial-slider__author-image-container">
                  <AuthorImage
                    data-splide-lazy={authorImage.src}
                    alt={authorImage.alt}
                    width={authorImage.width}
                    height={authorImage.height}
                    $isDefaultImage={isDefaultAuthorImage}
                    className="hs-elevate-testimonial-slider__author-image"
                  />
                </AuthorImageContainer>
              )}
              {(authorName || authorTitle) && (
                <div>
                  {authorName && <AuthorName className="hs-elevate-testimonial-slider__author-name">{authorName}</AuthorName>}
                  {authorTitle && <AuthorTitle className="hs-elevate-testimonial-slider__author-title">{authorTitle}</AuthorTitle>}
                </div>
              )}
            </AuthorContainer>
          )}
          <TestimonialLink contentCentered={contentCentered} linkText={linkText} link={link} />
        </Footer>
      )}
    </>
  );
};

// Testimonial slide content

const SlideContainer = styled.blockquote`
  display: flex;
  padding: var(--hsElevate--spacing--24, 24px) var(--hsElevate--spacing--12, 12px);
  border-left: 0;
  margin: 0 0 2rem 0;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--hsElevate--text--large__margin, 0 40px);

  @media (min-width: 1000px) {
    padding: var(--hsElevate--spacing--24, 24px);
    margin: 0 40px 2rem 40px;
    flex-direction: row;
    gap: var(--hsElevate--spacing--72, 72px);
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;
  height: 300px;
  flex: 1 0 100%;
  align-self: center;
  border-radius: 32px;
  display: flex;
  margin-block: var(--hsElevate--text--large__margin, 0 32px);

  @media (min-width: 1000px) {
    flex: 1 0 30%;
    align-self: auto;
    margin-block-end: 0;
  }

  img {
    height: 100%;
    width: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: center;
    object-position: center;
  }
`;

const TestimonialImage = styled.img<{ $isDefaultImage?: boolean }>`
  height: 100%;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center;
  object-position: center;
  ${props => props.$isDefaultImage && `background-color: var(--hsElevate--color--accent--3)`};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuoteText = styled.span<{ $contentCentered?: boolean }>`
  margin-block: var(--hsElevate--text--large__margin, 0 40px);
  font-weight: 500;
  font-size: 2rem;
  text-align: ${props => (props.$contentCentered ? 'center' : 'left')};
`;

const Testimonial = (props: TestimonialProps) => {
  const { quote, authorName, authorTitle, authorImage, showImage, image, linkText, link } = props;

  // If there is an image the content in the slider is left aligned, otherwise it is center aligned
  const contentCentered = showImage && image.src ? false : true;

  const isDefaultImage = image.src && isDefaultTestimonialImage(image.src);

  return (
    <SlideContainer className="hs-elevate-testimonial-slider__slide">
      {showImage && image.src && (
        <ImageContainer className="hs-elevate-testimonial-slider__image-container">
          <TestimonialImage
            className="hs-elevate-testimonial-slider__image"
            data-splide-lazy={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            $isDefaultImage={isDefaultImage}
          />
        </ImageContainer>
      )}
      <ContentContainer className="hs-elevate-testimonial-slider__content-container">
        <QuoteText className="hs-elevate-testimonial-slider__quote-text" $contentCentered={contentCentered}>
          {quote}
        </QuoteText>
        <TestimonialMeta
          contentCentered={contentCentered}
          authorName={authorName}
          authorTitle={authorTitle}
          authorImage={authorImage}
          linkText={linkText}
          link={link}
        />
      </ContentContainer>
    </SlideContainer>
  );
};

// Testimonial slider component

// Function to generate CSS variables for colors
type CSSPropertiesMap = { [key: string]: string };

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

function generateLinkCssVar(cardVariantField: CardVariantType): CSSPropertiesMap {
  const linkColorsMap = {
    card_variant_1: 'var(--hsElevate--card--variant1--link__fontColor)',
    card_variant_2: 'var(--hsElevate--card--variant2--link__fontColor)',
    card_variant_3: 'var(--hsElevate--card--variant3--link__fontColor)',
    card_variant_4: 'var(--hsElevate--card--variant4--link__fontColor)',
  };

  return {
    '--hsElevate--links__fontColor': linkColorsMap[cardVariantField],
  };
}

function generateBlockquoteCssVar(cardVariantField: CardVariantType): CSSPropertiesMap {
  const cardColorsMap = {
    card_variant_1: 'var(--hsElevate--card--variant1__textColor)',
    card_variant_2: 'var(--hsElevate--card--variant2__textColor)',
    card_variant_3: 'var(--hsElevate--card--variant3__textColor)',
    card_variant_4: 'var(--hsElevate--card--variant4__textColor)',
  };

  return {
    '--hsElevate--blockquote__fontColor': cardColorsMap[cardVariantField],
    '--hsElevate--blockquote__backgroundColor': 'transparent',
    '--hsElevate--blockquote__accentColor': 'transparent',
  };
}

const TestimonialSliderContainer = styled.div`
  border: none;
  padding-block: var(--hsElevate--spacing--48, 48px);
`;

const StyledSplide = styled(Splide)`
  padding-inline: var(--hsElevate--spacing--48, 48px);

  .splide__pagination__page {
    height: 4px;
    width: 48px;
    border: none;
    border-radius: 20px;
    margin: 0 6px;
    opacity: 0.3;
    background-color: var(--hsElevate--cardIcon__fillColor, #000);
  }

  .splide__pagination__page.is-active {
    background-color: var(--hsElevate--cardIcon__fillColor, #000);
    opacity: 1;
    transform: none;
  }
`;

const TestimonialSlider = (props: TestimonialSliderProps) => {
  const {
    groupTestimonial,
    groupStyle: { cardStyleVariant },
    groupDefaultText,
  } = props;

  const cssVarsMap = {
    ...generateIconColorCssVar(cardStyleVariant),
    ...generateLinkCssVar(cardStyleVariant),
    ...generateBlockquoteCssVar(cardStyleVariant),
  };

  const [htmlDirection, setHtmlDirection] = useState('ltr');

  useEffect(() => {
    const htmlElement = document.documentElement;
    setHtmlDirection(htmlElement.dir || 'ltr');
  }, []);

  const hasMultipleTestimonials = groupTestimonial.length > 1;
  const cardVariantClassName = getCardVariantClassName({ cardVariant: cardStyleVariant, fallbackCardVariant: 'card_variant_1' });

  return (
    <StyledComponentsRegistry>
      <TestimonialSliderContainer style={cssVarsMap} className={`hs-elevate-testimonial-slider ${cardVariantClassName}`}>
        <StyledSplide
          className="hs-elevate-testimonial-slider__slider"
          hasTrack={false}
          options={{
            lazyLoad: true,
            rewind: true,
            direction: htmlDirection,
            arrows: hasMultipleTestimonials,
            pagination: hasMultipleTestimonials,
            i18n: {
              // https://splidejs.com/guides/i18n/
              prev: groupDefaultText.navigateToPreviousSlideAriaLabel,
              next: groupDefaultText.navigateToNextSlideAriaLabel,
              first: groupDefaultText.navigateToFirstSlideAriaLabel,
              last: groupDefaultText.navigateToLastSlideAriaLabel,
              slideX: groupDefaultText.navigateToSlideNumberAriaLabel,
              carousel: groupDefaultText.carouselAriaLabel,
              select: groupDefaultText.selectSlideNavigationAriaLabel,
              slide: groupDefaultText.slideAriaLabel,
              slideLabel: groupDefaultText.slideNumberOfSlidesTotalAriaLabel,
            },
          }}
        >
          <div className="splide__track hs-elevate-testimonial-slider__track">
            <div className="splide__list hs-elevate-testimonial-slider__list">
              {groupTestimonial.map(testimonial => (
                <div className="splide__slide hs-elevate-testimonial-slider__slide" key={testimonial.groupQuote.quote}>
                  <Testimonial
                    quote={testimonial.groupQuote.quote}
                    authorName={testimonial.groupAuthor.authorName}
                    authorTitle={testimonial.groupAuthor.authorTitle}
                    authorImage={testimonial.groupAuthor.authorImage}
                    showImage={testimonial.groupImage.showImage}
                    image={testimonial.groupImage.image}
                    linkText={testimonial.groupLink.linkText}
                    link={testimonial.groupLink.link}
                  />
                </div>
              ))}
            </div>
          </div>
          {hasMultipleTestimonials && <Navigation previousAltText={groupDefaultText.previousArrowAltText} nextAltText={groupDefaultText.nextArrowAltText} />}
        </StyledSplide>
      </TestimonialSliderContainer>
    </StyledComponentsRegistry>
  );
};

export default TestimonialSlider;
