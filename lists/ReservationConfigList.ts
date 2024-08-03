import { ListConfig } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { timestamp, relationship, select, integer } from "@keystone-6/core/fields";

export const ReservationConfigList: ListConfig<any> = {
  fields: {
    book: relationship({ ref: "Book.reservations" }),
    user: relationship({ ref: "User.reservations" }),
    status: select({
      options: [
        { label: "Pendiente", value: "PENDING" },
        { label: "Confirmada", value: "CONFIRMED" },
        { label: "Cancelada", value: "CANCELLED" },
      ],
      defaultValue: "PENDING",
      ui: {
        displayMode: "segmented-control",
      },
    }),
    reservationDate: timestamp({ defaultValue: { kind: "now" } }),
    sucursal: relationship({ ref: "Sucursal", many: false }),
    cantidad: integer({
      defaultValue: 1,
      validation: { isRequired: true, min: 1 },
    }),
  },
  access: allowAll,
};
