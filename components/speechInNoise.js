import mergeBuffers from "merge-audio-buffers";
import { soundCalibrationResults } from "./global";
import {
  calculateDBFromRMS,
  CompressorDb,
  CompressorInverseDb,
  getGainValue,
  getMaxValueOfAbsoluteValueOfBuffer,
} from "./soundTest";
// import { getCorrectedInDbAndSoundDBSPL } from "./soundTest";
import {
  setWaveFormToZeroDbSPL,
  adjustSoundDbSPL,
  audioCtx,
  initSoundFiles,
  initSoundFilesWithPromiseAll,
} from "./soundUtils";
//var maskerList = {};
var targetList = {};

var whiteNoise;
var whiteNoiseData;

export const initSpeechInNoiseSoundFiles = async (trialsConditions) => {
  const blockFiles = await initSoundFilesWithPromiseAll(trialsConditions);
  targetList = blockFiles["target"];

  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      // console.log("targetList", targetList);
      if (Object.keys(targetList).length !== 0) {
        clearInterval(interval);
        resolve(true);
      }
    }, 100);
  });
};

export const getSpeechInNoiseTrialData = async (
  blockCondition,
  targetVolumeDbSPLFromQuest,
  whiteNoiseLevel,
  soundGainDBSPL,
  parameters
) => {
  var trialTarget;

  //pick and modify target
  var randomIndex = Math.floor(
    Math.random() * targetList[blockCondition].length
  );
  trialTarget = await targetList[blockCondition][randomIndex]["file"];
  var trialTargetData = trialTarget.getChannelData(0);
  setWaveFormToZeroDbSPL(trialTargetData);
  whiteNoise = audioCtx.createBuffer(
    1,
    trialTargetData.length,
    audioCtx.sampleRate
  );

  whiteNoiseData = whiteNoise.getChannelData(0);
  for (var i = 0; i < whiteNoiseData.length; i++) {
    whiteNoiseData[i] = Math.random() * 2 - 1;
  }
  setWaveFormToZeroDbSPL(whiteNoiseData);
  // check noise and masker levels
  const noiseDB = CompressorInverseDb(
    whiteNoiseLevel - soundGainDBSPL,
    parameters.T,
    parameters.R,
    parameters.W
  );
  const noiseMaxOverRms =
    getMaxValueOfAbsoluteValueOfBuffer(whiteNoiseData) / 1;
  const noiseGain = getGainValue(noiseDB);

  if (noiseMaxOverRms * noiseGain > 1) {
    throw "The noise level given is too high to play without distortion";
  }
  adjustSoundDbSPL(whiteNoiseData, noiseDB);

  const correctedValuesForTarget =
    getCorrectedInDbAndSoundDBSPLForSpeechInNoise(
      targetVolumeDbSPLFromQuest,
      soundGainDBSPL,
      parameters,
      trialTargetData,
      whiteNoiseData,
      whiteNoiseLevel
    );
  adjustSoundDbSPL(trialTargetData, correctedValuesForTarget.inDB);

  return {
    targetList: targetList[blockCondition],
    trialSound: mergeBuffers([trialTarget, whiteNoise], audioCtx),
    correctAnsIndex: randomIndex,
    targetVolume: correctedValuesForTarget.correctedSoundDBSPL,
  };
  //return mergeBuffers([trialTarget, whiteNoise], audioCtx);
};

export const getCorrectedInDbAndSoundDBSPLForSpeechInNoise = (
  soundDBSPL,
  soundGain,
  parameters,
  audioData,
  whiteNoiseData,
  whiteNoiseLevel
) => {
  const noiseDB = CompressorInverseDb(
    whiteNoiseLevel - soundGain,
    parameters.T,
    parameters.R,
    parameters.W
  );
  const noiseMaxOverRms =
    getMaxValueOfAbsoluteValueOfBuffer(whiteNoiseData) / 1;
  const noiseGain = getGainValue(noiseDB);

  const targetMaxOverRms = getMaxValueOfAbsoluteValueOfBuffer(audioData) / 1;
  const targetCeiling = 1 - noiseMaxOverRms * noiseGain;
  const targetDB = CompressorInverseDb(
    soundDBSPL - soundGain,
    parameters.T,
    parameters.R,
    parameters.W
  );
  const targetGain = getGainValue(targetDB);

  const inDB =
    targetMaxOverRms * targetGain > targetCeiling
      ? calculateDBFromRMS(targetCeiling / targetMaxOverRms)
      : targetDB;
  const correctedSoundDBSPL =
    soundGain + CompressorDb(inDB, parameters.T, parameters.R, parameters.W);
  return { inDB, correctedSoundDBSPL };
};
