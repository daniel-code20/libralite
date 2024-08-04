import { ListConfig } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { allowAll } from "@keystone-6/core/access";

export const SucursalConfigList: ListConfig<any> = {
  fields: {
    name: text({ validation: { isRequired: true } }),
    address: text({ validation: { isRequired: true } }),
    city: text({ validation: { isRequired: true } }),
    postal: text({ validation: { isRequired: true } }),
  },
  access: allowAll,
  
};
