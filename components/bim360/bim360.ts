import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET, BIM_ACCOUNT_ID } from "@/pages/api/token";

const AUTH_URL =
  "https://developer.api.autodesk.com/authentication/v1/authenticate";
const HUB_URL = "https://developer.api.autodesk.com/project/v1/hubs";
const FOLDER_URL = "https://developer.api.autodesk.com/data/v1/projects";
const DERIVATIVE_URL =
  "https://developer.api.autodesk.com/modelderivative/v2/designdata";

class Bim360Service {
  static accessToken = null;

  // Get internal token
  static async getInternalToken() {
    if (!this.accessToken) {
      const response = await axios.post(AUTH_URL, {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
        scope: "data:read data:write bucket:read bucket:create",
      });

      this.accessToken = response.data.access_token;
    }
    return this.accessToken;
  }

  // List BIM 360 Hub projects
  static async getHubProjects(accountId: string) {
    const token = await this.getInternalToken();
    try {
      const response = await axios.get(`${HUB_URL}/${accountId}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error listing BIM 360 projects", error);
      throw error;
    }
  }

  // List BIM 360 top folders
  static async getTopFolders(projectId: string) {
    const token = await this.getInternalToken();
    try {
      const response = await axios.get(
        `${FOLDER_URL}/b.${BIM_ACCOUNT_ID}/projects/${projectId}/topFolders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error listing BIM 360 top folders", error);
      throw error;
    }
  }

  // List BIM 360 folders
  static async listFolderContent(projectId: string, folderId: string) {
    const token = await this.getInternalToken();
    try {
      const response = await axios.get(
        `${FOLDER_URL}/b.${projectId}/folders/${folderId}/contents`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error listing folder contents", error);
      throw error;
    }
  }

  // Get thumbnail
  static async getThumbnail(urn: string) {
    const token = await this.getInternalToken();
    try {
      const response = await axios.get(
        `${DERIVATIVE_URL}/${urn}/thumbnail?width=100&height=100`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "arraybuffer",
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching thumbnail", error);
      throw error;
    }
  }

  // List BIM 360 Model versions
  static async getModelVersions(href: string) {
    const token = await this.getInternalToken();
    try {
      const response = await axios.get(href, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching item versions", error);
      throw error;
    }
  }
}

export default Bim360Service;
