import NodeService from "../node-service/node-service";

interface ExecuteOptions {
  timeout: number;
}

class ScenarioService {
  constructor(private _nodeService: NodeService) {}

  public async play() {
    const nodeService = this._nodeService;

    const thumbnailNode = nodeService.addNode({
      position: { x: 0, y: 0 },
      type: "thumbnail",
    });

    const thumbDom = await this._execute(
      () => this._getThumbnail(thumbnailNode.id),
      { timeout: 500 }
    );

    const apiTab = await this._execute(
      () => this._getApiTab(thumbDom as HTMLElement),
      { timeout: 500 }
    );

    (apiTab as any).click();

    const inputEndpoint = await this._execute(
      () => this._getInputEndpoint(thumbDom as HTMLElement),
      { timeout: 500 }
    );

    (inputEndpoint as any).focus();
    (inputEndpoint as any).click();

    console.log("inputEndpoint", inputEndpoint);

    await this._simulateTyping(
      inputEndpoint as HTMLInputElement,
      "http://localhost:3000/api",
      50
    );

    const buttonEndpoint = await this._execute(
      () => this._getButtonEndpoint(thumbDom as HTMLElement),
      { timeout: 500 }
    );
    (buttonEndpoint as any).click();
  }

  private _getThumbnail(thumbnailNodeId: string) {
    const thumbnailDom = document.getElementById(`box${thumbnailNodeId}`);
    return thumbnailDom;
  }

  private _getApiTab(parent: HTMLElement): Element | null {
    const apiTab = parent.querySelector("[data-role=apiTab]");
    return apiTab;
  }

  private _getInputEndpoint(parent: HTMLElement): Element | null {
    const inputEndpoint = parent.querySelector("[data-role=inputEndpoint]");

    const input = inputEndpoint?.querySelector("input[type='text']");

    return input!;
  }

  private _getButtonEndpoint(parent: HTMLElement): Element | null {
    const buttonEndpoint = parent.querySelector(
      "[data-role=addApiEndpointButton]"
    );
    return buttonEndpoint;
  }

  private _simulateTyping(
    element: HTMLInputElement,
    text: string,
    speed: number
  ): Promise<void> {
    return new Promise((resolve) => {
      let index = 0;

      const interval = setInterval(() => {
        if (index < text.length) {
          element.value += text[index];
          index++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, speed); // Adjust the typing speed by changing the interval duration
    });
  }

  private _execute(
    callback: () => HTMLElement | Element | null,
    options: ExecuteOptions
  ): Promise<HTMLElement | Element | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const element = callback();
        if (element) {
          resolve(element);
        } else {
          reject(new Error("Element not found"));
        }
      }, options.timeout);
    });
  }
}

export default ScenarioService;
