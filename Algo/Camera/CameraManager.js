import { NativeModules, NativeEventEmitter } from 'react-native';

const { CameraModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(CameraModule);

let faceDetectionSubscription;

export const startFaceDetectionInBackground = (onSuccessCallback) => {
  if (CameraModule) {
    faceDetectionSubscription = eventEmitter.addListener('onFaceDetection', (event) => {
      // 감지된 얼굴 정보를 처리합니다.
      // 여기서 얼굴이 정면을 향하고 있는지 확인할 수 있습니다.
      console.log('Detected faces:', event.faces);

      if (event.faces.length > 0) {
        const face = event.faces[0];
        const rightEyeOpenProbability = face.rightEyeOpenProbability;
        const rotationX = face.headEulerAngleX;
        const rotationY = face.headEulerAngleY;
        const rotationZ = face.headEulerAngleZ;

        if (rightEyeOpenProbability >= 0.3 && Math.abs(rotationX) <= 10 && Math.abs(rotationY) <= 10) {
          // 얼굴이 정면을 향하고 있는 경우
          onSuccessCallback(true);
          console.log('얼굴 정면');

        } else {
          // 얼굴이 정면을 향하고 있지 않은 경우
          onSuccessCallback(false);
          console.log('얼굴 판별 x');

        }
      } else {
        // 얼굴이 감지되지 않은 경우
        onSuccessCallback(false);
        console.log('얼굴 판별 x');
      }
    });

    CameraModule.startFaceDetection();
  }
};

export const stopFaceDetectionInBackground = () => {
  if (CameraModule) {
    if (faceDetectionSubscription) {
      faceDetectionSubscription.remove();
      faceDetectionSubscription = null;
    }

    CameraModule.stopFaceDetection();
  }
};
