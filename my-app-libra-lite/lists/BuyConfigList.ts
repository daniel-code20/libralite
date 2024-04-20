import { ListConfig } from "@keystone-6/core";
import { integer, relationship, timestamp } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

export const BuyConfigList: ListConfig<any> = {
  fields: {
    book: relationship({ ref: "Book" }),
    user: relationship({ ref: "User" }),
    quantity: integer(),
    price: integer(),
    purchaseDate: timestamp({ defaultValue: { kind: "now" } }),
  },
  access: allowAll,
};
