export interface PermissionEntity {
  key: string;
  category: string;
  label: string;
  description: string | null;
}

export type PermissionValue = "all" | "own" | "none";
export type GrantedPermissionValue = Exclude<PermissionValue, "none">;
