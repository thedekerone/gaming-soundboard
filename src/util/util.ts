export const getDevices = async () => {
  let deviceList: MediaDeviceInfo[] = [];
  let inputDevices: MediaDeviceInfo[] = [];
  let outputDevices: MediaDeviceInfo[] = [];
  if (navigator !== undefined) {
    try {
      deviceList = await navigator.mediaDevices.enumerateDevices();
      inputDevices = deviceList.filter((el) => el.kind === 'audioinput');
      outputDevices = deviceList.filter((el) => el.kind === 'audiooutput');
    } catch (error) {
      console.log(error);
    }
  }
  return { inputDevices, outputDevices };
};

export const not = () => {};

export const selectMic = (deviceId: string) => {
  if (navigator !== undefined) {
    return navigator.mediaDevices.getUserMedia({ audio: { deviceId } });
  }
  return null;
};
