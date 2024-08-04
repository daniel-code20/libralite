import { ListConfig } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  text,
  password,
  timestamp,
  select,
  relationship
} from "@keystone-6/core/fields";

export const UserConfigList: ListConfig<any> = {
  fields: {
    name: text({ validation: { isRequired: true } }),

    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),

    password: password({ validation: { isRequired: true } }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),

    role: select({
      options: [
        {label: "Cliente", value: "CLIENT" },
        {label: "Administrador", value: "ADMIN" },
      ],
      defaultValue: "CLIENT",
      ui: {
        displayMode: "segmented-control",
      },
    }),

    compras: relationship({ ref: "Buy.cliente", many: true }),
    reservations: relationship({ ref: "Reservation.user", many: true }),
  },
  access: allowAll,
};
