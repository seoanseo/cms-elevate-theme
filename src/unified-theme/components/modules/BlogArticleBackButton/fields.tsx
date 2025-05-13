import { ModuleFields, TextField, LinkField } from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <TextField label="Back Button Text" name="text" default="Back to Blog" />
    <LinkField label="Back Link URL" name="url" default={{}} />
  </ModuleFields>
);
