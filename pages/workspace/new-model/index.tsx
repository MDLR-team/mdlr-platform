import WorkspaceGrid from "@/components/ui/workspace/workspace-grid";
import { WorkspaceProvider } from "@/components/services/workspace-services/workspace/workspace-provider";
import NewModel from "@/components/ui/workspace/new-model/new-model";

const WorkspacePage = () => {
  return (
    <WorkspaceProvider>
      <WorkspaceGrid>
        <NewModel />
      </WorkspaceGrid>
    </WorkspaceProvider>
  );
};

export default WorkspacePage;
