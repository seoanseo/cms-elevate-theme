import { BooleanFieldType, IconFieldType, TextFieldType } from '@hubspot/cms-components/fields';
import { ModuleMeta } from '../../types/modules.js';
import listIconSvg from '../FeatureList/assets/list.svg';
import { Icon } from '@hubspot/cms-components';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import { SectionVariantType } from '../../types/fields.js';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';

type ListProps = {
  listIcon: IconFieldType['default'];
  groupListItems: GroupListItems[];
  groupStyle: GroupStyle;
};

type GroupStyle = SectionStyleFieldLibraryType;

type GroupListItems = {
  groupListContent: {
    listItemContent: TextFieldType['default'];
  };
};

const ListContainer = styled.ul`
  padding-left: 0px;
`;

const ListItem = styled.li`
  align-items: flex-start;
  display: flex;
  gap: var(--hsElevate--spacing--8, 8px);
  margin-bottom: var(--hsElevate--spacing--16, 16px);
  color: var(--hsElevate--list__textColor);
`;

const StyledIconContainer = styled.span`
  border-radius: 100%;
  background: var(--hsElevate--list__accentColor);
`;

const StyledIcon = styled(Icon)`
  display: block;
  height: 1.75rem;
  width: 1.75rem;
  flex: 0 0 1.75rem;
  padding: var(--hsElevate--spacing--8, 8px);
  fill: var(--hsElevate--list__sectionBackgroundColor);
`;

type CSSPropertiesMap = { [key: string]: string };

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  return {
    '--hsElevate--list__textColor': sectionColorsMap[sectionVariantField].textColor,
    '--hsElevate--list__accentColor': sectionColorsMap[sectionVariantField].accentColor,
    '--hsElevate--list__sectionBackgroundColor': sectionColorsMap[sectionVariantField].backgroundColor,
  };
}

export const Component = (props: ListProps) => {
  const {
    listIcon,
    groupListItems,
    groupStyle: { sectionStyleVariant },
  } = props;

  const cssColorVars = { ...generateColorCssVars(sectionStyleVariant) };

  return (
    <StyledComponentsRegistry>
      <ListContainer className="hs-elevate-list-container" style={cssColorVars}>
        {groupListItems.map((item, index) => {
          return (
            <ListItem className="hs-elevate-list-container__item" key={`${index} ${item.groupListContent.listItemContent}`}>
              {listIcon.name && (
                <StyledIconContainer className="hs-elevate-list-container__icon-container">
                  <StyledIcon className="hs-elevate-list-container__icon" fieldPath={`listIcon`} purpose="DECORATIVE" />
                </StyledIconContainer>
              )}
              {item.groupListContent.listItemContent}
            </ListItem>
          );
        })}
      </ListContainer>
    </StyledComponentsRegistry>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'List',
  content_types: ['SITE_PAGE', 'LANDING_PAGE', 'CASE_STUDY', 'BLOG_LISTING', 'BLOG_POST'],
  icon: listIconSvg,
  categories: ['body_content'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/list',
  version: 0,
  themeModule: true,
};
