import JSZip from "jszip";
import {
  invertedImpulseResponse,
  soundGainDBSPL,
  soundCalibrationLevelDBSPL,
} from "./global";
import {
  adjustSoundDbSPL,
  connectAudioNodes,
  createAudioNodeFromBuffer,
  getAudioBufferFromArrayBuffer,
  getGainNode,
  getRMSOfWaveForm,
  playAudioBuffer,
  playAudioBufferWithImpulseResponseCalibration,
  playAudioNodeGraph,
  setWaveFormToZeroDbSPL,
} from "./soundUtils";

const soundGain = { current: undefined };

export const addSoundTestElements = (reader) => {
  // const calibrationLevelFromFile = reader.read(
  //   "soundCalibrationLevelDBSPL",
  //   "__ALL_BLOCKS__"
  // );
  // if (
  //   calibrationLevelFromFile.length > 0 &&
  //   soundCalibrationLevelDBSPL.current === undefined
  // ) {
  //   soundCalibrationLevelDBSPL.current = calibrationLevelFromFile[0];
  // }

  const soundGainFromFile = reader.read("soundGainDBSPL", "__ALL_BLOCKS__");
  const calculatedSoundGain = soundGainDBSPL.current;
  if (calculatedSoundGain) {
    soundGain.current = calculatedSoundGain[0];
  } else if (soundGainFromFile.length > 0) {
    soundGain.current = soundGainFromFile[0];
  }

  const modal = document.createElement("div");
  const modalDialog = document.createElement("div");
  const modalContent = document.createElement("div");
  const modalHeaderContainer = document.createElement("div");
  const modalHeader = document.createElement("div");
  const modalTitle = document.createElement("h2");

  const modalSubtitle = document.createElement("p");
  const togglesContainer = document.createElement("div");
  const toggleElements = addToggleSwitch();
  const modalToggle = toggleElements.toggleSwitch;
  const IRCorrectionToggleLabel = document.createElement("label");
  const IRCorrectionToggleContainer = document.createElement("div");
  const useGainNodeToggleContainer = document.createElement("div");
  const useGainNodeToggleElements = addToggleSwitch();
  const useGainNodeToggle = useGainNodeToggleElements.toggleSwitch;
  const useGainNodeInput = useGainNodeToggleElements.toggleSwitchInput;
  const useGainNodeLabel = document.createElement("label");

  const modalBody = document.createElement("div");
  const modalFooter = document.createElement("div");
  const horizontal = document.createElement("hr");
  const soundLevelContainer = document.createElement("div");
  const soundLevel = document.createElement("p");
  const soundLevelInput = document.createElement("input");
  const speakerSoundGainContainer = document.createElement("div");
  const speakerSoundGain = document.createElement("p");
  const speakerSoundGainInput = document.createElement("input");

  // const adjustedSoundLevelContainer = document.createElement("div");
  const adjustedSoundLevel = document.createElement("p");
  // const adjustedSoundLevelInput = document.createElement("input");
  // const rmsOfSoundContainer = document.createElement("div");
  const rmsOfSound = document.createElement("p");
  const maxAmplitude = document.createElement("p");
  const elems = {
    modal,
    modalDialog,
    modalContent,
    modalHeader,
    modalTitle,
    modalToggle,
    modalBody,
    modalFooter,
    soundLevelContainer,
    soundLevel,
    soundLevelInput,
    speakerSoundGainContainer,
    speakerSoundGain,
    speakerSoundGainInput,
    // rmsOfSoundContainer,
    rmsOfSound,
    maxAmplitude,
  };

  modal.setAttribute("id", "soundTestModal");
  modalDialog.setAttribute("id", "soundTestModalDialog");
  modalContent.setAttribute("id", "soundTestModalContent");
  modalHeader.setAttribute("id", "soundTestModalHeader");
  modalHeaderContainer.setAttribute("id", "soundTestModalHeaderContainer");
  modalTitle.setAttribute("id", "soundTestModalTitle");
  modalToggle.setAttribute("id", "soundTestModalToggle");
  modalBody.setAttribute("id", "soundTestModalBody");
  modalFooter.setAttribute("id", "soundTestModalFooter");
  soundLevelContainer.setAttribute("id", "soundTestModalSoundLevelContainer");
  soundLevel.setAttribute("id", "soundTestModalSoundLevel");
  soundLevelInput.setAttribute("id", "soundTestModalSoundLevelInput");
  soundLevelInput.setAttribute("type", "number");
  speakerSoundGainContainer.setAttribute(
    "id",
    "soundTestModalSpeakerSoundGainContainer"
  );
  speakerSoundGain.setAttribute("id", "soundTestModalSpeakerSoundGain");
  speakerSoundGainInput.setAttribute(
    "id",
    "soundTestModalSpeakerSoundGainInput"
  );
  speakerSoundGainInput.setAttribute("type", "number");

  // adjustedSoundLevelContainer.setAttribute( "id", "soundTestModalAdjustedSoundLevelContainer");
  adjustedSoundLevel.setAttribute("id", "soundTestModalAdjustedSoundLevel");
  // adjustedSoundLevelInput.setAttribute("id", "soundTestModalAdjustedSoundLevelInput");
  // adjustedSoundLevelInput.setAttribute("type", "number");
  // rmsOfSoundContainer.setAttribute("id", "soundTestModalRMSOfSoundContainer");
  rmsOfSound.setAttribute("id", "soundTestModalRMSOfSound");
  maxAmplitude.setAttribute("id", "soundTestModalMaxAmplitude");
  useGainNodeLabel.setAttribute("id", "soundTestModalUseGainNodeLabel");
  // useGainNodeLabel.setAttribute("for", "soundTestModalUseGainNodeToggle");
  useGainNodeLabel.innerText = "Use Gain Node";
  useGainNodeToggle.setAttribute("id", "soundTestModalUseGainNodeToggle");
  useGainNodeToggle.style.marginLeft = "10px";
  useGainNodeInput.setAttribute("id", "soundTestModalUseGainNodeToggleInput");

  togglesContainer.setAttribute("id", "soundTestModalTogglesContainer");
  togglesContainer.style.display = "flex";
  togglesContainer.style.flexDirection = "column";
  IRCorrectionToggleLabel.setAttribute("id", "soundTestModalIRCorrectionLabel");
  IRCorrectionToggleLabel.innerText = "IR Correction";
  modalToggle.style.marginLeft = "10px";
  IRCorrectionToggleContainer.style.display = "flex";
  // space between toggle and label
  IRCorrectionToggleContainer.style.marginBottom = "10px";
  IRCorrectionToggleContainer.style.justifyContent = "space-between";
  useGainNodeToggleContainer.style.display = "flex";
  useGainNodeToggleContainer.style.justifyContent = "space-between";
  useGainNodeToggleContainer.style.marginBottom = "10px";

  modal.classList.add(...["modal", "fade"]);
  modalDialog.classList.add(...["modal-dialog"]);
  modalContent.classList.add(...["modal-content"]);
  // modalHeaderContainer.classList.add(...["modal-header"]);
  modalTitle.classList.add(...["modal-title"]);
  modalBody.classList.add(...["modal-body"]);
  modalFooter.classList.add(...["modal-footer"]);

  modalTitle.innerHTML = "Sound Test";
  modalSubtitle.innerHTML =
    "Use the toggle for IR correction. It may take some time to load the sound files.";
  soundLevel.innerHTML = "Sound Level (dB SPL):";
  if (soundCalibrationLevelDBSPL.current)
    soundLevelInput.value = soundCalibrationLevelDBSPL.current.toFixed(1);
  speakerSoundGain.innerHTML = "Sound Gain (dB SPL):";
  if (soundGain.current)
    speakerSoundGainInput.value = (
      Math.round(soundGain.current * 10) / 10
    ).toFixed(1);
  rmsOfSound.innerHTML = "Digital sound amplitude RMS: **** dB";
  maxAmplitude.innerHTML = "Digital sound max absolute value: 1.000";
  adjustedSoundLevel.innerHTML = "Adjusted soundCalibrationLevel: **** dB SPL";

  modal.appendChild(modalDialog);
  modalDialog.appendChild(modalContent);
  modalHeaderContainer.appendChild(modalHeader);
  modalHeaderContainer.appendChild(modalSubtitle);

  speakerSoundGainContainer.appendChild(speakerSoundGain);
  speakerSoundGainContainer.appendChild(speakerSoundGainInput);
  soundLevelContainer.appendChild(soundLevel);
  soundLevelContainer.appendChild(soundLevelInput);
  modalHeaderContainer.appendChild(speakerSoundGainContainer);
  modalHeaderContainer.appendChild(soundLevelContainer);

  modalHeaderContainer.appendChild(horizontal);
  modalHeaderContainer.appendChild(maxAmplitude);
  modalHeaderContainer.appendChild(rmsOfSound);
  modalHeaderContainer.appendChild(adjustedSoundLevel);
  //append the toggles
  IRCorrectionToggleContainer.appendChild(IRCorrectionToggleLabel);
  IRCorrectionToggleContainer.appendChild(modalToggle);
  useGainNodeToggleContainer.appendChild(useGainNodeLabel);
  useGainNodeToggleContainer.appendChild(useGainNodeToggle);
  togglesContainer.appendChild(IRCorrectionToggleContainer);
  togglesContainer.appendChild(useGainNodeToggleContainer);
  // togglesContainer.appendChild(IRCorrectionToggleLabel);
  // togglesContainer.appendChild(modalToggle);
  // togglesContainer.appendChild(useGainNodeLabel);
  // togglesContainer.appendChild(useGainNodeToggle);

  modalContent.appendChild(modalHeaderContainer);
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(togglesContainer);
  // modalHeader.appendChild(modalToggle);
  // modalHeader.appendChild(useGainNodeLabel);
  // modalHeader.appendChild(useGainNodeToggle);
  // modalContent.appendChild(modalSubtitle);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  document.body.appendChild(modal);
  addSoundTestCss();

  populateSoundFiles(reader, modalBody, toggleElements.toggleSwitchInput);
};

