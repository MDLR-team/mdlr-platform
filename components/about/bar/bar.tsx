import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { TroubleshootSharp } from "@mui/icons-material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Bar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Wrapper
      sx={{
        padding: { xs: "0px 20px", sm: "0px 80px" },
      }}
    >
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

        {/* Desktop Menu */}
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
              For AEC Professionals <ArrowForwardIcon className="arrow-icon" />
            </SectionItem>
          </Link>

          <Link href={"/use-cases/for-startups"}>
            <SectionItem onClick={handleClose}>
              For Platform Developers{" "}
              <ArrowForwardIcon className="arrow-icon" />
            </SectionItem>
          </Link>
        </Menu>

        <Link href="/pricing">
          <Box className="pricing-tab">Pricing</Box>
        </Link>

        <Link href="/enterprise">
          <Box className="pricing-tab">Enterprise</Box>
        </Link>
      </div>

      <Box className="right">
        <a
          href="https://beta.mdlr.app/login"
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

      {/* Mobile Menu Button */}
      <IconButton className="burger-menu" onClick={toggleMobileMenu}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      {/* Mobile Menu Accordion */}
      {menuOpen && (
        <MobileMenu>
          <Accordion
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "0px",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <SectionItemMobile
                sx={{
                  padding: "0px !important",
                }}
              >
                Use Cases
              </SectionItemMobile>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: "24px !important",
              }}
            >
              <Link href={"/use-cases/for-teams"}>
                <SectionItemMobile onClick={toggleMobileMenu}>
                  For AEC Professionals
                </SectionItemMobile>
              </Link>
              <Link href={"/use-cases/for-startups"}>
                <SectionItemMobile onClick={toggleMobileMenu}>
                  For Platform Developers
                </SectionItemMobile>
              </Link>
            </AccordionDetails>
          </Accordion>

          <Link href="/pricing">
            <SectionItemMobile onClick={toggleMobileMenu}>
              Pricing
            </SectionItemMobile>
          </Link>

          <Link href="/pricing">
            <SectionItemMobile onClick={toggleMobileMenu}>
              Enterprise
            </SectionItemMobile>
          </Link>

          <Link href="/requestdemo">
            <Button
              sx={{
                padding: "25px 30px",
                borderRadius: "25px",
                display: "flex",
                gap: "10px",
                marginTop: "36px",
                marginLeft: "20px",
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
        </MobileMenu>
      )}
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

const Wrapper = styled(Box)`
  width: 100%;
  display: flex;
  position: relative;
  z-index: 1000;
  background-color: var(--background-color);
  height: 80px;
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

  @media (min-width: 576px) {
    & .burger-menu {
      display: none;
    }
  }
`;

const SectionItemMobile = styled(Box)`
  padding: 10px 20px;
  border-radius: 0px;
  cursor: pointer;

  &,
  & * {
    font-size: 18px;
  }
`;

const MobileMenu = styled(Box)`
  position: fixed;
  top: 80px;
  width: 100%;
  background-color: var(--background-color);
  z-index: 1500;

  height: 100vh;
  left: 0;

  & .MuiPaper-root {
    border: 0px !important;
    gap: 0px !important;
  }

  & .MuiAccordionSummary-content {
    margin: 0px !important;
  }

  & .MuiAccordionSummary-root {
    min-height: 0px !important;
    padding: 0px 10px !important;
  }

  & .MuiAccordionDetails {
    padding: 8px 16px 16px;
  }
`;

export default Bar;
