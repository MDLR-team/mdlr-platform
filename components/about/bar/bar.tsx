import { Box, Button, Menu, MenuItem } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { TroubleshootSharp } from "@mui/icons-material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";

const Bar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper>
      <div className="left">
        <Link href="/">
          <Box
            sx={{
              fontFamily: "var(--primary-font-family)",
              fontWeight: "bold",
              fontSize: "24px !important",
            }}
          >
            MDLR
          </Box>
        </Link>

        <div
          className="pricing-tab"
          onClick={handleClick}
          onMouseOver={handleClick}
          aria-controls={open ? "use-cases-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          Use Cases <KeyboardArrowDownIcon />
        </div>
        <Menu
          id="use-cases-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            onMouseLeave: handleClose,
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={{
            sx: {
              maxWidth: "max-content !important",
              marginTop: "10px",
              border: "1px solid var(--border-color) !important",
            },
          }}
        >
          <Link href={"/use-cases/for-teams"}>
            <SectionItem onClick={handleClose}>
              For Teams <ArrowForwardIcon className="arrow-icon" />
            </SectionItem>
          </Link>

          <Link href={"/use-cases/for-startups"}>
            <SectionItem onClick={handleClose}>
              For Startups <ArrowForwardIcon className="arrow-icon" />
            </SectionItem>
          </Link>
        </Menu>
        <div className="pricing-tab">About</div>
      </div>

      <Box className="right">
        <a
          href="https://mr-vr.vercel.app/"
          style={{
            textDecoration: "none",
          }}
        >
          <div
            className="pricing-tab"
            style={{
              textDecoration: "none",
            }}
          >
            Sign In
          </div>
        </a>
        <Link href="/requestdemo">
          <Button
            sx={{
              padding: "25px 30px",
              borderRadius: "25px",
              display: "flex",
              gap: "10px",
            }}
            variant="contained"
            color="primary"
          >
            Request a demo{" "}
            <ArrowForwardIcon
              sx={{
                fontSize: "18px",
              }}
              className="arrow-icon"
            />
          </Button>
        </Link>
      </Box>
    </Wrapper>
  );
};

const SectionItem = styled(Box)`
  font-size: 20px !important;
  padding: 10px 20px;
  border-radius: 0px !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .MuiSvgIcon-root {
    margin-left: auto;
    font-size: 20px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  z-index: 1000;
  background-color: var(--background-color);
  height: 80px;
  padding: 0px 80px;
  align-items: center;
  justify-content: space-between;

  & {
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    margin-right: 20px;
    gap: 40px;

    &,
    & * {
      font-size: 18px;
    }
  }

  .left {
    & > div:first-child {
      font-size: 24px;
      font-weight: 700;
      //font-family: Born;
    }
  }

  .pricing-tab {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  @media (max-width: 800px) {
    & .right {
      display: none;
    }
  }

  @media (max-width: 576px) {
    & .pricing-tab,
    & .contact-tab {
      display: none;
    }
  }
`;

export default Bar;
