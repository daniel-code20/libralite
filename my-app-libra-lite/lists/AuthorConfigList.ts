import { ListConfig } from "@keystone-6/core";
import { text, relationship } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

export const AuthorConfigList: ListConfig<any> = {
  fields: {
    name: text(),
    biography: text(),
    books: relationship({ ref: "Book.author", many: true }),
  },
  access: allowAll,
  
};
