class AudioPlayer {
  private audio: HTMLMediaElement;

  constructor() {
    this.audio = new Audio();
  }

  play(src: string | MediaStream) {
    if (typeof src === 'string') {
      this.audio.src = src;
    } else if (typeof src === 'object') {
      this.audio.srcObject = src;
    }
    this.audio.play();
    console.log(src);
  }

  get isPlaying() {
    return this.audio.played;
  }

  stop() {
    this.audio.currentTime = 0;
    this.audio.pause();
  }

  changeAudioDevice(deviceId: string) {
    // setSinkId is a experimental
    (this.audio as any)
      .setSinkId(deviceId)
      .then(() => {
        console.log(`Success, audio output device attached: ${deviceId}`);
        return null;
      })
      .catch((err: Error) => console.log(err));
    return deviceId;
  }
}

export default AudioPlayer;
