import { ListConfig } from "@keystone-6/core";
import { text, relationship, image } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

export const CategoryConfigList: ListConfig<any> = {
  fields: {
    name: text(),
    books: relationship({ ref: "Book.category", many: true }),
    image: image({ storage: 'my_local_images' }),
  },
  access: allowAll,
};
