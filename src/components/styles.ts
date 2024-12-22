import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../styles/colors";

const HeaderLinkStyles = styled(Link)<{
  selected: boolean;
  mobile: boolean;
}>`
  font-size: 20px;

  color: ${({ selected }) => (selected ? colors.primaryColor : colors.black)};
  text-decoration: none;
  transition: 0.5s ease-in-out;
  &:hover {
    color: ${colors.primaryColor};
  }

  margin-top: ${({ mobile }) => (mobile ? "30px" : "0")};

  display: flex;
  align-items: ${({ mobile }) => (mobile ? "flex-start" : "center")};

  font-size: ${({ mobile }) => (mobile ? "26px" : "18px")};
  flex-direction: column;
  & > div {
    margin-top: 5px;
    width: 18px;
    height: 1.5px;
    background-color: ${colors.primaryColor};
    margin-left: 5px;
    display: ${({ selected }) => (selected ? "block" : "none")};
  }
  &:hover > div {
    display: block;
  }
`;

const HeaderListContainer = styled.div<{
  mobile: boolean;
  mobileOpen: boolean;
}>`
  display: ${({ mobile }) => (mobile ? "block" : "flex")};
  gap: 20px;
  z-index: 10;
  height: ${({ mobile }) => (mobile ? "100vh" : "auto")};
  position: ${({ mobile }) => (mobile ? "fixed" : "absolute")};
  top: ${({ mobileOpen, mobile }) =>
    mobileOpen && mobile ? "0px" : !mobileOpen && mobile ? "-100vh" : "auto"};
  width: ${({ mobile }) => (mobile ? "100%" : "auto")};
  left: ${({ mobile }) => (mobile ? "0" : "40%")};
  transition: 0.5s ease-in-out;

  padding-top: ${({ mobile }) => (mobile ? "100px" : "0")};
  padding-left: ${({ mobile }) => (mobile ? "20px" : "0")};
  background-color: ${colors.white};
`;

export { HeaderLinkStyles, HeaderListContainer };
