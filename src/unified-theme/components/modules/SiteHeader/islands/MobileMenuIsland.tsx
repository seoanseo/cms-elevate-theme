import { CSSProperties, styled } from 'styled-components';
import MenuComponent from '../../../MenuComponent/index.js';
import { useEffect, useState } from 'react';
import { useSharedIslandState } from '@hubspot/cms-components';
import { Button } from '../../../ButtonComponent/index.js';
import { getLinkFieldHref } from '../../../utils/content-fields.js';
import { MenuContainerProps, MobileMenuIslandProps } from '../types.js';

const baseZindex = 1000;

const MenuContainer = styled.div<MenuContainerProps>`
  position: absolute;
  background-color: white; // Change to actual BG color
  top: 100%;
  left: ${({ $isMenuSliding }) => ($isMenuSliding ? '0' : '100%')};
  margin-top: 0;
  width: 100%;
  height: ${({ $headerHeight }) => `calc(100vh - ${$headerHeight}px)`};
  z-index: ${baseZindex};
  transition: all 0.3s ease;
  display: ${({ $showMenu }) => ($showMenu ? 'flex' : 'none')};
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  > nav {
    overflow: auto;
    background-color: ${({ $menuBackgroundColor }) => $menuBackgroundColor};
  }

  ul {
    height: ${({ $headerHeight, $mobileButtonContainerHeight }) => `calc(100vh - ${$headerHeight}px - ${$mobileButtonContainerHeight}px)`};
    width: 100%;
    background-color: ${({ $menuBackgroundColor }) => $menuBackgroundColor};
  }

  .hs-elevate-menu--mobile,
  .hs-elevate-menu__flyout-submenu--mobile {
    padding: 10px 32px;
  }

  .hs-elevate-menu {
    gap: 0;
    flex: 0 0 100%;
    margin-bottom: 0;
    align-items: flex-start;
    justify-content: flex-start;

    &:after {
      content: '';
      position: absolute;
      top: -1px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: ${({ $menuAccentColor }) => $menuAccentColor};
    }

    li {
      position: initial;
      width: 100%;
      color: ${({ $menuTextColor }) => $menuTextColor};

      a {
        color: ${({ $menuTextColor }) => $menuTextColor};
        font-weight: 600;
        text-decoration: none;

        &:hover {
          text-decoration: none;
        }
      }

      .hs-elevate-menu__arrow-path {
        fill: ${({ $menuTextColor }) => $menuTextColor};
      }
    }

    .hs-elevate-menu__menu-item-link-container:hover {
      background-color: ${({ $menuAccentColor }) => $menuAccentColor};
    }

    li[data-hs-elevate-menuitem-depth='1'] ul {
      position: absolute;
      left: 100%;
      top: 0;
      transition: left 0.3s ease;
      width: 100%;
      margin-bottom: 0;
      background-color: ${({ $menuBackgroundColor }) => $menuBackgroundColor};
      z-index: ${baseZindex + 10};
    }

    .hs-elevate-menu--has-children.hs-elevate-menu__menu-item--triggered > ul {
      left: 0;
    }
  }
`;

const MobileSlideoutButtonContainer = styled.div<{
  $menuBackgroundColor: string;
}>`
  @media (min-width: 460px) {
    display: none;
  }

  display: block;
  padding: var(--hsElevate--spacing--24);
  width: 100%;
  margin-top: 0;
  z-index: ${baseZindex + 20};
  background-color: ${({ $menuBackgroundColor }) => $menuBackgroundColor};

  .hs-elevate-mobile-slideout__button {
    width: 100%;
    height: 100%;
    justify-content: center;
  }
`;

const HamburgerMenu = styled.div<{ $menuTextColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  cursor: pointer;

  div {
    width: 100%;
    height: 4px;
    background-color: ${({ $menuTextColor }) => $menuTextColor};
    transition: all 0.3s ease;
  }

  &.active div:nth-child(1) {
    transform: rotate(45deg) translate(7px, 5px);
  }

  &.active div:nth-child(2) {
    opacity: 0;
  }

  &.active div:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -5px);
  }
