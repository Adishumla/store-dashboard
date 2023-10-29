import { Access, FieldAccess } from "payload/types";

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes("admin"));
};

export const isAdminFieldAccess: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes("admin"));
};
