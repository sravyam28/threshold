import { letterConfig } from "./global";

export const readTrialLevelLetterParams = (reader, BC) => {
  letterConfig.thresholdParameter = reader.read("thresholdParameter", BC);
  letterConfig.targetDurationSec = reader.read("targetDurationSec", BC);
  letterConfig.delayBeforeStimOnsetSec = reader.read(
    "markingOffsetBeforeTargetOnsetSecs",
    BC
  );
  letterConfig.spacingDirection = reader.read("spacingDirection", BC);
  letterConfig.spacingSymmetry = reader.read("spacingSymmetry", BC);
  letterConfig.targetSizeIsHeightBool = reader.read(
    "targetSizeIsHeightBool",
    BC
  );
  letterConfig.targetMinimumPix = reader.read("targetMinimumPix", BC);
  letterConfig.spacingOverSizeRatio = reader.read("spacingOverSizeRatio", BC);
  letterConfig.spacingRelationToSize = reader.read("spacingRelationToSize", BC);
  letterConfig.targetMinimumPix = reader.read("targetMinimumPix", BC);
  const targetEccentricityXDeg = reader.read("targetEccentricityXDeg", BC);
  const targetEccentricityYDeg = reader.read("targetEccentricityYDeg", BC);
  letterConfig.targetEccentricityXYDeg = [
    targetEccentricityXDeg,
    targetEccentricityYDeg,
  ];

  letterConfig.targetSafetyMarginSec = reader.read("targetSafetyMarginSec", BC);
};
