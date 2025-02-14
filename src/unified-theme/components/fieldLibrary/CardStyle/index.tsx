import { ChoiceField, AdvancedVisibility } from '@hubspot/cms-components/fields';
import { CardVariantType } from '../../types/fields.js';

type CardStyle = {
  cardStyleDefault: CardVariantType;
  cardStyleVisibility?: AdvancedVisibility;
};

export default function CardStyle(props: CardStyle) {
  const { cardStyleDefault = 'primary', cardStyleVisibility = null } = props;

  return (
    <ChoiceField
      label='Card style'
      name='cardStyleVariant'
      visibilityRules='ADVANCED'
      advancedVisibility={cardStyleVisibility}
      display='select'
      choices={[
        ['card_variant_1', 'Card variant 1'],
        ['card_variant_2', 'Card variant 2'],
        ['card_variant_3', 'Card variant 3'],
        ['card_variant_4', 'Card variant 4'],
      ]}
      inlineHelpText='<a href="$theme_link">Edit</a>'
      links={[
        {
          type: 'THEME_EDITOR',
          name: 'theme_link',
          params: {
            theme_path: '@hubspot/elevate',
            theme_field_path: 'group_elements.group_cards.card_variant_1'
          }
        }
      ]}
      required={true}
      default={cardStyleDefault}
    />
  );
}
