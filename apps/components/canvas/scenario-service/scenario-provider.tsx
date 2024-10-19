import { createContext, useLayoutEffect, useState } from "react";
import { useNodes } from "../node-service/node-provider";
import ScenarioService from "./scenario-service";

const ScenarioContext = createContext<any | undefined>(undefined);

export function useScenario() {
  const { nodeService } = useNodes();

  const [scenarioService] = useState(() => new ScenarioService(nodeService));

  useLayoutEffect(() => {
    const toolPanel = document.querySelector("[data-type=tool-panel]");

    const panel = document.createElement("div");
    panel.style.position = "absolute";
    panel.style.left = "50%";
    panel.style.transform = "translateX(-50%) translateY(-120%)";
    panel.style.display = "flex";
    // Create and customize your panel here

    const button1 = document.createElement("button");
    button1.textContent = "Play";
    button1.onclick = () => scenarioService.play();
    panel.appendChild(button1);

    const button2 = document.createElement("button");
    button2.textContent = "Button 2";
    panel.appendChild(button2);

    const button3 = document.createElement("button");
    button3.textContent = "Button 3";
    panel.appendChild(button3);

    toolPanel?.prepend(panel);

    return () => {
      toolPanel?.removeChild(panel);
    };
  }, []);
}

export default ScenarioContext;
