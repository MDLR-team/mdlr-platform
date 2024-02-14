import styled from "styled-components";
import LeftPanel from "../left-panel/left-panel";

interface ProjectsLayoutProps {
  children?: React.ReactNode;
}

const ProjectsLayout: React.FC<ProjectsLayoutProps> = ({ children }) => {
  return (
    <Wrapper>
      <LeftPanel />

      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;

  display: flex;
  overflow: hidden;
`;

export default ProjectsLayout;
