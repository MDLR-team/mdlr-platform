import PlusIcon from "@/components/ui/icons/plus-icon";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
} from "@mui/material";
import { useNodeModel } from "../../node-thumb-type";
import { useRef, useState } from "react";

const UploadApi = () => {
  const { modelService } = useNodeModel();

  const [value, setValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box
      sx={{
        border: "1px solid white",
        height: "100%",
        borderRadius: "9px",
        display: "flex",
        alignItems: "center",
        padding: "18px",
        backgroundColor: "rgba(0, 0, 0, 0.04)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "0px",
          borderRadius: "9px",
        }}
      >
        <FormControl sx={{ minWidth: "100%" }}>
          <Box sx={{ display: "flex", gap: "9px" }}>
            <Input
              fullWidth
              placeholder="Paste Endpoint here"
              maxRows={1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              ref={inputRef}
              size="small"
              data-role="inputEndpoint"
              sx={{
                border: "1px solid grey",
                borderRadius: "9px",
                height: "27px",
                fontSize: "12px",
                padding: "0 10px",
                backgroundColor: "white",
              }}
            />
            <IconButton
              sx={{ backgroundColor: "#FAE57E" }}
              type="submit"
              data-type="exception"
              data-add="comment"
              data-role="addApiEndpointButton"
              onClick={() => {
                const domElement = inputRef.current;
                const input = domElement?.querySelector("input[type='text']");
                const inputValue = (input as any).value;

                modelService.uploadApi({
                  endpoint: value?.length > 0 ? value : inputValue,
                });

                setValue("");
              }}
            >
              <PlusIcon />
            </IconButton>
          </Box>

          <Box>
            <FormControlLabel
              required
              checked
              control={<Checkbox size="small" />}
              label="Use AI Parsing"
            />
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};

export default UploadApi;
