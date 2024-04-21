import { Edge, Node, Position } from "reactflow";
import { v4 as uuidv4 } from "uuid";

class NodeService {
  private nodes: Node[] = [];
  private edges: Edge[] = [];

  private $setNodes: any;
  private $setEdges: any;
  constructor() {
    this.nodes = [];
    this.edges = [];

    this.$setNodes = () => [];
    this.$setEdges = () => [];
  }

  public provideStates({
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
  }: any) {
    this.$setNodes = setNodes;
    this.$setEdges = setEdges;
  }

  public addModel() {
    this.$setNodes((prevNodes: Node[]) => {
      let offsetX = 0;
      prevNodes.forEach((node: Node) => {
        if (node.position.x > offsetX) {
          offsetX = node.position.x;
        }
      });

      const node: Node = {
        id: uuidv4(),
        type: "thumbnail",
        data: { label: "Node" },
        position: { x: offsetX + 200, y: 50 },
      };

      return [...prevNodes, node];
    });
  }

  public addApiModel() {
    let edge: Edge | null = null;

    this.$setNodes((prevNodes: Node[]) => {
      let id = 0;
      let previousOne = false;

      let offsetX = 0;
      prevNodes.forEach((node: Node) => {
        if (node.position.x > offsetX) {
          offsetX = node.position.x;
        }

        if (node.type === "apiThumbnail") {
          const nodeId = parseInt(node.id);
          if (nodeId > id) {
            id = nodeId;
          }

          previousOne = true;
        }
      });

      const node: Node = {
        id: (id + 1).toString(),
        type: "apiThumbnail",
        data: { label: "Node" },
        position: { x: offsetX + 200, y: 50 },
      };

      if (previousOne) {
        const _edge: Edge = {
          id: uuidv4(),
          source: id.toString(),
          target: (id + 1).toString(),
        };

        edge = _edge;
      }

      /* this.$setEdges((prevEdges: Edge[]) => {
        if (prevEdges.length > 0) {
          return [
            ...prevEdges,
            {
              id: uuidv4(),
              source: id.toString(),
              target: (id + 1).toString(),
            },
          ];
        }

        return prevEdges;
      }); */

      return [...prevNodes, node];
    });

    if (edge) {
      this.$setEdges((prevEdges: Edge[]) => {
        return [...prevEdges, edge];
      });
    }
  }
}

export default NodeService;
