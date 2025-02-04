import { useRef, useCallback } from "react";
import { colors } from "../styles/colors";

const AutoGrowingTextArea = ({
  fontSize,
  placeholder,
  value,
  setValue,
  borderB,
  characterLimit,
  disableInput,
  bgColor,
}: {
  fontSize: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  borderB?: boolean;
  characterLimit?: string;
  disableInput?: boolean;
  bgColor?: string;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "35px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  return (
    <textarea
      ref={textareaRef}
      onInput={handleInput}
      placeholder={placeholder}
      disabled={disableInput}
      style={{
        backgroundColor: bgColor && bgColor !== "" ? bgColor : "auto",
        width: "100%",
        resize: "none",
        overflow: "hidden",
        height: "35px",
        boxSizing: "border-box",
        border: "none",
        borderBottom: borderB ? `2px solid ${colors.bgOptionText}` : "none",
        outline: "none",
        fontSize,
        flexGrow: 1,
      }}
      onChange={(e) => {
        const newText = e.target.value;
        if (!characterLimit || newText.length <= parseInt(characterLimit)) {
          setValue(newText);
        }
      }}
      value={value}
    />
  );
};

export default AutoGrowingTextArea;
