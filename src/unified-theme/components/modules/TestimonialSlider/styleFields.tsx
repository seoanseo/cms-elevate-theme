import {
  FieldGroup,
  ChoiceField
 } from '@hubspot/cms-components/fields';
import { CardStyle } from '../../fieldLibrary/index.js';
import LinkStyle from '../../fieldLibrary/LinkStyle/index.js';

export default function StyleFields() {
  return (
    <FieldGroup
      label='Styles'
      name='groupStyle'
      tab='STYLE'
    >
      <CardStyle
        cardStyleDefault='card_variant_1'
      />
    </FieldGroup>
  );
}
