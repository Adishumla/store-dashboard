import { CollectionConfig } from "payload/types";
import { isAdminFieldAccess } from "../access/isAdmin";

const Colors: CollectionConfig = {
  slug: "colors",
  access: {
    create: isAdminFieldAccess,
    read: () => true,
    update: isAdminFieldAccess,
    delete: isAdminFieldAccess,
  },
  admin: {
    useAsTitle: "Color",
  },
  fields: [
    {
      name: "Color",
      type: "text",
      required: true,
    },
    {
      name: "hex",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
};

export default Colors;
