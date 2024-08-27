import React, { useMemo } from "react";
import stc from "string-to-color";
import chroma from "chroma-js";
import { Avatar as MuiAvatar } from "@mui/material";

const Avatar: React.FC<{
  username: string;
  size: "large" | "small";
  isCount?: boolean;
}> = ({ username, size, isCount }) => {
  const initials = useMemo(() => getInitials(username), [username]);
  const color = useMemo(() => getColor(username), [username]);

  return (
    <MuiAvatar
      sx={{
        width: size === "large" ? 32 : 24,
        height: size === "large" ? 32 : 24,
        fontSize: size === "large" ? 14 : 10,
        ...(isCount
          ? { backgroundColor: "darkgrey" }
          : { backgroundColor: color }),
        color: "#FFFFFF", // Ensure the text color is white
      }}
    >
      {isCount ? username : initials}
    </MuiAvatar>
  );
};

export const getColor = (username: string) => {
  let color = stc(username);

  let chromaColor = chroma(color).hsl();
  let [hue, saturation, lightness] = chromaColor;

  saturation = Math.min(0.7, Math.max(0.3, saturation));
  lightness = Math.min(0.7, Math.max(0.4, lightness));

  color = chroma.hsl(hue, saturation, lightness).hex();

  const luminance = chroma(color).luminance();
  if (luminance > 0.6) {
    color = chroma(color).darken(1.5).hex();
  }

  return color;
};

export const getInitials = (username: string) => {
  const nameParts = username!.split(" ");
  if (nameParts.length > 1) {
    return nameParts[0].charAt(0).toUpperCase();
  } else {
    return nameParts[0].charAt(0).toUpperCase();
  }
};

export default Avatar;
