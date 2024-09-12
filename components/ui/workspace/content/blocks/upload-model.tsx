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
                  href={`https://acc.autodesk.eu/build/files/projects/b3ea54e3-2df4-4360-80ba-80e11c7b9926?folderUrn=urn%3Aadsk.wipemea%3Afs.folder%3Aco.n0qEa_lVQCO5YH-UHpLcRw&viewModel=detail&moduleId=folders`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Autodesk 360 Project Link
                </Link>{" "}
                and use the following credentials:
                <Typography variant="body2" component="div" sx={{ mt: 1 }}>
                  <strong>Email:</strong> mdlrrraabb@maildrop.cc
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
