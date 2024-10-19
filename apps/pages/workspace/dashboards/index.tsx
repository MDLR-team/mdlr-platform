import WorkspaceGrid from "@/components/ui/workspace/workspace-grid";
import { WorkspaceProvider } from "@/components/services/workspace-services/workspace/workspace-provider";
import Content from "@/components/ui/workspace/dashboard-content/dashboard-content";

const WorkspacePage = () => {
  return (
    <WorkspaceProvider>
      <WorkspaceGrid>
        <Content />
      </WorkspaceGrid>
    </WorkspaceProvider>
  );
};

export default WorkspacePage;