const addSoundTestCss = () => {
  const styles = `
    #soundTestModal {
        tabindex: -1;
        role: dialog;
        aria-labelledby: soundTestModalTitle;
        area-hidden: true;
      }
    #soundTestModalDialog {
        role: document;
    }
    #soundTestModalHeaderContainer{
        padding: 15px;
        padding-bottom: 0;
        
    }
    #soundTestModalHeader {
        display: flex;
        justify-content: space-between;
    }
    #soundTestModalBody {
        padding-top: 0px;
    }
            `;
  const soundTestStyleSheet = document.createElement("style");
  soundTestStyleSheet.innerText = styles;
  document.head.appendChild(soundTestStyleSheet);
};

// export const removeSoundTestElements = (elems) => {
//     Object.values(elems).forEach((elem) => elem.remove());
// }

const addToggleSwitch = () => {
  const toggleSwitch = document.createElement("label");
  const toggleSwitchInput = document.createElement("input");
  const toggleSwitchSpan = document.createElement("span");

  toggleSwitch.setAttribute("class", "switch");
  toggleSwitchInput.setAttribute("type", "checkbox");
  toggleSwitchSpan.setAttribute("class", "slider round");

  toggleSwitch.appendChild(toggleSwitchInput);
  toggleSwitch.appendChild(toggleSwitchSpan);
  const elems = { toggleSwitch, toggleSwitchInput, toggleSwitchSpan };
  addToggleCSS();
  return elems;
};

