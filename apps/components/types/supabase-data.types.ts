export interface Project {
  id: number;
  title: string;
  created_at: string;
  bim_id: number;
  bim_client_id: string;
  bim_urn: string;
  thumbnail: string;
}

export interface Workspace {
  id: number;
  name: string;
  created_at: string;
}
