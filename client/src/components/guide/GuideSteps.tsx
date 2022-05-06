import React from "react";
import DotStepsMenu from "./DotStepsMenu";

interface GuideStepsProps {
  guide: null | string;
  setGuide: (guide: string) => void;
  text: string;
  nextStep: () => void;
  prevStep: () => void;
  placement: string;
  finalStep: boolean;
  onExit: () => void;
}

const GuideSteps = ({
  finalStep = false,
  text,
  setGuide,
  guide,
  nextStep,
  onExit,
  prevStep,
  placement,
}: GuideStepsProps) => {
  return (
    <>
      <div className={placement}>
        <DotStepsMenu guide={guide} setGuide={setGuide} />
        <button className="guide__closebtn" value="close" onClick={onExit}></button>
        <div className="guide__text">{text}</div>
        <div className="guide__btn__group">
          {guide !== "2" && (
            <button className="guide__btn__group__prev" onClick={prevStep}>
              Previous
            </button>
          )}
          {!finalStep && (
            <button className="guide__btn__group__next" onClick={nextStep}>
              Next
            </button>
          )}
          <button
            className={finalStep ? "guide__btn__group__final" : "guide__btn__group__exit"}
            onClick={onExit}
          >
            Exit
          </button>
        </div>
      </div>
    </>
  );
};
GuideSteps.defaultProps = {
  placement: "guide__card",
  finalStep: false,
};
export default GuideSteps;
