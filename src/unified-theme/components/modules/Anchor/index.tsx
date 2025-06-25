import { ModuleMeta } from '../../types/modules.js';
import { TextFieldType } from '@hubspot/cms-components/fields';
import styles from './anchor.module.css';
import editAnchorSvg from './assets/editor-anchor.svg';
import anchorIconSvg from './assets/anchor.svg';
import cx from '../../utils/classnames.js';

// Types

type AnchorProps = {
  anchor: TextFieldType['default'];
  hublData: {
    isInEditor: boolean;
  };
};

export const Component = (props: AnchorProps) => {
  const { anchor, hublData } = props;

  const showAnchorVisual = hublData.isInEditor ? true : false;

  return (
    <span className={cx('hs-elevate-anchor', styles['hs-elevate-anchor'])} id={anchor}>
      {showAnchorVisual && (
        <span className={cx('hs-elevate-anchor__visual', styles['hs-elevate-anchor__visual'])}></span>
      )}
    </span>
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
