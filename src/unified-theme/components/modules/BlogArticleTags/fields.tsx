import { ModuleFields, RepeatedFieldGroup, TextField } from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <RepeatedFieldGroup
      label="Tags"
      name="tags"
      occurrence={{
        min: 1,
        max: 5,
        default: 1,
      }}
      default={[{ tag: 'Tag One' }, { tag: 'Tag Two' }, { tag: 'Tag Three' }]}
    >
      <TextField label="Tag" name="tag" helpText="Enter a tag to display." />
    </RepeatedFieldGroup>
  </ModuleFields>
);
