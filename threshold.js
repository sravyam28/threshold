﻿/* eslint-disable no-redeclare */

/*****************
 * Crowding Test *
 *****************/

import { debug, getTripletCharacters, sleep } from "./components/utils.js";

const useRC = true;

import * as core from "./psychojs/src/core/index.js";
import * as data from "./psychojs/src/data/index.js";
import * as util from "./psychojs/src/util/index.js";
import * as visual from "./psychojs/src/visual/index.js";

const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;

////
/* -------------------------------- External -------------------------------- */
import * as jsQUEST from "./components/addons/jsQUEST.module.js";

////
/* ----------------------------------- CSS ---------------------------------- */
import "./psychojs/src/index.css";

import "./components/css/utils.css";
import "./components/css/custom.css";
import "./components/css/instructions.css";
import "./components/css/showCharacterSet.css";
import "./components/css/forms.css";
import "./components/css/popup.css";
import "./components/css/takeABreak.css";
import "./components/css/psychojsExtra.css";

////
/* ------------------------------- Components ------------------------------- */

import { ParamReader } from "./parameters/paramReader.js";

import {
  logger,
  loggerText,
  hideCursor,
  showCursor,
  XYPixOfXYDeg,
  XYDegOfXYPix,
  addConditionToData,
  addTrialStaircaseSummariesToData,
  addBlockStaircaseSummariesToData,
  // spacingPixelsFromLevel,
} from "./components/utils.js";

import {
  formCalibrationList,
  ifAnyCheck,
  saveCalibratorData,
  saveCheckData,
  useCalibration,
} from "./components/useCalibration.js";

import {
  canClick,
  canType,
  getResponseType,
  resetResponseType,
} from "./components/response.js";

import { cleanFontName, loadFonts } from "./components/fonts.js";
import {
  loadRecruitmentServiceConfig,
  recruitmentServiceData,
} from "./components/recruitmentService.js";
import { phrases } from "./components/i18n.js";

import {
  addBeepButton,
  instructionsText,
  removeBeepButton,
} from "./components/instructions.js";

import {
  getCorrectSynth,
  getWrongSynth,
  getPurrSynth,
} from "./components/sound.js";
import {
  removeClickableCharacterSet,
  setupClickableCharacterSet,
} from "./components/showCharacterSet.js";

import {
  hideForm,
  showForm,
  showExperimentEnding,
} from "./components/forms.js";

// Display extra information for the TRIAL
import {
  showConditionName,
  updateConditionNameConfig,
} from "./components/showTrialInformation.js";
import { getTrialInfoStr } from "./components/trialCounter.js";
////

import {
  getCharacterSetBoundingBox,
  restrictLevel,
} from "./components/bounding.js";

import { Grid } from "./components/grid.js";
import {
  checkIfSimulated,
  SimulatedObserver,
  simulateObserverResponse,
} from "./components/simulatedObserver.js";

// import {
//   getCanvasContext,
//   getPixelRGBA,
//   initPixelsArray,
//   readPixels,
// } from "./components/canvasContext.js";

import { populateQuestDefaults } from "./components/questValues.js";

import {
  generateBoundingBoxPolies,
  addBoundingBoxesToComponents,
  sizeAndPositionBoundingBoxes,
  updateBoundingBoxPolies,
} from "./components/boundingBoxes.js";

// POPUP
import {
  preparePopup,
  showPopup,
  hidePopup,
  showPopupProceed,
  hidePopupProceed,
} from "./components/popup.js";
// Take a break
import {
  hideTrialBreakProgressBar,
  prepareTrialBreakProgressBar,
  showTrialBreakProgressBar,
} from "./components/takeABreak.js";

import { initializeEscHandlingDiv } from "./components/escapeHandling.js";
import { addPopupLogic } from "./components/popup.js";

/* -------------------------------------------------------------------------- */

window.jsQUEST = jsQUEST;

var conditionTrials;
let correctAns;

// eslint-disable-next-line no-undef
const rc = RemoteCalibrator;
rc.init();

// store info about the experiment session:
let expName = "threshold"; // from the Builder filename that created this script
let expInfo = { participant: debug ? rc.id.value : "", session: "001" };

const fontsRequired = {};
var simulated;
/* -------------------------------------------------------------------------- */

const paramReaderInitialized = async (reader) => {
  await sleep(250);

  // show screens before actual experiment begins
  const continueExperiment = await showForm(reader.read("_consentForm")[0]);
  hideForm();

  if (!continueExperiment) {
    await showForm(reader.read("_debriefForm")[0]);
    hideForm();
    showExperimentEnding(); // TODO Rethink about this function in terms of UI and logic
    return;
  } else {
    // Get fullscreen
    if (!rc.isFullscreen.value && !debug) {
      rc.getFullscreen();
      await sleep(1000);
    }
  }

  // prepareForReading(reader);

  // ! Load fonts
  loadFonts(reader, fontsRequired);

  // ! Load recruitment service config
  loadRecruitmentServiceConfig();

  // ! Simulate observer
  simulated = checkIfSimulated(reader);

  await sleep(50);

  ////
  const startExperiment = () => {
    // ! POPUPS for take a break & proportion correct
    preparePopup(expName); // Try to use only one popup ele for both (or even more) popup features
    prepareTrialBreakProgressBar();

    document.body.removeChild(document.querySelector("#rc-panel"));

    // ! Start actual experiment
    experiment(reader.blockCount);
  };
  ////

  // ! Remote Calibrator
  if (useRC && useCalibration(reader)) {
    rc.panel(
      formCalibrationList(reader),
      "#rc-panel",
      {
        debug: debug,
      },
      () => {
        rc.removePanel();
        startExperiment();
      }
    );
  } else {
    startExperiment();
  }
};

const paramReader = new ParamReader("conditions", paramReaderInitialized);

/* -------------------------------------------------------------------------- */

var totalTrialConfig = {
  initialVal: 0,
  fontSize: 20,
  x: window.innerWidth / 2,
  y: -window.innerHeight / 2,
  alignHoriz: "right",
  alignVert: "bottom",
};

var targetSpecsConfig = {
  fontSize: 20,
  x: -window.innerWidth / 2,
  y: -window.innerHeight / 2,
  alignHoriz: "left",
  alignVert: "bottom",
};

var targetSpecs; // TextStim object

var conditionNameConfig = {
  fontSize: 28,
  x: -window.innerWidth / 2,
  y: -window.innerHeight / 2,
  alignHoriz: "left",
  alignVert: "bottom",
};

var conditionName;

var trialInfoStr = "";
var totalTrial, // TextSim object
  totalTrialCount = 0;

var currentTrialIndex = 0;
var currentTrialLength = 0;
var currentBlockIndex = 0;
var totalBlockCount = 0;
var totalCorrect = 0;

// Maps 'block_condition' -> bounding rectangle around (appropriate) characterSet
// In typographic condition, the bounds are around a triplet
var characterSetBoundingRects = {};

