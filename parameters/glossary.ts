/*
  Do not modify this file! Run npm `npm run glossary` at ROOT of this project to fetch from the Google Sheets.
  https://docs.google.com/spreadsheets/d/1x65NjykMm-XUOz98Eu_oo6ON2xspm_h0Q0M2u6UGtug/edit#gid=1287694458 
*/

interface Glossary {
  [parameter: string]: { [field: string]: string | string[] };
}

export const GLOSSARY: Glossary = {
  _about: {
    name: "_about",
    availability: "now",
    example: "Effect of font on crowding.",
    explanation:
      "Optional brief description of the whole experiment. Ignored by EasyEyes, but saved with results. The leading underscore makes the pre-processor copy the value from the first condition to the rest, which must be empty.",
    type: "text",
    default: "",
  },
  _allowedBrowsers: {
    name: "_allowedBrowsers",
    availability: "now",
    example: "Safari",
    explanation:
      "A comma separated list of allowed browsers. If not allowed, we reject by issuing a fatal explanatory error message to the participant, which ends the session before asking for Consent. Default allows all browsers.",
    type: "multicategorical",
    default: "",
  },
  _allowedOperatingSystems: {
    name: "_allowedOperatingSystems",
    availability: "now",
    example: "iOS,Linux",
    explanation:
      "A comma separated list of allowed operating systems. If not allowed, we reject by issuing a fatal explanatory error message to the participant, which ends the session before asking for Consent. Default allows all operating systems. ",
    type: "multicategorical",
    default: "",
  },
  _authorEmails: {
    name: "_authorEmails",
    availability: "now",
    example: "dp3@nyu.edu",
    explanation:
      "Optional, semicolon-separated email addresses of the authors.  The leading underscore makes the pre-processor copy the value from the first condition to the rest, which must be empty.",
    type: "text",
    default: "",
  },
  _authors: {
    name: "_authors",
    availability: "now",
    example: "Denis Pelli",
    explanation:
      "Optional, names of all the authors, separated by semicolons. The leading underscore makes the pre-processor copy the value from the first condition to the rest, which must all be empty.",
    type: "text",
    default: "",
  },
  _consentForm: {
    name: "_consentForm",
    availability: "now",
    example: "adultConsent2021.pdf",
    explanation:
      "The file name of your PDF (or plain-text Markdown with extension MD) consent document in the folder EasyEyesResources/ConsentForms/ in your Pavlovia account. The EasyEyes.app/threshold page makes it easy to upload your consent form(s) to that folder. When checking your experiment table, the compiler will check that a file with this name is present in your EasyEyesResources/ConsentForms folder on Pavlovia. See consent in Scientific Glossary for information about testing minors and children. The leading underscore makes the pre-processor copy the value from the first condition to the rest, which must be empty.",
    type: "text",
    default: "",
  },
  _daisyChainURLAfterEasyEyes: {
    name: "_daisyChainURLAfterEasyEyes",
    availability: "now",
    example: "http://xyz?cc=123",
    explanation:
      "A URL (with query parameters) that will add to a daisy chain of testing apps. This single or cascade of URLs will run after the EasyEyes study. Typically the last step is the completion page in Prolific (or MTurk), coding the participant as eligible for payment. The study URL returned by EasyEyes will run the whole cascade, including URLBeforeEasyEyes, the EasyEyes study, and URLAfterEasyEyes. Daisy chaining suggested by Becca Hirst at Open Science Tools. ",
    type: "text",
    default: "",
  },
  _daisyChainURLBeforeEasyEyes: {
    name: "_daisyChainURLBeforeEasyEyes",
    availability: "now",
    example: "http://xyz?cc=123",
    explanation:
      "A URL (with query parameters) that will begin a daisy chain of testing apps. This single or cascade of URLs will run first, before the EasyEyes study. Typically the last step is the completion page in Prolific (or MTurk), coding the participant as eligible for payment. The study URL returned by EasyEyes will run the whole cascade, including URLBeforeEasyEyes, the EasyEyes study, and URLAfterEasyEyes. Daisy chaining suggested by Becca Hirst at Open Science Tools. ",
    type: "text",
    default: "",
  },
  _dateCreated: {
    name: "_dateCreated",
    availability: "now",
    example: "8/1/2021",
    explanation:
      "Optional date of creation. The leading underscore makes the pre-processor copy the value from the first condition to the rest, which must be empty.",
    type: "date",
    default: "NaN",
  },
  _dateModified: {
    name: "_dateModified",
    availability: "now",
    example: "8/15/2021",
    explanation:
      "Optional date of latest modification. The leading underscore makes the pre-processor copy the value from the first condition to the rest, which must be empty.",
    type: "date",
    default: "NaN",
  },
  _debriefForm: {
    name: "_debriefForm",
    availability: "now",
    example: "debrief2021.pdf",
    explanation:
      "The file name of your PDF (or plain-text Markdown with extension MD) debrief document in the folder EasyEyesResources/ConsentForms/ in your Pavlovia account. The EasyEyes.app/threshold page makes it easy to upload your debrief form(s) to that folder. The compiler will check that a file with this name is present in your EasyEyesResources/ConsentForms folder on Pavlovia. See consent in Glossary for information about testing minors and children. The leading underscore makes the pre-processor copy the value from the first condition to the rest, which must be empty.",
    type: "text",
    default: "",
  },
  _disallowedBrowsers: {
    name: "_disallowedBrowsers",
    availability: "now",
    example: "Safari",
    explanation:
      "A comma separated list of browsers to be rejected. We reject by issuing a fatal explanatory error message to the participant, which ends the session before asking for Consent. Default allows all browsers. It is an error to include the parameter _disallowedBrowsers when _allowedBrowsers is already present.",
    type: "multicategorical",
    default: "",
  },
  _disallowedOperatingSystems: {
    name: "_disallowedOperatingSystems",
    availability: "now",
    example: "iOS,Android",
    explanation:
      "A comma separated list of operating systems to be rejected. We reject by issuing a fatal explanatory error message to the participant, which ends the session before asking for Consent. Default allows all operating systems. It is an error to include the parameter _disallowedOperatingSystems when _allowedOperatingSystems is already present. ",
    type: "multicategorical",
    default: "",
  },
  _experimentFilename: {
    name: "_experimentFilename",
    availability: "now",
    example: "crowding.csv",
    explanation: "Filename of the table file. ",
    type: "text",
    default: "",
  },
  _experimentName: {
    name: "_experimentName",
    availability: "now",
    example: "crowding",
    explanation:
      "Very important. If omitted, as default we use the table file name (without extension) as the experiment name. The leading underscore makes the pre-processor copy the value from the first condition to the rest, which must be empty.",
    type: "text",
    default: "",
  },
  _invitePartingCommentsBool: {
    name: "_invitePartingCommentsBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "At the end of the experiment, invite the participant to make parting comments. The leading underscore makes the pre-processor copy the value from the first condition to the rest, which must be empty.",
    type: "boolean",
    default: "FALSE",
  },
  _participantDurationMinutes: {
    name: "_participantDurationMinutes",
    availability: "now",
    example: "30",
    explanation:
      "Expected duration, in minutes, in the offer to participants. The leading underscore makes the pre-processor copy the value from the first condition to the rest, which must be empty.",
    type: "numerical",
    default: "30",
  },
  _participantPay: {
    name: "_participantPay",
    availability: "now",
    example: "7.5",
    explanation:
      "Payment to offer to each participant. The leading underscore makes the pre-processor copy the value from the first condition to the rest, which must be empty.",
    type: "numerical",
    default: "7.5",
  },
  _participantPayCurrency: {
    name: "_participantPayCurrency",
    availability: "now",
    example: "USDollar",
    explanation:
      "Currency of payment amount: USDollar, Euro, etc. The leading underscore makes the pre-processor copy the value from the first condition to the rest, which must be empty.",
    type: "categorical",
    default: "USDollar",
    categories: ["USDollar", "Euro", "UKPound"],
  },
  _participantRecruitmentService: {
    name: "_participantRecruitmentService",
    availability: "now",
    example: "Prolific",
    explanation:
      'Name of recruitment service: none, Prolific, SONA, MTurk.  The key idea is two URLs that carry parameters. The Study URL (a link to our experiment) carries parameters provided by the recruitment service (e.g. Prolific). The Completion URL (a link to the completion page of the recruitment service) carries the completion code certifying that the participant completed the study. The leading underscore makes the pre-processor copy the value from the first condition to the rest, which must be empty.\nnone - Just produce a study URL.\nProlific - integrate with Prolific as suggested by the PsychoPy manual. https://www.psychopy.org/online/prolificIntegration.html\nMTurk - currently equivalent to "none".\nSONA - currenlty equivalent to "none".',
    type: "categorical",
    default: "none",
    categories: ["none", "Prolific", "MTurk", "SONA"],
  },
  _participantRecruitmentServiceAccount: {
    name: "_participantRecruitmentServiceAccount",
    availability: "now",
    example: "123ABC",
    explanation:
      "Account number. The leading underscore makes the pre-processor copy the value from the first condition to the rest, which must be empty.",
    type: "text",
    default: "",
  },
  _participantsHowMany: {
    name: "_participantsHowMany",
    availability: "now",
    example: "100",
    explanation:
      "Number of people you want to test. The leading underscore makes the pre-processor copy the value from the first condition to the rest, which must be empty.",
    type: "integer",
    default: "1",
  },
  _pavloviaOfferPilotingOptionBool: {
    name: "_pavloviaOfferPilotingOptionBool",
    availability: "now",
    example: "PILOTING",
    explanation:
      "EasyEyes uses a Pavlovia repository to hold your experiment. Pavlovia offers two ways of running your experiment, PILOTING and RUNNING. PILOTING mode is free, but your experiment can only be run directly from the Pavlovia dashboard and cannot be deployed. RUNNING mode costs 20 pence per participant (this fee is waived if your instititution has a site license), but you get a URL that you can deploy. It is our impression that most Pavlovia users belong to institutions that own site licenses, and thus have no usage fee. For most users, we suggest letting _pavloviaOfferPilotingOptionBool be FALSE (the default) to disable the PILOTING option, to streamline the EasyEyes scientist page.",
    type: "boolean",
    default: "FALSE",
  },
  _prolificEligibilityRequirements: {
    name: "_prolificEligibilityRequirements",
    availability: "now",
    example: "",
    explanation:
      "This Prolific page shows some of their prescreening options: \nhttps://researcher-help.prolific.co/hc/en-gb/articles/360009221093-How-do-I-use-Prolific-s-demographic-prescreening-\nThe Prolific API is still in the beta stage of development. To specify eligibility requirements through the API, they say to contact Prolific at integrations@prolific.co. We have written to Prolific and we will enhance this when they tell us how to. https://prolificapi.docs.apiary.io/",
    type: "text",
    default: "",
  },
  _prolificStudyType: {
    name: "_prolificStudyType",
    availability: "now",
    example: "US_REP_SAMPLE",
    explanation:
      "Can be UK_REP_SAMPLE, US_REP_SAMPLE, or SINGLE. This is a field in the Prolific API for recruiting participants. There are two types of study:\n• Representative sample: UK_REP_SAMPLE or US_REP_SAMPLE\n• Normal study: SINGLE",
    type: "categorical",
    default: "US_REP_SAMPLE",
    categories: ["UK_REP_SAMPLE", "US_REP_SAMPLE", "SINGLE"],
  },
  _zeroBasedNumberingBool: {
    name: "_zeroBasedNumberingBool",
    availability: "now",
    example: "FALSE",
    explanation:
      "If true then the first block and condition are numbered 0, otherwise 1.",
    type: "boolean",
    default: "FALSE",
  },
  block: {
    name: "block",
    availability: "now",
    example: "1",
    explanation:
      "The block number. The first condition (second column) must have a block number of 0 or 1, consistent with zeroBasedNumberingBool. After the first condition, each successive condition (column) must have the same block number as the one preceding it, or increased by +1.",
    type: "integer",
    default: "1",
  },
  calibrateBlindSpotBool: {
    name: "calibrateBlindSpotBool",
    availability: "now",
    example: "TRUE",
    explanation:
      'Initial measurement of viewing distance by mapping the blind spot, as suggested by the Li et al. (2020) "Virtual chinrest" paper, enhanced by flickering the target and manual control of target position.',
    type: "boolean",
    default: "FALSE",
  },
  calibrateDistanceCheckBool: {
    name: "calibrateDistanceCheckBool",
    availability: "now",
    example: "FALSE",
    explanation:
      'When TRUE, requests checking of the calibrator by the participant, provided they have a tape measure, meter stick, or yard stick, or failing that, a ruler. After each size or distance calibration, if calibrationDistanceCheckBool=TRUE, then we will ask the participant if they have an appropriate measuring device (ideally a tape measure, meter stick, or yard stick; a 12" or 30 cm ruler could be used if we exclude long distances), and, if so, how long is it, and what are its units: decimal cm, decimal inches, fractional inches. If no device, then we skip the rest of the calibrations that need a measuring device. In our instructions, we can say "Use your ruler, stick, or tape to measure this." When receiving fractional inches we could either accept a string like “16 3/16” or we could have three fields that each accept an integer, and allow the user to tab from field to field: "?? ??/??". The last number must be 2, 4, 8, 16, or 32. For round numbers, the numerator will be zero. After measuring screen size, we can ask them to use their ruler, stick, or tape to measure screen width. We can display a huge double headed arrow from left edge to right edge. After measuring viewing distance we can ask them to use ruler, stick, or tape to create three exact viewing distances that we then use the webcam to measure. We can request 12, 24, or 36 inches, or 30, 60, or 90 cm. (These are round numbers, not exactly equivalent.) \n     We have two ways of measuring viewing distance and I’d like to evaluate both. Our current scheme with the calibrator is to have a Boolean parameter for each calibration. We should have separate parameters for the two methods of measuring viewing distance so scientists can select none, either, or both. It would be interesting to compare the two estimates (direct vs indirect) of pupillary distance. We should always save the pupillary distance with the data. We can compare our population distribution with the textbook distribution. It might be an elegant check on our biometrics. \n     We could test people on Prolific and mention in our job description that they must have a tape measure, meter stick or yard stick.  Readers of our article will like seeing data from 100 people online plus 10 experienced in-house participants. I think this will create confidence in the calibrations. For scientists that’s crucial.\n',
    type: "boolean",
    default: "FALSE",
  },
  calibrateGazeCheckBool: {
    name: "calibrateGazeCheckBool",
    availability: "now",
    example: "FALSE",
    explanation:
      "To check gaze tracking we don’t need a measuring device, and hardly any instructions. I think we could just put up our fixation cross in a few random places and ask them to click on it. It will be very similar to the training and we don’t need to tell the participant that we progressed from training to checking.",
    type: "boolean",
    default: "FALSE",
  },
  calibrateScreenSizeBool: {
    name: "calibrateScreenSizeBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "Adjust the screen image of a common object of known size to match, to determine the size in cm of the participant's screen. Thanks to Li et al. 2020.",
    type: "boolean",
    default: "TRUE",
  },
  calibrateScreenSizeCheckBool: {
    name: "calibrateScreenSizeCheckBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "Ask the participant to use a ruler, yardstick, meter stick, or tape measure to measure the distance directly to assess accuracy.",
    type: "boolean",
    default: "FALSE",
  },
  calibrateTrackDistanceBool: {
    name: "calibrateTrackDistanceBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "Use this to turn EasyEyes distance tracking on and off. Before tracking can begin you must make an initial calibration of distance, either by easyEyesBlindSpotBool or easyEyesPupilDistanceBool, or both. Distance tracking uses the webcam to monitor position of the participant's head. It ignores where you're looking. The head is not a point, of course. Since this is for vision research, the point we estimate is the midpoint between the two eyes. That point is sometimes called cyclopean, referring to the mythical one-eyed Cyclops in Homer's Odyssey. From each webcam image we extract: 1. the viewing distance, from the midpoint (between the two eyes) to the screen, and 2. the near point, which is the point in the plane of the screen that is closest to the midpoint between the eyes. When rendering visual stimulus specified in deg, it is necessary to take the viewing distance (and near point) into account. The location of the near point is important at large eccentricities (over 10 deg) and is usually safely ignored at small eccentricities (less than 10 deg).",
    type: "boolean",
    default: "FALSE",
  },
  calibrateTrackGazeBool: {
    name: "calibrateTrackGazeBool",
    availability: "now",
    example: "FALSE",
    explanation:
      "Use this to turn EasyEyes gaze tracking on and off. It must be calibrated before use. Gaze tracking uses the built-in webcam to monitor where the participant's eyes are looking. To be clear, in gaze tracking, the webcam looks at your eyes to figure out where on the screen your eyes are looking. It estimates that screen location. Gaze-contingent experiments change the display based on where the participant is looking. Peripheral vision experiments typically require good fixation and may discard trials for which fixation was too far from the fixation mark. Precision is low, with a typical error of 4 deg at 50 cm. We expect the error, in deg, to be proportional to viewing distance.",
    type: "boolean",
    default: "FALSE",
  },
  calibrateTrackNearPointBool: {
    name: "calibrateTrackNearPointBool",
    availability: "now",
    example: "FALSE",
    explanation:
      "Initial measurement of the pupillary distance to later estimate near point.",
    type: "boolean",
    default: "FALSE",
  },
  conditionGroup: {
    name: "conditionGroup",
    availability: "later",
    example: "1",
    explanation:
      '"conditionGroup" imposes consistent screen markings across a set of conditions. Screen markings before and during stimulus presentation indicate the positions of the fixation and possible targets. There are many parameters, below, whose names begin with "marking" that allow you to customize markings.  Within a block, all conditions with the same nonzero conditionGroup number are presented with the same markings (fixation cross, target X) to avoid giving any clue as to which of the possible targets will appear on this trial. Thus, one can implement uncertainty among any specified set of targets simply by creating a condition for each target, and giving all the conditions the same nonzero conditionGroup number. There can be any number of conditions in a conditionGroup, and there can be any number of condition groups in a block. Every condition belongs to a condition group. A condition with a zero or unique conditionGroup number belongs to a condition group with just that condition.',
    type: "integer",
    default: "0",
  },
  conditionName: {
    name: "conditionName",
    availability: "now",
    example: "Crowding",
    explanation:
      "Use this to label your condition to help guide your subsequent data analysis. Not used by EasyEyes.",
    type: "text",
    default: "",
  },
  conditionTrials: {
    name: "conditionTrials",
    availability: "now",
    example: "40",
    explanation:
      "Number of trials of this condition to run in this block. They are all randomly interleaved. Each condition can have a different number of trials. ",
    type: "integer",
    default: "35",
  },
  fixationCheckBool: {
    name: "fixationCheckBool",
    availability: "now",
    example: "FALSE",
    explanation:
      "Display a foveal triplet that is easy to read if the participant's eye is on fixation, and hard to read if the eye is elsewhere.",
    type: "boolean",
    default: "TRUE",
  },
  fixationLocationStrategy: {
    name: "fixationLocationStrategy",
    availability: "soon",
    example: "centerFixation",
    explanation:
      'Choose the strategy by which EasyEyes should place the point of fixation, which is the origin of the visual coordinate system. This is complicated. Most experimenters will choose "centerFixation", which simply places fixation at the center of the screen. But for peripheral testing you might want to put fixation near one edge to maximize the eccentricity of a target at the other edge. To test even farther into the periphery, you might want to put fixation off-screen by putting tape on a bottle or a box and drawing a fixation cross on it. Those cases and others are handled by choosing other strategies. Fixation, whether, on- or off-screen, is always specified as a point in (x,y) pixel coordinates in the plane of the display. We never change fixation within a block, so all conditions in a block must have the same fixation point and fixationLocationStrategy. This is checked by the pre-processor. If the strategy refers to targets, we consider all possible targets across all conditions within the block.  \n• "asSpecifed" indicates that fixation is specified by (fixationLocationXScreen,  fixationLocationYScreen). \n• "centerFixation" places fixation at the center of the screen. \n• "centerTargets" sets the (possibly offscreen) fixation location so as to maximize the screen margin around the edges of all the possible targets.  \n• "centerFixationAndTargets" places fixation so as to maximize the screen margin around the fixation and the edges of all the possible targets within the block. It may be impossible to satisfy the strategies that mention targets without reducing viewing distance. Ideally, the pre-processor would flag this error before we start running the experiment.',
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
    availability: "soon",
    example: "0.5",
    explanation:
      'If fixationLocationStrategy is "asSpecified" then this specifies fixation\'s X coordinate in the screen plane, normalized by screen width and height. Origin is lower left.',
    type: "numerical",
    default: "0.5",
  },
  fixationLocationYScreen: {
    name: "fixationLocationYScreen",
    availability: "soon",
    example: "0.5",
    explanation: "As above. The Y coordinate.",
    type: "numerical",
    default: "0.5",
  },
  fixationRequestedOffscreenBool: {
    name: "fixationRequestedOffscreenBool",
    availability: "later",
    example: "FALSE",
    explanation:
      "To test the far periphery it may be worth the trouble of setting up an off-screen fixation mark, with help from the participant.",
    type: "boolean",
    default: "FALSE",
  },
  fixationToleranceDeg: {
    name: "fixationToleranceDeg",
    availability: "now",
    example: "4",
    explanation:
      "We save all trials in trialData, but when the fixation error exceeds tolerance, we don't feed it to QUEST, and we run it again by adding a trial of this condition to the list of conditions yet to be run in this block, and reshuffle that list. Excel treats 'inf' as a string, not the number infinity, so use a large number instead of 'inf'. Note that the typical error of gaze tracking using the built-in web cam is roughly 4 deg at 50 cm, so, in that case, we suggest setting tolerance no lower than 4 deg. Since accuracy is determined by webcam resolution, halving or doubling the viewing distance should proportionally change the error in estimated gaze angle.",
    type: "numerical",
    default: "1000",
  },
  flipScreenHorizontallyBool: {
    name: "flipScreenHorizontallyBool",
    availability: "later",
    example: "FALSE",
    explanation: "Needed when the display is seen through a mirror.",
    type: "boolean",
    default: "FALSE",
  },
  font: {
    name: "font",
    availability: "now",
    example: "Sloan.woff2",
    explanation:
      'font specified what font you want. How you do that depends on fontSource:\n\nfile: font is the filename (including the extension: woff2, woff, otf, ttf, or svg) of a font file in your Fonts folder in your Pavlovia account. The compiler will download this file from your Fonts folder to your temporary local Experiment folder, which is later uploaded to a new project repo for this new experiment. (I think we use the javascript version of the @font-face command. The Mozilla page on the @font-face command seems to say that it supports only: woff2, woff, otf, ttf, or svg. https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)\n\ngoogle:  font is the filename (including extension) of a font file provided by the free Google Font server. We use their API to discover the URL.\n\nserver: font is a URL pointing to the desired font on a font server. Many fonts are served for free by the Google Fonts server.  https://fonts.google.com/  At that website, use "Search for font". Having found your font, select the style you want. In the "Selected Family" pop-up window, click the "@import" button. From within the revealed CSS code, copy the URL from inside the "url(. )". ("server" support is coming.)\n\nbrowser: The experiment will pass the font preference string that you place in font to the participant\'s browser and accept whatever it provides.  Your string can include several font names, separated by commas, first choice first, to help the browser find something close to your intent. This is the usual way to select a font on the web, and never generates an error.  Specify just the family name, like "Verdana", and use the "fontStyle" to select italic, bold, or bold-italic. Some "web safe" fonts (e.g. Arial, Verdana, Helvetica, Tahoma, Trebuchet MS, Times New Roman, Georgia, Garamond, Courier New, Brush Script MT) are available in most browsers. In ordinary browsing, it\'s helpful that browsers freely substitute fonts so that you almost always get something readable in the web page you\'re reading. In the scientific study of perception, we usually don\'t want data with a substituted font. So, normally, you should specify "file" or "server" so you\'ll know exactly what was shown to the participant. \n\nFonts load early. We\'ll get the browser to load all needed fonts at the beginning of the experiment, so the rest of the experiment can run without internet or font-loading delay. ',
    type: "text",
    default: "Roboto Mono",
  },
  fontCharacterSet: {
    name: "fontCharacterSet",
    availability: "now",
    example: "DHKNORSVZ",
    explanation:
      "fontCharacterSet is a string of unicode characters. On each trial, the target and flankers are randomly drawn from this character set, without replacement. Allowed responses are restricted to this character set. The other keys on the keyboard are dead. Letters may appear more than once in the string, to increase their probability of being drawn, but once one is drawn the rest are removed with it, so the drawn samples won't have any repeats.",
    type: "text",
    default: "abcdefghijklmnopqrstuvwxyz",
  },
  fontFeatureSettings: {
    name: "fontFeatureSettings",
    availability: "now",
    example: "",
    explanation:
      'Font features provide information about how to use the glyphs in a font to render a script or language. fontFeatureSettings receives a string. The default is the empty string. A typical value is\n"calt" 1\nor\n"calt" 1, "smcp", "zero"\nEach line is a string. The string is passed to the CSS function font-variation-settings. The (single or double) quote marks are required. Each four letter code is taken from a long list of possible font features. “calt” enables the font’s “contextual alternates”, especially connections between adjacent letters in a script font. “smcp” enables small caps. “zero” requests a slash through the zero character to distinguish it from O. Most font features are Boolean and accept an argument of 0 for off, and 1 for on. Some accept an integer with a wider range. Supported by all modern browsers, including Internet Explorer.\nhttps://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings\nhttps://docs.microsoft.com/en-us/typography/opentype/spec/features_ae#tag-calt\n',
    type: "text",
    default: "",
  },
  fontSource: {
    name: "fontSource",
    availability: "now",
    example: "file",
    explanation:
      'fontSource must be file, google, server, or browser. Browsers happily substitute for unavailable fonts. That\'s great for the web, but bad for perception experiments, so we encourage you to provide access to a specific font, either as a file or on a font server. For each condition that has fontSource "file", the compiler checks for presence of the font in your Fonts folder (in your Pavlovia account). That folder is persistent, and you can add more fonts to it at any time, through the EasyEyes.app/threshold page. Any popular font format will work, but to minimize transmission time, we recommend minimizing file size by using a highly compressed webfont file format, indicated by the extension woff2. \n\nfile: font contains the filename (with extension) of a file in the Fonts folder in the EasyEyesResources repository in your Pavlovia account. This is checked by the compiler, to avoid runtime surprises. \n\ngoogle: font contains the font name as recognized by the Google Fonts server.\n\nserver: font contains the URL of the font on a font server. ("server" support is coming.)\n\nbrowser: font is a font-preference string that is passed to the participant\'s browser. This never produces an error; we accept whatever font the browser chooses. Your font string can include several font names, separated by commas, to help the browser find something close to your intent. This is the usual way to select a font on the web, and never generates an error. (We don\'t know any quick way to discover what font the browser chose, so the scientist will never know.) ',
    type: "categorical",
    default: "google",
    categories: ["file", "google", "browser"],
  },
  fontStyle: {
    name: "fontStyle",
    availability: "later",
    example: "bold",
    explanation:
      'Can be regular (default), bold, italic, or bold-italic. \n• If font is a file name that already specifies the style you want, then don\'t specify a style here. Just leave fontStyle as default. Otherwise the participant\'s browser might try to "helpfully" synthesize the new style by tilting or thickening what the font file renders. It\'s safer to switch to the font file whose name specifies the style you want. \n• Alternatively, if fontSource is "browser", and font specifies only a font family name (e.g. Verdana), or several (e.g. Verdana;Arial), then you can use fontStyle to select among the four standard styles.',
    type: "categorical",
    default: "regular",
    categories: ["regular", "bold", "italic", "boldItalic"],
  },
  fontVariationSettings: {
    name: "fontVariationSettings",
    availability: "now",
    example: "",
    explanation:
      'fontVariationSettings accepts a string to control a variable font. You set all the axes at once. Any axis you don\'t set will be set to its default. Every axis has a four-character name. Standard axes have lowercase names, like \'wght\' for weight. Novel axes have ALL-UPPERCASE names. To discover your variable font\'s axes of variation, and their allowed ranges, try this web page: https://fontgauntlet.com/ For an introduction to variable fonts: https://abcdinamo.com/news/using-variable-fonts-on-the-web Variable fonts have one or more axes of variable, and we can pick any value along each axis to control the font rendering. fontVariationSettings receives a string. The default is the empty string. A typical value is\n"wght" 625\nor\n"wght" 625”, wdth" 25\nEach line is a string. The string is passed to the CSS function font-variation-settings. The (single or double) quote marks are required. Each four letter code represents an axis of variation that is defined for this variable font. “wght” is weight, which allows you to select any weight from extra thin to regular to bold, to black. “wdth” is width, which allows you to select any width from compressed to regular to expanded. Some axes are standard, with lowercase names. Any font can have unique axes, with uppercase names. One must consult the documentation of each variable font to discover which axes it supports. Variable fonts are supported by all modern browsers, and not by Internet Explorer.\nhttps://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-variation-settings\n',
    type: "text",
    default: "",
  },
  fontWeight: {
    name: "fontWeight",
    availability: "later",
    example: "550",
    explanation:
      "To control a variable font, accepts a numerical value to be assigned like this: \nmyText.style.fontWeight = fontWeight\nNOTE: If you use this parameter, then EasyEyes will flag an error if it determines that the target font is not variable.\nhttps://abcdinamo.com/news/using-variable-fonts-on-the-web",
    type: "numerical",
    default: "NaN",
  },
  instructionFont: {
    name: "instructionFont",
    availability: "now",
    example: "Georgia",
    explanation:
      'Font used for participant instructions. Four cases are selected by instructionFontSource=\ndefaultForLanguage: We recommend leaving instructionFont blank and setting instructionFontSource to defaultForLanguage, which will result in using whatever font is recommended by the EasyEyes International Phrases sheet for the chosen instructionLanguage. This allows runtime selection of instructionLanguage by the participant. For each language, the EasyEyes International Phrases table recommends a font from the Noto serif family, which are all served by Google Fonts.\nfile:  instructionFont is the file name (including extension) of a font in your Fonts folder in your Pavlovia account. Be sure that your font can render the characters of the instructionLanguage you pick. \ngoogle: instructionFont is a filename (including extension) of a font on the Google Fonts server.\nserver: instructionFont is a URL pointing to the desired font on a font server, e.g. Adobe. ("server" support is coming.)\nbrowser: instructionFont should be a string for the browser expressing your font preference.\n     Noto Fonts. The EasyEyes International Phrases table recommends the appropriate "Noto" font, available from Google and Adobe at no charge. Wiki says, "Noto is a font family comprising over 100 individual fonts, which are together designed to cover all the scripts encoded in the Unicode standard." Various fonts in the Noto serif family cover all the worlds languages that are recognized by unicode. https://en.wikipedia.org/wiki/Noto_fonts  \nWe plan to use the free Google Fonts server, which serves all the Noto fonts.\n     Runtime language selection. To allow language selection by the participant at runtime, we will ask the Google Fonts server to serve an appropriate font (from the Noto Serif family) as specified by the EasyEyes International Phrases sheet. \n     Fonts load early. We\'ll get the browser to load all needed fonts at the beginning of the experiment, so the rest of the experiment can run without internet or font-loading delay. Of course, we hope the computer eventually reconnects to send the experiment\'s data to Pavlovia, where the scientist can retrieve it.',
    type: "text",
    default: "Verdana",
  },
  instructionFontSource: {
    name: "instructionFontSource",
    availability: "now",
    example: "browser",
    explanation:
      'instructionFontSource must be file, google, server, or browser. "server" support is coming. See fontSource for explanation.',
    type: "categorical",
    default: "browser",
    categories: ["file", "google", "browser"],
  },
  instructionFontStyle: {
    name: "instructionFontStyle",
    availability: "soon",
    example: "regular",
    explanation:
      "Must be regular, bold, italic, or boldItalic. When you select a font file that is already styled, just select regular here. Otherwise the browser might try to tilt or thicken the already italic or bold font with unexpected results.",
    type: "categorical",
    default: "regular",
    categories: ["regular", "italic", "bold", "boldItalic"],
  },
  instructionLanguage: {
    name: "instructionLanguage",
    availability: "soon",
    example: "Italian",
    explanation:
      'English name for the language used for instructions to the participant. It must be "participant" or match one of the entries in the second row of the EasyEyes International phrases sheet. If you enter "participant", then the participant will be allowed to select the instruction language from a pull-down menu.',
    type: "categorical",
    default: "English",
    categories: [""],
  },
  instructionTableURL: {
    name: "instructionTableURL",
    availability: "later",
    example: "",
    explanation:
      'The URL of a Google Sheets table of international phrases to be used to give instructions throughout the experiment. A scientist can substitute her own table, presumably a modified copy of the EasyEyes International Phrases Table. https://docs.google.com/spreadsheets/d/1UFfNikfLuo8bSromE34uWDuJrMPFiJG3VpoQKdCGkII/edit#gid=0\nThis table allows the Participant page to make all non-stimulus text international. In every place that it displays instruction text, the Participant page looks up the mnemonic code for the needed phrase in the instruction table, to find a unicode phrase in the selected instructionLanguage (e.g. English, German, or Arabic). It\'s a Google Sheets file called "EasyEyes International Phrases".\nhttps://docs.google.com/spreadsheets/d/1AZbihlk-CP7sitLGb9yZYbmcnqQ_afjjG8h6h5UWvvo/edit#gid=0\nThe first column has mnemonic phrase names. Each of the following columns gives the corresponding text in a different language. After the first column, each column represents one language. Each row is devoted to one phrase. The second row is languageNameEnglish, with values: English, German, Polish, etc. The third row is languageNameNative, with values: English, Deutsch, Polskie, etc. \n     We incorporate the latest "EasyEyes International Phrases" file when we compile threshold.js. For a particular experiment, we only need the first column (the mnemonic name) and the column whose heading matches instructionLanguage. We should copy those two columns into a Javascript dictionary, so we can easily look up each mnemonic phrase name to get the phrase in the instructionLanguage. To display any instruction, we will use the dictionary to convert a mnemonic name to a unicode phrase. \n     languageDirection. Note that most languages are left to right (LTR), and a few (e.g. Arabic, Urdu, Farsi, and Hebrew) are right to left (RTL). Text placement may need to take the direction into account. The direction (LTR or RTL) is provided by the languageDirection field.\n     languageNameNative. If we later allow the participant to choose the language, then the language selection should be based on the native language name, like Deustch or Polskie, i.e. using languageNameNative instead of languageNameEnglish.',
    type: "text",
    default: "",
  },
  invitePartingCommentsBool: {
    name: "invitePartingCommentsBool",
    availability: "later",
    example: "FALSE",
    explanation:
      "At the end of this block, invite the participant to make parting comments. ",
    type: "boolean",
    default: "FALSE",
  },
  markingBlankedNearTargetBool: {
    name: "markingBlankedNearTargetBool",
    availability: "later",
    example: "TRUE",
    explanation:
      'Suppress any parts of the fixation cross or target X that are too close to the possible targets in this conditionGroup. This enables both meanings of "too close": markingBlankingRadiusReEccentricity and markingBlankingRadiusReTargetHeight.',
    type: "boolean",
    default: "TRUE",
  },
  markingBlankingRadiusReEccentricity: {
    name: "markingBlankingRadiusReEccentricity",
    availability: "later",
    example: "0.5",
    explanation:
      'Considering crowding, define "too close" distance as a fraction of radial eccentricity.',
    type: "numerical",
    default: "0.5",
  },
  markingBlankingRadiusReTargetHeight: {
    name: "markingBlankingRadiusReTargetHeight",
    availability: "later",
    example: "2",
    explanation:
      'Considering masking, define "too close" distance as a fraction of target height.',
    type: "numerical",
    default: "0.2",
  },
  markingClippedToStimulusRectBool: {
    name: "markingClippedToStimulusRectBool",
    availability: "later",
    example: "FALSE",
    explanation:
      'Fixation and target marking can be restricted (true), protecting the screen margins, or (false) allowed to extend to screen edges, a "full bleed".',
    type: "boolean",
    default: "FALSE",
  },
  markingFixationStrokeLengthDeg: {
    name: "markingFixationStrokeLengthDeg",
    availability: "later",
    example: "1",
    explanation: "Stroke length in the fixation cross.",
    type: "numerical",
    default: "1",
  },
  markingFixationStrokeThicknessDeg: {
    name: "markingFixationStrokeThicknessDeg",
    availability: "later",
    example: "0.03",
    explanation: "Stroke thickness in the fixation cross.",
    type: "numerical",
    default: "0.03",
  },
  markingOffsetBeforeTargetOnsetSecs: {
    name: "markingOffsetBeforeTargetOnsetSecs",
    availability: "now",
    example: "0.2",
    explanation:
      "Pause before target onset to minimize forward masking of the target by the preceding fixation and target markings.",
    type: "numerical",
    default: "0",
  },
  markingOnsetAfterTargetOffsetSecs: {
    name: "markingOnsetAfterTargetOffsetSecs",
    availability: "now",
    example: "0.2",
    explanation:
      "Pause before onset of fixation and target markings to minimize backward masking of the target.",
    type: "numerical",
    default: "0",
  },
  markingTargetStrokeLengthDeg: {
    name: "markingTargetStrokeLengthDeg",
    availability: "later",
    example: "1",
    explanation: "Stroke length in the target X.",
    type: "numerical",
    default: "1",
  },
  markingTargetStrokeThicknessDeg: {
    name: "markingTargetStrokeThicknessDeg",
    availability: "later",
    example: "0.03",
    explanation: "Stroke thickness in the target X.",
    type: "numerical",
    default: "0.03",
  },
  markTheFixationBool: {
    name: "markTheFixationBool",
    availability: "now",
    example: "TRUE",
    explanation: "If true, then draw a fixation cross.",
    type: "boolean",
    default: "TRUE",
  },
  markThePossibleTargetsBool: {
    name: "markThePossibleTargetsBool",
    availability: "later",
    example: "FALSE",
    explanation:
      "If true, draw an X at every possible target location, considering all conditions in this conditionGroup. ",
    type: "boolean",
    default: "FALSE",
  },
  notes: {
    name: "notes",
    availability: "now",
    example: "",
    explanation:
      "Optional. Use this to add comments about the condition that you want preserved in the data file. Ignored by EasyEyes and saved with results.",
    type: "text",
    default: "",
  },
  playNegativeFeedbackBeepBool: {
    name: "playNegativeFeedbackBeepBool",
    availability: "now",
    example: "FALSE",
    explanation:
      "After a mistaken response, play pure 500 Hz tone for 0.5 sec at amplitude 0.05. Usually FALSE, as we stay positive and give only positive feedback.",
    type: "boolean",
    default: "FALSE",
  },
  playPositiveFeedbackBeepBool: {
    name: "playPositiveFeedbackBeepBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "After correct response, play pure 2000 Hz tone for 0.05 sec at amplitude 0.05. ",
    type: "boolean",
    default: "TRUE",
  },
  playPurrWhenReadyBool: {
    name: "playPurrWhenReadyBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "Play a purring sound to alert the observer while we await their response. Pure 200 Hz tone for 0.6 sec at amplitude 1.",
    type: "boolean",
    default: "TRUE",
  },
  questionAndAnswer1: {
    name: "questionAndAnswer1",
    availability: "now",
    example: "",
    explanation:
      "A series of strings separated by the vertical bar character |. The first string is a question, and the rest are possible answers. The participant is required to click on one. For example “How much beauty do you get from this image right now?|1|2|3|4|5|6|7”\nOr   “Which kind of image is it?|figurative painting|abstract painting|photograph”",
    type: "",
    default: "",
  },
  questionAndAnswer2: {
    name: "questionAndAnswer2",
    availability: "now",
    example: "",
    explanation:
      "Same purpose, with a different name, so that you can have several questions in one trial. ",
    type: "",
    default: "",
  },
  questionAndAnswer3: {
    name: "questionAndAnswer3",
    availability: "now",
    example: "",
    explanation:
      "Same purpose, with a different name, so that you can have several questions in one trial. ",
    type: "",
    default: "",
  },
  questionAndAnswer4: {
    name: "questionAndAnswer4",
    availability: "now",
    example: "",
    explanation:
      "Same purpose, with a different name, so that you can have several questions in one trial. ",
    type: "",
    default: "",
  },
  readingCorpus: {
    name: "readingCorpus",
    availability: "now",
    example: "the-phantom-tollbooth.txt",
    explanation:
      "The filename of a text file that has already been uploaded to Pavlovia. The text file should be a book's worth of readable text. We typically use \"The phantom tollbooth\" a popular American children's book with a reading age of 10+ years for interest and 12+ years for vocabulary. We retain punctuation, but discard chapter and paragraph breaks. \n     After EasyEyes reads in the corpus text, it does two analyses to facilitate its use.\n1. CONCORDANCE. Prepare a concordance. This is a two-column table. The first column is a unique list of all the corpus words. The second column is frequency, i.e. the number of times that the word appears in the corpus. For this purpose we should ignore capitalization and leading and trailing punctuation. The table should be sorted by decreasing frequency.\n2. WORD INDEX. Use a regex search to make a one-column  list of the index, in the corpus, of every word. For this purpose, a word consists of an alphanumeric character plus all leading and trailing non-white characters.\n     RECOMMENDATION: Every passage selection begins and ends at a sentence break.\n",
    type: "text",
    default: "",
  },
  readingCorpusSkipWords: {
    name: "readingCorpusSkipWords",
    availability: "now",
    example: "1521",
    explanation:
      "readingCorpusSkipWords. The passage to be read will begin after skipping that number of words from the beginning of the corpus. This is easy, using the word index table computed when EasyEyes read in the readingCorpus.",
    type: "integer",
    default: "0",
  },
  readingDefineSingleLineSpacingAs: {
    name: "readingDefineSingleLineSpacingAs",
    availability: "now",
    example: "nominalSize",
    explanation:
      "What shall we say is the \"single\" line spacing of the text to be read? \n• nominalSize is the industry standard, which defines single line spacing as the nominal point size at which we are rendering the font. \n• font defines single line spacing as the font's built-in line spacing, which can be enormous in fonts with large flourishes. \n• twiceXHeight defines single line spacing as twice the font's x-height.\n• explicit defines single line spacing as xxx.",
    type: "categorical",
    default: "nominalSize",
    categories: ["nominalSize", "font", "twiceXHeight", "explicit"],
  },
  readingLinesPerPage: {
    name: "readingLinesPerPage",
    availability: "now",
    example: "8",
    explanation: "Number of lines of text per page.",
    type: "numerical",
    default: "8",
  },
  readingMaxCharactersPerLine: {
    name: "readingMaxCharactersPerLine",
    availability: "now",
    example: "57",
    explanation:
      "Used for line breaking. Typographers reckon that text is easiest to read in a column that is 8-10 words wide. Average English word length is 5 characters, so, counting the space between words, that's (8 to 10) *6=(48 to 60) spacings per line. Line breaking without hyphenation will produce an average line length maybe half a word less than the max, so to get an average of 9, we could use a max of 9.5, or 9.5*6=57 spacings.",
    type: "numerical",
    default: "55",
  },
  readingMultipleOfSingleLineSpacing: {
    name: "readingMultipleOfSingleLineSpacing",
    availability: "now",
    example: "1.2",
    explanation:
      'Set the line spacing (measured baseline to baseline) as this multiple of "single" line spacing, which is defined by readingDefineSingleLineSpacingAs. 1.2 is the default in many typography apps, including Adobe inDesign.',
    type: "numerical",
    default: "1.2",
  },
  readingNominalSizeDeg: {
    name: "readingNominalSizeDeg",
    availability: "now",
    example: "3",
    explanation:
      'If readingSetSizeBy is "nominal", then set point size to readingNominalSizeDeg*pixPerDeg.',
    type: "numerical",
    default: "1",
  },
  readingNumberOfPossibleAnswers: {
    name: "readingNumberOfPossibleAnswers",
    availability: "now",
    example: "3",
    explanation:
      "Number of possible answers for each question. Only one of the possible answers is right.",
    type: "integer",
    default: "3",
  },
  readingNumberOfQuestions: {
    name: "readingNumberOfQuestions",
    availability: "now",
    example: "4",
    explanation:
      "After the participant reads a passage, EasyEyes will ask readingNumberOfQuestions, each on a new screen, to assess retention. Each retention question offers several words and asks the participant which word (the target) was in the passage just read. The  other words (foils) were not in that passage but do appear in the corpus. The target word is presented with enough foils to offer readingNumberOfPossibleAnswers. The words are arranged in alphabetical order below the question. The participant responds by clicking on the chosen word. It's \"forced choice\"; the participant must click a word. We give a \"correct\" beep if the answer is right. We repeat this several times, as specified by readingNumberOfQuestions.\n     The first and last pages might not be representative because timing of the space bar press might be more irregular, and primacy and recency would make words on those pages more memorable. So we analyze only the middle pages, excluding the first and last from both from the estimate of reading speed and the retention test. \n     For a given passage, each question uses a different target word. We pick candidate target words randomly from the passage just read  (in which many words appear more than once), and check each for suitability. We reject some candidates, so we keep picking candidates until we have accepted the desired number, readingNumberOfQuestions. \n     The parameter readingFoilToTargetFrequencyMaxRatio specifies, for each foil, how similar to that of the target, the foil's corpus frequency must be. Each tentative target is accepted if, firstly, it hasn't already been used in this block and, secondly, the corpus has readingNumberOfPossibleAnswers minus one foils with similar frequency. To be sufficiently similar, each foil's corpus frequency must be in the range targetFrequency*[1/r, r] where r=readingFoilToTargetFrequencyMaxRatio. \nWe take as foils the readingNumberOfPossibleAnswers-1 words that are closest in log frequency to the target frequency in the corpus. If we can't find enough foils for a given target, then we reject that target and pick another. The read passage will typically have hundreds of words, so there are lots of candidate targets for the retention questions.\n      \n\nWe will, once, compute the word frequency in the corpus of every word in the corpus. We can save this as a two column table (word and number of instances in the corpus), sorted by frequency. Once EasyEyes randomly selects the word that will be the correct answer, EasyEyes will look in the word-frequency table and take, as foils, the N-1 words with frequency most similar to that of the correct answer. \n\n",
    type: "integer",
    default: "3",
  },
  readingPages: {
    name: "readingPages",
    availability: "now",
    example: "4",
    explanation:
      "Number of pages to be read. The first and last pages will not be used for testing.",
    type: "numerical",
    default: "4",
  },
  readingSetSizeBy: {
    name: "readingSetSizeBy",
    availability: "now",
    example: "spacing",
    explanation:
      "How do you specify the size of the text to be read?\n• nominal will set the point size of the text to readingNominalSizeDeg*pixPerDeg,  \n• xHeight will adjust text size to achieve the specified x-height (the height of lowercase x),  i.e. readingXHeightDeg. \n• spacing will adjust the text size to achieve the specified letter-to-letter readingSpacingDeg.",
    type: "categorical",
    default: "spacing",
    categories: ["nominal", "xHeight", "spacing"],
  },
  readingSingleLineSpacingDeg: {
    name: "readingSingleLineSpacingDeg",
    availability: "now",
    example: "2",
    explanation:
      "Explicit value of single line spacing. This is ignored unless readingDefineSingleLineSpacingAs is explicit.",
    type: "numerical",
    default: "1",
  },
  readingSpacingDeg: {
    name: "readingSpacingDeg",
    availability: "now",
    example: "0.5",
    explanation:
      "If readingSetSizeBy is spacing, the point size of the text to be read is adjusted to make this approximately the average center-to-center spacing (deg) of neighboring characters in words displayed. For the proportionality of spacing to point size, I suggest we measure the width of the fontCharacterSet string, and divide by the number of numbers in the string.",
    type: "numerical",
    default: "1",
  },
  readingXHeightDeg: {
    name: "readingXHeightDeg",
    availability: "now",
    example: "0.5",
    explanation:
      'If readingSetSizeBy is "xHeight", then set point size to to achieve this specified x-height (the height of lowercase x). ',
    type: "numerical",
    default: "1",
  },
  responseAllowedEarlyBool: {
    name: "responseAllowedEarlyBool",
    availability: "now",
    example: "FALSE",
    explanation:
      "When TRUE, the participant can respond at any time after target onset. When FALSE, the participant can only repond after target offset. For demos and debugging, it is handy to set responseAllowedEarlyBool to TRUE with a long targetDurationSec (e.g. 999) so that the stimulus stays up while you examine it, yet you can quickly click through several stimuli to see the progression. Note that enabling early response while clicked responses are allowed forces EasyEyes to show the characterSet early, since clicking requires something to click on. And if responseRequiresCharacterSetBool is TRUE then setting responseAllowedEarlyBool TRUE will force early display of the characterSet regardless of which response modalities are enabled.",
    type: "boolean",
    default: "TRUE",
  },
  responseClickedBool: {
    name: "responseClickedBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "Allow participant to respond at every occasion by clicking (e.g. clickingthe target letter in the characterSet). When ready for stimulus, allow clicking fixation instead of hitting SPACE. The various response modes are not exclusive. Enable as many as you like. And simulateParticipantBool can provide responses too.",
    type: "boolean",
    default: "TRUE",
  },
  responseEscapeOptionsBool: {
    name: "responseEscapeOptionsBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "Once debugged this option will be TRUE by default. If FALSE, then we follow the PsychJS behavior, and any press of ESCAPE immeditaely ends testing and takes the participant to the debrief form (if requested). If TRUE, then ESCAPE offers two or three options. The miidest optiion is to continue from where the escape was presssed, deleting any trial for which the response was not yet collected. The middle option is only presented if we suppose that we're testing the scientist, not a typical participant. This option skips to the next block. The last option ends testing and goes to debriefing (if requested). Our rule for supposing that the participant is the scientist is either that the Prolific URL parameters are absent or we are in Prolific Preview mode.\n\nIf responseEscapeOptionsBool is TRUE, then, at any prompt, the participant can hit <escape> to be asked whether to cancel the trial (hit space), the block (hit return), or the whole experiment (hit escape again).",
    type: "boolean",
    default: "FALSE",
  },
  responseMustClickCrosshairBool: {
    name: "responseMustClickCrosshairBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "REQUESTED BY MANY PARTICIPANTS (This grants the frequent request from our participants that they prefer to type the letter, even if they're required to click on the crosshair to begin each trial.) Overrules other response boolean parameters to enable clicking, and ONLY clicking of the crosshair, to request the next trial. The hope is that clicking the crosshair results in good fixation just before stimulus presentation. This parameter is ignored for other responses, e.g. identifying the target and proceeding through instructions. (Pressing the ESCAPE key is always allowed.) ",
    type: "boolean",
    default: "TRUE",
  },
  responseSpokenBool: {
    name: "responseSpokenBool",
    availability: "later",
    example: "FALSE",
    explanation:
      "Allow participant to respond  verbally at every occasion, e.g. by verbally naming the target. The various response modes are not exclusive. Enable as many as you like. But responseMustClickCrosshairBool overrides all other settings.",
    type: "boolean",
    default: "FALSE",
  },
  responseTypedBool: {
    name: "responseTypedBool",
    availability: "now",
    example: "TRUE",
    explanation:
      'Allow participant to respond at every occasion by pressing a key in keyboard. The various response modes are not exclusive. Enable as many as you like. Note: disable typed reponses if you want to force participants to click on fixation as a way tp ensure good fixation when the stimulus is presented. OVERRRIDE: Setting simulateParticipantBool to TRUE or showGrid to other than "disabled" enables type as a response method, regardles of the setting of responseTypedBool. But responseMustClickCrosshairBool overrides all other settings while the crosshair is available for clicking.',
    type: "boolean",
    default: "FALSE",
  },
  responseTypedEasyEyesKeypadBool: {
    name: "responseTypedEasyEyesKeypadBool",
    availability: "now",
    example: "FALSE",
    explanation:
      "Allow participant to respond at every occasion by pressing a key in EasyEyes keypad. The various response modes are not exclusive. Enable as many as you like. But responseMustClickCrosshairBool overrides all other settings.",
    type: "boolean",
    default: "FALSE",
  },
  screenshotBool: {
    name: "screenshotBool",
    availability: "now",
    example: "TRUE",
    explanation:
      'Requests saving a full-screen screenshot of each stimulus and response display of this condition, plus each instruction display of the block. (Currently all instruction displays belong to the block, not to any condition.) Each filename should be E.B.C.TA.png, where E stands for the experiment name, B stands for the block number, C stands for the condition number, T stands for the trial number of the condition in the block, and A is "s" for stimulus or "r" for response. If the display is instructional then A is "i", C is 0, and T is a counter that starts at 1 at the beginning of the block. screenshotBool is condition-specific, but if several conditions enable it, EasyEyes still saves only one copy of each instructional screen. Screenshots are useful for debugging and to illustrate the stimulus in talks and papers. It is expected that taking screenshots will severely degrade timing, so it should not be requested while a participant is being tested in earnest. Instead the scientist will test herself (or use simulateParticipantBool) to collect the images she needs.\n\nCan we save these files to a "Screenshots" folder in the participant computer\'s Download folder or in the experiment repository on Pavlovia? ',
    type: "boolean",
    default: "FALSE",
  },
  showBoundingBoxBool: {
    name: "showBoundingBoxBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "For debugging, setting showBoundingBoxBool TRUE displays the bounding box around the target character (if spacing is ratio) or flanker-target-flanker triplet (if spacing typographic). We show the getBoundingBox method from psychojs, using tight=true. ",
    type: "boolean",
    default: "FALSE",
  },
  showCharacterSetBoundingBoxBool: {
    name: "showCharacterSetBoundingBoxBool",
    availability: "now",
    example: "TRUE",
    explanation: "Shows the bounding box of the whole fontCharacterSet.",
    type: "boolean",
    default: "FALSE",
  },
  showCharacterSetForAllResponsesBool: {
    name: "showCharacterSetForAllResponsesBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "It's obvious that identifying a letter by clicking requires display of a characterSet to click on. However, sometimes we show a foreign characterSet with Roman labels, to enable use of a Roman keyboard, or the scientist may just want the actual letter shapes to be visible while the participant types. This flag tells EasyEyes to display the characterSet whenever the participant is responding.",
    type: "boolean",
    default: "FALSE",
  },
  showCharacterSetWhere: {
    name: "showCharacterSetWhere",
    availability: "now",
    example: "bottom",
    explanation:
      'Can be bottom, top, left, or right. After a trial, this shows the observer the allowed responses. If the target was a letter then the possible letters are called the "characterSet". If the target is a gabor, the characterSet might display all the possible orientations, each labeled by a letter to be pressed.',
    type: "categorical",
    default: "bottom",
    categories: ["none", "bottom", "top", "left", "right"],
  },
  showCharacterSetWithLabelsBool: {
    name: "showCharacterSetWithLabelsBool",
    availability: "now",
    example: "FALSE",
    explanation:
      "For foreign or symbol characterSets, we add Roman labels that the observer can type on an ordinary (Roman) keyboard.",
    type: "boolean",
    default: "FALSE",
  },
  showConditionNameBool: {
    name: "showConditionNameBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "If TRUE, then display condition name as text at lower-left corner, or, if showTargetSpecsBool is TRUE, above target specs. See showTargetSpecsBool. The point size of condition-name text should be 1.4x bigger than we use for target specs.",
    type: "boolean",
    default: "FALSE",
  },
  showCounterBool: {
    name: "showCounterBool",
    availability: "now",
    example: "TRUE",
    explanation:
      'If TRUE display something like,"Trial 31 of 120. Block 2 of 3. At 32 cm." (The trailing part about distance is included only if showViewingDistanceBool is TRUE.) The trial counter counts all trials in the block, which may have several conditions. If the block has three conditions with 40 blocks each, then there are 120 trials in the block. ',
    type: "boolean",
    default: "TRUE",
  },
  showCounterWhere: {
    name: "showCounterWhere",
    availability: "now",
    example: "bottomRight",
    explanation:
      "Can be bottomLeft, bottomCenter, or bottomRight. This location is used for both the trial count AND the viewing distance. ",
    type: "categorical",
    default: "bottomRight",
    categories: ["bottomLeft", "bottomRight", "bottomCenter"],
  },
  showFixationMarkBool: {
    name: "showFixationMarkBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "Whether or not to show the fixation mark. Regardless of this parameter, we don't show fixation when targetRepeatsBool is TRUE. In that can we cover a large area of the screen with repeated targets. ",
    type: "boolean",
    default: "TRUE",
  },
  showGrid: {
    name: "showGrid",
    availability: "now",
    example: "deg",
    explanation:
      "Show a full-screen grid that aids visual checking of location and size. Set showGrid to 'px' for a pixel grid, 'cm' for a centimeter grid, 'deg' for a degrees grid,  'mm' for a cortical grid, 'none' for no grid, and 'disabled' to prevent any grid. Unless 'disabled', repeatedly pressing the backquote key (below ESCAPE) cyles through the five states: px, cm, deg, mm, none. The 'px' and 'cm' grids have their origin at lower left. The 'deg' and 'mm' grids have their origin at fixation. ",
    type: "categorical",
    default: "disabled",
    categories: ["px", "cm", "deg", "mm", "none", "disabled"],
  },
  showInstructionsWhere: {
    name: "showInstructionsWhere",
    availability: "now",
    example: "topLeft",
    explanation:
      'Can be topLeft or bottomLeft. This is shown after the stimulus disappears, to instruct the participant how to respond. A typical instruction for the identification task is: "While keeping your gaze on the fixation cross, type your best guess for what middle letter was just shown." ',
    type: "categorical",
    default: "topLeft",
    categories: ["none", "topLeft", "bottomLeft"],
  },
  showPercentCorrectBool: {
    name: "showPercentCorrectBool",
    availability: "now",
    example: "FALSE",
    explanation:
      "REQUESTED BY MANY PARTICIPANTS. If TRUE for any condition in this block, then at the end of the block EasyEyes presents a pop-up window reporting the overall percent correct (acrosss all conditions for which showPercentCorrectBool is TRUE) in that block. The participant dismisses the window by hitting RETURN or clicking its Proceed button. This feature was requested by maybe a third of the participants who wrote comments, when invited to.",
    type: "boolean",
    default: "TRUE",
  },
  showProgressBarWhere: {
    name: "showProgressBarWhere",
    availability: "later",
    example: "right",
    explanation:
      "Can be none or right. Meant for children. Graphically displays a vertical green bar that tracks the trial count. The outline goes from bottom to top of the screen and it gradually fills up with green liquid, empty at zero trials, and filled to the top after the last trial of the block. Sometimes we call the green liquid spaceship fuel for Jamie the astronaut.",
    type: "categorical",
    default: "none",
    categories: ["none", "right"],
  },
  showTakeABreakCreditBool: {
    name: "showTakeABreakCreditBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "Displays the value of takeABreakCredit as a graphical icon next to the trial counter. A black box that gradually fills, from the bottom up, with glowing green. Empty for zero and full for 1. The box is currently centered at bottom of screen, but we plan to make it contiguous to the trial counter display.",
    type: "boolean",
    default: "FALSE",
  },
  showTargetSpecsBool: {
    name: "showTargetSpecsBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "For debugging. If true, show target size and spacing in deg in lower left corner, similar to the trial/block counter. See showTitle.",
    type: "boolean",
    default: "FALSE",
  },
  showViewingDistanceBool: {
    name: "showViewingDistanceBool",
    availability: "now",
    example: "FALSE",
    explanation:
      'If TRUE display something like "Trial 31 of 120. Block 2 of 3. At 32 cm." (The trial and block counters appear only if showCounterBool is TRUE.) Without distance tracking, this is a subtle reminder to the participant of the distance they are supposed to be at. With distance tracking, it allows both the participant and the experimenter to monitor the dynamic viewing distance. It\'s updated only once or twice per trial, to avoid drawing attention away from the stimulus.',
    type: "boolean",
    default: "FALSE",
  },
  simulateParticipantBool: {
    name: "simulateParticipantBool",
    availability: "now",
    example: "FALSE",
    explanation:
      'Use the software model specifed by "simulationModel" to generale observer responses. The test runs without human intervention. SIDE EFFECT: Setting simulateParticipantBool to TRUE enables type as a response method, regardles of the setting of responseTypedBool.',
    type: "boolean",
    default: "FALSE",
  },
  simulateWithDisplayBool: {
    name: "simulateWithDisplayBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "If true, then display the stimuli as though a participant were present. This is helpful for debugging. If false, then skip display to run as fast as possible.",
    type: "boolean",
    default: "TRUE",
  },
  simulationBeta: {
    name: "simulationBeta",
    availability: "now",
    example: "3",
    explanation: "Used by the Weibull observer model. ",
    type: "numerical",
    default: "2.3",
  },
  simulationDelta: {
    name: "simulationDelta",
    availability: "now",
    example: "0.01",
    explanation: "Used by the Weibull observer model.",
    type: "numerical",
    default: "0.01",
  },
  simulationModel: {
    name: "simulationModel",
    availability: "now",
    example: "blind",
    explanation:
      'For debugging and checking it is often helpful to simulate the observer. "simulationModel" can be: \n• "blind": This model merely presses a random response key. \n• "ideal": This model does the same task as the human, picking the best response given the stimulus. Its threshold is a useful point of reference in analyzing human data. Without noise, it will always be right. Since noise is still months away, for now, just give the right answer.\n• "weibull": This model gets the trial right with a probability given by the Weibull function, which is frequently fit to human data. The QUEST staircase asssumes the Weibull model, so QUEST should accurately measure its (unknown to Quest) threshold, when the respt of the parameters match. https://psychopy.org/api/data.html#psychopy.data.QuestHandler\nIn MATLAB, the Weibull model observer is: \nfunction response=SimulateWeibull(q,tTest,tActual)\n   t=tTest-tActual+q.epsilon;\n   P=q.delta*q.gamma+(1-q.delta)*(1-(1-q.gamma)*exp(-10.^(q.beta*t)));\n   response= P > rand(1);\nend\nresponse=1 means right, and response=0 means wrong. \nP=probability of a correct response\nq is a struct holding all the Weibull parameters. \nq.beta=simulationBeta\nq.delta=simulationDelta\nq.epsilon is set (once) so that P=thresholdProportionCorrect when tTest-tActual=0. \nq.gamma=probability of blindly guessing the correct answer\ntTest is the stimulus intensity level (usually log10 of physical parameter).\ntActual=log10(simulationThreshold) is the true threshold of the simulation\nrand(1) returns a random sample from the uniform distribution from 0 to 1.\nThe source code for our simulation model is here:\nhttps://github.com/EasyEyes/threshold/blob/a9ea5a6c64d3c5ff0aacfc01c86b6a5aecf64369/components/simulatedObserver.js',
    type: "categorical",
    default: "ideal",
    categories: ["blind", "weibull", "ideal"],
  },
  simulationThreshold: {
    name: "simulationThreshold",
    availability: "now",
    example: "0",
    explanation:
      "The actual threshold of the simulated observer in linear units (not log). We test the implementation of Quest by testing how well it estimates simulationThreshold.",
    type: "numerical",
    default: "2",
  },
  spacingDeg: {
    name: "spacingDeg",
    availability: "now",
    example: "",
    explanation:
      "spacingDeg specifies the spacing, in degrees, center-to-center from target to a flanker. This input value is ignored when you use Quest to measure the spacing threshold. If spacingDirection is radial then spacingDeg is the spacing from target to outer flanker. If spacingDirection is tangential then spacingDeg is spacing to each flanker, as the spacings are equal.",
    type: "numerical",
    default: "2",
  },
  spacingDirection: {
    name: "spacingDirection",
    availability: "now",
    example: "radial",
    explanation:
      'spacingDirection. When eccentricity is nonzero then spacingDirection can be horizontal, vertical, horizontalAndVertical, radial, tangential, or radialAndTangential. When eccentricity is zero then spacingDirection can be horizontal, vertical, or horizontalAndVertical. The "And" options display four flankers, distributed around the target. It is an error to request radial or tangential at eccentricity zero.',
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
  spacingOverSizeRatio: {
    name: "spacingOverSizeRatio",
    availability: "now",
    example: "1.4",
    explanation:
      "spacingOverSizeRatio specifies the ratio of spacing (in deg, center of target to center of inner flanker) to size (in deg, can be width or height as specified by targetSizeIsHeightBool). Ignored unless spacingRelationToSize is 'ratio'.",
    type: "numerical",
    default: "1.4",
  },
  spacingRelationToSize: {
    name: "spacingRelationToSize",
    availability: "now",
    example: "ratio",
    explanation:
      'spacingRelationToSize can be none, ratio, or typographic. When thresholdParameter is "spacing", spacingRelationToSize specifies how size depend on center-to-center target-flanker spacing. And when thresholdParameter is "size", spacingRelationToSize specifies how spacing depend on size. Can be none, ratio, or typographic. \n"none" means no dependence. Size and spacing are set independently. \n"ratio" means accept the thresholdParameter (which is either size or spacing) and adjust the other parameter to satisfy the specified "spacingOverSizeRatio". \n"typographic" prints the triplet (flanker, target, flanker) as a (horizontal) string (horizontally) centered on the specified target eccentricity. By "horizontal" and "vertical", we just mean the orientation of the baseline, and orthogonal to it. ("Vertically," the characterSet bounding box is centered on the eccentric location, and all letters in the string are on same baseline.) If thresholdParameter is "spacing" then the font size of string is adjusted so that the width of the string is 3× specified spacing. Works with both left-to-right and right-to-left fonts. [If thresholdParameter is "size" then EasyEyes adjusts the font size of the string to achieve the specified target size.] ',
    type: "categorical",
    default: "ratio",
    categories: ["none", "ratio", "typographic"],
  },
  spacingSymmetry: {
    name: "spacingSymmetry",
    availability: "now",
    example: "screen",
    explanation:
      'spacingSymmetry can be screen, retina, or cortex. This is ignored unless radial eccentrity is nonzero and spacingDirection is radial. Assuming there is a target between two flankers, all on a radial line. The "inner" flanker is closer to fixation than the target. The "outer" flanker is farther than the target. We refer to the center-to-center spacing from target to inner and outer flankers as the inner and outer spacings. Parameter "spacingDeg" specifies the outer spacing. spacingSymmetry affects only the inner spacing, which is calculated to make the two flanker spacings symmetric in one of three ways: at the screen (i.e. equal in pixels), at the retina (i.e. equal in deg), or at the cortex, i.e.  log(outer+eccDeg + 0.15)-log(eccDeg + 0.15)=log(eccDeg + 0.15)-log(eccDeg-inner + 0.15), where eccDeg is the target\'s radial eccentricity in deg. To check the spacing symmetry, you may want to show a corresponding grid by setting parameter showGrid to px or cm (for "screen"), deg (for "retina"), and mm (for "cortex").',
    type: "categorical",
    default: "retina",
    categories: ["screen", "retina", "cortex"],
  },
  takeABreakMinimumDurationSec: {
    name: "takeABreakMinimumDurationSec",
    availability: "now",
    example: "2",
    explanation:
      "The minimum duration when EasyEyes takes a break. The main purpose of the break is to blink, so 2 sec is enough. See takeABreakTrialCredit.",
    type: "numerical",
    default: "2",
  },
  takeABreakTrialCredit: {
    name: "takeABreakTrialCredit",
    availability: "now",
    example: "0.05",
    explanation:
      'REQUESTED BY MANY PARTICIPANTS. Intended for long blocks, over 50 trials. Participants seem to spontaneously pause betwen blocks to catch their breath and blink their eyes, but they don\'t do that within a long block, and later complain that they feel stressed and that their eyes sting (because they didn\'t blink during the block), so we added this feature to force a break every so often. takeABreakTrialCredit sets the value that accrues from performing each trial of this condition. Set it to zero for no breaks. The block\'s running total, regardless of condition, is kept in the internal parameter takeABreakCredit, which is zero at the beginning of each block. When takeABreakCredit exceeds 1, EasyEyes immediately subtracts 1 and takes a break. \nTHE BREAK\nEasyEyes displays a pop-up window with a dark surround, "Good work! Please take a brief break to relax and blink." Responses (except ESCAPE) and viewing-distance nudging are suspended for the time specified by takeABreakMinimumDurationSec. Then EasyEyes reenables responses, adds a Proceed button, and adds text, "To continue hit Proceed or RETURN." The participant can take as long as they need. When they hit Proceed (or RETURN), EasyEyes closes the pop up window, reenables the nudger (if it was formerly active), and resumes testing. ',
    type: "numerical",
    default: "0.05",
  },
  targetBoundingBoxHorizontalAlignment: {
    name: "targetBoundingBoxHorizontalAlignment",
    availability: "now",
    example: "center",
    explanation:
      'When computing the characterSet bounding box as the union of the bounding box of each letter, align the bounding boxes horizontally by "center" or "origin". The bounding boxes are always vertically aligned by baseline.',
    type: "categorical",
    default: "center",
    categories: ["center", "origin"],
  },
  targetContrast: {
    name: "targetContrast",
    availability: "soon",
    example: "-1",
    explanation:
      "Weber contrast ∆L/L0 of a letter or Michelson contrast (LMax-LMin)/(LMax+LMin) of a Gabor. A white letter is 100% contrast; a black letter is -100% contrast. Currently accurate only for 0 and ±1.",
    type: "numerical",
    default: "-1",
  },
  targetDurationSec: {
    name: "targetDurationSec",
    availability: "now",
    example: "0.15",
    explanation:
      "The duration of target presentation. For demos and debugging, it is handy to set responseAllowedEarlyBool to TRUE with a long targetDurationSec (e.g. 999) so that the stimulus stays up while you examine it, yet you can quickly click through several stimuli to see the progression. Set responseAllowedEarlyBool to FALSE if you want to allow response only after target offset.",
    type: "numerical",
    default: "0.15",
  },
  targetEccentricityXDeg: {
    name: "targetEccentricityXDeg",
    availability: "now",
    example: "10",
    explanation:
      "targetEccentricityXDeg is the x location of the target center, relative to fixation. The target center is defined as the center of the bounding box for the letters in the fontCharacterSet. (See targetBoundingBoxHorizontalAlignment.)",
    type: "numerical",
    default: "0",
  },
  targetEccentricityYDeg: {
    name: "targetEccentricityYDeg",
    availability: "now",
    example: "0",
    explanation:
      "targetEccentricityYDeg is the y location of the target center, relative to fixation.",
    type: "numerical",
    default: "0",
  },
  targetImageFolder: {
    name: "targetImageFolder",
    availability: "now",
    example: "faces",
    explanation:
      "The name of a folder of images, to be used when targetKind==image. The folder is submitted as a zip archive to the EasyEyes drop box, and saved in the Pavlovia account in the Folders folder. The name of the zip archive, without the extension, must match the value of targetImageFolder. We could also allow our submit box to accept a folder, which it copies, including all the enclosed files, ignoring any enclosed folders.",
    type: "text",
    default: "",
  },
  targetKind: {
    name: "targetKind",
    availability: "now",
    example: "letter",
    explanation:
      "• letter On each trial, the target is a randomly selected character from the fontCharacterSet displayed in the specified font and targetStyle.\n• gabor A gabor is the product of a Gaussian and a sinewave. As a function of space, the sinewave produces a grating, and the Gaussain vignettes it to a specific area, without introducing edges. Gabors are a popular stimulus in vision research because they have compact frequency and location.\n• image An image is randomly drawn, without replacement (for this condition in this block) from a folder whose name is specified by targetImageFolder. The image is displayed at the target eccentricity with the target size.\n• sound A sound is randomly drawn, without replacement (for this condition in this block) from a folder whose name is specified by targetSoundFolder. The sound is played for its full duration at targetSoundVolume and with targetSoundNoise\n• reading Measure reading speed and retention. Should be reclassified as a targetTask.",
    type: "categorical",
    default: "letter",
    categories: ["letter", "gabor", "image", "reading"],
  },
  targetMinimumPix: {
    name: "targetMinimumPix",
    availability: "now",
    example: "8",
    explanation:
      "Enough pixels for decent rendering of this target. This refers to size (in pixels) as specified by targetSizeIsHeightBool.",
    type: "numerical",
    default: "8",
  },
  targetQuestion1: {
    name: "targetQuestion1",
    availability: "later",
    example:
      "How much beauty do you get from this image right now?|1|2|3|4|5|6|7",
    explanation:
      "Parameter targetQuestion is a string consisting of a multiple-choice question and the allowed answers, all separated by the | character.",
    type: "text",
    default: "",
  },
  targetQuestion2: {
    name: "targetQuestion2",
    availability: "later",
    example: '"',
    explanation: '"',
    type: "text",
    default: "",
  },
  targetQuestion3: {
    name: "targetQuestion3",
    availability: "later",
    example: '"',
    explanation: '"',
    type: "text",
    default: "",
  },
  targetRepeatsBool: {
    name: "targetRepeatsBool",
    availability: "later",
    example: "FALSE",
    explanation:
      'Display many copies of two targets, alternating across the screen. The observer reports both. Thus each presentation gets two responses, which count as two trials. David Regan and colleagues (1992) reported that in testing foveal acuity of patients with poor fixation (e.g. nystagmus) it helps to have a "repeat-letter format" eye chart covered with letters of the same size, so that no matter where the eye lands, performance is determined by the letter nearest to the point of fixation, where acuity is best. We here extend that idea to crowding. We cover some part of the screen with an alternating pattern of two letters, like a checkerboard, so that the letters can crowd each other, and ask the observer to report both letters. Again, we expect performance to be determined by the letters nearest to the (unpredictable) point of fixation, where crowding distance is least.',
    type: "boolean",
    default: "FALSE",
  },
  targetRepeatsBorderCharacter: {
    name: "targetRepeatsBorderCharacter",
    availability: "later",
    example: "$",
    explanation:
      "When targetRepeatsBool we use this character to create an outer border.",
    type: "text",
    default: "$",
  },
  targetRepeatsMaxLines: {
    name: "targetRepeatsMaxLines",
    availability: "later",
    example: "3",
    explanation: "Can be 1, 3, 4, … . Sarah Waugh recommends 3.",
    type: "numerical",
    default: "3",
  },
  targetRepeatsPracticeBool: {
    name: "targetRepeatsPracticeBool",
    availability: "later",
    example: "TRUE",
    explanation:
      "If targetRepeatsBool then precedes data collection by practice, as explained in note below.",
    type: "boolean",
    default: "TRUE",
  },
  targetSafetyMarginSec: {
    name: "targetSafetyMarginSec",
    availability: "now",
    example: "0.5",
    explanation:
      "EasyEyes guarantees a blank time of targetSafetyMarginSec before and after the target presentation to minimize forward and backward masking of the target by instructions and other non-stimulus elements, including the characterSet and nudger. \n     ONSET: Since target onset is almost immediately after trial initiation, initiation of a trial is disabled until targetSafetyMarginSec has passed since the nudger and instructions were erased. \n     Instruction contrast c will be determined by the ratio r of cursor-to-crosshair distance to characterSet-to-crosshar distance. \n          c=max(0, 2r-1). \nThus, as the cursor moves to the crosshair, the instruction contrast will initally be 1 when the cursor is at the characterSet (r=1), will linearly fall to reach zero halfway to the crosshair (r=0.5), and remain at zero the rest of the way to the crosshair (r=0). \n     OFFSET: After target offset, EasyEyes waits targetSafetyMarginSec before presenting instructions and the characterSet. (Nudging isn't allowed until after the participant responds.)",
    type: "numerical",
    default: "0.7",
  },
  targetSizeDeg: {
    name: "targetSizeDeg",
    availability: "now",
    example: "5",
    explanation:
      "Ignored unless needed. Size is either height or width, as specified by targetSizeIsHeightBool. Height and width are based on the union of the bounding boxes of all the letters in fontCharacterSet. ",
    type: "numerical",
    default: "2",
  },
  targetSizeIsHeightBool: {
    name: "targetSizeIsHeightBool",
    availability: "now",
    example: "FALSE",
    explanation: 'Define "size" as height (true) or width (false).',
    type: "boolean",
    default: "FALSE",
  },
  targetSoundFolder: {
    name: "targetSoundFolder",
    availability: "now",
    example: "sounds",
    explanation:
      "The name of a folder of sound files, to be used when targetKind==sound. The folder is submitted as a zip archive to the EasyEyes drop box, and saved in the Pavlovia account in the Folders folder. The name of the zip archive, without the extension, must match the value of targetSoundFolder. We could also allow our submit box to accept a folder, which it copies, including all the enclosed files, ignoring any enclosed folders.",
    type: "text",
    default: "",
  },
  targetSoundNoiseBool: {
    name: "targetSoundNoiseBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "If targetKind is \"sound\", and targetSoundNoiseBool is TRUE, then add noise to the target. The noise is zero mean Gaussian white noise, clipped at ±2 SD. Any reported SD is after clipping. We could add a parameter to request leaving the noise on continuously. We'll need to specify onset and offset ramps. I don't know what's conventional.",
    type: "boolean",
    default: "FALSE",
  },
  targetSoundNoiseDBSPL: {
    name: "targetSoundNoiseDBSPL",
    availability: "now",
    example: "20",
    explanation: "The noise volume in dB SPL.",
    type: "numerical",
    default: "0",
  },
  targetSoundNoiseHz: {
    name: "targetSoundNoiseHz",
    availability: "now",
    example: "20000",
    explanation: "The clock rate of the auditory noise.",
    type: "numerical",
    default: "20000",
  },
  targetSoundNoiseOffsetReTargetSec: {
    name: "targetSoundNoiseOffsetReTargetSec",
    availability: "now",
    example: "0.5",
    explanation: "Positive when noise ends after the target ends.",
    type: "numerical",
    default: "0.3",
  },
  targetSoundNoiseOnsetReTargetSec: {
    name: "targetSoundNoiseOnsetReTargetSec",
    availability: "now",
    example: "-0.5",
    explanation: "Negative when noise starts before the target starts.",
    type: "numerical",
    default: "-0.3",
  },
  targetSoundVolumeDBSPL: {
    name: "targetSoundVolumeDBSPL",
    availability: "now",
    example: "20",
    explanation: 'If targetKind is "sound", this specifies target volume.',
    type: "numerical",
    default: "20",
  },
  targetTask: {
    name: "targetTask",
    availability: "now",
    example: "identify",
    explanation:
      'Can be one or multiple of the following categories. If there are multiple tasks in one trial, use comma to divide them, e.g., "identify,targetQuestion1". The participant\'s task:\n• identify is forced-choice categorization of the target among known possibilities, e.g. a letter from a characterSet or an orientation among several. \n• targetQuestion1 (and targetQuestion2, etc.) uses the question and answers provided by parameter targetQuestion1. The participant must click on one of the answers.\n• detect might be added later. In yes-no detection, we simply ask "Did you see the target?". In two-alternative forced choice detection, we might display two intervals, only one of which contained the target, and ask the observer which interval had the target: 1 or 2? We rarely use detection because it needs many more trials to measure a threshold because its guessing rate is 50%, whereas identifying one of N targets has a guessing rate of only 1/N.',
    type: "categorical",
    default: "identify",
    categories: ["identify", "categorize", "targetQuestion@"],
  },
  thresholdBeta: {
    name: "thresholdBeta",
    availability: "now",
    example: "2.3",
    explanation:
      "Used by QUEST. The steepness parameter of the Weibull psychometric function.",
    type: "numerical",
    default: "2.3",
  },
  thresholdDelta: {
    name: "thresholdDelta",
    availability: "now",
    example: "0.01",
    explanation:
      "Used by QUEST. Set the asymptote of the Weibull psychometric function to 1-delta.",
    type: "numerical",
    default: "0.01",
  },
  thresholdGuess: {
    name: "thresholdGuess",
    availability: "now",
    example: "2",
    explanation:
      "Used to prime QUEST by providing a prior PDF, which is specified as a Gaussian as a function of the log threshold parameter. Its mean is the log of your guess, and its SD (in log units) is specifed below . We typically take our guess from our standard formulas for size and spacing threshold as a function of eccentricity.",
    type: "numerical",
    default: "2",
  },
  thresholdGuessLogSd: {
    name: "thresholdGuessLogSd",
    availability: "now",
    example: "2",
    explanation:
      "Used by QUEST. Sets the standard deviation of the prior PDF as a function of log of the threshold parameter.",
    type: "numerical",
    default: "2",
  },
  thresholdParameter: {
    name: "thresholdParameter",
    availability: "now",
    example: "spacing",
    explanation:
      'thresholdParameter designates that a parameter (e.g. size or spacing) will be controlled by Quest to find the threshold at which criterion performance is attained.  \n• "spacing" to vary center-to-center spacing of target and neighboring flankers. \n• "size" to vary target size. \n• "contrast" awaits HDR10 support.\n• "eccentricity"  to be added soon.\n• "soundVolume" awaits sound support.\n• "soundNoise" awaits sound support.',
    type: "categorical",
    default: "spacing",
    categories: ["spacing", "size", "soundVolume", "soundNoise"],
  },
  thresholdProcedure: {
    name: "thresholdProcedure",
    availability: "now",
    example: "QUEST",
    explanation:
      'Can be QUEST or none. We may add Fechner\'s "method of constant stimuli". Note that when rendering we restrict the threshold parameter to values that can be rendered without artifact, i.e. not too small to have enough pixels to avoid jaggies and not too big for target (and flankers in spacing threshold) to fit entirely on screen. The response returned to QUEST is accompanied by the true value of the threshold parameter, regardless of what QUEST suggested.',
    type: "categorical",
    default: "QUEST",
    categories: ["none", "QUEST"],
  },
  thresholdProportionCorrect: {
    name: "thresholdProportionCorrect",
    availability: "now",
    example: "0.7",
    explanation:
      'Used by QUEST, which calls it "pThreshold". This is the threshold criterion. In Methods you might say that "We defined threshold as the intensity at which the participant attained 70% correct." This corresponds to setting thresholdProportionCorrect to 0.7.\nPsychoJS code:\nhttps://github.com/kurokida/jsQUEST/blob/main/src/jsQUEST.js\nhttps://github.com/psychopy/psychojs/blob/2021.3.0/src/data/QuestHandler.js',
    type: "numerical",
    default: "0.7",
  },
  thresholdRepeatBadBlockBool: {
    name: "thresholdRepeatBadBlockBool",
    availability: "now",
    example: "TRUE",
    explanation:
      'If true, and this condition\'s threshold is "bad" (see below), then the block will be run again (only once even if again bad). The criterion for "bad" is that QuestSD>0.25. Several conditions in a block may make this request and be bad, but we still repeat the block only once. When we add a block, we should adjust the trial/block counter to reflect the change. (The 0.25 criterion is right for 35 trials, beta=2.3, and many possible targets. Later i\'ll write a more general formula and provide a way for the scientist to specify an arbitrary criterion value of QuestSD.)',
    type: "boolean",
    default: "FALSE",
  },
  viewingDistanceAllowedRatio: {
    name: "viewingDistanceAllowedRatio",
    availability: "now",
    example: "1.3",
    explanation:
      'viewingDistanceAllowedRatio must be larger or smaller than 1, and must be greater than or equal to zero. If the specified tolerance ratio is R, then the ratio of actual to desired viewing distance must be in the range 1/R to R. Enforcement is only possible when viewing distance is tracked. In that case, testing is paused while viewing distance is outside the allowed range, and the participant is encouraged to move in or out, as appropriate, toward the desired viewing distance. We call that "nudging". A value of 0 allows all viewing distances. [CSV and Excel files do not allow Inf.]',
    type: "numerical",
    default: "1.2",
  },
  viewingDistanceDesiredCm: {
    name: "viewingDistanceDesiredCm",
    availability: "now",
    example: "45",
    explanation:
      "viewingDistanceDesiredCm. At the beginning of the block, we encourage the participant to adjust their viewing distance (moving head or display) to approximate the desired viewing distance. If head tracking is enabled, then stimulus generation will be based on the actual viewing distance of each trial. Without head tracking, we estimate the viewing distance at the beginning of the experiment, and later again at the beginning of any new block with a different desired viewing distance. All conditions within a block must have the same desired viewing distance.\n     The viewing-distance nudger (Closer! Farther!) is working fine at getting the participant to the right distance, but we need to cancel any trials in which the stimulus was obscured by nudging. We have a three-period solution, that is being introduced in two stages. First we describe the ideal scheme that is our goal. Period A. From time of response to the previous trial (click or keypress) until the participant requests a new trial (space bar or click on crosshair) we allow nudging and the rest of our software ignores it. Period B. From the participant's request for a new trial (space bar or click on crosshair) until the end of the stimulus we also allow nudging, but any nudge cancels the trial. Period C. From the end of the stimulus until the observer responds we suspend nudging (so the nudge won't interfere with remembering the target). Once a trial has been canceled we do NOT wait for a response. Instead, we proceed directly to draw the crosshair for the next trial. Canceling a trial is not trivial. We need to put this trial's condition back into the list of conditions to be run, and that list needs to be reshuffled, so the participant won't know what the next trial will be. I suppose that what happened will be obvious to the participant, so we don't need to explain that the trial was canceled. I see two stages of implementation. First the trial software needs to provide and update two flags: nudgingAllowedBool and nudgingCancelsTrialBool. I'm not sure that the current version of MultistairHandler will cope with trial cancelation. For now, the trial software sets nudgingAllowedBool to TRUE only during period A, and sets nudgingCancelsTrialBool to always be FALSE. Once we know how to cancel a trial, during period B we'll set both nudgingAllowedBool and nudgingCancelsTrialBool to TRUE. ",
    type: "numerical",
    default: "40",
  },
  viewingDistanceNudgingBool: {
    name: "viewingDistanceNudgingBool",
    availability: "now",
    example: "TRUE",
    explanation:
      "Set TRUE to enable the nudger. The nudger compares measured viewing distance to viewingDistanceDesiredCm, and if the ratio exceeds the range allowed by viewingDistanceAllowedRatio then it puts up a display (covering the whole screen) telling the participant to MOVE CLOSER or FARTHER, as appropriate. The display goes away when the participant is again within the allowed range.\nPROTECTING THE STIMULUS FROM NUDGING. The nudger will never occlude (or forward or backward mask) the stimulus. Think of the trial as beginning at the participant's click (or keypress) requesting the stimulus and ending at the click (or keypress) response. This leaves a dead time from the response until the click requesting the next trial. EasyEyes nudges only in the dead time. Furthermore, to prevent forward masking, the nudge must end at least 700 ms before the click requesting a trial even though the participant's timing may be unpredictable.  EasyEyes achieves that by ignoring attempts to click (or respond) during nudging and until 700 ms after nudging. Accepted clicks (or keypresses) produce a click sound. Ignored attempts are silent.\n",
    type: "boolean",
    default: "FALSE",
  },
  wirelessKeyboardNeededBool: {
    name: "wirelessKeyboardNeededBool",
    availability: "now",
    example: "FALSE",
    explanation:
      "Needed at viewing distances beyond 60 cm. Could be commercial wireless keyboard or EasyEyes keypad emulator running on any smartphone. ",
    type: "boolean",
    default: "FALSE",
  },
};
