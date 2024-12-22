import styled from "styled-components";
import { colors } from "../../styles/colors";

const ModalBackdrop = styled.div<{
  open: boolean;
}>`
  display: ${({ open }) => (open ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

// Modal content box
const ModalContent = styled.div<{ width?: string }>`
  background: ${colors.white};
  padding: 40px;
  border-radius: 20px;
  width: ${({ width }) => width ?? "400px"};
  max-width: 90%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  min-height: 75%;
  position: relative;
`;

const CloseButton = styled.div`
  background: transparent;
  color: black;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  justify-content: space-between;
  width: 87%;
`;

const SignUpORStyle = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  margin:15px 0;
  &:before,
    &:after {
    content: "";
    flex: 1;
    border-bottom: 0.5px solid #000;
    margin: 0 10px;
     font-weight: bold;
  color: #000:
  padding: 0 10px;
  
  }
`;

export { CloseButton, ModalBackdrop, ModalContent, SignUpORStyle };
