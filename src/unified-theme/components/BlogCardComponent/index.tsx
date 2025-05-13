import { styled } from 'styled-components';
import { Card } from '../CardComponent/index.js';
import StyledComponentsRegistry from '../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { TagComponent } from '../TagComponent/index.js';
import GatedLockIcon from '../modules/BlogListing/assets/gated-lock-icon.svg';
import HeadingComponent from '../HeadingComponent/index.js';
import SanitizedContent from '../SanitizeHTML/index.js';
import { CardVariantType, HeadingLevelType } from '../types/fields.js';
import { HeadingStyleVariant } from '../fieldLibrary/HeadingStyle/types.js';

interface BlogCardComponentProps {
  post: {
    id: string;
    absoluteUrl: string;
    featuredImage?: string;
    featuredImageAltText?: string;
    featuredImageWidth?: number;
    featuredImageHeight?: number;
    title: string;
    topicNames?: string[];
  };
  headingAndTextHeadingLevel: HeadingLevelType;
  headingStyleVariant: HeadingStyleVariant;
  cardStyleVariant: CardVariantType;
  gatedContentIds?: string[];
  additionalClassArray?: string[];
}

interface TagListProps {
  tags: string[];
}

const TagList = ({ tags }: TagListProps) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <StyledTagContainer>
      {tags.map((tag: string, index: number) => (
        <TagComponent key={index}>
          <SanitizedContent content={tag} />
        </TagComponent>
      ))}
    </StyledTagContainer>
  );
};

function parseCardVariant(cardStyleVariant: string) {
  if (!cardStyleVariant) return 'variant2';

  return `variant${cardStyleVariant.split('_').pop()}`;
}

const StyledCardWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .hs-elevate-card--blog {
    padding: 0; // override padding to get image flush with card
    overflow: hidden;
  }
`;

const StyledImageContainer = styled.div<{ $cardStyleVariant: string }>`
  overflow: hidden;
  position: relative;
  object-fit: cover;
  background-color: ${({ $cardStyleVariant }) => `var(--hsElevate--card--${parseCardVariant($cardStyleVariant)}__iconBackgroundColor)`};
  width: 100%;
  max-width: 100%;
  aspect-ratio: 1.41;
`;

const StyledImage = styled.img`
  object-fit: cover;
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledCardContentContainer = styled.div`
  padding: var(--hsElevate--spacing--32, 32px);
`;

const StyledCardHeadingContainer = styled.div<{ $cardStyleVariant: string }>`
  .hs-elevate-card--blog__heading {
    color: ${({ $cardStyleVariant }) => `var(--hsElevate--card--${parseCardVariant($cardStyleVariant)}__textColor)`};
    margin-bottom: 0;
    text-decoration: none;
    display: inline;
  }
`;

const StyledCardLink = styled.a`
  text-decoration: none;
  width: 100%;
  display: block;
  height: 100%;

  &&&:hover {
    text-decoration: none;
  }
`;

const StyledTagContainer = styled.div`
  margin-bottom: var(--hsElevate--spacing--24, 24px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--hsElevate--spacing--8, 8px);
  flex-wrap: wrap;
`;

const GateIconImage = styled.div<{ $cardStyleVariant: string }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-inline-start: var(--hsElevate--spacing--8, 8px);
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  mask-image: url(${GatedLockIcon});
  background-color: ${({ $cardStyleVariant }) =>
    `var(--hsElevate--card--${parseCardVariant($cardStyleVariant)}__textColor)`}; // to match heading color -- not a mistake
`;

function BlogCardComponent(props: BlogCardComponentProps) {
  const { post, headingAndTextHeadingLevel, headingStyleVariant, cardStyleVariant, gatedContentIds = [], additionalClassArray } = props;

  const additionalClasses = additionalClassArray ? additionalClassArray.join(' ') : '';

  return (
    <StyledComponentsRegistry>
      <StyledCardWrapper className={`hs-elevate-card--blog__card-wrapper ${additionalClasses}`}>
        <Card key={post.id} cardOrientation="column" cardStyleVariant={cardStyleVariant} additionalClassArray={['hs-elevate-card--blog']}>
          <StyledCardLink href={post.absoluteUrl}>
            <StyledImageContainer className="hs-elevate-card--blog__image-container" $cardStyleVariant={cardStyleVariant}>
              {post.featuredImage && (
                <StyledImage src={post.featuredImage} alt={post.featuredImageAltText || ''} width={post.featuredImageWidth} height={post.featuredImageHeight} />
              )}
            </StyledImageContainer>
            <StyledCardContentContainer>
              <TagList tags={post?.topicNames || []} />
              <StyledCardHeadingContainer $cardStyleVariant={cardStyleVariant}>
                <HeadingComponent
                  heading={post.title}
                  headingLevel={headingAndTextHeadingLevel}
                  headingStyleVariant={headingStyleVariant}
                  additionalClassArray={['hs-elevate-card--blog__heading']}
                />
                {gatedContentIds.includes(post.id) && <GateIconImage $cardStyleVariant={cardStyleVariant} aria-label="Gated content" role="presentation" />}
              </StyledCardHeadingContainer>
            </StyledCardContentContainer>
          </StyledCardLink>
        </Card>
      </StyledCardWrapper>
    </StyledComponentsRegistry>
  );
}

export default BlogCardComponent;
