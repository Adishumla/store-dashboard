import { Access, FieldAccess } from "payload/types";

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes("admin") || user?.id === user?.id);
};

export const isAdminOrSelfFieldAccess: FieldAccess = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes("admin") || user?.id === user?.id);
};
