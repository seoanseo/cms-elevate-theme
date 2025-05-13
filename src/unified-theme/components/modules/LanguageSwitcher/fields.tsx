import { ModuleFields, ChoiceField, IconField, FieldGroup, TextField } from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <ChoiceField
      name="display_mode"
      label="Display mode"
      helpText="Allows you to choose in which language the languages of your pages are displayed on your website."
      choices={[
        ['pagelang', 'Page language'],
        ['localized', 'Localized'],
        ['hybrid', 'Hybrid'],
      ]}
      display="select"
      required={true}
      default="localized"
    />

    <IconField
      label="Globe Icon"
      name="globe_icon"
      iconSet="fontawesome-6.4.2"
      default={{
        name: 'earth-americas',
      }}
    />

    <FieldGroup name="default_text" label="Default Text" locked={true}>
      <TextField name="select_your_language" label="Select your language" locked={true} default="Select your language" />
    </FieldGroup>
  </ModuleFields>
);
