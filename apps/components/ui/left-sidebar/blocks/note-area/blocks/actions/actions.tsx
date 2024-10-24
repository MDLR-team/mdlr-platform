import { useState, useEffect, useRef } from "react";
import { Button, Box } from "@mui/material";
import { useActionArea } from "../actions-area/actions-area";
import { ActionType } from "../actions-area/actions-area.types";

const Actions = () => {
  const { actionType, handleAction } = useActionArea();

  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef<any>(null);

  const handleButtonClick = () => {
    setShowPanel(true); // Show panel on button click
  };

  const handleCommandClick = (command: ActionType) => {
    handleAction(command);
    setShowPanel(false); // Hide panel when a command is clicked
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
      setShowPanel(false); // Hide panel when clicking outside
    }
  };

  useEffect(() => {
    if (showPanel) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener when the component unmounts or showPanel changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPanel]);

  if (actionType) return null;

  return (
    <>
      {!showPanel ? (
        <Button
          sx={{
            boxShadow: "var(--shadow)",
            pointerEvents: "auto",
            border: "1px solid var(--gray-3)",
            fontWeight: "bold",
            padding: "8px 16px",
          }}
          size="large"
          onClick={handleButtonClick}
        >
          Actions
        </Button>
      ) : (
        <Box
          ref={panelRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            boxShadow: "var(--shadow)",
            border: "1px solid var(--gray-3)",
            padding: "16px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            pointerEvents: "all",
          }}
        >
          <Button
            sx={{
              marginBottom: "8px",
              display: "flex",
              justifyContent: "flex-start",
            }}
            onClick={() => handleCommandClick("attach-comment")}
          >
            Attach comment
          </Button>
          <Button
            sx={{
              marginBottom: "8px",
              display: "flex",
              justifyContent: "flex-start",
            }}
            onClick={() => handleCommandClick("add-summary")}
          >
            Add real-time summary
          </Button>
        </Box>
      )}
    </>
  );
};

export default Actions;
