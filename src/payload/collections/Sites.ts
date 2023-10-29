// src/collections/Sites.ts
import { CollectionConfig } from "payload/types";
import { isAdminFieldAccess } from "../access/isAdmin";

const Sites: CollectionConfig = {
  slug: "sites",
  access: {
    read: () => true,
    create: isAdminFieldAccess,
    update: isAdminFieldAccess,
    delete: isAdminFieldAccess,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "page",
          type: "text",
          required: true,
        },
        {
          name: "roles",
          type: "select",
          hasMany: true,
          options: [
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
            { label: "Public", value: "public" },
          ],
          required: true,
        },
      ],
      access: {
        read: () => true,
        update: isAdminFieldAccess,
      },
    },
  ],
};

export default Sites;
