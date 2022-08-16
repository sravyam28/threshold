import arrayBufferToAudioBuffer from "arraybuffer-to-audiobuffer";
import JSZip from "jszip";

export var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export const getAudioBufferFromArrayBuffer = (arrayBuffer) => {
  return arrayBufferToAudioBuffer(arrayBuffer, audioCtx).then((audioBuffer) => {
    return audioBuffer;
  });
};

export const setWaveFormToZeroDbSPL = (arr) => {
  const rms = getRMSOfWaveForm(arr);
  //normalize to 0 db spl
  //by convention sound with a mean square of 1 is at 0 db
  if (rms != 0) {
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i] / rms;
    }
  }

  return arr;
};

export const getRMSOfWaveForm = (arr) => {
  const Squares = arr.map((val) => val * val);
  const Sum = Squares.reduce((acum, val) => acum + val);
  const Mean = Sum / arr.length;
  return Math.sqrt(Mean);
};

export const adjustSoundDbSPL = (arr, volumeDbSPL) => {
  const gain = 10 ** (volumeDbSPL / 20);
  for (var i = 0; i < arr.length; i++) {
    arr[i] *= gain;
  }

  return arr;
};

export const playAudioBuffer = (audioBuffer) => {
  var source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.destination);
  source.start();
};

/**
 * Given an array of web audio nodes, builds the node graph in the order
 * they are placed into the array
 * @param {<AudioContext>} audioCtx the target audio context
 * @param {<AudioNode>} webAudioNodes the nodes !order matters!
 */
const connectAudioNodes = (webAudioNodes) => {
  let i = 0;
  let nextNode;
  let curNode;
  while (i < webAudioNodes.length - 1) {
    curNode = webAudioNodes[i];
    nextNode = webAudioNodes[i + 1];
    curNode.connect(nextNode);
    i++;
  }
  curNode = webAudioNodes[i];
  curNode.connect(audioCtx.destination);
};

/**
 * Given an array of web audio nodes, connects them into a graph and plays the first
 * @param {Array.<AudioNode>} webAudioNodes an array containing a series of web audio nodes
 */
export const playAudioNodeGraph = (webAudioNodes) => {
  connectAudioNodes(webAudioNodes);
  const sourceNode = webAudioNodes[0];
  sourceNode.start(0);
};

/**
 * Given an audio context, a buffer containing audio, create an audio node containing the audio
 * @param {<AudioContext>} audioCtx the target audio context
 * @param {<AudioBuffer>} audioBuffer the audio data to be added to the node
 */
export const createAudioNodeFromBuffer = (audioBuffer) => {
  const node = audioCtx.createBufferSource();
  node.buffer = audioBuffer;
  return node;
};

/**
 * Creates a convolver node given the inverted Impulse Response
 * @param {<AudioContext>} audioCtx the target audio context
 * @param {Array.Float} invertedImpulseResponseBuffer the inverted impulse response
 * @returns
 */
export const createImpulseResponseFilterNode = async (
  invertedImpulseResponseBuffer
) => {
  const myArrayBuffer = audioCtx.createBuffer(
    1,
    // TODO: quality check this
    invertedImpulseResponseBuffer.length - 1,
    audioCtx.sampleRate
  );

  // Fill the buffer with the inverted impulse response
  const nowBuffering = myArrayBuffer.getChannelData(0);
  for (let i = 0; i < myArrayBuffer.length; i++) {
    // audio needs to be in [-1.0; 1.0]
    nowBuffering[i] = invertedImpulseResponseBuffer[i];
  }

  const convolver = audioCtx.createConvolver();

  convolver.normalize = false;
  convolver.channelCount = 1;
  convolver.buffer = myArrayBuffer;

  return convolver;
};

/**
 * Given an buffer containing audio, creates an audio graph containing the audio and a convolver node which
 * accounts for the room's impulse response
 * @param {<AudioBuffer>[]} audioBuffer the audio data to be played
 */
export const playAudioBufferWithImpulseResponseCalibration = async (
  audioBuffer,
  invertedImpulseResponseBuffer
) => {
  const webAudioNodes = [
    createAudioNodeFromBuffer(audioBuffer), // the audio to be played
    await createImpulseResponseFilterNode(invertedImpulseResponseBuffer), // the impulse response calibration node
  ];
  playAudioNodeGraph(webAudioNodes);
};

