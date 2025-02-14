import { ModuleMeta } from '../../types/modules.js';
import { TextFieldType } from '@hubspot/cms-components/fields';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import editAnchorSvg from './assets/editor-anchor.svg';
import anchorIconSvg from './assets/anchor.svg';

// Types

type AnchorProps = {
  anchor: TextFieldType['default'];
  hublData: {
    isInEditor: boolean;
  };
};

// Anchor

const Anchor = styled.span`
  position: relative;
`;

const AnchorVisual = styled.span`
  display: block;
  margin-inline-start: auto;
  margin-block-start: 4px;
  margin-block-end: 4px;
  padding-block-start: 10px;
  padding-block-end: 11px;
  width: 47px;
  background: url(${editAnchorSvg}) no-repeat 100% 100% !important;

  &:before {
    content: "";
    position: absolute;
    border-top: 1px solid #00a4bd;
    width: calc(100% - 45px);
    left: 0;
    height: 8px;
  }
`;

export const Component = (props: AnchorProps) => {
  const {
    anchor,
    hublData,
  } = props;

  const showAnchorVisual = hublData.isInEditor ? true : false;

  return (
    <StyledComponentsRegistry>
      <Anchor id={anchor}>
        {showAnchorVisual && (
          <AnchorVisual></AnchorVisual>
        )}
      </Anchor>
    </StyledComponentsRegistry>
  );
};

export { fields } from './fields.js';

export const hublDataTemplate = `
  {% set hublData = {
      "isInEditor": is_in_editor,
    }
  %}
`;

export const meta: ModuleMeta = {
  label: 'Anchor',
  content_types: ['SITE_PAGE', 'LANDING_PAGE'],
  icon: anchorIconSvg,
  categories: ['functionality'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/anchor',
  version: 0,
  themeModule: true,
};
