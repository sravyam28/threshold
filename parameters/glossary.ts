/*
  Do not modify this file! Run npm `npm run glossary` at ROOT of this project to fetch from the Google Sheets.
  https://docs.google.com/spreadsheets/d/1x65NjykMm-XUOz98Eu_oo6ON2xspm_h0Q0M2u6UGtug/edit#gid=1287694458 
*/

interface Glossary {
  [parameter: string]: { [field: string]: string | string[] };
}

export const GLOSSARY: Glossary = {
  _about: { name: "_about", availability: "now", type: "text", default: "" },
  _authorEmails: {
    name: "_authorEmails",
    availability: "now",
    type: "text",
    default: "",
  },
  _authors: {
    name: "_authors",
    availability: "now",
    type: "text",
    default: "",
  },
  _compatibleBrowser: {
    name: "_compatibleBrowser",
    availability: "now",
    type: "multicategorical",
    default: "Chrome",
    categories: [
      "all",
      "Chrome",
      "Safari",
      "Firefox",
      "Opera",
      "Edge",
      "Chromium",
      "Tor",
      "Duckduckgo",
      "Brave",
      "Vivaldi",
      "Midori",
      "SamsungInternet",
      "UCBrowser",
      "Android",
      "Firefox",
      "QQBrowser",
      "Instabridge",
      "WhaleBrowser",
      "Puffin",
      "YandexBrowser",
      "EdgeLegacy",
      "Edge",
      "CocCoc",
      "notChrome",
      "notSafari",
      "notFirefox",
      "notOpera",
      "notEdge",
      "notChromium",
      "notTor",
      "notDuckduckgo",
      "notBrave",
      "notVivaldi",
      "notMidori",
      "notSamsungInternet",
      "notUCBrowser",
      "notAndroid",
      "notFirefox",
      "notQQBrowser",
      "notInstabridge",
      "notWhaleBrowser",
      "notPuffin",
      "notYandexBrowser",
      "notEdgeLegacy",
      "notEdge",
      "notCocCoc",
    ],
  },
  _compatibleBrowserVersionMinimum: {
    name: "_compatibleBrowserVersionMinimum",
    availability: "now",
    type: "integer",
    default: "0",
  },
  _compatibleCameraBool: {
    name: "_compatibleCameraBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  _compatibleDeviceType: {
    name: "_compatibleDeviceType",
    availability: "now",
    type: "multicategorical",
    default: "desktop",
    categories: ["all", "desktop", "tablet", "mobile"],
  },
  _compatibleDisplay: {
    name: "_compatibleDisplay",
    availability: "now",
    type: "multicategorical",
    default: "",
    categories: ["hdrMovie", "tenBit"],
  },
  _compatibleIPhoneTooBool: {
    name: "_compatibleIPhoneTooBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  _compatibleOperatingSystem: {
    name: "_compatibleOperatingSystem",
    availability: "now",
    type: "multicategorical",
    default: "all",
    categories: [
      "all",
      "macOS",
      "Windows",
      "ChromeOS",
      "ChromiumOS",
      "AndroidOS",
      "iOS",
      "SamsungOS",
      "KaiOS",
      "NokiaOS",
      "Series40OS",
      "Linux",
      "Ubuntu",
      "FreeBSD",
      "Debian",
      "Fedora",
      "Solaris",
      "CentOS",
      "Deepin",
      "notmacOS",
      "notWindows",
      "notChromeOS",
      "notChromiumOS",
      "notAndroidOS",
      "notiOS",
      "notSamsungOS",
      "notKaiOS",
      "notNokiaOS",
      "notSeries40OS",
      "notLinux",
      "notUbuntu",
      "notFreeBSD",
      "notDebian",
      "notFedora",
      "notSolaris",
      "notCentOS",
      "notDeepin",
    ],
  },
  _compatibleProcessorCoresMinimum: {
    name: "_compatibleProcessorCoresMinimum",
    availability: "now",
    type: "integer",
    default: "6",
  },
  _compatibleScreenSizeMinimumPx: {
    name: "_compatibleScreenSizeMinimumPx",
    availability: "now",
    type: "integer",
    default: "",
  },
  _compileAsNewExperimentBool: {
    name: "_compileAsNewExperimentBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  _consentForm: {
    name: "_consentForm",
    availability: "now",
    type: "text",
    default: "",
  },
  _daisyChainURLAfterEasyEyes: {
    name: "_daisyChainURLAfterEasyEyes",
    availability: "now",
    type: "text",
    default: "",
  },
  _daisyChainURLBeforeEasyEyes: {
    name: "_daisyChainURLBeforeEasyEyes",
    availability: "now",
    type: "text",
    default: "",
  },
  _dateCreated: {
    name: "_dateCreated",
    availability: "now",
    type: "date",
    default: " ",
  },
  _dateModified: {
    name: "_dateModified",
    availability: "now",
    type: "date",
    default: " ",
  },
  _debriefForm: {
    name: "_debriefForm",
    availability: "now",
    type: "text",
    default: "",
  },
  _debugBool: {
    name: "_debugBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  _experimentFilename: {
    name: "_experimentFilename",
    availability: "now",
    type: "text",
    default: "",
  },
  _experimentName: {
    name: "_experimentName",
    availability: "now",
    type: "text",
    default: "",
  },
  _invitePartingCommentsBool: {
    name: "_invitePartingCommentsBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  _participantDurationMinutes: {
    name: "_participantDurationMinutes",
    availability: "now",
    type: "numerical",
    default: "30",
  },
  _participantIDGetBool: {
    name: "_participantIDGetBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  _participantIDPutBool: {
    name: "_participantIDPutBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  _participantPay: {
    name: "_participantPay",
    availability: "now",
    type: "numerical",
    default: "7.5",
  },
  _participantPayCurrency: {
    name: "_participantPayCurrency",
    availability: "now",
    type: "categorical",
    default: "USDollar",
    categories: ["USDollar", "Euro", "UKPound"],
  },
  _participantRecruitmentService: {
    name: "_participantRecruitmentService",
    availability: "now",
    type: "categorical",
    default: "none",
    categories: ["none", "Prolific", "MTurk", "SONA"],
  },
  _participantRecruitmentServiceAccount: {
    name: "_participantRecruitmentServiceAccount",
    availability: "now",
    type: "text",
    default: "",
  },
  _participantsHowMany: {
    name: "_participantsHowMany",
    availability: "now",
    type: "integer",
    default: "1",
  },
  _pavloviaPreferRunningModeBool: {
    name: "_pavloviaPreferRunningModeBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  _prolificEligibilityRequirements: {
    name: "_prolificEligibilityRequirements",
    availability: "now",
    type: "text",
    default: "",
  },
  _prolificProjectID: {
    name: "_prolificProjectID",
    availability: "now",
    type: "text",
    default: "",
  },
  _prolificStudyType: {
    name: "_prolificStudyType",
    availability: "now",
    type: "categorical",
    default: "US_REP_SAMPLE",
    categories: ["UK_REP_SAMPLE", "US_REP_SAMPLE", "SINGLE"],
  },
  _requestEasyEyesIDBool: {
    name: "_requestEasyEyesIDBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  _requestEasyEyesIDSaveToFileBool: {
    name: "_requestEasyEyesIDSaveToFileBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  block: { name: "block", availability: "now", type: "integer", default: "1" },
  calibrateBlindSpotBool: {
    name: "calibrateBlindSpotBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  calibrateDistanceCheckBool: {
    name: "calibrateDistanceCheckBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  calibrateFrameRateUnderStressBool: {
    name: "calibrateFrameRateUnderStressBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  calibrateGazeCheckBool: {
    name: "calibrateGazeCheckBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  calibratePupillaryDistanceBool: {
    name: "calibratePupillaryDistanceBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  calibrateScreenSizeBool: {
    name: "calibrateScreenSizeBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  calibrateScreenSizeCheckBool: {
    name: "calibrateScreenSizeCheckBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  calibrateSound1000HzBool: {
    name: "calibrateSound1000HzBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  calibrateSound1000HzDB: {
    name: "calibrateSound1000HzDB",
    availability: "now",
    type: "text",
    default: "-60, -50, -40, -30, -20, -15, -10, -3.1",
  },
  calibrateSoundAllHzBool: {
    name: "calibrateSoundAllHzBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  calibrateSoundAllHzDB: {
    name: "calibrateSoundAllHzDB",
    availability: "now",
    type: "text",
    default: "-13.1",
  },
  calibrateSoundAssumingThisICalibDBSPL: {
    name: "calibrateSoundAssumingThisICalibDBSPL",
    availability: "now",
    type: "numerical",
    default: "104.9",
  },
  calibrateTrackDistanceBool: {
    name: "calibrateTrackDistanceBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  calibrateTrackGazeBool: {
    name: "calibrateTrackGazeBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  computeImageJS: {
    name: "computeImageJS",
    availability: "now",
    type: "text",
    default: "",
  },
  conditionEnabledBool: {
    name: "conditionEnabledBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  conditionGroup: {
    name: "conditionGroup",
    availability: "now",
    type: "integer",
    default: "0",
  },
  conditionName: {
    name: "conditionName",
    availability: "now",
    type: "text",
    default: "",
  },
  conditionTrials: {
    name: "conditionTrials",
    availability: "now",
    type: "integer",
    default: "35",
  },
  errorBool: {
    name: "errorBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  fixationCheckBool: {
    name: "fixationCheckBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  fixationLocationStrategy: {
    name: "fixationLocationStrategy",
    availability: "now",
    type: "categorical",
    default: "centerFixation",
    categories: [
      "centerFixation",
      "centerFixationAndTargets",
      "centerTargets",
      "asSpecified",
    ],
  },
  fixationLocationXScreen: {
    name: "fixationLocationXScreen",
    availability: "now",
    type: "numerical",
    default: "0.5",
  },
  fixationLocationYScreen: {
    name: "fixationLocationYScreen",
    availability: "now",
    type: "numerical",
    default: "0.5",
  },
  fixationRequestedOffscreenBool: {
    name: "fixationRequestedOffscreenBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  flankerCharacterSet: {
    name: "flankerCharacterSet",
    availability: "now",
    type: "text",
    default: "abcdefghijklmnopqrstuvwxyz",
  },
  flankerFont: {
    name: "flankerFont",
    availability: "now",
    type: "text",
    default: "Roboto Mono",
  },
  flankerFontSource: {
    name: "flankerFontSource",
    availability: "now",
    type: "categorical",
    default: "google",
    categories: ["file", "google", "browser"],
  },
  flankerNumber: {
    name: "flankerNumber",
    availability: "now",
    type: "integer",
    default: "1",
  },
  flankerSpacingDeg: {
    name: "flankerSpacingDeg",
    availability: "now",
    type: "numerical",
    default: "",
  },
  flipScreenHorizontallyBool: {
    name: "flipScreenHorizontallyBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  font: {
    name: "font",
    availability: "now",
    type: "text",
    default: "Roboto Mono",
  },
  fontCharacterSet: {
    name: "fontCharacterSet",
    availability: "now",
    type: "text",
    default: "abcdefghijklmnopqrstuvwxyz",
  },
  fontColorRGBA: {
    name: "fontColorRGBA",
    availability: "now",
    type: "text",
    default: "0,0,0,1",
  },
  fontFeatureSettings: {
    name: "fontFeatureSettings",
    availability: "now",
    type: "text",
    default: "",
  },
  fontKerning: {
    name: "fontKerning",
    availability: "now",
    type: "",
    default: "normal",
  },
  fontLeftToRightBool: {
    name: "fontLeftToRightBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  fontPadding: {
    name: "fontPadding",
    availability: "now",
    type: "numerical",
    default: "0.5",
  },
  fontSource: {
    name: "fontSource",
    availability: "now",
    type: "categorical",
    default: "google",
    categories: ["file", "google", "browser"],
  },
  fontStyle: {
    name: "fontStyle",
    availability: "now",
    type: "categorical",
    default: "regular",
    categories: ["regular", "bold", "italic", "boldItalic"],
  },
  fontTrackingForLetters: {
    name: "fontTrackingForLetters",
    availability: "now",
    type: "",
    default: "0",
  },
  fontTrackingForWords: {
    name: "fontTrackingForWords",
    availability: "now",
    type: "",
    default: "0",
  },
  fontVariationSettings: {
    name: "fontVariationSettings",
    availability: "now",
    type: "text",
    default: "",
  },
  fontWeight: {
    name: "fontWeight",
    availability: "now",
    type: "numerical",
    default: "",
  },
  instructionFont: {
    name: "instructionFont",
    availability: "now",
    type: "text",
    default: "Verdana",
  },
  instructionFontLeftToRightBool: {
    name: "instructionFontLeftToRightBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  instructionFontSource: {
    name: "instructionFontSource",
    availability: "now",
    type: "categorical",
    default: "browser",
    categories: ["file", "google", "browser"],
  },
  instructionForBlock: {
    name: "instructionForBlock",
    availability: "now",
    type: "text",
    default: "",
  },
  instructionForResponse: {
    name: "instructionForResponse",
    availability: "now",
    type: "text",
    default: "",
  },
  instructionForStimulus: {
    name: "instructionForStimulus",
    availability: "now",
    type: "text",
    default: "",
  },
  instructionForStimulusLocation: {
    name: "instructionForStimulusLocation",
    availability: "now",
    type: "categorical",
    default: "upperLeft",
    categories: ["top", "upperLeft", "upperRight"],
  },
  instructionLanguage: {
    name: "instructionLanguage",
    availability: "now",
    type: "categorical",
    default: "English",
    categories: [""],
  },
  internationalTableURL: {
    name: "internationalTableURL",
    availability: "now",
    type: "text",
    default: "",
  },
  invitePartingCommentsBool: {
    name: "invitePartingCommentsBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  markingBlankedNearTargetBool: {
    name: "markingBlankedNearTargetBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  markingBlankingRadiusReEccentricity: {
    name: "markingBlankingRadiusReEccentricity",
    availability: "now",
    type: "numerical",
    default: "0.5",
  },
  markingBlankingRadiusReTargetHeight: {
    name: "markingBlankingRadiusReTargetHeight",
    availability: "now",
    type: "numerical",
    default: "1",
  },
  markingClippedToStimulusRectBool: {
    name: "markingClippedToStimulusRectBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  markingFixationHotSpotRadiusDeg: {
    name: "markingFixationHotSpotRadiusDeg",
    availability: "now",
    type: "numerical",
    default: "0.3",
  },
  markingFixationMotionPeriodSec: {
    name: "markingFixationMotionPeriodSec",
    availability: "now",
    type: "numerical",
    default: "10",
  },
  markingFixationMotionRadiusDeg: {
    name: "markingFixationMotionRadiusDeg",
    availability: "now",
    type: "numerical",
    default: "0.5",
  },
  markingFixationStrokeLengthDeg: {
    name: "markingFixationStrokeLengthDeg",
    availability: "now",
    type: "numerical",
    default: "2",
  },
  markingFixationStrokeThicknessDeg: {
    name: "markingFixationStrokeThicknessDeg",
    availability: "now",
    type: "numerical",
    default: "0.05",
  },
  markingOffsetBeforeTargetOnsetSecs: {
    name: "markingOffsetBeforeTargetOnsetSecs",
    availability: "now",
    type: "numerical",
    default: "0",
  },
  markingOnsetAfterTargetOffsetSecs: {
    name: "markingOnsetAfterTargetOffsetSecs",
    availability: "now",
    type: "numerical",
    default: "0",
  },
  markingTargetStrokeLengthDeg: {
    name: "markingTargetStrokeLengthDeg",
    availability: "now",
    type: "numerical",
    default: "1",
  },
  markingTargetStrokeThicknessDeg: {
    name: "markingTargetStrokeThicknessDeg",
    availability: "now",
    type: "numerical",
    default: "0.03",
  },
  markTheFixationBool: {
    name: "markTheFixationBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  markThePossibleTargetsBool: {
    name: "markThePossibleTargetsBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  maskerBaseFrequencyMultiplier: {
    name: "maskerBaseFrequencyMultiplier",
    availability: "now",
    type: "numerical",
    default: "2",
  },
  maskerSoundDBSPL: {
    name: "maskerSoundDBSPL",
    availability: "now",
    type: "",
    default: "-100",
  },
  maskerSoundFolder: {
    name: "maskerSoundFolder",
    availability: "now",
    type: "text",
    default: "",
  },
  maskerSoundPhrase: {
    name: "maskerSoundPhrase",
    availability: "now",
    type: "text",
    default: "",
  },
  movieComputeJS: {
    name: "movieComputeJS",
    availability: "now",
    type: "text",
    default: "",
  },
  movieHz: {
    name: "movieHz",
    availability: "now",
    type: "numerical",
    default: "60",
  },
  movieLuminanceNit: {
    name: "movieLuminanceNit",
    availability: "now",
    type: "numerical",
    default: "-1",
  },
  movieRectDeg: {
    name: "movieRectDeg",
    availability: "now",
    type: "text",
    default: "",
  },
  movieRectPxContainsRectDegBool: {
    name: "movieRectPxContainsRectDegBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  movieTargetDelaySec: {
    name: "movieTargetDelaySec",
    availability: "now",
    type: "numerical",
    default: "0",
  },
  movieSec: {
    name: "movieSec",
    availability: "now",
    type: "numerical",
    default: "60",
  },
  notes: { name: "notes", availability: "now", type: "text", default: "" },
  "questionAndAnswer@@": {
    name: "questionAndAnswer@@",
    availability: "now",
    type: "text",
    default: "",
  },
  readingCorpus: {
    name: "readingCorpus",
    availability: "now",
    type: "text",
    default: "",
  },
  readingDefineSingleLineSpacingAs: {
    name: "readingDefineSingleLineSpacingAs",
    availability: "now",
    type: "categorical",
    default: "nominalSize",
    categories: ["nominalSize", "explicit"],
  },
  readingFirstFewWords: {
    name: "readingFirstFewWords",
    availability: "now",
    type: "text",
    default: "",
  },
  readingLinesPerPage: {
    name: "readingLinesPerPage",
    availability: "now",
    type: "numerical",
    default: "4",
  },
  readingMaxCharactersPerLine: {
    name: "readingMaxCharactersPerLine",
    availability: "now",
    type: "numerical",
    default: "57",
  },
  readingMultipleOfSingleLineSpacing: {
    name: "readingMultipleOfSingleLineSpacing",
    availability: "now",
    type: "numerical",
    default: "1.2",
  },
  readingNominalSizeDeg: {
    name: "readingNominalSizeDeg",
    availability: "now",
    type: "numerical",
    default: "1",
  },
  readingNumberOfPossibleAnswers: {
    name: "readingNumberOfPossibleAnswers",
    availability: "now",
    type: "integer",
    default: "4",
  },
  readingNumberOfQuestions: {
    name: "readingNumberOfQuestions",
    availability: "now",
    type: "integer",
    default: "3",
  },
  readingPages: {
    name: "readingPages",
    availability: "now",
    type: "numerical",
    default: "4",
  },
  readingSetSizeBy: {
    name: "readingSetSizeBy",
    availability: "now",
    type: "categorical",
    default: "spacing",
    categories: ["nominal", "xHeight", "spacing"],
  },
  readingSingleLineSpacingDeg: {
    name: "readingSingleLineSpacingDeg",
    availability: "now",
    type: "numerical",
    default: "1",
  },
  readingSpacingDeg: {
    name: "readingSpacingDeg",
    availability: "now",
    type: "numerical",
    default: "0.5",
  },
  readingTargetMaxWordFrequency: {
    name: "readingTargetMaxWordFrequency",
    availability: "now",
    type: "numerical",
    default: "4.30E-04",
  },
  readingXHeightDeg: {
    name: "readingXHeightDeg",
    availability: "now",
    type: "numerical",
    default: "1",
  },
  responseAllowedEarlyBool: {
    name: "responseAllowedEarlyBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  responseCharacterHasMedialShapeBool: {
    name: "responseCharacterHasMedialShapeBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  responseClickedBool: {
    name: "responseClickedBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  responseEscapeOptionsBool: {
    name: "responseEscapeOptionsBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  responseMustClickCrosshairBool: {
    name: "responseMustClickCrosshairBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  responseNegativeFeedbackBool: {
    name: "responseNegativeFeedbackBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  responsePositiveFeedbackBool: {
    name: "responsePositiveFeedbackBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  responsePurrWhenReadyBool: {
    name: "responsePurrWhenReadyBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  responseSpokenToExperimenterBool: {
    name: "responseSpokenToExperimenterBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  responseSpokenBool: {
    name: "responseSpokenBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  responseTypedBool: {
    name: "responseTypedBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  responseTypedEasyEyesKeypadBool: {
    name: "responseTypedEasyEyesKeypadBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  rsvpReadingFlankTargetWithLettersBool: {
    name: "rsvpReadingFlankTargetWithLettersBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  rsvpReadingFlankerCharacterSet: {
    name: "rsvpReadingFlankerCharacterSet",
    availability: "now",
    type: "text",
    default: "",
  },
  rsvpReadingNumberOfResponseOptions: {
    name: "rsvpReadingNumberOfResponseOptions",
    availability: "now",
    type: "numerical",
    default: "6",
  },
  rsvpReadingNumberOfWords: {
    name: "rsvpReadingNumberOfWords",
    availability: "now",
    type: "numerical",
    default: "6",
  },
  rsvpReadingRequireUniqueWordsBool: {
    name: "rsvpReadingRequireUniqueWordsBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  screenColorRGB: {
    name: "screenColorRGB",
    availability: "now",
    type: "text",
    default: "0.92,0.92,0.92",
  },
  screenshotBool: {
    name: "screenshotBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  setResolutionPxPerCm: {
    name: "setResolutionPxPerCm",
    availability: "now",
    type: "numerical",
    default: "",
  },
  setResolutionPxPerDeg: {
    name: "setResolutionPxPerDeg",
    availability: "now",
    type: "numerical",
    default: "",
  },
  showBoundingBoxBool: {
    name: "showBoundingBoxBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  showCharacterSetBoundingBoxBool: {
    name: "showCharacterSetBoundingBoxBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  showCharacterSetForAllResponsesBool: {
    name: "showCharacterSetForAllResponsesBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  showCharacterSetWhere: {
    name: "showCharacterSetWhere",
    availability: "now",
    type: "categorical",
    default: "bottom",
    categories: ["none", "bottom", "top", "left", "right"],
  },
  showCharacterSetWithLabelsBool: {
    name: "showCharacterSetWithLabelsBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  showConditionNameBool: {
    name: "showConditionNameBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  showCounterBool: {
    name: "showCounterBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  showCounterWhere: {
    name: "showCounterWhere",
    availability: "now",
    type: "categorical",
    default: "bottomRight",
    categories: ["bottomLeft", "bottomRight", "bottomCenter"],
  },
  showExperimentNameBool: {
    name: "showExperimentNameBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  showFixationMarkBool: {
    name: "showFixationMarkBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  showFPSBool: {
    name: "showFPSBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  showFrameRateBool: {
    name: "showFrameRateBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  showGazeBool: {
    name: "showGazeBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  showGazeNudgerBool: {
    name: "showGazeNudgerBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  showGrid: {
    name: "showGrid",
    availability: "now",
    type: "categorical",
    default: "disabled",
    categories: ["px", "cm", "deg", "mm", "none", "disabled"],
  },
  showInstructionsWhere: {
    name: "showInstructionsWhere",
    availability: "now",
    type: "categorical",
    default: "topLeft",
    categories: ["none", "topLeft", "bottomLeft"],
  },
  showPercentCorrectBool: {
    name: "showPercentCorrectBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  showProgressBarWhere: {
    name: "showProgressBarWhere",
    availability: "now",
    type: "categorical",
    default: "none",
    categories: ["none", "right"],
  },
  showTakeABreakCreditBool: {
    name: "showTakeABreakCreditBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  showTargetSpecsBool: {
    name: "showTargetSpecsBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  showText: {
    name: "showText",
    availability: "now",
    type: "text",
    default: "",
  },
  showViewingDistanceBool: {
    name: "showViewingDistanceBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  simulateParticipantBool: {
    name: "simulateParticipantBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  simulateWithDisplayBool: {
    name: "simulateWithDisplayBool",
    availability: "now",
    type: "boolean",
    default: "TRUE",
  },
  simulationBeta: {
    name: "simulationBeta",
    availability: "now",
    type: "numerical",
    default: "2.3",
  },
  simulationDelta: {
    name: "simulationDelta",
    availability: "now",
    type: "numerical",
    default: "0.01",
  },
  simulationModel: {
    name: "simulationModel",
    availability: "now",
    type: "categorical",
    default: "ideal",
    categories: ["right", "wrong", "blind", "weibull", "ideal"],
  },
  simulationThreshold: {
    name: "simulationThreshold",
    availability: "now",
    type: "numerical",
    default: "2",
  },
  soundGainDBSPL: {
    name: "soundGainDBSPL",
    availability: "now",
    type: "numerical",
    default: "125",
  },
  soundGainTWR: {
    name: "soundGainTWR",
    availability: "now",
    type: "text",
    default: "100,10,100",
  },
  spacingDeg: {
    name: "spacingDeg",
    availability: "now",
    type: "numerical",
    default: "2",
  },
  spacingDirection: {
    name: "spacingDirection",
    availability: "now",
    type: "categorical",
    default: "radial",
    categories: [
      "horizontal",
      "vertical",
      "horizontalAndVertical",
      "radial",
      "tangential",
      "radialAndTangential",
    ],
  },
  spacingForRatioIsOuterBool: {
    name: "spacingForRatioIsOuterBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  spacingOverSizeRatio: {
    name: "spacingOverSizeRatio",
    availability: "now",
    type: "numerical",
    default: "1.4",
  },
  spacingRelationToSize: {
    name: "spacingRelationToSize",
    availability: "now",
    type: "categorical",
    default: "ratio",
    categories: ["none", "ratio", "typographic"],
  },
  spacingSymmetry: {
    name: "spacingSymmetry",
    availability: "now",
    type: "categorical",
    default: "retina",
    categories: ["screen", "retina", "cortex"],
  },
  takeABreakMinimumDurationSec: {
    name: "takeABreakMinimumDurationSec",
    availability: "now",
    type: "numerical",
    default: "2",
  },
  takeABreakTrialCredit: {
    name: "takeABreakTrialCredit",
    availability: "now",
    type: "numerical",
    default: "0.05",
  },
  targetBoundingBoxHorizontalAlignment: {
    name: "targetBoundingBoxHorizontalAlignment",
    availability: "now",
    type: "categorical",
    default: "center",
    categories: ["center", "origin"],
  },
  targetContrast: {
    name: "targetContrast",
    availability: "now",
    type: "numerical",
    default: "-1",
  },
  targetCyclePerDeg: {
    name: "targetCyclePerDeg",
    availability: "now",
    type: "numerical",
    default: "0",
  },
  targetDelaySec: {
    name: "targetDelaySec",
    availability: "now",
    type: "numerical",
    default: "0",
  },
  targetDurationSec: {
    name: "targetDurationSec",
    availability: "now",
    type: "numerical",
    default: "0.15",
  },
  targetEccentricityXDeg: {
    name: "targetEccentricityXDeg",
    availability: "now",
    type: "numerical",
    default: "0",
  },
  targetEccentricityYDeg: {
    name: "targetEccentricityYDeg",
    availability: "now",
    type: "numerical",
    default: "0",
  },
  targetHz: {
    name: "targetHz",
    availability: "now",
    type: "numerical",
    default: "0",
  },
  targetImageFolder: {
    name: "targetImageFolder",
    availability: "now",
    type: "text",
    default: "",
  },
  targetKind: {
    name: "targetKind",
    availability: "now",
    type: "categorical",
    default: "letter",
    categories: [
      "letter",
      "gabor",
      "movie",
      "sound",
      "vocoderPhrase",
      "reading",
      "rsvpReading",
      "repeatedLetters",
    ],
  },
  targetMinimumPix: {
    name: "targetMinimumPix",
    availability: "now",
    type: "numerical",
    default: "8",
  },
  targetOrientationDeg: {
    name: "targetOrientationDeg",
    availability: "now",
    type: "numerical",
    default: "0",
  },
  targetPhaseDeg: {
    name: "targetPhaseDeg",
    availability: "now",
    type: "numerical",
    default: "0",
  },
  targetRepeatsBool: {
    name: "targetRepeatsBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  targetRepeatsBorderCharacter: {
    name: "targetRepeatsBorderCharacter",
    availability: "now",
    type: "text",
    default: "$",
  },
  targetRepeatsMaxLines: {
    name: "targetRepeatsMaxLines",
    availability: "now",
    type: "numerical",
    default: "3",
  },
  targetSafetyMarginSec: {
    name: "targetSafetyMarginSec",
    availability: "now",
    type: "numerical",
    default: "0.7",
  },
  targetSizeDeg: {
    name: "targetSizeDeg",
    availability: "now",
    type: "numerical",
    default: "2",
  },
  targetSizeIsHeightBool: {
    name: "targetSizeIsHeightBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  targetSoundChannels: {
    name: "targetSoundChannels",
    availability: "now",
    type: "integer",
    default: "9",
  },
  targetSoundDBSPL: {
    name: "targetSoundDBSPL",
    availability: "now",
    type: "numerical",
    default: "20",
  },
  targetSoundFolder: {
    name: "targetSoundFolder",
    availability: "now",
    type: "text",
    default: "",
  },
  targetSoundNoiseBool: {
    name: "targetSoundNoiseBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  targetSoundNoiseClockHz: {
    name: "targetSoundNoiseClockHz",
    availability: "now",
    type: "numerical",
    default: "20000",
  },
  targetSoundNoiseDBSPL: {
    name: "targetSoundNoiseDBSPL",
    availability: "now",
    type: "numerical",
    default: "-999",
  },
  targetSoundNoiseOffsetReTargetSec: {
    name: "targetSoundNoiseOffsetReTargetSec",
    availability: "now",
    type: "numerical",
    default: "0.3",
  },
  targetSoundNoiseOnsetReTargetSec: {
    name: "targetSoundNoiseOnsetReTargetSec",
    availability: "now",
    type: "numerical",
    default: "-0.3",
  },
  targetSoundPhrase: {
    name: "targetSoundPhrase",
    availability: "now",
    type: "text",
    default: "",
  },
  targetSpaceConstantDeg: {
    name: "targetSpaceConstantDeg",
    availability: "now",
    type: "numerical",
    default: "1.00E+10",
  },
  targetTask: {
    name: "targetTask",
    availability: "now",
    type: "categorical",
    default: "identify",
    categories: ["identify", "detect", "questionAndAnswer"],
  },
  targetTimeConstantSec: {
    name: "targetTimeConstantSec",
    availability: "now",
    type: "numerical",
    default: "1.00E+10",
  },
  targetWhenSec: {
    name: "targetWhenSec",
    availability: "now",
    type: "numerical",
    default: "0",
  },
  thresholdAllowedDurationRatio: {
    name: "thresholdAllowedDurationRatio",
    availability: "now",
    type: "numerical",
    default: "1.5",
  },
  thresholdAllowedGazeRErrorDeg: {
    name: "thresholdAllowedGazeRErrorDeg",
    availability: "now",
    type: "numerical",
    default: "1.00E+10",
  },
  thresholdAllowedGazeXErrorDeg: {
    name: "thresholdAllowedGazeXErrorDeg",
    availability: "now",
    type: "numerical",
    default: "1.00E+10",
  },
  thresholdAllowedGazeYErrorDeg: {
    name: "thresholdAllowedGazeYErrorDeg",
    availability: "now",
    type: "numerical",
    default: "1.00E+10",
  },
  thresholdAllowedLatencySec: {
    name: "thresholdAllowedLatencySec",
    availability: "now",
    type: "numerical",
    default: "0.1",
  },
  thresholdBeta: {
    name: "thresholdBeta",
    availability: "now",
    type: "numerical",
    default: "2.3",
  },
  thresholdDelta: {
    name: "thresholdDelta",
    availability: "now",
    type: "numerical",
    default: "0.01",
  },
  thresholdGamma: {
    name: "thresholdGamma",
    availability: "now",
    type: "numerical",
    default: "",
  },
  thresholdGuess: {
    name: "thresholdGuess",
    availability: "now",
    type: "numerical",
    default: "1",
  },
  thresholdGuessLogSd: {
    name: "thresholdGuessLogSd",
    availability: "now",
    type: "numerical",
    default: "2",
  },
  thresholdParameter: {
    name: "thresholdParameter",
    availability: "now",
    type: "categorical",
    default: "spacing",
    categories: [
      "spacing",
      "spacingDeg",
      "size",
      "targetSizeDeg",
      "targetDurationSec",
      "targetContrast",
      "soundLevel",
      "targetSoundDBSPL",
      "targetSoundNoiseDBSPL",
    ],
  },
  thresholdProcedure: {
    name: "thresholdProcedure",
    availability: "now",
    type: "categorical",
    default: "QUEST",
    categories: ["none", "QUEST"],
  },
  thresholdProportionCorrect: {
    name: "thresholdProportionCorrect",
    availability: "now",
    type: "numerical",
    default: "0.7",
  },
  thresholdRepeatBadBlockBool: {
    name: "thresholdRepeatBadBlockBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  viewingDistanceAllowedRatio: {
    name: "viewingDistanceAllowedRatio",
    availability: "now",
    type: "numerical",
    default: "1.2",
  },
  viewingDistanceDesiredCm: {
    name: "viewingDistanceDesiredCm",
    availability: "now",
    type: "numerical",
    default: "50",
  },
  viewingDistanceLargeEnoughToAllowTargetSizeDeg: {
    name: "viewingDistanceLargeEnoughToAllowTargetSizeDeg",
    availability: "now",
    type: "numerical",
    default: "0",
  },
  viewingDistanceNudgingBool: {
    name: "viewingDistanceNudgingBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
  viewingDistanceSmallEnoughToAllowScreenHeightDeg: {
    name: "viewingDistanceSmallEnoughToAllowScreenHeightDeg",
    availability: "now",
    type: "numerical",
    default: "",
  },
  viewingDistanceSmallEnoughToAllowScreenWidthDeg: {
    name: "viewingDistanceSmallEnoughToAllowScreenWidthDeg",
    availability: "now",
    type: "numerical",
    default: "",
  },
  wirelessKeyboardNeededBool: {
    name: "wirelessKeyboardNeededBool",
    availability: "now",
    type: "boolean",
    default: "FALSE",
  },
};

export const SUPER_MATCHING_PARAMS: string[] = ["questionAndAnswer@@"];
