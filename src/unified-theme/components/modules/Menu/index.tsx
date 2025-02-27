import { ModuleMeta } from '../../types/modules.js';
import MenuComponent from '../../MenuComponent/index.js?island';
import { Island } from '@hubspot/cms-components';
import { SizeOption, maxMenuDepth } from '../../MenuComponent/types.js';
import {
  AlignmentFieldType,
  TextFieldType,
} from '@hubspot/cms-components/fields';
import MenuSvg from './assets/menu.svg';
import { LinkStyleFieldLibraryType } from '../../fieldLibrary/LinkStyle/types.js';

type MenuDataType = {
  label: string;
  url: string;
  children?: MenuDataType[];
};

type MenuModulePropTypes = {
  hublData: {
    navigation: {
      children: MenuDataType[];
    };
  };
  maxDepth: maxMenuDepth;
  menuName: TextFieldType['default'];
  styles: {
    groupMenu: {
      menuColumnGap: SizeOption;
      menuAlignment: AlignmentFieldType['default'];
    };
    groupMenuItems: {
      menuItemVerticalGap: SizeOption;
      menuItemPadding: SizeOption;
    };
    groupLink: LinkStyleFieldLibraryType
  };
};
type CSSPropertiesMap = { [key: string]: string };

function generateSpacingCssVars(spacingField: SizeOption): CSSPropertiesMap {
  const spacingMap = {
    none: '0',
    small: 'var(--hsElevate--spacing--16, 16px)',
    medium: 'var(--hsElevate--spacing--32, 32px)',
    large: 'var(--hsElevate--spacing--56, 56px)',
  };

  return { '--hsElevate--menu--topLevel__gap': spacingMap[spacingField] };
}
function generatePaddingCssVars(spacingField: SizeOption): CSSPropertiesMap {
  const verticalSpacingMap = {
    none: '0',
    small: 'var(--hsElevate--spacing--4, 4px)',
    medium: 'var(--hsElevate--spacing--12, 12px)',
    large: 'var(--hsElevate--spacing--16, 16px)',
  };
  const horizontalSpacingMap = {
    none: '0',
    small: 'var(--hsElevate--spacing--4, 4px)',
    medium: 'var(--hsElevate--spacing--8, 8px)',
    large: 'var(--hsElevate--spacing--16, 16px)',
  };

  return {
    '--hsElevate--menuItem__paddingVertical': verticalSpacingMap[spacingField],
    '--hsElevate--menuItem__paddingHorizontal':
      horizontalSpacingMap[spacingField],
  };
}
function generateMenuItemVerticalGapCssVars(
  menuItemVerticalGap: SizeOption
): CSSPropertiesMap {
  const verticalSpacingMap = {
    none: '0',
    small: 'var(--hsElevate--spacing--8, 8px)',
    medium: 'var(--hsElevate--spacing--16, 16px)',
    large: 'var(--hsElevate--spacing--24, 24px)',
  };

  return {
    '--hsElevate--menuItem__gap': verticalSpacingMap[menuItemVerticalGap],
  };
}

export const Component = (props: MenuModulePropTypes) => {
  const {
    hublData,
    menuName = '',
    maxDepth,
    styles,
  } = props;

  const navDataArray = hublData?.navigation?.children ?? [];

  const {
    groupMenu: {
      menuColumnGap,
      menuAlignment,
    },
    groupMenuItems: {
      menuItemPadding,
      menuItemVerticalGap,
    },
    groupLink: {
      linkStyleVariant
    }
  } = styles;

  const cssVarsMap = {
    ...generatePaddingCssVars(menuItemPadding),
    ...generateSpacingCssVars(menuColumnGap),
    ...generateMenuItemVerticalGapCssVars(menuItemVerticalGap),
  };

  return (
    <div style={cssVarsMap}>
      <Island
        module={MenuComponent}
        menuDataArray={navDataArray}
        flow='horizontal'
        maxDepth={maxDepth}
        menuAlignment={menuAlignment}
        navigationAriaLabel={menuName}
        linkStyleVariant={linkStyleVariant}
      />
    </div>
  );
};

export { fields } from './fields.js';

export const hublDataTemplate = `
  {% set hublData = {
      "navigation" : menu(module.menu, "site_root")
    }
  %}
`;

// NOTE: Source an Icon for this module
export const meta: ModuleMeta = {
  label: 'Horizontal menu',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: MenuSvg,
  categories: ['design'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/menu',
  version: 0,
  themeModule: true,
};
