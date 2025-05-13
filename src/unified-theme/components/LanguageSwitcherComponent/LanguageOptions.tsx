import { LanguageVariant } from '@hubspot/cms-components';
import { styled } from 'styled-components';
interface LanguageItemProps {
  $isActive?: boolean;
  $menuBackgroundColorHover?: string;
}

interface LanguageLinkProps {
  $textColor?: string;
  $textColorHover?: string;
  $menuBackgroundColorHover?: string;
  $fontSize?: string;
}

export const LanguageList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  && {
    height: auto;
  }
`;

export const LanguageItem = styled.li<LanguageItemProps>`
  margin: 0;
  padding: 0;
  background-color: ${({ $isActive, $menuBackgroundColorHover }) => ($isActive && $menuBackgroundColorHover ? $menuBackgroundColorHover : 'transparent')};
  border-radius: 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const LanguageLink = styled.a<LanguageLinkProps>`
  display: flex;
  align-items: center;
  gap: var(--hsElevate--spacing--12, 12px);
  padding: var(--hsElevate--spacing--12, 12px) var(--hsElevate--spacing--16, 16px);
  transition: background-color 0.2s ease;
  font-weight: 600;
  font-size: ${({ $fontSize }) => $fontSize || 'var(--hsElevate--heading--h5__fontSize, 18px)'};

  && {
    color: ${({ $textColor }) => $textColor || '#1e293b'};
    text-decoration: none;

    &&:focus,
    &&:active,
    &&:visited {
      color: ${({ $textColor }) => $textColor || '#1e293b'};
      text-decoration: none;
    }

    &&:hover {
      text-decoration: none;
      color: ${({ $textColorHover }) => $textColorHover || '#1e293b'};
      background-color: ${({ $menuBackgroundColorHover }) => $menuBackgroundColorHover || '#f1f5f9'};
    }
  }
`;

export const LanguageLabel = styled.div`
  font-size: var(--hsElevate--heading--h4__fontSize, 24px);
  font-weight: 600;
  margin-bottom: var(--hsElevate--spacing--12, 12px);
  color: inherit;
`;

export interface LanguageOptionsProps {
  translations: LanguageVariant[];
  menuBackgroundColorHover?: string;
  textColor?: string;
  textColorHover?: string;
  fontSize?: string;
}
// Shared component for rendering language options
export const LanguageOptions = ({
  translations,
  menuBackgroundColorHover = 'var(--hsElevate--section--lightSection--1__backgroundColor)',
  textColor = 'var(--hsElevate--section--lightSection--1__textColor)',
  textColorHover = 'var(--hsElevate--section--lightSection--1__textColor)',
  fontSize = 'var(--hsElevate--heading--h5__fontSize, 18px)',
}: LanguageOptionsProps) => {
  if (!translations || Object.keys(translations).length <= 1) {
    return null;
  }

  return (
    <LanguageList role="menu" className="hs-elevate-language-switcher__language-list">
      {translations.map(translation => (
        <LanguageItem
          key={translation.languageCode}
          role="menuitem"
          $isActive={translation.isActive}
          $menuBackgroundColorHover={menuBackgroundColorHover}
          className="hs-elevate-language-switcher__language-item"
        >
          <LanguageLink
            href={translation.localizedUrl}
            lang={translation.languageCode}
            hrefLang={translation.languageCode}
            $textColor={textColor}
            $textColorHover={textColorHover}
            $menuBackgroundColorHover={menuBackgroundColorHover}
            $fontSize={fontSize}
            className="hs-elevate-language-switcher__language-link"
          >
            {translation.languageDisplayName.LOCALIZED}
          </LanguageLink>
        </LanguageItem>
      ))}
    </LanguageList>
  );
};

export default LanguageOptions;
