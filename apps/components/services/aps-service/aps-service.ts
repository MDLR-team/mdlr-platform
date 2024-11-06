import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import ProjectService from "../project-services/project-service/project-service";
import axios from "axios";
import { ForgeTokenResponse } from "@/components/viewer-entity/forge-viewer/viewer-aggr";

class ApsService {
  constructor(private projectService: ProjectService) {}

  private async _loadRestApi() {
    const urn =
      "dXJuOmFkc2sud2lwZW1lYTpmcy5maWxlOnZmLnVGSm9yNExQU2NlbWNqa3ZSbG1zS1E_dmVyc2lvbj0x";

    // Get access token
    const response = await axios.get<ForgeTokenResponse>("/api/token");

    // Get metadata
    const metadataResponse = await axios.get(
      `https://developer.api.autodesk.com/modelderivative/v2/regions/eu/designdata/${urn}/metadata`,
      {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
        },
      }
    );
    const guid = metadataResponse.data.data.metadata[0].guid;

    // Query properties
    const queryPayload = {
      query: {
        $prefix: ["name", ""],
      },
      pagination: {
        offset: 0,
        limit: 100,
      },
      payload: "text",
    };

    const limit = 10;

    const queryResponse = await axios.post(
      `https://developer.api.autodesk.com/modelderivative/v2/regions/eu/designdata/${urn}/metadata/${guid}/properties:query`,
      queryPayload,
      {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Get properties
    console.log("queryResponse", queryResponse.data);
  }

  private async _loadProperties() {
    const response = await axios.get<ForgeTokenResponse>("/api/token");

    const GET_ELEMENT_PROPERTIES = gql`
      query GetElementProperties($urn: String!, $dbId: Int!) {
        viewer {
          models(urns: [$urn]) {
            objects(ids: [$dbId]) {
              properties {
                name
                value
              }
            }
          }
        }
      }
    `;

    const GET_HUBS = gql`
      query GetHubs {
        hubs {
          pagination {
            cursor
          }
          results {
            name
            id
          }
        }
      }
    `;

    console.log("response", response);

    // Initialize Apollo Client
    const client = new ApolloClient({
      uri: "https://developer.api.autodesk.com/graphql",
      cache: new InMemoryCache(),
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
      },
    });

    const { data } = await client.query({
      query: GET_HUBS,
      /* variables: {
        urn: "dXJuOmFkc2sud2lwZW1lYTpmcy5maWxlOnZmLnVGSm9yNExQU2NlbWNqa3ZSbG1zS1E_dmVyc2lvbj0x",
        dbId: 4,
      }, */
    });
  }

  public dispose() {}
}

export default ApsService;