export const initSoundFiles = async (trialsConditions) => {
  var maskerList = {};
  var targetList = {};
  // console.log("trialsConditions", trialsConditions);

  trialsConditions.map(async (condition) => {
    // console.log(condition);
    maskerList[condition["block_condition"]] = [];
    targetList[condition["block_condition"]] = [];
    //load maskers
    if (condition["maskerSoundFolder"]) {
      await fetch(`folders/${condition["maskerSoundFolder"]}.zip`)
        .then((response) => {
          return response.blob();
        })
        .then((data) => {
          var Zip = new JSZip();
          Zip.loadAsync(data).then((zip) => {
            zip.forEach((relativePath, zipEntry) => {
              var name = zipEntry.name;
              name = name.substring(0, name.lastIndexOf("."));
              maskerList[condition["block_condition"]].push({
                name: name,
                file: zipEntry.async("arraybuffer").then((data) => {
                  return getAudioBufferFromArrayBuffer(data);
                }),
              });
            });
          });
        });
    }

    // load target
    if (condition["targetSoundFolder"]) {
      await fetch(`folders/${condition["targetSoundFolder"]}.zip`)
        .then((response) => {
          return response.blob();
        })
        .then((data) => {
          var Zip = new JSZip();
          Zip.loadAsync(data).then((zip) => {
            zip.forEach((relativePath, zipEntry) => {
              var name = zipEntry.name;
              name = name.substring(0, name.lastIndexOf("."));
              targetList[condition["block_condition"]].push({
                name: name,
                file: zipEntry.async("arraybuffer").then((data) => {
                  return getAudioBufferFromArrayBuffer(data);
                }),
              });
            });
          });
        });
    }
  });

  return { maskers: maskerList, target: targetList };
};

