import React from "react";

interface DotStepsMenuProps {
  guide: null | string;
  setGuide: (guide: string) => void;
}

const DotStepsMenu = ({ guide, setGuide }: DotStepsMenuProps) => {
  const onStepBtnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget;
    setGuide(value);
  };

  return (
    <div className="guide__dotcontainer">
      <button
        value="2"
        aria-label="Guide-step 2"
        onClick={onStepBtnClick}
        className={guide === "2" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
      <button
        value="3"
        aria-label="Guide-step 3"
        onClick={onStepBtnClick}
        className={guide === "3" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
      <button
        value="4"
        aria-label="Guide-step 4"
        onClick={onStepBtnClick}
        className={guide === "4" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
      <button
        value="5"
        aria-label="Guide-step 5"
        onClick={onStepBtnClick}
        className={guide === "5" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
      <button
        value="6"
        aria-label="Guide-step 6"
        onClick={onStepBtnClick}
        className={guide === "6" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
      <button
        value="7"
        aria-label="Guide-step 7"
        onClick={onStepBtnClick}
        className={guide === "7" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
      <button
        value="8"
        aria-label="Guide-step 8"
        onClick={onStepBtnClick}
        className={guide === "8" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
      <button
        value="9"
        aria-label="Guide-step 9"
        onClick={onStepBtnClick}
        className={guide === "9" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
      <button
        value="10"
        aria-label="Guide-step 10"
        onClick={onStepBtnClick}
        className={guide === "10" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
      <button
        value="11"
        aria-label="Guide-step 11"
        onClick={onStepBtnClick}
        className={guide === "11" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
      <button
        value="12"
        aria-label="Guide-step 12"
        onClick={onStepBtnClick}
        className={guide === "12" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
      <button
        value="13"
        aria-label="Guide-step 13"
        onClick={onStepBtnClick}
        className={guide === "13" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
      <button
        value="14"
        aria-label="Guide-step 14"
        onClick={onStepBtnClick}
        className={guide === "14" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
      <button
        value="15"
        aria-label="Guide-step 15"
        onClick={onStepBtnClick}
        className={guide === "15" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
      <button
        value="16"
        aria-label="Guide-step 16"
        onClick={onStepBtnClick}
        className={guide === "16" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
      <button
        value="17"
        aria-label="Guide-step 17"
        onClick={onStepBtnClick}
        className={guide === "17" ? "guide__dots guide__dots__active" : "guide__dots"}
      ></button>
    </div>
  );
};

export default DotStepsMenu;
