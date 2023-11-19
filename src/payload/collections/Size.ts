import { CollectionConfig } from "payload/types";
import { isAdminFieldAccess } from "../access/isAdmin";

const Size: CollectionConfig = {
  slug: "size",
  access: {
    create: isAdminFieldAccess,
    read: () => true,
    update: isAdminFieldAccess,
    delete: isAdminFieldAccess,
  },
  admin: {
    useAsTitle: "Size",
  },
  fields: [
    {
      name: "Size",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
};

export default Size;
