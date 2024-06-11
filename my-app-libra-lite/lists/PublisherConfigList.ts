import { ListConfig } from "@keystone-6/core";
import { text, relationship } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

export const PublisherConfigList: ListConfig<any> = {
  fields: {
    name: text({ validation: { isRequired: true } }),
    address: text(),
    contact: text(),
    books: relationship({ ref: "Book.publisher", many: true }), 
  },
  access: allowAll,
};
