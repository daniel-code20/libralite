import { ListConfig } from "@keystone-6/core";
import { integer, relationship, text } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

export const ReviewConfigList: ListConfig<any> = {
  fields: {
    book: relationship({ ref: "Book.reviews" }),
    user: relationship({ ref: "User.reviews" }),
    rating: integer({ defaultValue: 0 }),
    comment: text(),
  },
  access: allowAll,
};
