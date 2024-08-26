import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";

const UploadModel = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        How to Upload a 3D Model into Autodesk 360
      </Typography>

      <List>
        <ListItem>
          <ListItemText
            primary="1. Open Autodesk 360"
            secondary={
              <>
                Go to the following link:{" "}
                <Link
                  href={`https://acc.autodesk.com/docs/files/projects/c901e171-64a9-467c-807e-ada73f00e226?folderUrn=urn%3Aadsk.wipprod%3Afs.folder%3Aco.tOS3alZfSXaKtGO20lfeZQ&viewModel=detail&moduleId=folders`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Autodesk 360 Project Link
                </Link>{" "}
                and use the following credentials:
                <Typography variant="body2" component="div" sx={{ mt: 1 }}>
                  <strong>Email:</strong> mdlrrraa@maildrop.cc
                  <br />
                  <strong>Password:</strong> A12345678
                </Typography>
              </>
            }
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="2. Upload Your 3D Model"
            secondary="Upload a 3D model of any type to the platform. Wait until the process shows 'Complete'."
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="3. Synchronise and Find Your Model"
            secondary={
              "Return to the current page, find the model in the explorer, and click the 'Sync' button on the right side to add it."
            }
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default UploadModel;
