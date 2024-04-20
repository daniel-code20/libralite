import { ListConfig } from "@keystone-6/core/types";
import { allowAll } from "@keystone-6/core/access";
import { text, integer, relationship, image } from "@keystone-6/core/fields";

export const BookConfigList: ListConfig<any> = {
  fields: {
    title: text({ validation: { isRequired: true } }),
    edition: integer({ validation: { isRequired: true }, defaultValue: 1 }),
    author: relationship({ ref: "Author.books", many: false }),
    quantity: integer({ defaultValue: 0 }),
    price: integer({ defaultValue: 0 }),
    image: image({ storage: 'my_local_images' }),
  },
  access: allowAll,
};