const experiment = (blockCount) => {
  ////
  // Resources
  initializeEscHandlingDiv();
  const _resources = [];
  const blockNumbers = paramReader._experiment.map((block) => block.block);
  for (const i of blockNumbers) {
    _resources.push({
      name: `conditions/block_${i}.csv`,
      path: `conditions/block_${i}.csv`,
    });
  }
  logger("fontsRequired", fontsRequired);

  for (let i in fontsRequired) {
    logger(i, fontsRequired[i]);
    _resources.push({ name: i, path: fontsRequired[i] });
  }

  // Start code blocks for 'Before Experiment'
  // init psychoJS:
  const psychoJS = new PsychoJS({
    debug: debug,
  });

  /* ---------------------------------- Sound --------------------------------- */
  const correctSynth = getCorrectSynth(psychoJS);
  // const wrongSynth = getWrongSynth(psychoJS);
  const purrSynth = getPurrSynth(psychoJS);

  // open window:
  psychoJS.openWindow({
    fullscr: !debug,
    color: new util.Color([0.9, 0.9, 0.9]),
    units: "height",
    waitBlanking: true,
  });

  // schedule the experiment:
  psychoJS.schedule(
    psychoJS.gui.DlgFromDict({
      dictionary: expInfo,
      title: phrases.T_thresholdTitle[rc.language.value],
      participantText: phrases.T_participant[rc.language.value],
      sessionText: phrases.T_session[rc.language.value],
      cancelText: phrases.T_cancel[rc.language.value],
      okText: phrases.T_ok[rc.language.value],
    })
  );

  const flowScheduler = new Scheduler(psychoJS);
  const dialogCancelScheduler = new Scheduler(psychoJS);
  psychoJS.scheduleCondition(
    function () {
      return psychoJS.gui.dialogComponent.button === "OK";
    },
    flowScheduler,
    dialogCancelScheduler
  );

  // flowScheduler gets run if the participants presses OK
  flowScheduler.add(updateInfo); // add timeStamp
  flowScheduler.add(experimentInit);

  flowScheduler.add(fileRoutineBegin());
  flowScheduler.add(fileRoutineEachFrame());
  flowScheduler.add(fileRoutineEnd());
  // flowScheduler.add(initInstructionRoutineBegin());
  // flowScheduler.add(initInstructionRoutineEachFrame());
  // flowScheduler.add(initInstructionRoutineEnd());
  const blocksLoopScheduler = new Scheduler(psychoJS);
  flowScheduler.add(blocksLoopBegin(blocksLoopScheduler));
  flowScheduler.add(blocksLoopScheduler);
  flowScheduler.add(blocksLoopEnd);

  // flowScheduler.add(debriefRoutineBegin());
  // flowScheduler.add(debriefRoutineEachFrame());
  // flowScheduler.add(debriefRoutineEnd());

  flowScheduler.add(quitPsychoJS, "", true);

  // quit if user presses Cancel in dialog box:
  dialogCancelScheduler.add(quitPsychoJS, "", false);

  if (useRC) {
    expInfo["participant"] = rc.id.value;
  }

  logger("_resources", _resources);
  psychoJS
    .start({
      expName: expName,
      expInfo: expInfo,
      resources: [
        {
          name: "conditions/blockCount.csv",
          path: "conditions/blockCount.csv",
        },
        ..._resources,
      ],
    })
    .then(() => {
      document.body.classList.add("hide-ui-dialog");
      const _ = setInterval(() => {
        if (psychoJS.gui._allResourcesDownloaded) {
          clearInterval(_);
          loggerText("all resources loaded");

          psychoJS.gui.dialogComponent.button = "OK";
          psychoJS.gui._removeWelcomeDialogBox();
          // psychoJS.gui.closeDialog();
          psychoJS.gui.dialogComponent.status = PsychoJS.Status.FINISHED;
          psychoJS.window.adjustScreenSize();
          psychoJS.eventManager.clearEvents();

          document.body.classList.remove("hide-ui-dialog");
        }
      }, 300);
    });

  // Get canvas
  // const [canvas, canvasContext] = getCanvasContext();
  // initPixelsArray(canvasContext);

  // // Demo read pixels
  // readPixels(canvasContext);
  // console.log(getPixelRGBA(10, 20, canvasContext));
  ////

  psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);

  // var frameDur;
  async function updateInfo() {
    expInfo["date"] = util.MonotonicClock.getDateStr(); // add a simple timestamp
    expInfo["expName"] = expName;
    expInfo["psychopyVersion"] = "2021.3.1-threshold-prod";
    expInfo["OS"] = rc.systemFamily.value;
    expInfo["psychojsWindowDimensions"] = String(psychoJS._window._size);

    // store frame rate of monitor if we can measure it successfully
    expInfo["frameRate"] = psychoJS.window.getActualFrameRate();
    // if (typeof expInfo["frameRate"] !== "undefined")
    //   frameDur = 1.0 / Math.round(expInfo["frameRate"]);
    // else frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

    // add info from the URL:
    util.addInfoFromUrl(expInfo);

    return Scheduler.Event.NEXT;
  }

  var fileClock;
  var filterClock;
  var instructionsClock;

  /* --- BOUNDING BOX --- */
  var boundingBoxPolies;
  var characterSetBoundingBoxPolies;
  var displayCharacterSetBoundingBoxPolies;
  /* --- /BOUNDING BOX --- */

  var thisLoopNumber; // ! BLOCK COUNTER
  var thisConditionsFile;
  var trialClock;

  var instructions;
  var instructions2;
  var instructionFont = paramReader.read("instructionFont")[0];
  if (paramReader.read("instructionFontSource")[0] === "file")
    instructionFont = cleanFontName(instructionFont);

  var key_resp;
  var fixation; ////
  var flanker1;
  var target;
  var flanker2;
  var showCharacterSet;

  var globalClock;
  var routineTimer, routineClock, blockClock;
  var initInstructionClock, eduInstructionClock, trialInstructionClock;

  var displayOptions;
  var fixationXYPx;
  var fixationSize = 45.0;
  var nearPointXYDeg;
  var nearPointXYPix;
  var showFixation;
  var windowWidthCm;
  var windowWidthPx;
  var pixPerCm;
  var grid;

  async function experimentInit() {
    // Initialize components for Routine "file"
    fileClock = new util.Clock();
    // Initialize components for Routine "filter"
    filterClock = new util.Clock();
    instructionsClock = new util.Clock();

    thisLoopNumber = 0;
    thisConditionsFile = `conditions/block_${thisLoopNumber + 1}.csv`;

    // Initialize components for Routine "trial"
    trialClock = new util.Clock();

    key_resp = new core.Keyboard({
      psychoJS: psychoJS,
      clock: new util.Clock(),
      waitForStart: true,
    });

    fixation = new visual.TextStim({
      win: psychoJS.window,
      name: "fixation",
      text: "+",
      font: "Open Sans",
      units: "pix",
      pos: [0, 0],
      height: 45.0,
      wrapWidth: undefined,
      ori: 0.0,
      color: new util.Color("black"),
      opacity: undefined,
      depth: -6.0,
    });

    flanker1 = new visual.TextStim({
      win: psychoJS.window,
      name: "flanker1",
      text: "",
      font: "Arial",
      units: "pix",
      pos: [0, 0],
      height: 1.0,
      wrapWidth: undefined,
      ori: 0.0,
      color: new util.Color("black"),
      opacity: 1.0,
      depth: -7.0,
    });

    target = new visual.TextStim({
      win: psychoJS.window,
      name: "target",
      text: "",
      font: "Arial",
      units: "pix",
      pos: [0, 0],
      height: 1.0,
      wrapWidth: undefined,
      ori: 0.0,
      color: new util.Color("black"),
      opacity: 1.0,
      depth: -8.0,
    });

    flanker2 = new visual.TextStim({
      win: psychoJS.window,
      name: "flanker2",
      text: "",
      font: "Arial",
      units: "pix",
      pos: [0, 0],
      height: 1.0,
      wrapWidth: undefined,
      ori: 0.0,
      color: new util.Color("black"),
      opacity: 1.0,
      depth: -9.0,
    });

    showCharacterSet = new visual.TextStim({
      win: psychoJS.window,
      name: "showCharacterSet",
      text: "",
      font: "Arial",
      units: "pix",
      pos: [0, 0],
      height: 1.0,
      wrapWidth: window.innerWidth,
      ori: 0.0,
      color: new util.Color("black"),
      opacity: 1.0,
      depth: -5.0,
    });

    totalTrial = new visual.TextStim({
      win: psychoJS.window,
      name: "totalTrial",
      text: "",
      font: instructionFont,
      units: "pix",
      pos: [totalTrialConfig.x, totalTrialConfig.y],
      alignHoriz: totalTrialConfig.alignHoriz,
      alignVert: totalTrialConfig.alignVert,
      height: totalTrialConfig.fontSize,
      wrapWidth: window.innerWidth,
      ori: 0.0,
      color: new util.Color("black"),
      opacity: 1.0,
      depth: -20.0,
      isInstruction: false,
    });

    targetSpecs = new visual.TextStim({
      win: psychoJS.window,
      name: "targetSpecs",
      text: "",
      font: instructionFont,
      units: "pix",
      pos: [targetSpecsConfig.x, targetSpecsConfig.y],
      alignHoriz: targetSpecsConfig.alignHoriz,
      alignVert: targetSpecsConfig.alignVert,
      height: targetSpecsConfig.fontSize,
      wrapWidth: window.innerWidth,
      ori: 0.0,
      color: new util.Color("black"),
      opacity: 1.0,
      depth: -20.0,
      isInstruction: false,
      autoDraw: false,
    });

    conditionName = new visual.TextStim({
      win: psychoJS.window,
      name: "conditionName",
      text: "",
      font: instructionFont,
      units: "pix",
      pos: [conditionNameConfig.x, conditionNameConfig.y],
      alignHoriz: conditionNameConfig.alignHoriz,
      alignVert: conditionNameConfig.alignVert,
      height: conditionNameConfig.fontSize,
      wrapWidth: window.innerWidth,
      ori: 0.0,
      color: new util.Color("black"),
      opacity: 1.0,
      depth: -20.0,
      isInstruction: false,
      autoDraw: false,
    });

    const instructionsConfig = {
      win: psychoJS.window,
      text: "",
      font: instructionFont,
      units: "pix",
      height: 27.0,
      wrapWidth: window.innerWidth * 0.8,
      ori: 0.0,
      color: new util.Color("black"),
      opacity: 1.0,
      depth: -12.0,
      alignHoriz: "left",
      isInstruction: true, // !
    };
    instructions = new visual.TextStim({
      ...instructionsConfig,
      name: "instructions",
      pos: [-window.innerWidth * 0.4, window.innerHeight * 0.4],
      alignVert: "top",
    });
    instructions2 = new visual.TextStim({
      ...instructionsConfig,
      name: "instructions2",
      pos: [-window.innerWidth * 0.4, -window.innerHeight * 0.4],
      alignVert: "bottom",
    });

    characterSetBoundingRects = {};
    for (const cond of paramReader.read("block_condition", "__ALL_BLOCKS__")) {
      const characterSet = String(
        paramReader.read("targetCharacterSet", cond)
      ).split("");
      let font = paramReader.read("targetFont", cond);
      if (paramReader.read("targetFontSource", cond) === "file")
        font = cleanFontName(font);
      const letterRepeats =
        paramReader.read("spacingRelationToSize", cond) === "ratio" ? 1 : 3;
      characterSetBoundingRects[cond] = getCharacterSetBoundingBox(
        characterSet,
        font,
        psychoJS.window,
        letterRepeats,
        100
      );
    }
    /* --- BOUNDING BOX --- */
    // Generate the bounding boxes to be displayed superimposing...
    [
      boundingBoxPolies, // ... the triplet.
      characterSetBoundingBoxPolies, // ... the triplet.
      displayCharacterSetBoundingBoxPolies, // .. the full character set displayed during response time.
    ] = generateBoundingBoxPolies(paramReader, psychoJS);
    /* --- BOUNDING BOX --- */

    // Create some handy timers
    globalClock = new util.Clock(); // to track the time since experiment started
    routineTimer = new util.CountdownTimer(); // to track time remaining of each (non-slip) routine
    routineClock = new util.Clock();
    blockClock = new util.Clock();

    // Extra clocks for clear timing
    initInstructionClock = new util.Clock();
    eduInstructionClock = new util.Clock();
    trialInstructionClock = new util.Clock();

    // TODO Not working
    if (rc.languageDirection.value === "RTL") {
      Object.assign(document.querySelector("canvas").style, {
        direction: "rtl",
      });
    }

    // TODO use actual nearPoint, from RC
    nearPointXYDeg = [0, 0]; // TEMP
    nearPointXYPix = [0, 0]; // TEMP
    fixationXYPx = [0, 0];
    // TODO set fixation from the actual parameter
    fixationSize = 45;
    showFixation = true;
    windowWidthCm = rc.screenWidthCm ? rc.screenWidthCm.value : 30;
    windowWidthPx = rc.displayWidthPx.value;
    pixPerCm = windowWidthPx / windowWidthCm;
    // NOTE viewingDistanceCm is not necessarily correct, as the first trial could be from any condition in the first block
    // viewingDistanceCm = rc.viewingDistanceCm
    //   ? rc.viewingDistanceCm.value
    //   : reader.read("viewingDistanceDesiredCm", "__ALL_BLOCKS__")[0];
    displayOptions = {
      pixPerCm: pixPerCm,
      // viewingDistanceCm: viewingDistanceCm,
      nearPointXYDeg: nearPointXYDeg,
      nearPointXYPix: nearPointXYPix,
      fixationXYPix: fixationXYPx,
      window: psychoJS.window,
    };
    grid = new Grid("none", displayOptions, psychoJS);
    return Scheduler.Event.NEXT;
  }

  var t;
  var frameN;
  var continueRoutine;
  var fileComponents;

  var clickedContinue;

  var responseType = 2;
  var originalResponseType = 2;

  var continueRoutine;
  var consentComponents;
  var debriefComponents;
  var frameRemains;

  function fileRoutineBegin(snapshot) {
    return async function () {
      TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date

      //------Prepare to start Routine 'file'-------
      t = 0;
      fileClock.reset(); // clock
      frameN = -1;
      continueRoutine = true; // until we're told otherwise
      // update component parameters for each repeat
      // keep track of which components have finished
      fileComponents = [];

      for (const thisComponent of fileComponents)
        if ("status" in thisComponent)
          thisComponent.status = PsychoJS.Status.NOT_STARTED;
      return Scheduler.Event.NEXT;
    };
  }

  function fileRoutineEachFrame() {
    return async function () {
      /* --- SIMULATED --- */
      if (simulated) return Scheduler.Event.NEXT;
      /* --- /SIMULATED --- */
      //------Loop for each frame of Routine 'file'-------
      // get current time
      t = fileClock.getTime();
      frameN = frameN + 1; // number of completed frames (so 0 is the first frame)
      // update/draw components on each frame
      // check for quit (typically the Esc key)
      if (
        psychoJS.experiment.experimentEnded ||
        psychoJS.eventManager.getKeys({ keyList: ["escape"] }).length > 0
      ) {
        return quitPsychoJS("The [Escape] key was pressed. Goodbye!", false);
      }

      // check if the Routine should terminate
      if (!continueRoutine) {
        // a component has requested a forced-end of Routine
        return Scheduler.Event.NEXT;
      }

      continueRoutine = false; // reverts to True if at least one component still running
      for (const thisComponent of fileComponents)
        if (
          "status" in thisComponent &&
          thisComponent.status !== PsychoJS.Status.FINISHED
        ) {
          continueRoutine = true;
          break;
        }

      // refresh the screen if continuing
      if (continueRoutine) {
        return Scheduler.Event.FLIP_REPEAT;
      } else {
        return Scheduler.Event.NEXT;
      }
    };
  }

  function fileRoutineEnd() {
    return async function () {
      //------Ending Routine 'file'-------
      for (const thisComponent of fileComponents) {
        if (typeof thisComponent.setAutoDraw === "function") {
          thisComponent.setAutoDraw(false);
        }
      }
      // the Routine "file" was not non-slip safe, so reset the non-slip timer
      routineTimer.reset();
      routineClock.reset();

      return Scheduler.Event.NEXT;
    };
  }

  var _beepButton;

  function _instructionSetup(text) {
    t = 0;
    instructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true;
    instructions.setWrapWidth(window.innerWidth * 0.8);
    instructions.setPos([-window.innerWidth * 0.4, window.innerHeight * 0.4]);
    instructions.setText(text);
    instructions.setAutoDraw(true);
  }

  function _instructionBeforeStimulusSetup(text) {
    t = 0;
    instructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true;
    // const wrapWidth = Math.round(1.5 + Math.sqrt(9 + 12*text.length)/2) * instructions.height/1.9;
    const wrapWidth = window.innerWidth / 4;
    instructions.setWrapWidth(wrapWidth);
    instructions.setPos([
      -window.innerWidth / 2 + 5,
      window.innerHeight / 2 - 5,
    ]);
    instructions.setText(text);
    instructions.setAutoDraw(true);
  }

  function _clickContinue(e) {
    if (e.target.id !== "threshold-beep-button") clickedContinue = true;
  }

  async function _instructionRoutineEachFrame() {
    /* --- SIMULATED --- */
    if (simulated && simulated[thisLoopNumber]) return Scheduler.Event.NEXT;
    /* --- /SIMULATED --- */

    t = instructionsClock.getTime();
    frameN = frameN + 1;

    if (
      psychoJS.experiment.experimentEnded ||
      psychoJS.eventManager.getKeys({ keyList: ["escape"] }).length > 0
    ) {
      document.removeEventListener("click", _clickContinue);
      document.removeEventListener("touchend", _clickContinue);
      removeBeepButton(_beepButton);

      return quitPsychoJS("The [Escape] key was pressed. Goodbye!", false);
    }

    if (!continueRoutine) {
      return Scheduler.Event.NEXT;
    }

    continueRoutine = true;
    if (
      canType(responseType) &&
      psychoJS.eventManager.getKeys({ keyList: ["return"] }).length > 0
    ) {
      continueRoutine = false;
    }

    if (continueRoutine && !clickedContinue) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  }

  // async function _instructionRoutineEnd() {
  //   instructions.setAutoDraw(false);

  //   document.removeEventListener("click", _clickContinue);
  //   document.removeEventListener("touchend", _clickContinue);

  //   routineTimer.reset();
  //   routineClock.reset();

  //   return Scheduler.Event.NEXT;
  // }

  var blocks;
  var currentLoop;
  // var currentLoopBlock;

  function blocksLoopBegin(blocksLoopScheduler, snapshot) {
    return async function () {
      TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop

      // set up handler to look after randomisation of conditions etc
      blocks = new TrialHandler({
        psychoJS: psychoJS,
        nReps: 1,
        method: TrialHandler.Method.SEQUENTIAL,
        extraInfo: expInfo,
        originPath: undefined,
        trialList: "conditions/blockCount.csv",
        seed: undefined,
        name: "blocks",
      });
      psychoJS.experiment.addLoop(blocks); // add the loop to the experiment
      // currentLoopBlock = blocks;

      // Schedule all the trials in the trialList:
      for (const thisBlock of blocks) {
        const snapshot = blocks.getSnapshot();
        blocksLoopScheduler.add(importConditions(snapshot));
        blocksLoopScheduler.add(filterRoutineBegin(snapshot));
        blocksLoopScheduler.add(filterRoutineEachFrame());
        blocksLoopScheduler.add(filterRoutineEnd());
        blocksLoopScheduler.add(initInstructionRoutineBegin(snapshot));
        blocksLoopScheduler.add(initInstructionRoutineEachFrame());
        blocksLoopScheduler.add(initInstructionRoutineEnd());
        blocksLoopScheduler.add(eduInstructionRoutineBegin(snapshot));
        blocksLoopScheduler.add(eduInstructionRoutineEachFrame());
        blocksLoopScheduler.add(eduInstructionRoutineEnd());
        const trialsLoopScheduler = new Scheduler(psychoJS);
        blocksLoopScheduler.add(trialsLoopBegin(trialsLoopScheduler, snapshot));
        blocksLoopScheduler.add(trialsLoopScheduler);
        blocksLoopScheduler.add(trialsLoopEnd);
        blocksLoopScheduler.add(
          endLoopIteration(blocksLoopScheduler, snapshot)
        );
      }

      return Scheduler.Event.NEXT;
    };
  }

  var trialsConditions;
  var trials;
  function trialsLoopBegin(trialsLoopScheduler, snapshot) {
    return async function () {
      // setup a MultiStairTrialHandler
      trialsConditions = TrialHandler.importConditions(
        psychoJS.serverManager,
        thisConditionsFile
      );
      trialsConditions = trialsConditions.map((condition) =>
        Object.assign(condition, { label: condition["block_condition"] })
      );
      trialsConditions = populateQuestDefaults(trialsConditions, paramReader);

      const nTrialsTotal = trialsConditions
        .map((c) =>
          Number(paramReader.read("conditionTrials", c.block_condition))
        )
        .reduce((runningSum, ntrials) => runningSum + ntrials, 0);
      trials = new data.MultiStairHandler({
        stairType: MultiStairHandler.StaircaseType.QUEST,
        psychoJS: psychoJS,
        name: "trials",
        varName: "trialsVal",
        nTrials: nTrialsTotal,
        conditions: trialsConditions,
        method: TrialHandler.Method.FULLRANDOM,
      });

      psychoJS.experiment.addLoop(trials); // add the loop to the experiment
      currentLoop = trials;

      // Schedule all the trials in the trialList:
      for (const thisQuestLoop of trials) {
        const snapshot = trials.getSnapshot();
        trialsLoopScheduler.add(importConditions(snapshot));
        trialsLoopScheduler.add(trialInstructionRoutineBegin(snapshot));
        trialsLoopScheduler.add(trialInstructionRoutineEachFrame());
        trialsLoopScheduler.add(trialInstructionRoutineEnd());
        trialsLoopScheduler.add(trialRoutineBegin(snapshot));
        trialsLoopScheduler.add(trialRoutineEachFrame());
        trialsLoopScheduler.add(trialRoutineEnd());
        trialsLoopScheduler.add(
          endLoopIteration(trialsLoopScheduler, snapshot)
        );
      }

      return Scheduler.Event.NEXT;
    };
  }

  async function trialsLoopEnd() {
    // Proportion correct
    var proportion = (totalCorrect / currentTrialLength).toFixed(2);
    showPopup(
      expName,
      `Nice Work! Here is your proportion correct: ${proportion}`,
      "",
      false
    );
    addPopupLogic(expName, responseType, null);

    addBlockStaircaseSummariesToData(currentLoop, psychoJS);
    // terminate loop
    psychoJS.experiment.removeLoop(trials);
    return Scheduler.Event.NEXT;
  }

  async function blocksLoopEnd() {
    psychoJS.experiment.removeLoop(blocks);

    // ! Distance ?

    return Scheduler.Event.NEXT;
  }

  /* -------------------------------------------------------------------------- */
  /*                                  NEW BLOCK                                 */
  /* -------------------------------------------------------------------------- */

  var filterComponents;
  function filterRoutineBegin(snapshot) {
    return async function () {
      TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
      currentBlockIndex = snapshot.block + 1;
      totalBlockCount = snapshot.nTotal;

      //------Prepare to start Routine 'filter'-------
      t = 0;
      filterClock.reset(); // clock
      frameN = -1;
      continueRoutine = true; // until we're told otherwise

      // update component parameters for each repeat
      thisLoopNumber += 1;
      thisConditionsFile = `conditions/block_${thisLoopNumber}.csv`;

      if (debug)
        console.log(
          "%c=======================\n====== New Block ======\n=======================",
          "color: purple"
        );

      const possibleTrials = paramReader.read(
        "conditionTrials",
        thisLoopNumber
      );

      logger("possibleTrials", possibleTrials);
      totalTrialCount = possibleTrials.reduce((a, b) => a + b, 0); // sum of possible trials
      conditionTrials = Math.max(...possibleTrials);

      // keep track of which components have finished
      filterComponents = [];

      // ! Set block params

      for (const thisComponent of filterComponents)
        if ("status" in thisComponent)
          thisComponent.status = PsychoJS.Status.NOT_STARTED;
      return Scheduler.Event.NEXT;
    };
  }

  function filterRoutineEachFrame() {
    return async function () {
      /* --- SIMULATED --- */
      if (simulated && simulated[thisLoopNumber]) return Scheduler.Event.NEXT;
      /* --- /SIMULATED --- */

      //------Loop for each frame of Routine 'filter'-------
      // get current time
      t = filterClock.getTime();
      frameN = frameN + 1; // number of completed frames (so 0 is the first frame)
      // update/draw components on each frame
      // check for quit (typically the Esc key)
      if (
        psychoJS.experiment.experimentEnded ||
        psychoJS.eventManager.getKeys({ keyList: ["escape"] }).length > 0
      ) {
        return quitPsychoJS("The [Escape] key was pressed. Goodbye!", false);
      }

      // check if the Routine should terminate
      if (!continueRoutine) {
        // a component has requested a forced-end of Routine
        return Scheduler.Event.NEXT;
      }

      continueRoutine = false; // reverts to True if at least one component still running
      for (const thisComponent of filterComponents)
        if (
          "status" in thisComponent &&
          thisComponent.status !== PsychoJS.Status.FINISHED
        ) {
          continueRoutine = true;
          break;
        }

      // refresh the screen if continuing
      if (continueRoutine) {
        return Scheduler.Event.FLIP_REPEAT;
      } else {
        return Scheduler.Event.NEXT;
      }
    };
  }

  function filterRoutineEnd() {
    return async function () {
      //------Ending Routine 'filter'-------
      for (const thisComponent of filterComponents) {
        if (typeof thisComponent.setAutoDraw === "function") {
          thisComponent.setAutoDraw(false);
        }
      }
      // the Routine "filter" was not non-slip safe, so reset the non-slip timer
      routineTimer.reset();
      routineClock.reset();

      return Scheduler.Event.NEXT;
    };
  }

  /* ------------------------- Block Init Instructions ------------------------ */

  function initInstructionRoutineBegin(snapshot) {
    return async function () {
      // ! Distance
      // rc.resumeDistance();

      initInstructionClock.reset(); // clock
      TrialHandler.fromSnapshot(snapshot);

      const blockCount = snapshot.block + 1;

      responseType = getResponseType(
        paramReader.read("responseClickedBool", blockCount)[0],
        paramReader.read("responseTypedBool", blockCount)[0],
        paramReader.read("responseTypedEasyEyesKeypadBool", blockCount)[0],
        paramReader.read("responseSpokenBool", blockCount)[0]
      );

      _instructionSetup(
        (snapshot.block === 0
          ? instructionsText.initial(
              rc.language.value,
              paramReader.read("takeABreakTrialCredit", blockCount)[0]
            )
          : "") +
          instructionsText.initialByThresholdParameter["spacing"](
            rc.language.value,
            responseType,
            totalTrialCount
          ) +
          instructionsText.initialEnd(rc.language.value, responseType)
      );

      clickedContinue = false;
      setTimeout(() => {
        document.addEventListener("click", _clickContinue);
        document.addEventListener("touchend", _clickContinue);
      }, 500);

      _beepButton = addBeepButton(rc.language.value, correctSynth);

      psychoJS.eventManager.clearKeys();

      // reset takeABreak state
      currentBlockCreditForTrialBreak = 0;
      hideTrialBreakProgressBar();

      trialInfoStr = getTrialInfoStr(
        rc.language.value,
        paramReader.read("showCounterBool", blockCount)[0],
        paramReader.read("showViewingDistanceBool", blockCount)[0],
        undefined,
        undefined,
        blockCount,
        totalBlockCount,
        viewingDistanceCm
      );
      totalTrial.setText(trialInfoStr);
      totalTrial.setAutoDraw(true);

      return Scheduler.Event.NEXT;
    };
  }

  function initInstructionRoutineEachFrame() {
    return _instructionRoutineEachFrame;
  }

  function initInstructionRoutineEnd() {
    return async function () {
      instructions.setAutoDraw(false);

      document.removeEventListener("click", _clickContinue);
      document.removeEventListener("touchend", _clickContinue);

      removeBeepButton(_beepButton);

      psychoJS.experiment.addData(
        "initInstructionRoutineDurationFromBeginSec",
        initInstructionClock.getTime()
      );
      psychoJS.experiment.addData(
        "initInstructionRoutineDurationFromPreviousEndSec",
        routineClock.getTime()
      );

      /* ----------------------------------- RC ----------------------------------- */
      if (rc.viewingDistanceData.length || rc.screenData.length)
        saveCalibratorData(paramReader, rc, psychoJS);
      if (ifAnyCheck(paramReader)) saveCheckData(rc, psychoJS);

      initInstructionClock.reset();
      routineTimer.reset();
      routineClock.reset();

      return Scheduler.Event.NEXT;
    };
  }

  /* ------------------------- Block Edu Instructions ------------------------- */

  function eduInstructionRoutineBegin(snapshot) {
    return async function () {
      ////
      // End distance once the exp begins
      rc.endDistance();
      ////
      eduInstructionClock.reset();

      TrialHandler.fromSnapshot(snapshot);
      _instructionSetup(instructionsText.edu(rc.language.value));

      instructions2.setText(
        instructionsText.eduBelow(rc.language.value, responseType)
      );
      instructions2.setWrapWidth(window.innerWidth * 0.8);
      instructions2.setPos([
        -window.innerWidth * 0.4,
        -window.innerHeight * 0.4,
      ]);
      instructions2.setAutoDraw(true);

      clickedContinue = false;
      setTimeout(() => {
        document.addEventListener("click", _clickContinue);
        document.addEventListener("touchend", _clickContinue);
      }, 1000);

      const h = 50;
      const D = 200;
      const g = 100;

      target.setFont(instructionFont);
      target.setPos([D, 0]);
      target.setText("R");
      target.setHeight(h);

      flanker1.setFont(instructionFont);
      flanker1.setPos([D - g, 0]);
      flanker1.setText("H");
      flanker1.setHeight(h);

      flanker2.setFont(instructionFont);
      flanker2.setPos([D + g, 0]);
      flanker2.setText("C");
      flanker2.setHeight(h);

      fixation.setHeight(fixationSize);
      fixation.setPos([0, 0]);

      fixation.setAutoDraw(true);
      target.setAutoDraw(true);
      flanker1.setAutoDraw(true);
      flanker2.setAutoDraw(true);

      psychoJS.eventManager.clearKeys();

      return Scheduler.Event.NEXT;
    };
  }

  function eduInstructionRoutineEachFrame() {
    return _instructionRoutineEachFrame;
  }

  function eduInstructionRoutineEnd() {
    return async function () {
      // ! Distance
      // rc.pauseDistance();

      instructions.setAutoDraw(false);
      instructions2.setAutoDraw(false);

      document.removeEventListener("click", _clickContinue);
      document.removeEventListener("touchend", _clickContinue);

      target.setAutoDraw(false);
      flanker1.setAutoDraw(false);
      flanker2.setAutoDraw(false);

      psychoJS.experiment.addData(
        "eduInstructionRoutineDurationFromBeginSec",
        eduInstructionClock.getTime()
      );
      psychoJS.experiment.addData(
        "eduInstructionRoutineDurationFromPreviousEndSec",
        routineClock.getTime()
      );

      eduInstructionClock.reset();
      routineTimer.reset();
      routineClock.reset();

      return Scheduler.Event.NEXT;
    };
  }

  // function blockInstructionRoutineBegin(snapshot) {
  //   return async function () {
  //     TrialHandler.fromSnapshot(snapshot);
  //     _instructionSetup(instructionsText.block(snapshot.block + 1));

  //     clickedContinue = false;
  //     document.addEventListener("click", _clickContinue);
  //     document.addEventListener("touchend", _clickContinue);

  //     return Scheduler.Event.NEXT;
  //   };
  // }

  // function blockInstructionRoutineEachFrame() {
  //   return _instructionRoutineEachFrame;
  // }

  // function blockInstructionRoutineEnd() {
  //   return _instructionRoutineEnd;
  // }
  let modalButtonTriggeredViaKeyboard = false;
  const _takeFixationClick = (e) => {
    if (modalButtonTriggeredViaKeyboard) {
      // modal button click event triggered by jquery
      modalButtonTriggeredViaKeyboard = false;
      return;
    }
    let cX, cY;
    if (e.clientX) {
      cX = e.clientX;
      cY = e.clientY;
    } else {
      const t = e.changedTouches[0];
      if (t.clientX) {
        cX = t.clientX;
        cY = t.clientY;
      } else {
        clickedContinue = false;
        return;
      }
    }

    if (
      Math.hypot(
        cX - (window.innerWidth >> 1),
        cY - (window.innerHeight >> 1)
      ) < fixationSize
    ) {
      // Clicked on fixation
      hideCursor();
      setTimeout(() => {
        clickedContinue = true;
      }, 17);
    } else {
      // wrongSynth.play();
      clickedContinue = false;
    }
  };

  var level;
  var viewingDistanceDesiredCm;
  var viewingDistanceCm;

  var block;
  var spacingDirection;
  var targetFont;
  var targetCharacterSet;
  var validAns;
  var showCharacterSetWhere;
  var showCharacterSetElement;
  var showCounterBool;
  var showTargetSpecsBool;
  var showConditionNameBool;
  var conditionNameToShow;
  var showViewingDistanceBool;
  const showCharacterSetResponse = {
    current: null,
    onsetTime: 0,
    clickTime: 0,
  };
  var showBoundingBox;
  var showCharacterSetBoundingBox;
  var stimulusParameters;
  var targetKind;
  var targetDurationSec;
  var targetMinimumPix;
  var targetSizeDeg;
  var targetSizeIsHeightBool;
  var thresholdParameter;
  var spacingSymmetry;
  var spacingOverSizeRatio;
  var spacingRelationToSize;
  var targetEccentricityXDeg;
  var targetEccentricityYDeg;
  var targetEccentricityXYDeg;
  var targetSafetyMarginSec;
  // var trackGazeYes;
  // var trackHeadYes;
  var wirelessKeyboardNeededYes;

  var _key_resp_allKeys;
  var trialComponents;

  /* --- SIMULATED --- */
  var simulatedObserver = {};
  /* --- /SIMULATED --- */

  var condition;

  // Credit
  var currentBlockCreditForTrialBreak = 0;

  var skipTrialOrBlock = {
    blockId: null,
    trialId: null,
    skipTrial: false,
    skipBlock: false,
  };

  function trialInstructionRoutineBegin(snapshot) {
    return async function () {
      // Check fullscreen and if not, get fullscreen
      if (!rc.isFullscreen.value && !debug) {
        rc.getFullscreen();
        await sleep(1000);
      }

      trialInstructionClock.reset();
      TrialHandler.fromSnapshot(snapshot);

      const parametersToExcludeFromData = [];
      for (let c of snapshot.handler.getConditions()) {
        if (c.block_condition === trials._currentStaircase._name) {
          condition = c;
          addConditionToData(
            paramReader,
            condition["block_condition"],
            psychoJS.experiment,
            parametersToExcludeFromData
          );
        }
      }
      const block_condition = condition["block_condition"];

      // ! responseType
      originalResponseType = responseType;
      responseType = getResponseType(
        paramReader.read("responseClickedBool", block_condition),
        paramReader.read("responseTypedBool", block_condition),
        paramReader.read("responseTypedEasyEyesKeypadBool", block_condition),
        paramReader.read("responseSpokenBool", block_condition),
        paramReader.read("responseMustClickCrosshairBool", block_condition)
      );
      logger("responseType", responseType);
      if (canClick) showCursor();

      // update trial/block count
      currentTrialIndex = snapshot.thisN + 1;
      currentTrialLength = snapshot.nTotal;
      trialInfoStr = getTrialInfoStr(
        rc.language.value,
        showCounterBool,
        showViewingDistanceBool,
        currentTrialIndex,
        currentTrialLength,
        currentBlockIndex,
        totalBlockCount,
        viewingDistanceCm
      );
      totalTrial.setText(trialInfoStr);
      totalTrial.setFont(instructionFont);
      totalTrial.setHeight(totalTrialConfig.fontSize);
      totalTrial.setPos([window.innerWidth / 2, -window.innerHeight / 2]);
      totalTrial.setAutoDraw(true);

      _instructionBeforeStimulusSetup(
        instructionsText.trial.fixate["spacing"](
          rc.language.value,
          responseType
        )
      );

      fixation.setHeight(fixationSize);
      fixation.setPos(fixationXYPx);
      fixation.tStart = t;
      fixation.frameNStart = frameN;
      fixation.setAutoDraw(true);

      clickedContinue = false;
      document.addEventListener("click", _takeFixationClick);
      document.addEventListener("touchend", _takeFixationClick);

      /* PRECOMPUTE STIMULI FOR THE UPCOMING TRIAL */
      TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
      const reader = paramReader;

      let proposedLevel = currentLoop._currentStaircase.getQuestValue();
      psychoJS.experiment.addData("levelProposedByQUEST", proposedLevel);

      psychoJS.experiment.addData("block_condition", block_condition);
      psychoJS.experiment.addData(
        "flankerOrientation",
        reader.read("spacingDirection", block_condition)
      );
      psychoJS.experiment.addData(
        "targetFont",
        reader.read("targetFont", block_condition)
      );
      // update component parameters for each repeat
      windowWidthCm = rc.screenWidthCm ? rc.screenWidthCm.value : 30;
      windowWidthPx = rc.displayWidthPx.value;
      pixPerCm = windowWidthPx / windowWidthCm;
      if (!rc.screenWidthCm)
        console.warn("[Screen Width] Using arbitrary screen width. Enable RC.");

      viewingDistanceDesiredCm = reader.read(
        "viewingDistanceDesiredCm",
        block_condition
      );
      // viewingDistanceDesiredCm = 10;
      viewingDistanceCm = rc.viewingDistanceCm
        ? rc.viewingDistanceCm.value
        : viewingDistanceDesiredCm;
      if (!rc.viewingDistanceCm)
        console.warn(
          "[Viewing Distance] Using arbitrary viewing distance. Enable RC."
        );

      block = condition["block"];

      // TODO check that we are actually trying to test for "spacing", not "size"

      spacingDirection = reader.read("spacingDirection", block_condition);
      spacingSymmetry = reader.read("spacingSymmetry", block_condition);
      let targetFontSource = reader.read("targetFontSource", block_condition);
      targetFont = reader.read("targetFont", block_condition);
      if (targetFontSource === "file") targetFont = cleanFontName(targetFont);

      targetCharacterSet = String(
        reader.read("targetCharacterSet", block_condition)
      ).split("");
      validAns = String(reader.read("targetCharacterSet", block_condition))
        .toLowerCase()
        .split("");

      showCharacterSetWhere = reader.read(
        "showCharacterSetWhere",
        block_condition
      );
      showViewingDistanceBool = reader.read(
        "showViewingDistanceBool",
        block_condition
      );
      showCounterBool = reader.read("showCounterBool", block_condition);

      showConditionNameBool = paramReader.read(
        "showConditionNameBool",
        block_condition
      );
      conditionNameToShow = paramReader.read("conditionName", block_condition);

      showTargetSpecsBool = paramReader.read(
        "showTargetSpecsBool",
        block_condition
      );

      conditionTrials = reader.read("conditionTrials", block_condition);
      targetDurationSec = reader.read("targetDurationSec", block_condition);

      fixationSize = 45; // TODO use .csv parameters, ie draw as 2 lines, not one letter
      showFixation = reader.read("markTheFixationBool", block_condition);

      targetKind = reader.read("targetKind", block_condition);
      targetSizeDeg = reader.read("targetSizeDeg", block_condition);
      targetSizeIsHeightBool = reader.read(
        "targetSizeIsHeightBool",
        block_condition
      );
      thresholdParameter = reader.read("thresholdParameter", block_condition);
      targetMinimumPix = reader.read("targetMinimumPix", block_condition);
      spacingOverSizeRatio = reader.read(
        "spacingOverSizeRatio",
        block_condition
      );
      spacingRelationToSize = reader.read(
        "spacingRelationToSize",
        block_condition
      );
      showBoundingBox =
        reader.read("showBoundingBoxBool", block_condition) || false;
      showCharacterSetBoundingBox = reader.read(
        "showCharacterSetBoundingBoxBool",
        block_condition
      );

      targetMinimumPix = reader.read("targetMinimumPix", block_condition);
      targetEccentricityXDeg = reader.read(
        "targetEccentricityXDeg",
        block_condition
      );
      psychoJS.experiment.addData(
        "targetEccentricityXDeg",
        targetEccentricityXDeg
      );
      targetEccentricityYDeg = reader.read(
        "targetEccentricityYDeg",
        block_condition
      );
      psychoJS.experiment.addData(
        "targetEccentricityYDeg",
        targetEccentricityYDeg
      );
      targetEccentricityXYDeg = [
        targetEccentricityXDeg,
        targetEccentricityYDeg,
      ];
      targetSafetyMarginSec = paramReader.read(
        "targetSafetyMarginSec",
        block_condition
      );

      // trackGazeYes = reader.read("trackGazeYes", block_condition);
      // trackHeadYes = reader.read("trackHeadYes", block_condition);
      wirelessKeyboardNeededYes = reader.read(
        "wirelessKeyboardNeededYes",
        block_condition
      );

      var characterSet = targetCharacterSet;

      /* ------------------------------ Pick triplets ----------------------------- */
      if (characterSet.length < 3)
        throw `[EasyEyes experiment configuration error] You must have 3 characters in your character set for this block_condition, however, the researcher only put ${characterSet.length}.`;
      var [firstFlankerCharacter, targetCharacter, secondFlankerCharacter] =
        getTripletCharacters(characterSet);
      if (debug)
        console.log(
          `%c${firstFlankerCharacter} ${targetCharacter} ${secondFlankerCharacter}`,
          "color: red; font-size: 1.5rem"
        );
      correctAns = targetCharacter.toLowerCase();
      /* -------------------------------------------------------------------------- */

      var targetEccentricityXYPx;

      ////
      // !
      displayOptions = {
        pixPerCm: pixPerCm,
        viewingDistanceCm: viewingDistanceCm,
        nearPointXYDeg: nearPointXYDeg,
        nearPointXYPix: nearPointXYPix,
        fixationXYPix: fixationXYPx,
        spacingOverSizeRatio: spacingOverSizeRatio,
        targetMinimumPix: targetMinimumPix,
        fontFamily: targetFont,
        window: psychoJS.window,
        spacingRelationToSize: spacingRelationToSize,
        targetEccentricityXYDeg: targetEccentricityXYDeg,
        spacingDirection: spacingDirection,
        flankerCharacters: [firstFlankerCharacter, secondFlankerCharacter],
        targetCharacter: targetCharacter,
        targetSizeDeg: targetSizeDeg,
        targetKind: targetKind,
      };

      grid.update(
        paramReader.read("showGrid", block_condition),
        displayOptions
      );

      // Fixation placement does not depend on the value of "spacingRelationToSize"...
      fixation.setPos(fixationXYPx);
      fixation.setHeight(fixationSize);
      // ... neither does target location...
      targetEccentricityXYPx = XYPixOfXYDeg(
        targetEccentricityXYDeg,
        displayOptions
      );
      // targetEccentricityXYPx = targetEccentricityXYPx.map(Math.round);
      psychoJS.experiment.addData("targetLocationPx", targetEccentricityXYPx);
      target.setPos(targetEccentricityXYPx);
      target.setFont(targetFont);

      // ...but size, and content of the target(& flankers) does.
      psychoJS.experiment.addData(
        "spacingRelationToSize",
        spacingRelationToSize
      );
      [level, stimulusParameters] = restrictLevel(
        proposedLevel,
        thresholdParameter,
        characterSetBoundingRects[block_condition],
        spacingDirection,
        spacingRelationToSize,
        spacingSymmetry,
        spacingOverSizeRatio,
        targetSizeIsHeightBool,
        displayOptions
      );
      psychoJS.experiment.addData("level", level);
      psychoJS.experiment.addData("heightPx", stimulusParameters.heightPx);
      target.setHeight(stimulusParameters.heightPx);
      target.setPos(stimulusParameters.targetAndFlankersXYPx[0]);
      psychoJS.experiment.addData(
        "targetLocationPx",
        stimulusParameters.targetAndFlankersXYPx[0]
      );
      switch (thresholdParameter) {
        case "size":
          flanker1.setAutoDraw(false);
          flanker2.setAutoDraw(false);
          break;
        case "spacing":
          switch (spacingRelationToSize) {
            case "none":
            case "ratio":
              target.setText(targetCharacter);
              flanker1.setText(firstFlankerCharacter);
              flanker2.setText(secondFlankerCharacter);
              flanker1.setPos(stimulusParameters.targetAndFlankersXYPx[1]);
              flanker2.setPos(stimulusParameters.targetAndFlankersXYPx[2]);
              flanker1.setFont(targetFont);
              flanker2.setFont(targetFont);
              flanker1.setHeight(stimulusParameters.heightPx);
              flanker2.setHeight(stimulusParameters.heightPx);
              psychoJS.experiment.addData("flankerLocationsPx", [
                stimulusParameters.targetAndFlankersXYPx[1],
                stimulusParameters.targetAndFlankersXYPx[2],
              ]);
              break;
            case "typographic":
              // ...include the flankers in the same string/stim as the target.
              // const flankersAndTargetString =
              //   firstFlankerCharacter +
              //   targetCharacter +
              //   secondFlankerCharacter;
              target.setText(
                firstFlankerCharacter + targetCharacter + secondFlankerCharacter
              );
              flanker1.setAutoDraw(false);
              flanker2.setAutoDraw(false);
              break;
          }
          break;
      }
      [
        target,
        flanker1,
        flanker2,
        fixation,
        showCharacterSet,
        totalTrial,
      ].forEach((c) => c._updateIfNeeded());

      const tripletStims = {
        target: target,
        flanker1: flanker1,
        flanker2: flanker2,
      };
      sizeAndPositionBoundingBoxes(
        {
          stimulus: showBoundingBox,
          characterSet: showCharacterSetBoundingBox,
        },
        {
          stimulus: boundingBoxPolies,
          characterSet: characterSetBoundingBoxPolies,
        },
        displayCharacterSetBoundingBoxPolies[block_condition],
        tripletStims,
        characterSetBoundingRects[block_condition],
        {
          heightPx: stimulusParameters.heightPx,
          spacingRelationToSize: spacingRelationToSize,
          thresholdParameter: thresholdParameter,
          windowSize: psychoJS.window._size,
          targetFont: targetFont,
        }
      );
      showCharacterSet.setPos([0, 0]);
      showCharacterSet.setText("");
      // showCharacterSet.setText(getCharacterSetShowText(validAns))

      if (showTargetSpecsBool) {
        let targetSpecsString = `size: ${stimulusParameters.sizeDeg} deg
${
  stimulusParameters.spacingDeg
    ? `spacing: ${stimulusParameters.spacingDeg} deg`
    : ""
}
heightDeg: ${stimulusParameters.heightDeg} deg,
targetFont: ${targetFont}
spacingRelationToSize: ${spacingRelationToSize}
spacingOverSizeRatio: ${spacingOverSizeRatio}
spacingSymmetry: ${spacingSymmetry}
targetSizeIsHeightBool: ${targetSizeIsHeightBool}
targetEccentricityXYDeg: ${targetEccentricityXYDeg}
viewingDistanceCm: ${viewingDistanceCm}`;
        targetSpecs.setText(targetSpecsString);
        targetSpecs.setPos([-window.innerWidth / 2, -window.innerHeight / 2]);
        targetSpecs.setAutoDraw(true);
      }

      showConditionName(
        showConditionNameBool,
        showTargetSpecsBool,
        conditionName,
        targetSpecs,
        conditionNameToShow
      );

      trialInfoStr = getTrialInfoStr(
        rc.language.value,
        showCounterBool,
        showViewingDistanceBool,
        currentTrialIndex,
        currentTrialLength,
        currentBlockIndex,
        totalBlockCount,
        viewingDistanceCm
      );
      totalTrial.setText(trialInfoStr);
      totalTrial.setFont(instructionFont);
      totalTrial.setHeight(totalTrialConfig.fontSize);
      totalTrial.setPos([window.innerWidth / 2, -window.innerHeight / 2]);
      // // totalTrialIndex = nextTrialInfo.trial;
      // // totalBlockIndex = nextTrialInfo.block
      // // keep track of which components have finished
      trialComponents = [];
      trialComponents.push(key_resp);
      trialComponents.push(fixation);
      trialComponents.push(flanker1);
      trialComponents.push(target);
      trialComponents.push(flanker2);

      trialComponents.push(showCharacterSet);
      // trialComponents.push(totalTrial);
      // if (showTargetSpecsBool) trialComponents.push(targetSpecs);
      // /* --- BOUNDING BOX --- */
      addBoundingBoxesToComponents(
        showBoundingBox,
        showCharacterSetBoundingBox,
        boundingBoxPolies,
        characterSetBoundingBoxPolies,
        displayCharacterSetBoundingBoxPolies[block_condition],
        spacingRelationToSize,
        thresholdParameter,
        trialComponents
      );
      // /* --- /BOUNDING BOX --- */
      // /* --- SIMULATED --- */
      if (simulated && simulated[block]) {
        if (!simulatedObserver[block_condition]) {
          simulatedObserver[block_condition] = new SimulatedObserver(
            simulated[block][block_condition],
            level,
            characterSet,
            targetCharacter,
            paramReader.read("thresholdProportionCorrect", block_condition),
            paramReader.read("simulationBeta", block_condition),
            paramReader.read("simulationDelta", block_condition),
            paramReader.read("simulationThreshold", block_condition)
          );
        } else {
          simulatedObserver[block_condition].updateTrial(
            level,
            characterSet,
            targetCharacter
          );
        }
      }
      // /* --- /SIMULATED --- */

      for (const thisComponent of trialComponents)
        if ("status" in thisComponent)
          thisComponent.status = PsychoJS.Status.NOT_STARTED;

      // update trial index
      // totalTrialIndex = totalTrialIndex + 1;
      /* /PRECOMPUTE STIMULI FOR THE UPCOMING TRIAL */

      psychoJS.eventManager.clearKeys();

      psychoJS.experiment.addData(
        "trialInstructionBeginDurationSec",
        trialInstructionClock.getTime()
      );

      if (condition["showTakeABreakCreditBool"]) {
        showTrialBreakProgressBar(currentBlockCreditForTrialBreak);
      } else {
        hideTrialBreakProgressBar();
      }

      return Scheduler.Event.NEXT;
    };
  }

  function trialInstructionRoutineEachFrame() {
    return async function () {
      if (
        (skipTrialOrBlock.trialId == currentTrialIndex &&
          skipTrialOrBlock.blockId == currentBlockIndex &&
          skipTrialOrBlock.skipTrial) ||
        (skipTrialOrBlock.blockId == currentBlockIndex &&
          skipTrialOrBlock.skipBlock)
      ) {
        showCursor();
        return Scheduler.Event.NEXT;
      }
      /* --- SIMULATED --- */
      if (simulated && simulated[thisLoopNumber]) return Scheduler.Event.NEXT;
      /* --- /SIMULATED --- */
      t = instructionsClock.getTime();
      frameN = frameN + 1;

      if (showTargetSpecsBool) {
        targetSpecsConfig.x = -window.innerWidth / 2;
        targetSpecsConfig.y = -window.innerHeight / 2;
        if (targetSpecs.status === PsychoJS.Status.NOT_STARTED) {
          // keep track of start time/frame for later
          targetSpecs.tStart = t; // (not accounting for frame time here)
          targetSpecs.frameNStart = frameN; // exact frame index
        }
        targetSpecs.setAutoDraw(true);
      }

      if (showConditionNameBool) {
        updateConditionNameConfig(conditionNameConfig, false);
        if (conditionName.status === PsychoJS.Status.NOT_STARTED) {
          conditionName.tStart = t;
          conditionName.frameNStart = frameN;
        }
        conditionName.setAutoDraw(true);
      }

      if (
        psychoJS.experiment.experimentEnded ||
        psychoJS.eventManager.getKeys({ keyList: ["escape"] }).length > 0
      ) {
        let action = await handleEscapeKey();
        if (action.quitSurvey) {
          return quitPsychoJS("The [Escape] key was pressed. Goodbye!", false);
        }
        if (action.skipTrial || action.skipBlock) {
          return Scheduler.Event.NEXT;
        }
      }

      if (!continueRoutine) {
        return Scheduler.Event.NEXT;
      }

      continueRoutine = true;
      if (
        canType(responseType) &&
        psychoJS.eventManager.getKeys({ keyList: ["space"] }).length > 0
      ) {
        continueRoutine = false;
      }

      if (continueRoutine && !clickedContinue) {
        return Scheduler.Event.FLIP_REPEAT;
      } else {
        return Scheduler.Event.NEXT;
      }
    };
  }

  function trialInstructionRoutineEnd() {
    return async function () {
      if (
        (skipTrialOrBlock.trialId == currentTrialIndex &&
          skipTrialOrBlock.blockId == currentBlockIndex &&
          skipTrialOrBlock.skipTrial) ||
        (skipTrialOrBlock.blockId == currentBlockIndex &&
          skipTrialOrBlock.skipBlock)
      ) {
        showCursor();
        return Scheduler.Event.NEXT;
      }

      document.removeEventListener("click", _takeFixationClick);
      document.removeEventListener("touchend", _takeFixationClick);
      instructions.setAutoDraw(false);

      psychoJS.experiment.addData(
        "trialInstructionRoutineDurationFromBeginSec",
        trialInstructionClock.getTime()
      );
      psychoJS.experiment.addData(
        "trialInstructionRoutineDurationFromPreviousEndSec",
        routineClock.getTime()
      );

      routineTimer.reset();
      routineClock.reset();
      return Scheduler.Event.NEXT;
    };
  }

  function trialRoutineBegin(snapshot) {
    return async function () {
      // rc.pauseNudger();
      // await sleep(100);

      if (
        (skipTrialOrBlock.trialId == currentTrialIndex &&
          skipTrialOrBlock.blockId == currentBlockIndex &&
          skipTrialOrBlock.skipTrial) ||
        (skipTrialOrBlock.blockId == currentBlockIndex &&
          skipTrialOrBlock.skipBlock)
      ) {
        showCursor();
        return Scheduler.Event.NEXT;
      }

      psychoJS.experiment.addData(
        "clickToTrialPreparationDelaySec",
        routineClock.getTime()
      );
      trialClock.reset(); // clock

      TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date

      hideCursor();

      ////
      if (debug)
        console.log("%c\n\n====== New Trial ======\n\n", "color: purple");
      logger("Level", snapshot.getCurrentTrial().trialsVal);
      logger("Index", snapshot.thisIndex);

      const block_condition = condition["block_condition"];

      responseType = resetResponseType(
        originalResponseType,
        responseType,
        paramReader.read("responseMustClickCrosshairBool", block_condition)
      );

      //------Prepare to start Routine 'trial'-------
      t = 0;
      frameN = -1;
      continueRoutine = true; // until we're told otherwise

      key_resp.keys = undefined;
      key_resp.rt = undefined;
      _key_resp_allKeys = [];

      psychoJS.experiment.addData(
        "trialBeginDurationSec",
        trialClock.getTime()
      );

      _instructionSetup(
        instructionsText.trial.respond["spacing"](
          rc.language.value,
          responseType
        )
      );
      instructions.setText(
        instructionsText.trial.respond["spacing"](
          rc.language.value,
          responseType
        )
      );
      instructions.setAutoDraw(false);

      return Scheduler.Event.NEXT;
    };
  }

  var frameRemains;
  function trialRoutineEachFrame() {
    return async function () {
      if (
        (skipTrialOrBlock.trialId == currentTrialIndex &&
          skipTrialOrBlock.blockId == currentBlockIndex &&
          skipTrialOrBlock.skipTrial) ||
        (skipTrialOrBlock.blockId == currentBlockIndex &&
          skipTrialOrBlock.skipBlock)
      ) {
        showCursor();
        removeClickableCharacterSet();
        return Scheduler.Event.NEXT;
      }

      //------Loop for each frame of Routine 'trial'-------
      // get current time
      t = trialClock.getTime();
      frameN = frameN + 1; // number of completed frames (so 0 is the first frame)
      if (frameN === 0) {
        psychoJS.experiment.addData(
          "clickToStimulusOnsetSec",
          routineClock.getTime()
        );
        /* SAVE INFO ABOUT STIMULUS AS PRESENTED */
        psychoJS.experiment.addData(
          "targetBoundingBox",
          String(target.getBoundingBox(true))
        );
        if (spacingRelationToSize === "ratio") {
          psychoJS.experiment.addData(
            "flanker1BoundingBox",
            String(flanker1.getBoundingBox(true))
          );
          psychoJS.experiment.addData(
            "flanker2BoundingBox",
            String(flanker2.getBoundingBox(true))
          );
        }
        /* /SAVE INFO ABOUT STIMULUS AS PRESENTED */
      }
      // update/draw components on each frame

      const uniDelay = 0;

      // *key_resp* updates
      // TODO although showGrid/simulated should only be activated for experimenters, it's better to have
      // response type more independent
      if (
        canType(responseType) ||
        (simulated &&
          simulated[thisLoopNumber] &&
          simulated[thisLoopNumber][condition.block_condition])
      ) {
        if (t >= uniDelay && key_resp.status === PsychoJS.Status.NOT_STARTED) {
          // keep track of start time/frame for later
          key_resp.tStart = t; // (not accounting for frame time here)
          key_resp.frameNStart = frameN; // exact frame index
          // TODO Use PsychoJS clock if possible
          // Reset together with PsychoJS
          showCharacterSetResponse.onsetTime = performance.now();

          // keyboard checking is just starting
          psychoJS.window.callOnFlip(function () {
            key_resp.clock.reset();
          }); // t=0 on next screen flip
          psychoJS.window.callOnFlip(function () {
            key_resp.start();
          }); // start on screen flip
          psychoJS.window.callOnFlip(function () {
            key_resp.clearEvents();
          });
        }

        if (key_resp.status === PsychoJS.Status.STARTED) {
          /* --- SIMULATED --- */
          if (
            simulated &&
            simulated[thisLoopNumber] &&
            simulated[thisLoopNumber][condition.block_condition]
          ) {
            return simulateObserverResponse(
              simulatedObserver[condition.block_condition],
              key_resp,
              psychoJS
            );
          }
          /* --- /SIMULATED --- */
          let theseKeys = key_resp.getKeys({
            keyList: validAns,
            waitRelease: false,
          });
          _key_resp_allKeys = _key_resp_allKeys.concat(theseKeys);
          if (_key_resp_allKeys.length > 0) {
            key_resp.keys =
              _key_resp_allKeys[_key_resp_allKeys.length - 1].name; // just the last key pressed
            key_resp.rt = _key_resp_allKeys[_key_resp_allKeys.length - 1].rt;
            // was this correct?
            if (key_resp.keys == correctAns) {
              // Play correct audio
              totalCorrect += 1;
              correctSynth.play();
              key_resp.corr = 1;
            } else {
              // Play wrong audio
              key_resp.corr = 0;
            }
            // a response ends the routine
            continueRoutine = false;
          }
        }
      }

      // *showCharacterSetResponse* updates
      if (showCharacterSetResponse.current) {
        key_resp.keys = showCharacterSetResponse.current;
        key_resp.rt =
          (showCharacterSetResponse.clickTime -
            showCharacterSetResponse.onsetTime) /
          1000;
        if (showCharacterSetResponse.current == correctAns) {
          // Play correct audio
          totalCorrect += 1;
          correctSynth.play();
          key_resp.corr = 1;
        } else {
          // Play wrong audio
          key_resp.corr = 0;
        }
        showCharacterSetResponse.current = null;
        removeClickableCharacterSet();
        continueRoutine = false;
      }

      // *totalTrial* updates
      if (t >= 0.0 && totalTrial.status === PsychoJS.Status.NOT_STARTED) {
        // keep track of start time/frame for later
        totalTrial.tStart = t; // (not accounting for frame time here)
        totalTrial.frameNStart = frameN; // exact frame index

        totalTrial.setAutoDraw(true);
      }

      if (showTargetSpecsBool) {
        targetSpecsConfig.x = -window.innerWidth / 2;
        targetSpecsConfig.y = -window.innerHeight / 2;
        // *targetSpecs* updates
        if (t >= 0.0) {
          targetSpecs.setPos([targetSpecsConfig.x, targetSpecsConfig.y]);
          targetSpecs.setAutoDraw(true);
        }
      }

      if (showConditionNameBool) {
        updateConditionNameConfig(
          conditionNameConfig,
          showTargetSpecsBool,
          targetSpecs
        );
        // *targetSpecs* updates
        if (t >= 0.0) {
          conditionName.setPos([conditionNameConfig.x, conditionNameConfig.y]);
          conditionName.setAutoDraw(true);
        }
      }

      // *fixation* updates
      if (
        t >= 0.0 &&
        fixation.status === PsychoJS.Status.NOT_STARTED &&
        showFixation
      ) {
        // keep track of start time/frame for later
        fixation.tStart = t; // (not accounting for frame time here)
        fixation.frameNStart = frameN; // exact frame index

        fixation.setAutoDraw(true);
      }

      // *flanker1* updates
      if (t >= uniDelay && flanker1.status === PsychoJS.Status.NOT_STARTED) {
        // keep track of start time/frame for later
        flanker1.tStart = t; // (not accounting for frame time here)
        flanker1.frameNStart = frameN; // exact frame index

        if (spacingRelationToSize === "typographic") {
          flanker1.setAutoDraw(false);
        } else {
          flanker1.setAutoDraw(true);
        }
      }

      frameRemains =
        uniDelay +
        targetDurationSec -
        psychoJS.window.monitorFramePeriod * 0.75; // most of one frame period left
      if (flanker1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
        flanker1.setAutoDraw(false);
      }

      // *target* updates
      if (t >= uniDelay && target.status === PsychoJS.Status.NOT_STARTED) {
        // keep track of start time/frame for later
        target.tStart = t; // (not accounting for frame time here)
        target.frameNStart = frameN; // exact frame index

        // NOTE these two values are not equivalent
        logger("target bb.x, bb.y", [
          target.getBoundingBox(true).x,
          target.getBoundingBox(true).y,
        ]);
        logger("target pos", target.getPos());

        target.setAutoDraw(true);
      }

      if (target.status === PsychoJS.Status.STARTED && t >= frameRemains) {
        target.setAutoDraw(false);
        // Play purr sound
        // Wait until next frame to play
        setTimeout(() => {
          purrSynth.play();
        }, 17);
        setTimeout(() => {
          showCursor();
        }, 500);
      }

      // *flanker2* updates
      if (t >= uniDelay && flanker2.status === PsychoJS.Status.NOT_STARTED) {
        // keep track of start time/frame for later
        flanker2.tStart = t; // (not accounting for frame time here)
        flanker2.frameNStart = frameN; // exact frame index

        if (spacingRelationToSize === "typographic") {
          flanker2.setAutoDraw(false);
        } else {
          flanker2.setAutoDraw(true);
        }
      }

      if (flanker2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
        flanker2.setAutoDraw(false);
      }

      // check for quit (typically the Esc key)
      if (
        psychoJS.experiment.experimentEnded ||
        psychoJS.eventManager.getKeys({ keyList: ["escape"] }).length > 0
      ) {
        let action = await handleEscapeKey();
        if (action.quitSurvey) {
          return quitPsychoJS("The [Escape] key was pressed. Goodbye!", false);
        }
      }

      const timeWhenRespondable =
        uniDelay + targetSafetyMarginSec + targetDurationSec;
      updateBoundingBoxPolies(
        t,
        frameRemains,
        frameN,
        showBoundingBox,
        showCharacterSetBoundingBox,
        boundingBoxPolies,
        characterSetBoundingBoxPolies,
        displayCharacterSetBoundingBoxPolies[condition.block_condition],
        spacingRelationToSize,
        timeWhenRespondable,
        thresholdParameter
      );
      /* -------------------------------------------------------------------------- */
      // SHOW CharacterSet AND INSTRUCTIONS
      // *showCharacterSet* updates
      if (
        t >= uniDelay + targetSafetyMarginSec + targetDurationSec &&
        showCharacterSet.status === PsychoJS.Status.NOT_STARTED
      ) {
        // keep track of start time/frame for later
        showCharacterSet.tStart = t; // (not accounting for frame time here)
        showCharacterSet.frameNStart = frameN; // exact frame index
        showCharacterSet.setAutoDraw(true);
        showCharacterSetElement = setupClickableCharacterSet(
          targetCharacterSet,
          targetFont,
          showCharacterSetWhere,
          showCharacterSetResponse
        );

        instructions.tSTart = t;
        instructions.frameNStart = frameN;
        instructions.setAutoDraw(true);
      }
      /* -------------------------------------------------------------------------- */

      // check if the Routine should terminate
      if (!continueRoutine) {
        // a component has requested a forced-end of Routine
        removeClickableCharacterSet();
        return Scheduler.Event.NEXT;
      }

      continueRoutine = false; // reverts to True if at least one component still running
      for (const thisComponent of trialComponents)
        if (
          "status" in thisComponent &&
          thisComponent.status !== PsychoJS.Status.FINISHED
        ) {
          continueRoutine = true;
          break;
        }

      // refresh the screen if continuing
      if (continueRoutine) {
        return Scheduler.Event.FLIP_REPEAT;
      } else {
        return Scheduler.Event.NEXT;
      }
    };
  }

  function trialRoutineEnd() {
    return async function () {
      ////
      grid.hide(true);

      if (showTargetSpecsBool) targetSpecs.setAutoDraw(false);
      if (showConditionNameBool) conditionName.setAutoDraw(false);

      if (
        (skipTrialOrBlock.trialId == currentTrialIndex &&
          skipTrialOrBlock.blockId == currentBlockIndex &&
          skipTrialOrBlock.skipTrial) ||
        (skipTrialOrBlock.blockId == currentBlockIndex &&
          skipTrialOrBlock.skipBlock)
      ) {
        showCursor();
        if (currentLoop instanceof MultiStairHandler) {
          for (const thisComponent of trialComponents) {
            if (typeof thisComponent.setAutoDraw === "function") {
              thisComponent.setAutoDraw(false);
            }
          }
          currentLoop.addResponse(0, level);
          routineTimer.reset();
          routineClock.reset();
        }
        key_resp.stop();
        return Scheduler.Event.NEXT;
      }

      // setTimeout(() => {
      //   rc.resumeNudger();
      // }, 700);

      //------Ending Routine 'trial'-------
      for (const thisComponent of trialComponents) {
        if (typeof thisComponent.setAutoDraw === "function") {
          thisComponent.setAutoDraw(false);
        }
      }
      // was no response the correct answer?!
      if (key_resp.keys === undefined) {
        console.error("[key_resp.keys] No response error.");
      }
      // store data for psychoJS.experiment (ExperimentHandler)
      // update the trial handler
      if (currentLoop instanceof MultiStairHandler) {
        currentLoop.addResponse(key_resp.corr, level);
        // TODO Should it be placed outside of the if statement?
        addTrialStaircaseSummariesToData(currentLoop, psychoJS); // !
      } else {
        console.error("currentLoop is not MultiStairHandler");
      }

      psychoJS.experiment.addData("key_resp.keys", key_resp.keys);
      psychoJS.experiment.addData("key_resp.corr", key_resp.corr);
      if (typeof key_resp.keys !== "undefined") {
        // we had a response
        psychoJS.experiment.addData("key_resp.rt", key_resp.rt);
        psychoJS.experiment.addData(
          "trialRoutineDurationFromBeginSec",
          trialClock.getTime()
        );
        psychoJS.experiment.addData(
          "trialRoutineDurationFromPreviousEndSec",
          routineClock.getTime()
        );

        routineTimer.reset();
        routineClock.reset();
      }

      key_resp.stop();
      // the Routine "trial" was not non-slip safe, so reset the non-slip timer
      routineTimer.reset();
      routineClock.reset();

      // Increase takeABreakCredit
      // TODO This way of using condition is BAD
      currentBlockCreditForTrialBreak += condition["takeABreakTrialCredit"];

      // Toggle takeABreak credit progressBar
      // TODO This way of using condition is BAD
      if (condition["showTakeABreakCreditBool"]) {
        showTrialBreakProgressBar(currentBlockCreditForTrialBreak);
      } else {
        hideTrialBreakProgressBar();
      }

      // Check if trialBreak should be triggered
      if (currentBlockCreditForTrialBreak >= 1) {
        currentBlockCreditForTrialBreak -= 1;

        showPopup(
          expName,
          "Good work! Please take a brief break to relax and blink.",
          "",
          true
        );
        const takeABreakMinimumDurationSec =
          condition["takeABreakMinimumDurationSec"];

        return new Promise((resolve) => {
          // After break time out...
          setTimeout(() => {
            // Show proceed hint and/or button
            showPopupProceed(
              expName,
              instructionsText.trialBreak(rc.language.value, responseType),
              canClick(responseType)
            );
            addPopupLogic(expName, responseType, () => {
              resolve(Scheduler.Event.NEXT);
            });
          }, takeABreakMinimumDurationSec * 1000);
        });
      }

      // if trialBreak is ongoing
      else if (currentTrialLength === currentTrialIndex)
        hideTrialBreakProgressBar();
      return Scheduler.Event.NEXT;
    };
  }

  function endLoopIteration(scheduler, snapshot) {
    // ------Prepare for next entry------
    return async function () {
      if (
        (skipTrialOrBlock.trialId == currentTrialIndex &&
          skipTrialOrBlock.blockId == currentBlockIndex &&
          skipTrialOrBlock.skipTrial) ||
        (skipTrialOrBlock.blockId == currentBlockIndex &&
          skipTrialOrBlock.skipBlock)
      ) {
        showCursor();
        psychoJS.experiment.nextEntry(snapshot);
        return Scheduler.Event.NEXT;
      }

      if (typeof snapshot !== "undefined") {
        // ------Check if user ended loop early------
        if (snapshot.finished) {
          // Check for and save orphaned data
          if (psychoJS.experiment.isEntryEmpty()) {
            psychoJS.experiment.nextEntry(snapshot);
          }
          scheduler.stop();
        } else {
          const thisTrial = snapshot.getCurrentTrial();
          if (
            typeof thisTrial === "undefined" ||
            !("isTrials" in thisTrial) ||
            thisTrial.isTrials
          ) {
            psychoJS.experiment.nextEntry(snapshot);
          }
        }
        return Scheduler.Event.NEXT;
      }
    };
  }

  function importConditions(currentLoopSnapshot) {
    return async function () {
      logger("current trial", currentLoopSnapshot.getCurrentTrial());
      psychoJS.importAttributes(currentLoopSnapshot.getCurrentTrial());
      return Scheduler.Event.NEXT;
    };
  }

  async function quitPsychoJS(message, isCompleted) {
    removeClickableCharacterSet();
    rc.endNudger();
    showCursor();

    // Check for and save orphaned data
    if (psychoJS.experiment.isEntryEmpty()) {
      psychoJS.experiment.nextEntry();
    }
    psychoJS.window.close();

    const timeBeforeDebriefDisplay = globalClock.getTime();
    const debriefScreen = new Promise((resolve) => {
      if (paramReader.read("_debriefForm")[0]) {
        showForm(paramReader.read("_debriefForm")[0]);
        document.getElementById("form-yes").addEventListener("click", () => {
          hideForm();
          resolve();
        });

        document.getElementById("form-no").addEventListener("click", () => {
          hideForm();
          resolve();
        });
      } else {
        resolve();
      }
    });
    await debriefScreen;

    psychoJS.experiment.addData(
      "debriefDurationSec",
      globalClock.getTime() - timeBeforeDebriefDisplay
    );
    psychoJS.experiment.addData(
      "durationOfExperimentSec",
      globalClock.getTime()
    );

    if (recruitmentServiceData.name == "Prolific" && isCompleted) {
      let additionalMessage = ` Please visit <a target="_blank" href="${recruitmentServiceData.url}">HERE</a> to complete the experiment.`;
      psychoJS.quit({
        message: message + additionalMessage,
        isCompleted: isCompleted,
      });
    } else {
      psychoJS.quit({ message: message, isCompleted: isCompleted });
    }

    return Scheduler.Event.QUIT;
  }

  async function handleEscapeKey() {
    // check if esc handling enabled for this condition, if not, quit
    if (
      !(
        condition.responseEscapeOptionsBool &&
        condition.responseEscapeOptionsBool.toString().toLowerCase() === "true"
      )
    ) {
      showCursor();
      return {
        skipTrial: false,
        skipBlock: false,
        quitSurvey: true,
      };
    }

    function logKey(e) {
      switch (e.code) {
        case "Escape":
          modalButtonTriggeredViaKeyboard = true;
          document.getElementById("quit-btn").click();
          break;
        case "Enter":
          modalButtonTriggeredViaKeyboard = true;
          document.getElementById("skip-block-btn").click();
          break;
        case "Space":
          modalButtonTriggeredViaKeyboard = true;
          document.getElementById("skip-trial-btn").click();
          break;
      }
    }

    document.addEventListener("keydown", logKey);
    document.getElementById("skip-trial-btn").disabled = false;
    document.getElementById("skip-block-btn").disabled = false;
    document.getElementById("quit-btn").disabled = false;
    if (!(isProlificPreviewExperiment() || isPavloviaExperiment())) {
      // hide skipBlock Btn
      document.getElementById("skip-block-btn").style.visibility = "hidden";
      document.getElementById("skip-block-btn").disabled = true;
      document.getElementById("skip-block-div").style.visibility = "hidden";
    }
    let action = {
      skipTrial: false,
      skipBlock: false,
      quitSurvey: false,
    };
    const escapeKeyHandling = new Promise((resolve) => {
      // ! Maybe switch to import?
      // eslint-disable-next-line no-undef
      let dialog = new bootstrap.Modal(
        document.getElementById("exampleModal"),
        { backdrop: "static", keyboard: false }
      );
      document.getElementById("quit-btn").addEventListener("click", (event) => {
        event.preventDefault();
        action.quitSurvey = true;
        dialog.hide();
        resolve();
      });
      document
        .getElementById("skip-trial-btn")
        .addEventListener("click", (event) => {
          loggerText("--- SKIP TRIAL ---");
          event.preventDefault();
          skipTrialOrBlock.skipTrial = true;
          skipTrialOrBlock.trialId = currentTrialIndex;
          skipTrialOrBlock.blockId = currentBlockIndex;
          action.skipTrial = true;
          dialog.hide();
          loggerText("--- SKIP TRIAL ENDS ---");
          resolve();
        });
      document
        .getElementById("skip-block-btn")
        .addEventListener("click", (event) => {
          loggerText("--- SKIP BLOCK ---");
          event.preventDefault();
          skipTrialOrBlock.skipBlock = true;
          skipTrialOrBlock.blockId = currentBlockIndex;
          action.skipBlock = true;
          dialog.hide();
          loggerText("--- SKIP BLOCK ENDS ---");
          resolve();
        });
      dialog.show();
    });
    await escapeKeyHandling;
    document.getElementById("skip-trial-btn").disabled = true;
    document.getElementById("quit-btn").disabled = true;
    document.getElementById("skip-block-btn").disabled = true;
    // adding following lines to remove listeners
    // TODO Bad code
    document.getElementById("skip-trial-btn").outerHTML =
      document.getElementById("skip-trial-btn").outerHTML;
    document.getElementById("skip-block-btn").outerHTML =
      document.getElementById("skip-block-btn").outerHTML;
    document.getElementById("quit-btn").outerHTML =
      document.getElementById("quit-btn").outerHTML;

    document.removeEventListener("keydown", logKey);
    return action;
  }
};

const isProlificPreviewExperiment = () => {
  let urlSearchParams = new URLSearchParams(window.location.search);
  return (
    urlSearchParams.get("participant") != null &&
    urlSearchParams.get("session") != null &&
    urlSearchParams.get("study_id") != null &&
    urlSearchParams.get("preview") != null
  );
};

const isPavloviaExperiment = () => {
  let urlSearchParams = new URLSearchParams(window.location.search);
  return (
    urlSearchParams.get("participant") == null &&
    urlSearchParams.get("session") == null &&
    urlSearchParams.get("study_id") == null
  );
};