export const initSoundFilesWithPromiseAll = async (trialsConditions) => {
  var maskerList = {};
  var targetList = {};

  await Promise.all(
    trialsConditions.map(async (condition) => {
      maskerList[condition["block_condition"]] = [];
      targetList[condition["block_condition"]] = [];

      //load maskers
      if (condition["maskerSoundFolder"]) {
        await fetch(`folders/${condition["maskerSoundFolder"]}.zip`)
          .then((response) => {
            return response.blob();
          })
          .then(async (data) => {
            var Zip = new JSZip();
            await Zip.loadAsync(data).then((zip) => {
              return Promise.all(
                Object.keys(zip.files).map(async (filename) => {
                  var name = filename.substring(0, filename.lastIndexOf("."));
                  var file = await zip.files[filename].async("arraybuffer");
                  maskerList[condition["block_condition"]].push({
                    name: name,
                    file: getAudioBufferFromArrayBuffer(file),
                  });
                })
              );
            });
          });
      }

      // load target
      if (condition["targetSoundFolder"]) {
        await fetch(`folders/${condition["targetSoundFolder"]}.zip`)
          .then((response) => {
            return response.blob();
          })
          .then(async (data) => {
            var Zip = new JSZip();
            await Zip.loadAsync(data).then((zip) => {
              return Promise.all(
                Object.keys(zip.files).map(async (filename) => {
                  var name = filename.substring(0, filename.lastIndexOf("."));
                  var file = await zip.files[filename].async("arraybuffer");
                  targetList[condition["block_condition"]].push({
                    name: name,
                    file: getAudioBufferFromArrayBuffer(file),
                  });
                })
              );
            });
          });
      }
    })
  );

  return { maskers: maskerList, target: targetList };
};
var flag = true;
export const loadVocoderPhraseSoundFiles = async (trialsConditions) => {
  const maskerList = {};
  const targetList = {};
  await Promise.all(
    trialsConditions.map(async (condition) => {
      //console.log("here.....", condition);
      maskerList[condition["block_condition"]] = {};
      targetList[condition["block_condition"]] = {};

      //load maskers
      if (condition["maskerSoundFolder"]) {
        // console.log(`folders/${condition["maskerSoundFolder"]}.zip`);
        await fetch(`folders/${condition["maskerSoundFolder"]}.zip`)
          // await fetch(`folders/VocodedWord.zip`)
          .then((response) => response.blob())
          .then(async (data) => {
            var Zip = new JSZip();
            await Zip.loadAsync(data).then((zip) => {
              return Promise.all(
                Object.keys(zip.files).map(async (filename) => {
                  const entryName = {
                    current: filename,
                    split: filename.split("/"),
                  };
                  if (entryName.split.length == 3) {
                    entryName.current = getEntryNameDataForFile(
                      entryName.current
                    );
                    //eg: filename ===> VocodedWord/Talker11/Baron.hi.wav
                    if (isDirectory(zip.files[filename]))
                      maskerList[condition["block_condition"]][
                        entryName.current.Talker
                      ] = {};
                    //eg. {1_2: {talker11:{}}}
                    else {
                      // console.log("zip.files",zip.files[filename])
                      const file = await processAudioDataForFile(
                        filename,
                        zip.files[filename]
                      );
                      if (file) {
                        // console.log("file",file)
                        //separate high and low frequency bands]
                        if (
                          maskerList[condition["block_condition"]][
                            entryName.current.Talker
                          ][entryName.current.split.name]
                        )
                          maskerList[condition["block_condition"]][
                            entryName.current.Talker
                          ][entryName.current.split.name][
                            entryName.current.split.freq
                          ] = file.audioData;
                        else
                          maskerList[condition["block_condition"]][
                            entryName.current.Talker
                          ][entryName.current.split.name] = {
                            [entryName.current.split.freq]: file.audioData,
                          };
                      }
                    }
                  } else if (entryName.split.length == 4) {
                    //eg: filename ===> VocodedWord/Talker11/CallSign/Arrow.hi.wav
                    entryName.current = getEntryNameDataForFileInSubFolder(
                      entryName.current
                    );
                    // console.log("debug",maskerList[condition["block_condition"]][entryName.current.Talker])
                    if (isDirectory(zip.files[filename]))
                      maskerList[condition["block_condition"]][
                        entryName.current.Talker
                      ][entryName.current.subFolder] = {};
                    else {
                      const file = await processAudioDataForFileInSubFolder(
                        filename,
                        zip.files[filename]
                      );
                      if (file) {
                        // console.log("file",file)
                        //separate high and low frequency bands]
                        if (
                          maskerList[condition["block_condition"]][
                            entryName.current.Talker
                          ][entryName.current.subFolder][
                            entryName.current.split.name
                          ]
                        )
                          maskerList[condition["block_condition"]][
                            entryName.current.Talker
                          ][entryName.current.subFolder][
                            entryName.current.split.name
                          ][entryName.current.split.freq] = file.audioData;
                        else
                          maskerList[condition["block_condition"]][
                            entryName.current.Talker
                          ][entryName.current.subFolder][
                            entryName.current.split.name
                          ] = {
                            [entryName.current.split.freq]: file.audioData,
                          };
                      }
                    }
                  }
                })
              );
            });
          });
      }

      //load target
      if (condition["targetSoundFolder"]) {
        //console.log(`folders/${condition["targetSoundFolder"]}.zip`);
        await fetch(`folders/${condition["targetSoundFolder"]}.zip`)
          // await fetch(`folders/VocodedWord.zip`)
          .then((response) => response.blob())
          .then(async (data) => {
            var Zip = new JSZip();

            await Zip.loadAsync(data).then((zip) => {
              return Promise.all(
                Object.keys(zip.files).map(async (filename) => {
                  const entryName = {
                    current: filename,
                    split: filename.split("/"),
                  };
                  if (entryName.split.length == 3) {
                    entryName.current = getEntryNameDataForFile(
                      entryName.current
                    );
                    //eg: filename ===> VocodedWord/Talker11/Baron.hi.wav
                    if (isDirectory(zip.files[filename]))
                      targetList[condition["block_condition"]][
                        entryName.current.Talker
                      ] = {};
                    //eg. {1_2: {talker11:{}}}
                    else {
                      // console.log("zip.files",zip.files[filename])
                      const file = await processAudioDataForFile(
                        filename,
                        zip.files[filename]
                      );
                      if (file) {
                        // console.log("file",file)
                        //separate high and low frequency bands]
                        if (
                          targetList[condition["block_condition"]][
                            entryName.current.Talker
                          ][entryName.current.split.name]
                        )
                          targetList[condition["block_condition"]][
                            entryName.current.Talker
                          ][entryName.current.split.name][
                            entryName.current.split.freq
                          ] = file.audioData;
                        else
                          targetList[condition["block_condition"]][
                            entryName.current.Talker
                          ][entryName.current.split.name] = {
                            [entryName.current.split.freq]: file.audioData,
                          };
                      }
                    }
                  } else if (entryName.split.length == 4) {
                    //eg: filename ===> VocodedWord/Talker11/CallSign/Arrow.hi.wav
                    entryName.current = getEntryNameDataForFileInSubFolder(
                      entryName.current
                    );
                    // console.log("debug",maskerList[condition["block_condition"]][entryName.current.Talker])
                    if (isDirectory(zip.files[filename]))
                      targetList[condition["block_condition"]][
                        entryName.current.Talker
                      ][entryName.current.subFolder] = {};
                    else {
                      const file = await processAudioDataForFileInSubFolder(
                        filename,
                        zip.files[filename]
                      );
                      if (file) {
                        // console.log("file",file)
                        //separate high and low frequency bands]
                        if (
                          targetList[condition["block_condition"]][
                            entryName.current.Talker
                          ][entryName.current.subFolder][
                            entryName.current.split.name
                          ]
                        )
                          targetList[condition["block_condition"]][
                            entryName.current.Talker
                          ][entryName.current.subFolder][
                            entryName.current.split.name
                          ][entryName.current.split.freq] = file.audioData;
                        else
                          targetList[condition["block_condition"]][
                            entryName.current.Talker
                          ][entryName.current.subFolder][
                            entryName.current.split.name
                          ] = {
                            [entryName.current.split.freq]: file.audioData,
                          };
                      }
                    }
                  }
                })
              );
            });
          });
      }
    })
  );

  return { target: targetList, maskerList: maskerList };
};

