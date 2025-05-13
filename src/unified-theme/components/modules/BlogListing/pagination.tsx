import { styled } from 'styled-components';
import Chevron from './chevron.js';
import { usePageUrl } from '@hubspot/cms-components';

const PaginationContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--hsElevate--spacing--24, 24px);
`;

const PaginationLink = styled.a`
  && {
    position: relative;
    display: block;
    text-decoration: none;
    line-height: 1;
    color: var(--hsElevate--section--lightSection--1--link__fontColor);

    &:is(.active) {
      width: 44px;
      text-align: center;
    }

    &:is(.active):before {
      content: '';
      width: 44px;
      height: 44px;
      border: 2px solid var(--hsElevate--section--lightSection--1--link__fontColor);
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &&:hover {
      text-decoration: none;
      color: var(--hsElevate--section--lightSection--1--link__hover--fontColor);

      &:is(.active):before {
        border-color: var(--hsElevate--section--lightSection--1--link__hover--fontColor);
      }
    }
  }
`;

const NavLink = styled.a`
  &.hs-elevate-disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .hs-elevate-helper--rotate-180 {
    transform: rotate(180deg);
  }

  & path {
    fill: var(--hsElevate--section--lightSection--1--link__fontColor);
  }

  &:hover path {
    fill: var(--hsElevate--section--lightSection--1--link__hover--fontColor);
  }
`;

const Elipsis = styled(PaginationLink)`
  pointer-events: none;
`;

const ScreenReadyOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

type PaginationProps = {
  currentPageNumber: number;
  totalPageCount: number;
  nextPageNumber: number;
  defaultContent: {
    nextPage: string;
    previousPage: string;
  };
};

function standardizePathName(currentPathName: string) {
  // If the pathname is '/' return an empty string
  // This is to avoid having a double slash in the basePagePath
  // This only happens if the blog is setup in the root directory of the website
  // or exists on a subdomain ex: https://blog.example.com/
  return currentPathName === '/' ? '' : currentPathName;
}

export default function Pagination(props: PaginationProps) {
  const { currentPageNumber, totalPageCount, nextPageNumber, defaultContent } = props;

  const currentPathName = standardizePathName(usePageUrl().pathname);
  const pathNameWithoutPageInfo = currentPathName.replace(/\/page\/\d+/, '');
  const basePagePath = `${pathNameWithoutPageInfo}/page`;
  const nextPageUrl = `${basePagePath}/${nextPageNumber}`;
  const previousPageUrl = `${basePagePath}/${currentPageNumber > 1 ? currentPageNumber - 1 : 1}`;
  const enableNextButton = currentPageNumber < totalPageCount;
  const enablePreviousButton = currentPageNumber > 1;
  const standardizedPageNumbers = [-1, 0, 1];
  let displayFirstNumber = false;
  let displayLastNumber = false;
  let displayPreviousElipsis = false;
  let displayNextElipsis = false;

  function buildPaginationNumbers() {
    // Threshold allows us to manipulate the array above(standardizedPageNumbers)
    // to change howmany pages we want to display
    // without needing to change other parts of the function.
    const threshold = Math.abs(standardizedPageNumbers[0]);

    if (totalPageCount <= standardizedPageNumbers.length) {
      // If we have less than the lenght of the standardizedPageNumbers array
      // Then just display all the pages.
      return Array.from({ length: totalPageCount }, (_, i) => i + 1);
    }

    /* ----------------- */
    // We now know that we have more than standardizedPageNumbers.length pages
    /* ----------------- */

    if (currentPageNumber <= threshold) {
      // If current page number is less than the threshold display standardizedPageNumbers.length
      displayLastNumber = true;
      displayNextElipsis = true;
      return Array.from({ length: standardizedPageNumbers.length }, (_, i) => i + 1);
    }

    if (currentPageNumber >= totalPageCount - threshold) {
      // Display the last standardized pages
      displayFirstNumber = true;
      displayPreviousElipsis = true;
      return Array.from({ length: standardizedPageNumbers.length }, (_, i) => totalPageCount - standardizedPageNumbers.length + i + 1);
    }

    // display standardized pages around the current page
    displayFirstNumber = currentPageNumber === threshold + 1 ? false : true;
    displayPreviousElipsis = currentPageNumber === threshold + 1 ? false : true;
    displayNextElipsis = currentPageNumber === totalPageCount - threshold - 1 ? false : true;
    displayLastNumber = true;
    return standardizedPageNumbers.map(pageNumber => currentPageNumber + pageNumber);
  }

  const pagesToDisplay = buildPaginationNumbers();

  return (
    <PaginationContainer className="hs-elevate-blog-listing__pagination-container">
      <NavLink className={`hs-elevate-blog-listing__pagination-link ${!enablePreviousButton ? 'hs-elevate-disabled' : ''}`} href={previousPageUrl}>
        <Chevron additionalClassArray={['hs-elevate-helper--rotate-180', 'hs-elevate-blog-listing__pagination-icon']} />
        <ScreenReadyOnly>{defaultContent.previousPage}</ScreenReadyOnly>
      </NavLink>

      {displayFirstNumber && (
        <PaginationLink className="hs-elevate-blog-listing__pagination-link" href={`${basePagePath}/1`}>
          1
        </PaginationLink>
      )}
      {displayPreviousElipsis && <Elipsis>...</Elipsis>}
      {pagesToDisplay.map(index => (
        <PaginationLink
          className={`hs-elevate-blog-listing__pagination-link ${currentPageNumber === index ? 'active' : ''}`}
          key={index}
          href={`${basePagePath}/${index}`}
        >
          {index}
        </PaginationLink>
      ))}
      {displayNextElipsis && <Elipsis>...</Elipsis>}
      {displayLastNumber && (
        <PaginationLink className="hs-elevate-blog-listing__pagination-link" href={`${basePagePath}/${totalPageCount}`}>
          {totalPageCount}
        </PaginationLink>
      )}
      <NavLink href={nextPageUrl} className={`hs-elevate-blog-listing__pagination-link ${!enableNextButton ? 'hs-elevate-disabled' : ''}`}>
        <Chevron additionalClassArray={['hs-elevate-blog-listing__pagination-icon']} />
        <ScreenReadyOnly>{defaultContent.nextPage}</ScreenReadyOnly>
      </NavLink>
    </PaginationContainer>
  );
}
