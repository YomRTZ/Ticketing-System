import { getRole } from "../services/RoleService";
export const getRoleNameById = async (id) => {
  try {
    return await getRole(id);
  } catch (error) {
    throw error;
  }
};