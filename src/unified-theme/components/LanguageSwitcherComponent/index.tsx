// For testing purposes / local developement swap out translations with dummyTranslations
// import { dummyTranslations, dummyTranslationsAsObject } from './dummyData.js';

import { styled } from 'styled-components';
import StyledComponentsRegistry from '../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { shouldDisplayLanguageSwitcher, getLanguageDisplayName, createTranslationsArrayAsObject } from './utils.jsx';
import LanguageOptions from './LanguageOptions.jsx';
import { LanguageSwitcherProps } from '../types/language.js';
import { useState, useEffect, MouseEvent as ReactMouseEvent, useMemo } from 'react';
import { useLanguageVariants, Icon } from '@hubspot/cms-components';
import { useIsInEditor } from '../hooks/useIsInEditor.js';
import GlobeIcon from './assets/Globe.js';
import useDocumentLang from '../hooks/useDocumentLang.js';

const SLIDE_IN_ANIMATION_DURATION = 0.3;

const LanguageSwitcherNav = styled.nav`
  position: relative;
  display: inline-block;
`;

const LanguageSwitcherButton = styled.div<{ $textColor: string }>`
  display: flex;
  gap: var(--hsElevate--spacing--8, 8px);
  align-items: center;
  padding: var(--hsElevate--spacing--8, 8px) var(--hsElevate--spacing--12, 12px);
  background-color: transparent;
  color: ${props => props.$textColor};
  cursor: pointer;
  font-size: var(--hsElevate--heading--h5__fontSize, 18px);

  svg {
    height: 20px;

    path {
      fill: currentColor;
    }
  }
`;

const SidePanel = styled.div<{ $isOpen: boolean; $menuBackgroundColor: string }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: ${props => props.$menuBackgroundColor};
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  transform: translateX(${props => (props.$isOpen ? '0' : '100%')});
  transition: transform ${SLIDE_IN_ANIMATION_DURATION}s ease;
  z-index: 1000;
  overflow-y: auto;

  @media (max-width: 400px) {
    width: 100%;
  }
`;

const PanelHeader = styled.div<{ $textColor: string; $menuBackgroundColor: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--hsElevate--spacing--24, 24px);
  border-bottom: 1px solid ${props => props.$textColor};
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${props => props.$menuBackgroundColor};
`;

const PanelTitle = styled.span<{ $textColor: string }>`
  margin: 0;
  font-size: var(--hsElevate--heading--h4__fontSize, 24px);
  font-weight: 600;
  color: ${props => props.$textColor};
`;

const CloseButton = styled.button<{ $textColor: string }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--hsElevate--spacing--8, 8px);
  color: ${props => props.$textColor};
`;

const PanelContent = styled.div`
  padding: var(--hsElevate--spacing--24, 24px);
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  visibility: ${props => (props.$isOpen ? 'visible' : 'hidden')};
  transition: opacity ${SLIDE_IN_ANIMATION_DURATION}s ease, visibility ${SLIDE_IN_ANIMATION_DURATION}s ease;
  z-index: 999;
`;

const LanguageSwitcherIsland = (props: LanguageSwitcherProps) => {
  const translations = props.translations ? props.translations : useLanguageVariants();
  const activeTranslation = translations.find(item => item.isActive);
  const documentLang = useDocumentLang();
  const currentPageLanguage = useMemo(() => activeTranslation?.languageCode || documentLang, [activeTranslation, documentLang]);

  // Early return if no translations or no current page language
  if (!shouldDisplayLanguageSwitcher(translations, currentPageLanguage)) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const translationsArrayAsObject = createTranslationsArrayAsObject(translations);
  const currentPageLanguageDisplayName = getLanguageDisplayName({ currentPageLanguage, translationsArrayAsObject });
  const {
    menuBackgroundColor = 'var(--hsElevate--section--lightSection--1__backgroundColor)',
    menuBackgroundColorHover = 'var(--hsElevate--section--lightSection--1__backgroundColor)',
    textColor = 'var(--hsElevate--section--lightSection--1__textColor)',
    textColorHover = 'var(--hsElevate--section--lightSection--1__textColor)',
    languageSwitcherSelectText = 'Select a language',
    langSwitcherIconFieldPath,
  } = props;
  const isInEditor = useIsInEditor();

  const langSwitcherIcon = langSwitcherIconFieldPath ? <Icon fieldPath={langSwitcherIconFieldPath} /> : <GlobeIcon />;

  const handleContainerClick = (e: ReactMouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const closeSidePanel = () => {
    setIsOpen(false);
  };

  function handleLanguageSwitcherClick() {
    setIsOpen(!isOpen);
  }

  return (
    <StyledComponentsRegistry>
      <LanguageSwitcherNav onClick={handleContainerClick} className="hs-elevate-language-switcher">
        <LanguageSwitcherButton
          aria-expanded={isOpen}
          $textColor={textColor}
          aria-label={currentPageLanguageDisplayName}
          onClick={handleLanguageSwitcherClick}
          className="hs-elevate-language-switcher__button"
        >
          {langSwitcherIcon}
          <span className="hs-elevate-language-switcher__current-language">{currentPageLanguageDisplayName}</span>
        </LanguageSwitcherButton>
        {isOpen && <Overlay $isOpen={isOpen} onClick={closeSidePanel} className="hs-elevate-language-switcher__overlay" />}
        {!isInEditor && (
          <SidePanel $isOpen={isOpen} $menuBackgroundColor={menuBackgroundColor} className="hs-elevate-language-switcher__side-panel">
            <PanelHeader $textColor={textColor} $menuBackgroundColor={menuBackgroundColor} className="hs-elevate-language-switcher__side-panel-header">
              <PanelTitle $textColor={textColor} className="hs-elevate-language-switcher__side-panel-title">
                {languageSwitcherSelectText}
              </PanelTitle>
              <CloseButton
                onClick={closeSidePanel}
                aria-label="Close language selector"
                $textColor={textColor}
                className="hs-elevate-language-switcher__side-panel-close-button"
              >
                ✕
              </CloseButton>
            </PanelHeader>

            <PanelContent className="hs-elevate-language-switcher__side-panel-options-container">
              <LanguageOptions
                translations={translations}
                menuBackgroundColorHover={menuBackgroundColorHover}
                textColor={textColor}
                textColorHover={textColorHover}
              />
            </PanelContent>
          </SidePanel>
        )}
      </LanguageSwitcherNav>
    </StyledComponentsRegistry>
  );
};

export default LanguageSwitcherIsland;
