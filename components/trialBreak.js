export const showTrialBreakWidget = (bodyContent) => {
  console.log("showTrialBreakWidget");
  // wrapper container
  let el = document.getElementById("trialBreakContainer");
  el.style.visibility = "visible";
  el.style.zIndex = 1000005;

  // set body content
  el = document.getElementById("trialBreakPhrase");
  el.innerHTML = bodyContent;
};

export const hideTrialBreakWidget = () => {
  console.log("hideTrialBreakWidget");
  document.getElementById("trialBreakContainer").style.visibility = "hidden";
};

export const hideTrialProceedButton = () => {
  console.log("hideTrialProceedButton");
  document.getElementById("trial-proceed").style.visibility = "hidden";
};
export const showTrialProceedButton = () => {
  console.log("showTrialProceedButton");
  document.getElementById("trial-proceed").style.visibility = "visible";
};

export const showTrialBreakProgressbar = (height = 0.0) => {
  console.log("showTrialBreakProgressbar");
  height = Math.min(height, 1.0);
  hideTrialBreakProgressbar();

  // wrapper element
  const wrapperEl = document.createElement("div");
  wrapperEl.id = "trialBreakProgressbarWrapper";
  document.body.appendChild(wrapperEl);

  const progressEl = document.createElement("div");
  progressEl.id = "trialBreakProgressbar";
  progressEl.style.height = `${height * 100}%`;
  wrapperEl.appendChild(progressEl);
};

export const hideTrialBreakProgressbar = () => {
  let el = document.getElementById("trialBreakProgressbarWrapper");
  console.log("EL#", el);
  if (el) el.remove();
};
