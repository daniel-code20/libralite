import { ListConfig } from "@keystone-6/core/types";
import { allowAll } from "@keystone-6/core/access";
import { text, integer, relationship, image, file } from "@keystone-6/core/fields";

export const BookConfigList: ListConfig<any> = {
  fields: {
    title: text({ validation: { isRequired: true } }),
    description: text({ validation: { isRequired: true } }),
    edition: integer({ validation: { isRequired: true }, defaultValue: 1 }),
    author: relationship({ ref: "Author.books", many: false }),
    gender: relationship({ ref: "Gender.books", many: false }),
    quantity: integer({ defaultValue: 0 }),
    price: integer({ defaultValue: 0 }),
    image: file({ storage: 'my_s3_files' }),
    compras: relationship({ ref: "Buy.libro", many: true }),
    publisher: relationship({ ref: "Publisher.books", many: false }), 
    reservations: relationship({ ref: "Reservation.book", many: true }),
  },
  access: allowAll,
};
