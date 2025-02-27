import { styled } from 'styled-components';
import { useSharedIslandState } from '@hubspot/cms-components';
import ArrowComponent from '../../../MenuComponent/ArrowComponent.js';
import { LogoFieldType } from '@hubspot/cms-components/fields';

type LogoImageProps = {
  $isHidden: boolean;
};

const LogoImage = styled.img<LogoImageProps>`
  max-width: 250px;
  max-height: 75px;
  height: auto;
  width: auto;
  display: block;
  visibility: ${({ $isHidden }) => ($isHidden ? 'hidden' : 'visible')};
  pointer-events: ${({ $isHidden }) => ($isHidden ? 'none' : 'auto')};
`;

const CompanyNameFallback = styled.span`
  display: block;
  font-size: 1.3rem;
  max-width: min(250px, 45vw);
  white-space: break-spaces;
  overflow-wrap: anywhere;

  @media (min-width: 576px) {
    font-size: 1.6rem;
  }

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

const StyledBackButton = styled.button`
  appearance: none;
  cursor: pointer;
  z-index: 50;
  border: none;
  background-color: transparent;
  color: var(--hsElevate--link--primary__fontColor);
  position: absolute;
  left: var(--hsElevate--spacing--48);
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    color: var(--hsElevate--link--primary__hover--fontColor);

    svg path {
      fill: var(--hsElevate--link--primary__hover--fontColor);
    }
  }
  svg {
    margin-inline-end: var(--hsElevate--spacing--8);
    transform: rotate(180deg);

    path {
      fill: var(--hsElevate--link--primary__fontColor);
    }
  }
`;

type LogoLinkProps = {
  $isHidden: boolean;
};

const LogoLink = styled.a<LogoLinkProps>`
  pointer-events: ${({ $isHidden }) => ($isHidden ? 'none' : 'initial')};
`;

const LogoLinkScreenReader = styled.span<LogoLinkProps>`
  display: ${({ $isHidden }) => ($isHidden ? 'none' : 'block')};
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

type MobileLogoBackButtonProps = {
  logoField: LogoFieldType['default'];
  companyName: string;
  logoLink: string;
  logoLinkAriaText: string;
};

export default function MobileLogoBackButton(props: MobileLogoBackButtonProps) {
  const {
    companyName,
    logoField: { src: logoSrc, alt: logoAlt, width: logoWidth, height: logoHeight, suppress_company_name },
    logoLink,
    logoLinkAriaText,
  } = props;
  const [triggeredMenuItems, setTriggeredMenuItems] = useSharedIslandState();
  const showBackButton = triggeredMenuItems.length > 0;
  const goBackOneLevel = () => {
    setTriggeredMenuItems(triggeredMenuItems.slice(0, -1));
  };

  return (
    <div>
      {showBackButton && (
        <StyledBackButton onClick={goBackOneLevel}>
          <ArrowComponent />
          Back
        </StyledBackButton>
      )}
      {logoSrc && (
        <LogoLink href={logoLink || '#'} $isHidden={showBackButton}>
          <LogoImage $isHidden={showBackButton} src={logoSrc} alt={logoAlt} loading="eager" width={logoWidth} height={logoHeight} />
          <LogoLinkScreenReader $isHidden={showBackButton}>{logoLinkAriaText}</LogoLinkScreenReader>
        </LogoLink>
      )}
      {!logoSrc && !suppress_company_name && <CompanyNameFallback>{companyName}</CompanyNameFallback>}
    </div>
  );
}
