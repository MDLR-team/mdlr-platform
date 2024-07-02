import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET, BIM_ACCOUNT_ID } from "@/pages/api/token";

const BASE_URL = "https://developer.api.autodesk.com";
const AUTH_URL = `${BASE_URL}/authentication/v1/authenticate`;

class Bim360Service {
  static token: any = null;

  // Get internal token
  static readonly getInternalToken = async () => {
    if (!this.token || this.token.expires_at < Date.now()) {
      const response = await axios.post(
        AUTH_URL,
        new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "client_credentials",
          scope: "data:read bucket:read bucket:create data:write data:create",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      this.token = response.data;
      this.token.expires_at = Date.now() + this.token.expires_in * 1000;
    }
    return this.token;
  };

  // List BIM 360 Hub projects
  static readonly getHubProjects = async (accountId: string) => {
    const credentials = await this.getInternalToken();
    const response = await axios.get(
      `${BASE_URL}/project/v1/hubs/${accountId}/projects`,
      {
        headers: {
          Authorization: `Bearer ${credentials.access_token}`,
        },
      }
    );
    return response.data.data;
  };

  // List BIM 360 top folders
  static readonly getTopFolders = async (project_id: string) => {
    const credentials = await this.getInternalToken();
    const response = await axios.get(
      `${BASE_URL}/project/v1/hubs/${BIM_ACCOUNT_ID}/projects/${project_id}/topFolders`,
      {
        headers: {
          Authorization: `Bearer ${credentials.access_token}`,
        },
      }
    );
    return response.data.data;
  };

  // List BIM 360 folders
  static readonly listFolderContent = async (
    project_id: string,
    folder_id: string
  ) => {
    const credentials = await this.getInternalToken();
    const response = await axios.get(
      `${BASE_URL}/data/v1/projects/${project_id}/folders/${folder_id}/contents`,
      {
        headers: {
          Authorization: `Bearer ${credentials.access_token}`,
        },
      }
    );
    return response.data.data;
  };

  // Get thumbnail
  static readonly getThumbnail = async (urn: string) => {
    const credentials = await this.getInternalToken();
    const response = await axios.get(
      `${BASE_URL}/modelderivative/v2/designdata/${urn}/thumbnail`,
      {
        headers: {
          Authorization: `Bearer ${credentials.access_token}`,
        },
        params: {
          width: 100,
          height: 100,
        },
        responseType: "arraybuffer",
      }
    );

    return response.data;
  };

  // List BIM 360 Model versions
  static readonly getModelVersions = async (href: string) => {
    const credentials = await this.getInternalToken();
    const response = await axios.get(href, {
      headers: {
        Authorization: `Bearer ${credentials.access_token}`,
      },
    });

    return response.data;
  };
}

export default Bim360Service;
