import { ModuleMeta } from '../../types/modules.js';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import blogSVG from './assets/blog.svg';
import { withUrlPath } from '@hubspot/cms-components';
import { Card } from '../../CardComponent/index.js';
import { TagComponent } from '../../TagComponent/index.js';
import GatedLockIcon from './assets/gated-lock-icon.svg';
import Pagination from './pagination.js';
import HeadingComponent from '../../HeadingComponent/index.js';
import { HeadingStyleFieldLibraryType } from '../../fieldLibrary/HeadingStyle/types.js';
import { CardStyleFieldLibraryType } from '../../fieldLibrary/CardStyle/types.js';
import { HeadingAndTextFieldLibraryType } from '../../fieldLibrary/HeadingAndText/types.js';
import SanitizedContent from '../../SanitizeHTML/index.js';
import fetchGatedPosts from '../../utils/ServerSideProps/fetchGatedBlogPosts.js';

type BlogListingProps = HeadingAndTextFieldLibraryType & {
  hublData: {
    blogPosts: {
      id: number;
      title: string;
      featuredImage: string;
      featuredImageAltText: string;
      featuredImageWidth: number;
      featuredImageHeight: number;
      topicNames: string[];
      absoluteUrl: string;
    }[];
    currentPageNumber: number;
    nextPageNumber: number;
    totalPageCount: number;
    use_featured_image_in_summary: boolean;
  };
  serverSideProps: {
    gatedContentIds: number[];
  };
  groupStyle: CardStyleFieldLibraryType & HeadingStyleFieldLibraryType;
  defaultContent: {
    nextPage: string;
    previousPage: string;
  };
};

const StyledCardContainer = styled.div<{ $pageNumber: number; $useFeaturedImage: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 32px;
  margin-bottom: var(--hsElevate--spacing--48, 48px);

  .hs-elevate-card--blog {
    grid-column: span 1;
    grid-row: span 1;
  }

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);

    .hs-elevate-card--blog {
      ${({ $pageNumber, $useFeaturedImage }) =>
        ($pageNumber === 1 || $pageNumber === undefined) &&
        $useFeaturedImage &&
        `
        &:first-of-type {
          grid-column: span 2;
          grid-row: span 2;

          .hs-elevate-card--blog__image-container {
            width: 100%;
            overflow: hidden;
            position: relative;
            object-fit: cover;
            aspect-ratio: 1.13;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      `}
    }
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  .hs-elevate-card--blog {
    padding: 0; // override padding to get image flush with card;
    overflow: hidden;
  }
`;

const StyledImageContainer = styled.div`
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  object-fit: cover;
  aspect-ratio: 1.41;
  background-color: var(--hsElevate--card--variant1__iconBackgroundColor);
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
`;

const GateIconImage = styled.img`
  margin-inline-start: var(--hsElevate--spacing--8, 8px);
`;

function parseCardVariant(cardStyleVariant: string) {
  if (!cardStyleVariant) return 'variant2';

  return `variant${cardStyleVariant.split('_').pop()}`;
}

export const Component = (props: BlogListingProps) => {
  if (!props?.hublData?.blogPosts) {
    return null; // or return an error message component
  }

  const {
    hublData: { blogPosts, currentPageNumber, nextPageNumber, totalPageCount, use_featured_image_in_summary },
    serverSideProps: { gatedContentIds = [] }, // Provide default empty array
    groupStyle: { headingStyleVariant, cardStyleVariant } = {}, // Provide default empty object
    headingAndTextHeadingLevel,
    defaultContent,
  } = props;

  return (
    <StyledComponentsRegistry>
      <StyledCardContainer className="hs-elevate-blog-listing" $pageNumber={currentPageNumber} $useFeaturedImage={!!use_featured_image_in_summary}>
        {blogPosts.map(post => {
          return (
            <Card
              key={post.id}
              cardOrientation="column"
              cardStyleVariant={cardStyleVariant}
              additionalClassArray={['hs-elevate-card--blog', 'hs-elevate-blog-listing__card']}
            >
              <StyledCardLink className="hs-elevate-blog-listing__card-link" href={post.absoluteUrl}>
                {use_featured_image_in_summary && post.featuredImage && (
                  <StyledImageContainer className="hs-elevate-card--blog__image-container hs-elevate-blog-listing__card-image-container">
                    <StyledImage
                      src={post.featuredImage}
                      alt={post.featuredImageAltText || ''}
                      width={post.featuredImageWidth}
                      height={post.featuredImageHeight}
                      className="hs-elevate-blog-listing__card-image"
                    />
                  </StyledImageContainer>
                )}
                <StyledCardContentContainer className="hs-elevate-blog-listing__card-content-container">
                  {post?.topicNames?.length > 0 && (
                    <StyledTagContainer className="hs-elevate-blog-listing__card-tag-container">
                      {post.topicNames.map((tag: string) => {
                        return (
                          <TagComponent additionalClassArray={['hs-elevate-blog-listing__card-tag']}>
                            <SanitizedContent content={tag} />
                          </TagComponent>
                        );
                      })}
                    </StyledTagContainer>
                  )}
                  <StyledCardHeadingContainer className="hs-elevate-blog-listing__card-heading-container" $cardStyleVariant={cardStyleVariant}>
                    <HeadingComponent
                      heading={post.title}
                      headingLevel={headingAndTextHeadingLevel}
                      headingStyleVariant={headingStyleVariant}
                      additionalClassArray={['hs-elevate-card--blog__heading', 'hs-elevate-blog-listing__card-heading']}
                    />
                    {gatedContentIds.includes(post.id) && (
                      <GateIconImage
                        className="hs-elevate-blog-listing__card-gate-icon"
                        src={GatedLockIcon}
                        alt="Gated content"
                        width="20"
                        height="20"
                        role="presentation"
                      />
                    )}
                  </StyledCardHeadingContainer>
                </StyledCardContentContainer>
              </StyledCardLink>
            </Card>
          );
        })}
      </StyledCardContainer>
      <Pagination currentPageNumber={currentPageNumber} nextPageNumber={nextPageNumber} totalPageCount={totalPageCount} defaultContent={defaultContent} />
    </StyledComponentsRegistry>
  );
};

export { fields } from './fields.js';

export { default as hublDataTemplate } from './hubl_data.hubl.html?raw';

export const getServerSideProps = withUrlPath(fetchGatedPosts);

export const meta: ModuleMeta = {
  label: 'Blog listing',
  content_types: ['BLOG_LISTING'],
  icon: blogSVG,
  categories: ['blog'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/blog_listing',
  version: 0,
  themeModule: true,
};