const addToggleCSS = () => {
  const styles = `
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
      }
    .switch input {
        display: none;
      }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
      }
    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }
    input:checked + .slider {
        background-color: #2196F3;
      }
    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
      }
    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
    .slider.round {
    border-radius: 34px;
    }
    
    .slider.round:before {
    border-radius: 50%;
    }
      `;

  const soundTestToggleStyleSheet = document.createElement("style");
  soundTestToggleStyleSheet.innerText = styles;
  document.head.appendChild(soundTestToggleStyleSheet);
};

const populateSoundFiles = async (reader, modalBody, toggleInput) => {
  var targetSoundFolders = reader.read("targetSoundFolder", "__ALL_BLOCKS__");
  targetSoundFolders = [...new Set(targetSoundFolders)]; // remove duplicates
  const targetSoundFiles = {};
  await Promise.all(
    targetSoundFolders.map(async (targetSoundFolder, blockCount) => {
      blockCount++;
      // targetSoundFiles[`Block${blockCount}`] = [];
      targetSoundFiles[`Block${blockCount}`] = await fetch(
        `folders/${targetSoundFolder}.zip`
      )
        .then((response) => {
          return response.blob();
        })
        .then(async (data) => {
          const Zip = new JSZip();
          const files = await Zip.loadAsync(data).then((zip) => {
            const soundFiles = [];
            zip.forEach((relativePath, zipEntry) => {
              // console.log("isDirectory", zipEntry.dir);
              var name = zipEntry.name;
              name = name.substring(0, name.lastIndexOf("."));
              soundFiles.push({
                name: name,
                file: zipEntry.async("arraybuffer").then((data) => {
                  return getAudioBufferFromArrayBuffer(data);
                }),
              });
            });
            return soundFiles;
          });
          return files;
        });
    })
  );

  addSoundFileElements(targetSoundFiles, modalBody, toggleInput, reader);
};

