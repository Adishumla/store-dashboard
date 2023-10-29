import { CollectionConfig } from "payload/types";
import { isAdmin, isAdminFieldAccess } from "../access/isAdmin";
import {
  isAdminOrSelf,
  isAdminOrSelfFieldAccess,
} from "../access/isAdminOrSelf";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: "roles",
      type: "select",
      label: "Roles",
      required: true,
      saveToJWT: true,
      hasMany: true,
      access: {
        read: isAdminOrSelfFieldAccess,
        update: isAdminFieldAccess,
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
      defaultValue: ["user"],
    },
  ],
};

export default Users;
