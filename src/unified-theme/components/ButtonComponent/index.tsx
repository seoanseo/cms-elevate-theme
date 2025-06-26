import { ButtonStyleType, StandardSizeType, ElementPositionType } from '../types/fields.js';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { Icon } from '@hubspot/cms-components';

type ButtonProps = {
  ariaLabel?: string;
  buttonStyle: ButtonStyleType;
  buttonSize: StandardSizeType;
  additionalClassArray?: string[];
  rel: string;
  href: string;
  target: string;
  children?: React.ReactNode;
  showIcon: boolean;
  iconFieldPath?: string;
  iconPosition?: ElementPositionType;
};

const buttonPadding = {
  small: 'var(--hsElevate--spacing--12, 12px) var(--hsElevate--spacing--20, 20px)',
  medium: 'var(--hsElevate--spacing--16, 16px) var(--hsElevate--spacing--24, 24px)',
  large: 'var(--hsElevate--spacing--20, 20px) var(--hsElevate--spacing--32, 32px)',
};

const StyledButton = styled.a<{ $buttonSize: StandardSizeType }>`
  display: inline-flex;
  min-width: 150px;
  justify-content: space-around;
  align-items: center;
  white-space: normal;
  text-align: center;
  padding: ${({ $buttonSize }) => `${buttonPadding[$buttonSize]}`};

  &:hover {
    cursor: pointer;
  }
`;

function getButtonClassName(buttonStyle: ButtonStyleType) {
  const buttonClassMap = {
    primary: 'hs-elevate-button--primary',
    secondary: 'hs-elevate-button--secondary',
    tertiary: 'hs-elevate-button--tertiary',
    accent: 'hs-elevate-button--accent',
  };

  return buttonClassMap[buttonStyle];
}

const DefaultContent = () => (
  <>
    <span>Default Button</span>
  </>
);

export const StyledIcon = styled(Icon)<{ $iconPosition: ElementPositionType }>`
  display: block;
  height: 1.25rem;
  fill: currentColor;
  flex: 0 0 auto;

  ${({ $iconPosition }) =>
    $iconPosition === 'left' &&
    `
    order: 0;
    margin-right: 1rem;
  `}

  ${({ $iconPosition }) =>
    $iconPosition === 'right' &&
    `
    order: 3;
    margin-left: 1rem;
  `}
`;

export const Button = (props: ButtonProps) => {
  const { ariaLabel, additionalClassArray, rel, href, target, buttonStyle, buttonSize, children, showIcon, iconFieldPath, iconPosition } = props;

  const buttonClassName = getButtonClassName(buttonStyle);
  const additionalClasses = additionalClassArray ? additionalClassArray.join(' ') : '';

  return (
    <StyledComponentsRegistry>
      <StyledButton
        $buttonSize={buttonSize}
        className={`hs-elevate-button ${buttonClassName} ${additionalClasses}`}
        target={target}
        href={href}
        rel={rel}
        aria-label={ariaLabel}
      >
        {iconFieldPath && showIcon && <StyledIcon purpose="DECORATIVE" fieldPath={iconFieldPath} $iconPosition={iconPosition} />}
        {children || <DefaultContent />}
      </StyledButton>
    </StyledComponentsRegistry>
  );
};
