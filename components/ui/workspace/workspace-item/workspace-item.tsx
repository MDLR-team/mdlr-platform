import {
  Box,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  AvatarGroup,
} from "@mui/material";
import styled from "styled-components";
import Link from "next/link";
import React, { useState } from "react";
import { Project } from "@/components/types/supabase-data.types";
import Avatar from "@/components/layout/avatar/avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useWorkspace } from "@/components/services/workspace-services/workspace/workspace-provider";

interface WorkspaceItemProps {
  data: Project;
  isDashboard?: boolean;
}

const CatalogItem: React.FC<WorkspaceItemProps> = ({ data, isDashboard }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleNavigate = (e: any) => {
    e.preventDefault(); // Prevent default link behavior

    if (isDashboard) {
      // Navigate without a full page reload
      window.location.href = `/dashboard/${data.id}`;
    } else {
      window.location.href = `/viewer/${data.bim_urn}`;
    } // Navigate with a full page reload
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleMenuClose();
    // Add your delete logic here
  };

  const handleMove = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleMenuClose();
    // Add your move logic here
  };

  const { workspaceUsers } = useWorkspace();

  return (
    <Wrapper onClick={handleNavigate}>
      <Paper
        sx={{
          padding: "0px",
          overflow: "hidden",
          border: "1px solid black !important",
        }}
      >
        <Thumb style={{ backgroundImage: `url(${data.thumbnail})` }}>
          <Box sx={{ position: "absolute", top: "4px", right: "8px" }}>
            <IconButton
              aria-controls="action-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
              }}
            >
              <MoreVertIcon
                sx={{
                  fontSize: "1rem !important",
                }}
              />
            </IconButton>
            <Menu
              id="action-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              onClose={handleMenuClose}
              onClick={(e) => e.stopPropagation()} // Prevents the menu from triggering the parent click event
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "120px",
                }}
              >
                <MenuItem onClick={handleMove}>Share</MenuItem>
                <MenuItem
                  sx={{
                    color: "var(--color-error-500) !important",
                  }}
                  onClick={handleDelete}
                >
                  Delete
                </MenuItem>
              </Box>
            </Menu>
          </Box>
        </Thumb>
      </Paper>

      <Box
        sx={{
          display: "flex",
          columnGap: "18px",
          justifyContent: "space-between",
          width: "100%",
          padding: "0px 18px 4px 18px",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            gap: "2px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            {data.title}
          </Box>
          <Box>Modified 12 hours ago</Box>
        </Box>

        <AvatarGroup max={100}>
          {workspaceUsers
            .filter((_, i) => i <= 2)
            .map((userproject, i) => (
              <Avatar
                key={i}
                username={userproject?.username || ""}
                size={"small"}
              />
            ))}

          {workspaceUsers.length > 3 && (
            <Avatar
              username={`+${workspaceUsers.length - 3}`}
              size={"small"}
              isCount
            />
          )}
        </AvatarGroup>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 9px;
  position: relative;
  height: max-content;

  cursor: pointer;

  border: 1px solid transparent;
  border-radius: 8px;

  &:hover {
    & {
      background-color: #e4e2df;
      border: 1px solid #999999;
    }
  }

  & [data-type="users"] {
    & > * {
      margin-left: -8px;
    }
  }
`;

const Thumb = styled.div`
  width: 100%;
  padding-bottom: 50%;
  background: white;
  position: relative;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export default CatalogItem;
