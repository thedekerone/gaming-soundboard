import React, { useEffect, useState, useRef } from 'react';
import { gotDevices } from '../../util/inOutSelector';

export default function AudioSelector({ effectAudio }: { effectAudio: any }) {
  const [inputDevices, setInputDevices]: any = useState([]);
  const [outputDevices, setOutputDevices]: any = useState([]);
  const [inputValue, setInputValue]: any = useState('default');
  const [stream, setStream]: any = useState();

  const videoElement: any = useRef(null);

  function getVirtualInput(deviceList: any) {
    const virtualInput = deviceList.find((el: any) =>
      el.label.includes('CABLE')
    );
    return virtualInput;
  }

  function attachSinkId(audioOutput: any, sinkId: any) {
    if (typeof audioOutput.sinkId !== 'undefined') {
      audioOutput
        .setSinkId(sinkId)
        .then(() => {
          console.log(`Success, audio output device attached: ${sinkId}`);
          return null;
        })
        .catch((error: any) => {
          let errorMessage = error;
          if (error.name === 'SecurityError') {
            errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
          }
          console.error(errorMessage);
          // Jump back to first output device in the list as it's the default.
          audioOutput.value = outputDevices[0].deviceId;
        });
    } else {
      console.warn('Browser does not support output device selection.');
    }
  }
  function multipleSinkId(list: any, sinkId: string) {
    list.forEach((el: any) => {
      attachSinkId(el, sinkId);
    });
  }
  function handleError(err: any) {
    console.log(err);
  }

  function gotStream(res: any) {
    setStream(res); // make stream available to console
    if (videoElement.current !== null) {
      videoElement.current.srcObject = res;
    }
    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
  }

  function start() {
    console.log(stream);
    if (stream) {
      stream.getTracks().forEach((track: any) => {
        track.stop();
      });
    }

    const audioSource = inputValue;
    console.log(audioSource);
    // const videoSource = videoSelect.value;
    const constraints = {
      audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
      // video: { deviceId: videoSource ? { exact: videoSource } : undefined },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(gotStream)
      .then(gotDevices)
      .catch(handleError);
  }

  const handleOutputChange = (el: any) => {
    console.log(el);
    multipleSinkId([videoElement.current, effectAudio], el.target.value);
  };

  useEffect(() => {
    console.log(videoElement.current);
    navigator.mediaDevices
      .enumerateDevices()
      .then((res) => {
        setInputDevices(res.filter((el) => el.kind === 'audioinput'));
        setOutputDevices(res.filter((el) => el.kind === 'audiooutput'));
        const newDefault = getVirtualInput(
          res.filter((el) => el.kind === 'audiooutput')
        );

        multipleSinkId(
          [videoElement.current, effectAudio],
          newDefault.deviceId
        );

        return null;
      })
      .catch((err) => console.log(err));
    start();
  }, []);
  return (
    <div id="container">
      <select
        value={inputValue}
        onChange={(el) => {
          setInputValue(el.target.value);
          start();
        }}
        id="inputDevices"
      >
        {inputDevices.map((el: any) => (
          <option key={el.deviceId} value={el.deviceId}>
            {el.label}
          </option>
        ))}
      </select>
      <select
        style={{ visibility: 'hidden' }}
        onChange={handleOutputChange}
        id="outputDevices"
      >
        {outputDevices.map((el: any) => (
          <option key={el.deviceId} value={el.deviceId}>
            {el.label}
          </option>
        ))}
      </select>

      <audio
        style={{ visibility: 'hidden' }}
        ref={videoElement}
        controls
        autoPlay
      >
        <track kind="captions" />
      </audio>
    </div>
  );
}
