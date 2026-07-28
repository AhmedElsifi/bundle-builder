import { useState } from "react";
import Step from "./Step";
import Section from "../UI/Section";
import { STEPS, STEP_COUNT } from "../../utils/constants";
import data from "../../../products.json";

export default function Builder() {
  const [expandedSteps, setExpandedSteps] = useState(new Set([1]));

  const onStepChange = (step) => {
    setExpandedSteps(new Set([step]));
  };

  const toggleExpanded = (stepIndex) => {
    setExpandedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(stepIndex)) newSet.delete(stepIndex);
      else newSet.add(stepIndex);
      return newSet;
    });
  };

  const getItems = (step) =>
    step.category === "plans"
      ? data.plans
      : data.products.filter((p) => p.category === step.category);

  return (
    <div className="flex flex-col gap-3.25">
      {STEPS.map((step, index) => (
        <Section
          key={step.index}
          title={`Step ${step.index} of ${STEP_COUNT}`}
          isExpanded={expandedSteps.has(step.index)}
          className="w-3xl max-sm:w-full"
        >
          <Step
            stepIndex={step.index}
            title={step.title}
            icon={step.icon}
            onStepChange={onStepChange}
            isExpanded={expandedSteps.has(step.index)}
            toggleExpanded={toggleExpanded}
            nextStep={STEPS[index + 1]?.title || "Checkout"}
            items={getItems(step)}
          />
        </Section>
      ))}
    </div>
  );
}
