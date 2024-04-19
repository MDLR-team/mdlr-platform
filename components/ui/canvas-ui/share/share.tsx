import Avatar from "@/components/layout/avatar/avatar";
import { Box, Button } from "@mui/material";
import ShareIcon from "../../icons/share-icon";

const Share = () => {
  const projectUsers = [
    { username: "user1" },
    { username: "user2" },
    { username: "user3" },
  ];

  return (
    <Box sx={{ display: "flex", columnGap: "9px" }}>
      <Box sx={{ display: "flex" }}>
        {projectUsers.map((projectUser, i) => (
          <Box key={i} sx={{ marginLeft: "-6px" }}>
            <Avatar username={projectUser.username} size="large" />
          </Box>
        ))}
      </Box>

      <Button
        sx={{ minWidth: "97px" }}
        color="primary"
        variant="contained"
        startIcon={<ShareIcon />}
      >
        Share
      </Button>
    </Box>
  );
};

export default Share;
