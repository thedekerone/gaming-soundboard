import React, { useEffect, useState, useRef } from 'react';
import { gotDevices } from '../../util/inOutSelector';

export default function AudioSelector({ effectAudio }: { effectAudio: any }) {
  const [inputDevices, setInputDevices]: any = useState([]);
  const [outputDevices, setOutputDevices]: any = useState([]);
  const [inputValue, setInputValue]: any = useState('default');
  const [stream, setStream]: any = useState();

  const videoElement: any = useRef(null);
  const audioInputSelect: any = useRef(null);
  // const videoElement: any = useRef(null);

  function attachSinkId(element: any, sinkId: any) {
    console.log('effectAudio');
    console.log(effectAudio);
    if (typeof videoElement.current.sinkId !== 'undefined') {
      videoElement.current
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
          videoElement.current.value = setOutputDevices[0].deviceId;
        });

      effectAudio
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
          videoElement.current.value = setOutputDevices[0].deviceId;
        });
    } else {
      console.warn('Browser does not support output device selection.');
    }
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
    attachSinkId(el.target, el.target.value);
  };

  useEffect(() => {
    console.log(videoElement.current);
    navigator.mediaDevices
      .enumerateDevices()
      .then((res) => {
        setInputDevices(res.filter((el) => el.kind === 'audioinput'));
        setOutputDevices(res.filter((el) => el.kind === 'audiooutput'));
        console.log(inputDevices);
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
      <select onChange={handleOutputChange} id="outputDevices">
        {outputDevices.map((el: any) => (
          <option key={el.deviceId} value={el.deviceId}>
            {el.label}
          </option>
        ))}
      </select>

      {/* <video id="video" playsinline autoPlay /> */}

      <audio ref={videoElement} controls autoPlay>
        <track kind="captions" />
      </audio>
      {/* <h1>
        <a href="//webrtc.github.io/samples/" title="WebRTC samples homepage">
          WebRTC samples
        </a>
        <span>Select sources &amp; outputs</span>
      </h1>

      <p>
        Get available audio, video sources and audio output devices from{' '}
        <code>mediaDevices.enumerateDevices()</code>
        then set the source for <code>getUserMedia()</code> using a{' '}
        <code>deviceId</code> constraint.
      </p>
      <p>
        <b>Note:</b> without permission, the browser will restrict the available
        devices to at most one per type.
      </p>

      <div className="select">
        Audio input source:
        <select id="audioSource">
          <option value="1">1</option>
        </select>
      </div>

      <div className="select">
        <label htmlFor="audioOutput">Audio output destination: </label>
        <select id="audioOutput" />
      </div>

      <div className="select">
        <label htmlFor="videoSource">Video source: </label>
        <select id="videoSource" />
      </div>


      <p>
        <b>Note:</b> If you hear a reverb sound your microphone is picking up
        the output of your speakers/headset, lower the volume and/or move the
        microphone further away from your speakers/headset.
      </p>

      <a
        href="https://github.com/webrtc/samples/tree/gh-pages/src/content/devices/input-output"
        title="View source for this page on GitHub"
        id="viewSource"
      >
        View source on GitHub
      </a> */}
    </div>
  );
}
