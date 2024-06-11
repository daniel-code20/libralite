import { ListConfig } from '@keystone-6/core';
import {
  integer,
  relationship,
  timestamp,
  select,
  text,
} from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

export const BuyConfigList: ListConfig<any> = {
  fields: {
    cliente: relationship({
      ref: 'User.compras',
      many: false,
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        inlineCreate: { fields: ['name', 'email'] },
        inlineEdit: { fields: ['name', 'email'] },
      },
    }),
    libro: relationship({
      ref: 'Book.compras',
      many: false,
      ui: {
        displayMode: 'cards',
        cardFields: ['title', 'author'],
        inlineCreate: { fields: ['title', 'author'] },
        inlineEdit: { fields: ['title', 'author'] },
      },
    }),
    fechaCompra: timestamp({
      defaultValue: { kind: 'now' },
      validation: { isRequired: true },
    }),
    cantidad: integer({
      defaultValue: 1,
      validation: { isRequired: true, min: 1 },
    }),
    estadoEnvio: select({
      options: [
        { label: 'Pendiente', value: 'PENDIENTE' },
        { label: 'En Proceso', value: 'EN_PROCESO' },
        { label: 'Enviado', value: 'ENVIADO' },
        { label: 'Entregado', value: 'ENTREGADO' },
      ],
      defaultValue: 'PENDIENTE',
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    direccionEnvio: text({
      validation: { isRequired: true },
    }),
    codigoPostal: text({
      validation: { isRequired: true },
    }),
    ciudad: text({
      validation: { isRequired: true },
    }),
    telefono: text({
      validation: { isRequired: true },
    }),
  },
  access: allowAll,
};
