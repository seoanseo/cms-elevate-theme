import { ModuleFields, DateTimeField, FieldGroup, ChoiceField, NumberField, ColorField, TextField } from '@hubspot/cms-components/fields';
import { limitedColorDefaults } from '../../utils/theme-color-sets.js';

// Preset options for scoped color fields
// Base color sets
const limitedOptionsThemeColorsSet = limitedColorDefaults.themeColors;
const limitedOptionsTextColorsSet = limitedColorDefaults.themeSectionTextColors;
const limitedOptionsBackgroundColorsSet = limitedColorDefaults.themeSectionBackgroundColors;

// Combined color sets
const limitedOptionsAccentAndBackgroundColorsSet = [...limitedOptionsThemeColorsSet, ...limitedOptionsBackgroundColorsSet];
const limitedOptionsTextAndAccentColorsSet = [...limitedOptionsThemeColorsSet, ...limitedOptionsTextColorsSet];

// Fields paths for default color field values
const themeGroupSectionsPath = 'theme.group_foundation.group_colors.group_more_settings.group_sections';
const section3BackgroundColor = `${themeGroupSectionsPath}.group_light_section_3.group_section.background_color.color`;
const section3AccentColor = `${themeGroupSectionsPath}.group_light_section_3.group_fonts.accent_color.color`;
const section1TextColor = `${themeGroupSectionsPath}.group_light_section_1.group_fonts.text_color.color`;

// Repeated options for links to theme editor
const inlineHelpText = '<a href="$theme_link">Edit</a>';
const themeLink = {
  type: 'THEME_EDITOR' as const,
  name: 'theme_link',
  params: {
    theme_path: '@hubspot/elevate',
    theme_field_path: themeGroupSectionsPath
  }
};

// Fields
export const fields = (
  <ModuleFields>
    <DateTimeField
      label="End date"
      name="endDate"
      inlineHelpText="Typically your event's date or when you'd like for the timer to end."
      step={10}
      default={1775059200000}
    />
    <FieldGroup label="Styles" name="groupStyle" tab="STYLE">
      <FieldGroup label="Counter" name="counter" display="inline">
        <ChoiceField
          label="Background"
          name="fill"
          display="radio"
          choices={[
            ['filled', 'Filled'],
            ['no_fill', 'No fill'],
          ]}
          default="filled"
        />
        <NumberField label="Border" name="borderThickness" display="slider" min={0} max={10} step={1} suffix="px" default={0} />
        <ColorField
          label="Fill color"
          name="fillColor"
          visibility={{
            controlling_field_path: 'groupStyle.counter.fill',
            controlling_value_regex: 'filled',
            operator: 'EQUAL',
            hidden_subfields: {
              opacity: true,
            },
          }}
          inlineHelpText={inlineHelpText}
          links={[themeLink]}
          inheritedValuePropertyValuePaths={{
            color: section3BackgroundColor,
          }}
          limitedOptions={limitedOptionsBackgroundColorsSet}
          default={{
            opacity: 100,
          }}
        />
        <ColorField
          label="Border color"
          name="borderColor"
          visibility={{
            controlling_field_path: 'groupStyle.counter.borderThickness',
            controlling_value_regex: '0',
            operator: 'NOT_EQUAL',
            hidden_subfields: {
              opacity: true,
            },
          }}
          inlineHelpText={inlineHelpText}
          links={[themeLink]}
          inheritedValuePropertyValuePaths={{
            color: section3BackgroundColor,
          }}
          limitedOptions={limitedOptionsAccentAndBackgroundColorsSet}
          default={{
            opacity: 100,
          }}
        />
        <ColorField
          label="Text color"
          name="textColor"
          visibility={{
            hidden_subfields: {
              opacity: true,
            },
          }}
          inheritedValuePropertyValuePaths={{
            color: section3AccentColor,
          }}
          inlineHelpText={inlineHelpText}
          links={[themeLink]}
          limitedOptions={limitedOptionsTextAndAccentColorsSet}
          default={{
            opacity: 100,
          }}
        />
      </FieldGroup>
      <FieldGroup label="Counter labels" name="counterLabels" display="inline">
        <ColorField
          label="Text color"
          name="textColor"
          visibility={{
            hidden_subfields: {
              opacity: true,
            },
          }}
          inlineHelpText={inlineHelpText}
          links={[themeLink]}
          limitedOptions={limitedOptionsTextColorsSet}
          inheritedValuePropertyValuePaths={{
            color: section1TextColor,
          }}
          default={{
            opacity: 100,
          }}
        />
      </FieldGroup>
    </FieldGroup>
    <FieldGroup label="Placeholder text" name="groupPlaceholderText" locked={true}>
      <TextField label="Days" name="days" default="Days" />
      <TextField label="Hours" name="hours" default="Hours" />
      <TextField label="Minutes" name="minutes" default="Minutes" />
      <TextField label="Seconds" name="seconds" default="Seconds" />
      <TextField label="Completed message" name="completedMessage" default="The countdown is complete" />
    </FieldGroup>
  </ModuleFields>
);
