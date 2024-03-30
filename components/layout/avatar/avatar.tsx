import React, { useMemo } from "react";
import stc from "string-to-color";
import styled from "styled-components";

const Avatar: React.FC<{
  username: string;
  size: "large" | "small";
}> = ({ username, size }) => {
  const initials = useMemo(() => {
    const nameParts = username!.split(" ");
    if (nameParts.length > 1) {
      return (
        nameParts[0].charAt(0).toUpperCase() +
        nameParts[1].charAt(0).toUpperCase()
      );
    } else {
      return nameParts[0].charAt(0).toUpperCase();
    }
  }, [username]);

  return <AvatarWrapper color={stc(username)}>{initials}</AvatarWrapper>;
};

const AvatarWrapper = styled.div<{
  color: string;
}>`
  min-width: 36px;
  min-height: 36px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(props) => props.color};

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 400;
  font-size: 12px;

  border: 1px solid #333333;

  cursor: pointer;

  & * {
    pointer-events: none;
  }
`;

export default Avatar;
