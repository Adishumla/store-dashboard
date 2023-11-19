import { CollectionConfig } from "payload/types";
import { isAdminFieldAccess } from "../access/isAdmin";

const Fabrics: CollectionConfig = {
  slug: "fabrics",
  access: {
    create: isAdminFieldAccess,
    read: () => true,
    update: isAdminFieldAccess,
    delete: isAdminFieldAccess,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
};

export default Fabrics;
