import React, { useState } from "react";
import DashboardService from "./dashboard-service";
import { useAuth } from "../../app-services/auth/auth-provider";
import { useWorkspace } from "../../workspace-services/workspace/workspace-provider";
import { useRouter } from "next/router";

interface DashboardServiceProps {
  dashboardService: DashboardService;
}

const DashboardServiceContext =
  React.createContext<DashboardServiceProps | null>(null);

export function DashboardServiceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authService } = useAuth();
  const { workspaceService } = useWorkspace();

  const { query } = useRouter();
  const { id } = query;

  const [dashboardService] = useState(
    () => new DashboardService(authService, workspaceService, id as string)
  );

  return (
    <DashboardServiceContext.Provider value={{ dashboardService }}>
      {children}
    </DashboardServiceContext.Provider>
  );
}

export function useDashboard() {
  const context = React.useContext(DashboardServiceContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