const addSoundFileElements = (
  targetSoundFiles,
  modalBody,
  toggleInput,
  reader
) => {
  Object.keys(targetSoundFiles).forEach((blockName, index) => {
    const horizontal = document.createElement("hr");
    const block = document.createElement("div");
    block.setAttribute("class", "block");
    targetSoundFiles[blockName].forEach((soundFile) => {
      const soundFileContainer = document.createElement("div");
      soundFileContainer.setAttribute("class", "soundFileContainer");
      const soundFileName = document.createElement("h4");
      soundFileName.innerHTML = soundFile.name;
      const soundFileButton = document.createElement("button");
      soundFileButton.classList.add(...["btn", "btn-success"]);
      soundFileButton.innerHTML = "Play";
      soundFileButton.addEventListener("click", async () => {
        const soundFileBuffer = cloneAudioBuffer(await soundFile.file);
        // Object.assign({},await soundFile.file);
        // Use dbSPL from speaker-calibration, or from `soundGainDBSPL` parameter if undefined
        // console.log("soundFleBuffer", soundFileBuffer);
        soundGain.current = document.getElementById(
          "soundTestModalSpeakerSoundGainInput"
        ).value;
        // rouund soundGain to 1 decimal places
        soundGain.current = Math.round(soundGain.current * 10) / 10;
        document.getElementById("soundTestModalSpeakerSoundGainInput").value =
          soundGain.current.toFixed(1);
        var audioData = soundFileBuffer.getChannelData(0);
        soundCalibrationLevelDBSPL.current = document.getElementById(
          "soundTestModalSoundLevelInput"
        ).value;
        setWaveFormToZeroDbSPL(audioData);
        // round soundCalibrationLevelDBSPL to 1 decimal places
        soundCalibrationLevelDBSPL.current =
          Math.round(soundCalibrationLevelDBSPL.current * 10) / 10;
        document.getElementById("soundTestModalSoundLevelInput").value =
          soundCalibrationLevelDBSPL.current.toFixed(1);
        const limitedRMS = getRMSLimit(
          soundCalibrationLevelDBSPL.current - soundGain.current,
          audioData
        );
        soundCalibrationLevelDBSPL.current =
          soundGain.current + calculateDBFromRMS(limitedRMS);
        // round soundCalibrationLevelDBSPL to 1 decimal places
        soundCalibrationLevelDBSPL.current =
          Math.round(soundCalibrationLevelDBSPL.current * 10) / 10;
        document.getElementById(
          "soundTestModalAdjustedSoundLevel"
        ).innerHTML = `Adjusted soundCalibrationLevel: ${soundCalibrationLevelDBSPL.current} dB SPL`;
        const rmsOfSound = document.getElementById("soundTestModalRMSOfSound");
        const useGainNodeBool = document.getElementById(
          "soundTestModalUseGainNodeToggleInput"
        ).checked;

        //use gain node
        if (useGainNodeBool) {
          const gainNode = getGainNode(
            getGainValue(soundCalibrationLevelDBSPL.current - soundGain.current)
          );
          // gainNode.gain.value = getGainValue(soundCalibrationLevelDBSPL.current-soundGain.current);
          const webAudioNodes = [];
          webAudioNodes.push(createAudioNodeFromBuffer(soundFileBuffer));
          webAudioNodes.push(gainNode);
          if (toggleInput.checked) {
            if (invertedImpulseResponse.current) {
              rmsOfSound.innerHTML = `Digital sound amplitude RMS: ${calculateDBFromRMS(
                Math.round(gainNode.gain.value * 10) / 10
              )} dB`;
              webAudioNodes.push(
                await createImpulseResponseFilterNode(
                  invertedImpulseResponse.current
                )
              );
              connectAudioNodes(webAudioNodes);
              playAudioNodeGraph(webAudioNodes);
            } else {
              alert(
                "There was an error loading the impulse response. Please try calibrating again."
              );
            }
          } else {
            // console.log("gainNode",calculateDBFromRMS(gainNode.gain.value))
            // console.log("gainValue",getGainValue(soundCalibrationLevelDBSPL.current-soundGain.current))
            rmsOfSound.innerHTML = `Digital sound amplitude RMS: ${calculateDBFromRMS(
              gainNode.gain.value
            )} dB`;
            connectAudioNodes(webAudioNodes);
            // check if the first node connected to the second node?
            // console.log("webAudioNodes",webAudioNodes)
            playAudioNodeGraph(webAudioNodes);
          }
        }

        // adjust sound by changing the amplitude of the sound file manually
        else {
          // console.log("gainValue",getGainValue(soundCalibrationLevelDBSPL.current-soundGain.current))
          adjustSoundDbSPL(
            audioData,
            soundCalibrationLevelDBSPL.current - soundGain.current
          );
          rmsOfSound.innerHTML = `Digital sound amplitude RMS: ${calculateDBFromRMS(
            getRMSOfWaveForm(audioData)
          )} dB`;
          if (toggleInput.checked) {
            if (invertedImpulseResponse.current)
              playAudioBufferWithImpulseResponseCalibration(
                soundFileBuffer,
                invertedImpulseResponse.current
              );
            else
              alert(
                "There was an error loading the impulse response. Please try calibrating again."
              );
          } else playAudioBuffer(soundFileBuffer);
        }
      });
      soundFileContainer.appendChild(soundFileName);
      soundFileContainer.appendChild(soundFileButton);
      block.appendChild(soundFileContainer);
    });
    modalBody.appendChild(block);
    modalBody.appendChild(horizontal);
  });
  addSoundFileCSS();
};

