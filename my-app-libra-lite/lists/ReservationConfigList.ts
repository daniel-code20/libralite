import { ListConfig } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { timestamp, relationship, select } from "@keystone-6/core/fields";

export const ReservationConfigList: ListConfig<any> = {
  fields: {
    book: relationship({ ref: "Book" }),
    user: relationship({ ref: "User" }),
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
  },
  access: allowAll,
};
