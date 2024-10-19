import { Edge, Node, Position } from "reactflow";
import { BehaviorSubject } from "rxjs";
import { v4 as uuidv4 } from "uuid";

class NodeService {
  private _nodes: Node[] = [];
  private _edges: Edge[] = [];

  private _nodesMap: Map<string, Node> = new Map();

  private $setNodes: any;
  private $setEdges: any;

  private _presentationNodes$ = new BehaviorSubject<Node[]>([]);

  constructor() {
    this._nodes = [];
    this._edges = [];

    this.$setNodes = () => [];
    this.$setEdges = () => [];
  }

  public provideStates({
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
  }: any) {
    this.$setNodes = setNodes;
    this.$setEdges = setEdges;

    this._nodes = nodes;
    this._edges = edges;

    this._nodesMap = new Map(nodes.map((node: Node) => [node.id, node]));

    const presentationNodes = nodes.filter(
      (node: Node) => node.type === "presentation"
    );
    this._presentationNodes$.next(presentationNodes);
  }

  public addNode(node: Partial<Node>): Node {
    const _node = { ...node };
    _node.data = node.data || {};

    const id = uuidv4();

    const newNode: Node = {
      ..._node,
      id,
      position: _node.position || { x: 0, y: 0 },
      data: {
        ..._node.data,
        id,
      },
    };

    this.$setNodes((nds: Node[]) => nds.concat(newNode));

    return newNode;
  }

  public getNode(id: string): Node | undefined {
    return this._nodesMap.get(id);
  }

  public addEdge(edge: Partial<Edge>): Edge {
    const _edge: Edge = {
      ...edge,
      id: uuidv4(),
      source: edge.source || "",
      target: edge.target || "",
      sourceHandle: edge.sourceHandle || null,
      targetHandle: edge.targetHandle || null,
    };

    this.$setEdges((eds: Edge[]) => eds.concat(_edge));

    return _edge;
  }

  public get nodes(): Node[] {
    return this._nodes;
  }

  public getChartNodes() {
    const thumbnailNode = this._nodes.find((node) => node.type === "thumbnail");
    const chartNodes = this._nodes.filter((node) => {
      const isChart = [
        "table",
        "pieChart",
        "sankeyChart",
        "lineChart",
      ].includes(node.type!);

      return isChart;
    });

    if (thumbnailNode) {
      return [thumbnailNode, ...chartNodes];
    }

    return chartNodes;
  }

  public get presentationNodes$() {
    return this._presentationNodes$.asObservable();
  }

  public addUserdataToNode(id: string, data: any) {
    const node = this.getNode(id);

    if (node) {
      node.data = {
        ...node.data,
        userData: data,
      };

      this.$setNodes((nds: Node[]) =>
        nds.map((n: Node) => (n.id === id ? node : n))
      );
    }
  }

  /**
   * Get the previous node in the flow
   *
   * @param id
   * @returns
   */
  public getPreviousNode(id: string): Node | undefined {
    const edge = this._edges.find((edge) => edge.target === id);

    if (edge) {
      return this.getNode(edge.source);
    }

    return undefined;
  }

  public dispose() {
    this._nodes = [];
    this._edges = [];
    this._nodesMap = new Map();

    this._presentationNodes$.complete();
  }
}

export default NodeService;
