import Avatar from "@/components/layout/avatar/avatar";
import { AvatarGroup, Box, Button } from "@mui/material";
import ShareIcon from "@/components/ui/icons/share-icon";

const Share = () => {
  return (
    <>
      <Box sx={{ display: "flex", columnGap: "9px" }}>
        <AvatarGroup max={100}>
          {[
            { username: "John Doe" },
            { username: "Jane Smith" },
            { username: "Emily Johnson" },
            { username: "Michael Brown" },
            { username: "Sarah Davis" },
          ].map((projectUser, i) => (
            <Avatar key={i} username={projectUser.username} size="large" />
          ))}
        </AvatarGroup>

        <Button
          sx={{ minWidth: "97px" }}
          color="primary"
          variant="contained"
          startIcon={<ShareIcon />}
          onClick={() => {}}
        >
          Share
        </Button>
      </Box>
    </>
  );
};

export default Share;
