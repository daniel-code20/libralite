import { ListConfig } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

export const PublisherConfigList: ListConfig<any> = {
  fields: {
    name: text(),
    address: text(),
    contact: text(),
  },
  access: allowAll,
};
