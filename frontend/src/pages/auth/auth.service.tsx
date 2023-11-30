import { IMetadataField } from '@/utils/metadata';

export const signinFields: IMetadataField<any>[] = [
  {
    accessorKey: 'email',
    label: 'Email',
    type: {
      value: 'STRING',
      required: true
    }
  },
  {
    accessorKey: 'password',
    label: 'Password',
    type: {
      value: 'STRING',
      required: true
    }
  }
];