const verifyFileNameExtension = (name) => {
  name = name.split(".");
  const ext = name[name.length - 1];
  if (acceptableExtensions.includes(ext)) return true;
  return false;
};

const acceptableExtensions = ["wav"];

const isDirectory = (entry) => {
  return entry.dir;
};

const getEntryNameDataForFile = (entry) => {
  const entryName = entry.split("/");
  const split = entryName[2].split(".");
  return {
    Talker: entryName[1],
    fileName: entryName[2],
    split: {
      name: split[0],
      freq: split[1],
    },
  };
};

const getEntryNameDataForFileInSubFolder = (entry) => {
  const entryName = entry.split("/");
  const split = entryName[3].split(".");
  return {
    Talker: entryName[1],
    subFolder: entryName[2],
    fileName: entryName[3],
    split: {
      name: split[0],
      freq: split[1],
    },
  };
};

const processAudioDataForFile = async (fileName, zipEntry) => {
  if (verifyFileNameExtension(fileName)) {
    const audioData = await zipEntry
      .async("arrayBuffer")
      .then(async (fileData) => {
        return await getAudioBufferFromArrayBuffer(fileData);
      });
    const filename = getEntryNameDataForFile(fileName);
    // console.log("audioData",audioData)
    return {
      audioData: audioData,
      fileName: filename,
    };
  } else return false;
};

const processAudioDataForFileInSubFolder = async (fileName, zipEntry) => {
  if (verifyFileNameExtension(fileName)) {
    const audioData = await zipEntry
      .async("arrayBuffer")
      .then(async (fileData) => {
        return await getAudioBufferFromArrayBuffer(fileData);
      });
    const filename = getEntryNameDataForFileInSubFolder(fileName);

    return {
      audioData: audioData,
      fileName: filename,
    };
  } else return false;
};

export const addTrialStaircaseSummariesToDataForSound = (
  currentLoop,
  psychoJS
) => {
  // TODO What to do when data saving is rejected?
  if (currentLoop._currentStaircase) {
    psychoJS.experiment.addData(
      "staircaseName",
      currentLoop._currentStaircase._name
    );
    psychoJS.experiment.addData(
      "questMeanAtEndOfTrial",
      currentLoop._currentStaircase.mean()
    );
    psychoJS.experiment.addData(
      "questSDAtEndOfTrial",
      currentLoop._currentStaircase.sd()
    );
    psychoJS.experiment.addData(
      "questQuantileOfQuantileOrderAtEndOfTrial",
      currentLoop._currentStaircase.quantile(
        currentLoop._currentStaircase._jsQuest.quantileOrder
      )
    );
  }
  // else {
  //   throw "undefined currentLoop._currentStaircase [add TRIAL data failed]";
  // }
};

export const displayRightOrWrong = (correct) => {
  const rightOrWrong = document.createElement("h1");
  rightOrWrong.style.position = "absolute";
  rightOrWrong.style.top = "30%";
  rightOrWrong.style.left = "50%";
  rightOrWrong.style.transform = "translate(-50%, -50%)";
  rightOrWrong.style.fontSize = "100px";
  if (correct) {
    rightOrWrong.style.color = "green";
    rightOrWrong.innerHTML = "RIGHT";
  } else {
    rightOrWrong.style.color = "red";
    rightOrWrong.innerHTML = "WRONG";
  }
  document.body.appendChild(rightOrWrong);
  setTimeout(() => {
    document.body.removeChild(rightOrWrong);
  }, 300);
};
