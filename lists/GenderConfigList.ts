import { ListConfig } from "@keystone-6/core";
import { text, relationship, image } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

export const GenderConfigList: ListConfig<any> = {
  fields: {
    name: text(),
    books: relationship({ ref: "Book.gender", many: true }),
    image: image({ storage: 'my_s3_files' }),
  },
  access: allowAll,
};
