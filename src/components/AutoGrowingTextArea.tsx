import { useRef, useCallback } from "react";
import { colors } from "../styles/colors";

const AutoGrowingTextArea = ({
  fontSize,
  placeholder,
  value,
  setValue,
  noBgColor,
  borderB,
  characterLimit,
  disableInput,
}: {
  fontSize: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  noBgColor?: boolean;
  borderB?: boolean;
  characterLimit?: string;
  disableInput?: boolean;
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
        backgroundColor: noBgColor ? "transparent" : "auto",
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
