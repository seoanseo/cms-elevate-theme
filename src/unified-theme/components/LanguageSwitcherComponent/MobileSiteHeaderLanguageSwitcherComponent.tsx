// For testing purposes / local developement swap out translations with dummyTranslations
// import { dummyTranslations, dummyTranslationsAsObject } from './dummyData.js';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { useState, useRef, useMemo } from 'react';
import { getLanguageDisplayName, shouldDisplayLanguageSwitcher, createTranslationsArrayAsObject } from './utils.js';
import LanguageOptions from './LanguageOptions.jsx';
import { LanguageSwitcherProps } from '../types/language.js';
import { useLanguageVariants, Icon } from '@hubspot/cms-components';
import GlobeIcon from './assets/Globe.js';
import { useDocumentLang } from '../hooks/useDocumentLang.js';

const LANGUAGE_OPTIONS_CONTAINER_HEIGHT = '75vh';

const MobileLanguageSwitcherContainer = styled.div<{
  $menuBackgroundColor: string;
  $accentColor: string;
  $isOpen: boolean;
}>`
  position: absolute;
  width: 100%;
  background-color: ${({ $menuBackgroundColor }) => $menuBackgroundColor};
  border-top: 1px solid ${({ $accentColor }) => $accentColor};
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : 'calc(100% - 56px)')});
  transition: transform 0.3s ease;
  max-height: ${LANGUAGE_OPTIONS_CONTAINER_HEIGHT};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const LanguageSwitcherButton = styled.button<{ $menuTextColor: string; $menuBackgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding: var(--hsElevate--spacing--16, 16px) var(--hsElevate--spacing--40, 40px);
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ $menuTextColor }) => $menuTextColor};

  font-size: var(--hsElevate--heading--h5__fontSize, 18px);
  font-weight: 600;
  text-align: left;
  flex-shrink: 0;
`;

const LanguageButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: var(--hsElevate--spacing--12, 12px);

  svg {
    height: 20px;

    path {
      fill: currentColor;
    }
  }
`;

const LanguageOptionsContainer = styled.div<{ $isOpen: boolean; $menuBackgroundColor: string }>`
  padding: var(--hsElevate--spacing--16, 16px) var(--hsElevate--spacing--40, 40px);
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: opacity 0.3s ease;
  background-color: ${({ $menuBackgroundColor }) => $menuBackgroundColor};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const LanguageLabel = styled.div<{ $textColor: string }>`
  font-size: var(--hsElevate--heading--h6__fontSize, 14px);
  font-weight: 600;
  margin-bottom: var(--hsElevate--spacing--12, 12px);
  color: ${({ $textColor }) => $textColor};
  flex-shrink: 0;
`;

const OptionsScrollWrapper = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  visibility: ${props => (props.$isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1025;
`;

const MobileSiteHeaderLanguageSwitcher = (props: LanguageSwitcherProps) => {
  const translations = props.translations ? props.translations : useLanguageVariants();
  const activeTranslation = translations.find(item => item.isActive);
  const documentLang = useDocumentLang();
  const currentPageLanguage = useMemo(() => activeTranslation?.languageCode || documentLang, [activeTranslation, documentLang]);

  // Early return if no translations or no current page language
  if (!shouldDisplayLanguageSwitcher(translations, currentPageLanguage)) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const {
    menuBackgroundColor = 'var(--hsElevate--section--lightSection--1__backgroundColor)',
    menuBackgroundColorHover = 'var(--hsElevate--section--lightSection--1__backgroundColor)',
    textColor = 'var(--hsElevate--section--lightSection--1__textColor)',
    textColorHover = 'var(--hsElevate--section--lightSection--1__textColor)',
    languageSwitcherSelectText = 'Select a language',
    langSwitcherIconFieldPath,
  } = props;

  const translationsArrayAsObject = createTranslationsArrayAsObject(translations);
  const currentPageLanguageDisplayName = getLanguageDisplayName({ currentPageLanguage, translationsArrayAsObject });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const langSwitcherIcon = langSwitcherIconFieldPath ? <Icon fieldPath={langSwitcherIconFieldPath} /> : <GlobeIcon />;
  const toggleLanguageOptions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledComponentsRegistry>
      {isOpen && <Overlay $isOpen={isOpen} onClick={() => setIsOpen(false)} className="hs-elevate-site-header__language-switcher-overlay" />}
      <MobileLanguageSwitcherContainer
        $menuBackgroundColor={menuBackgroundColor}
        $accentColor={menuBackgroundColorHover}
        $isOpen={isOpen}
        className="hs-elevate-site-header__language-switcher-container"
      >
        <LanguageSwitcherButton
          ref={buttonRef}
          onClick={toggleLanguageOptions}
          $menuTextColor={textColor}
          $menuBackgroundColor={menuBackgroundColor}
          aria-expanded={isOpen}
          aria-controls="language-options"
          className="hs-elevate-site-header__language-switcher-button"
        >
          <LanguageButtonContent className="hs-elevate-site-header__language-switcher-button-content">
            {langSwitcherIcon}
            <span className="hs-elevate-site-header__language-switcher-current-language">{currentPageLanguageDisplayName}</span>
          </LanguageButtonContent>
        </LanguageSwitcherButton>

        <LanguageOptionsContainer
          $isOpen={isOpen}
          $menuBackgroundColor={menuBackgroundColor}
          className="hs-elevate-site-header__language-switcher-options-container"
        >
          <LanguageLabel className="hs-elevate-site-header__language-switcher-select-language-label" $textColor={textColor}>
            {languageSwitcherSelectText}
          </LanguageLabel>
          <OptionsScrollWrapper>
            <LanguageOptions
              translations={translations}
              menuBackgroundColorHover={menuBackgroundColorHover}
              textColor={textColor}
              textColorHover={textColorHover}
              fontSize="var(--hsElevate--heading--h6__fontSize, 14px)"
            />
          </OptionsScrollWrapper>
        </LanguageOptionsContainer>
      </MobileLanguageSwitcherContainer>
    </StyledComponentsRegistry>
  );
};

export default MobileSiteHeaderLanguageSwitcher;