`;

export default function MobileMenuIsland(props: MobileMenuIslandProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuSliding, setIsMenuSliding] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [triggeredMenuItems, setTriggeredMenuItems] = useSharedIslandState();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [mobileButtonContainerHeight, setMobileButtonContainerHeight] = useState(0);

  const { flow, flyouts, menuBackgroundColor, menuAccentColor, menuTextColor, buttonStyleVariant, buttonStyleSize, groupButton, ...rest } = props;

  const {
    showButton,
    buttonContentText: buttonText,
    buttonContentLink: buttonLink,
    buttonContentShowIcon: showIcon,
    buttonContentIconPosition: iconPosition,
  } = groupButton;

  useEffect(() => {
    if (isAnimating) {
      setShowMenu(true);
      // This is to prevent scrolling when the menu is open
      document.body.style.overflowY = 'hidden';
    } else if (!isAnimating && showMenu) {
      setIsClosing(true);
      setIsMenuSliding(false);
      // This is to re-enable scrolling when the menu is closed
      document.body.style.overflowY = 'auto';
    }
  }, [isAnimating]);

  useEffect(() => {
    if (showMenu && !isClosing) {
      setTimeout(() => {
        setIsMenuSliding(true);
      }, 100); // This delay just gives display change time to take effeect so animation works
    } else if (isClosing) {
      setTimeout(() => {
        setShowMenu(false);
        setIsClosing(false);
      }, 300); // Adjust this delay to match the transition duration
    }
  }, [showMenu, isClosing]);

  useEffect(() => {
    const header = document.querySelector('.hs-elevate-site-header') as HTMLElement;

    if (!header) return;

    const updateHeight = () => {
      setHeaderHeight(header.offsetHeight);
    };

    const observer = new MutationObserver(updateHeight);
    observer.observe(header, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // Initial height set
    updateHeight();

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const buttonContainer = document.querySelector('.hs-elevate-mobile-slideout__button-container') as HTMLElement;

    // If the button container doesn't exist, set the height to 0
    if (!buttonContainer) {
      setMobileButtonContainerHeight(0);
      return;
    }

    const updateHeight = (height: number) => {
      setMobileButtonContainerHeight(height);
    };

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const targetElement = entry.target as HTMLElement;
        updateHeight(targetElement.offsetHeight);
      }
    });

    resizeObserver.observe(buttonContainer);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleOpenCloseMenu = () => {
    setTriggeredMenuItems([]);
    setIsAnimating(!isAnimating);
  };

  const topLevelMenuItemStyles = {
    '--hsElevate--menu--topLevel__gap': '0',
  } as CSSProperties;

  return (
    <div>
      <HamburgerMenu className={showMenu ? 'active' : ''} tab-index="1" onClick={handleOpenCloseMenu} $menuTextColor={menuTextColor}>
        <div></div>
        <div></div>
        <div></div>
      </HamburgerMenu>
      <MenuContainer
        $showMenu={showMenu}
        $isMenuSliding={isMenuSliding}
        $headerHeight={headerHeight}
        $mobileButtonContainerHeight={mobileButtonContainerHeight}
        $menuAccentColor={menuAccentColor}
        $menuBackgroundColor={menuBackgroundColor}
        $menuTextColor={menuTextColor}
      >
        <MenuComponent
          {...rest}
          flow="vertical"
          flyouts={false}
          isMobileMenu={true}
          triggeredMenuItems={triggeredMenuItems}
          setTriggeredMenuItems={setTriggeredMenuItems}
          topLevelMenuItemStyles={topLevelMenuItemStyles}
        />
        {showButton && (
          <MobileSlideoutButtonContainer className="hs-elevate-mobile-slideout__button-container" $menuBackgroundColor={menuBackgroundColor}>
            <Button
              href={getLinkFieldHref(buttonLink)}
              buttonStyle={buttonStyleVariant}
              buttonSize={buttonStyleSize}
              additionalClassArray={['hs-elevate-mobile-slideout__button']}
              openInNewTab={buttonLink.open_in_new_tab}
              showIcon={showIcon}
              iconFieldPath="groupButton.buttonContentIcon"
              iconPosition={iconPosition}
            >
              {buttonText}
            </Button>
          </MobileSlideoutButtonContainer>
        )}
      </MenuContainer>
    </div>
  );
}
