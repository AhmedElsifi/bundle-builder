import camera from "../assets/icons/camera.svg";
import sensors from "../assets/icons/sensors.svg";
import plan from "../assets/icons/plan.svg";
import extraProtection from "../assets/icons/extra protection.svg";

export const STEPS = [
  { index: 1, title: "Choose your cameras", icon: camera, category: "cameras" },
  { index: 2, title: "Choose your plan", icon: plan, category: "plans" },
  { index: 3, title: "Choose your sensors", icon: sensors, category: "sensors" },
  { index: 4, title: "Add extra protection", icon: extraProtection, category: "accessories" },
];

export const STEP_COUNT = STEPS.length;