const addSoundFileCSS = () => {
  const styles = `
    .block {
        padding: 10px;
        padding-bottom: 0;
    }
    .soundFileContainer {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        padding-bottom: 0;
    }
    .soundFileButton {
        padding: 10px;
        padding-bottom: 0;
    }
    `;
  const soundTestFileStyleSheet = document.createElement("style");
  soundTestFileStyleSheet.innerText = styles;
  document.head.appendChild(soundTestFileStyleSheet);
};

const cloneAudioBuffer = (audioBuffer) => {
  const newAudioBuffer = new AudioBuffer({
    length: audioBuffer.length,
    sampleRate: audioBuffer.sampleRate,
    numberOfChannels: audioBuffer.numberOfChannels,
  });

  for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
    newAudioBuffer.copyToChannel(audioBuffer.getChannelData(channel), channel);
  }

  return newAudioBuffer;
};

const calculateDBFromRMS = (rms) => {
  const db = 20 * Math.log10(rms);
  // round to 1 decimal place
  return Math.round(db * 10) / 10;
};

const getGainValue = (dbSPL) => {
  const gain = Math.pow(10, dbSPL / 20);
  return gain;
};

const getRMSLimit = (dbSPL, buffer) => {
  // get max value of absolute value of buffer
  const sMax = Math.max(...buffer.map(Math.abs));
  // update sMax in document
  document.getElementById(
    "soundTestModalMaxAmplitude"
  ).innerHTML = `Digital sound max absolute value: ${sMax.toFixed(3)}`;
  const rms = getGainValue(dbSPL);
  const sRms = getRMSOfWaveForm(buffer);
  const rmsLimit = sRms / sMax;

  // console.log("rmsLimit",rmsLimit)
  // console.log("rms",rms)
  // console.log("db", dbSPL)
  // console.log("dbfromrms",calculateDBFromRMS(rms))
  return Math.min(rmsLimit, rms);
};
