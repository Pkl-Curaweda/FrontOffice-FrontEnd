<template>
    <video id="cameraFeed" width="640" height="480" autoplay style="position: absolute;"></video>
    <canvas id="canvas" width="640" height="480" style="position: absolute;"></canvas>

  </template>
  
  <script>
import * as faceapi from 'face-api.js';

export default {
  data() {
    return {
      MODEL_URL: '/models',
      isVideoPlaying: false, // Flag to track video playback status
    };
  },
  mounted() {
    this.setupCamera();
  },
  methods: {
    async setupCamera() {
      await faceapi.nets.ssdMobilenetv1.loadFromUri(this.MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(this.MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(this.MODEL_URL);

      const input = document.getElementById('cameraFeed');
      const canvas = document.getElementById('canvas');
      const displaySize = { width: input.width, height: input.height };
      faceapi.matchDimensions(canvas, displaySize);

      // Check if the browser supports the getUserMedia API
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Access the user's camera
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            // Attach the camera feed to the video element
            input.srcObject = stream;
          })
          .catch((error) => {
            console.error('Error accessing camera:', error);
          });
      } else {
        console.error('getUserMedia is not supported in this browser');
      }

      input.addEventListener('play', async () => {
        this.isVideoPlaying = true;
        this.detectAndTrackFaces(input, canvas, displaySize);
      });
    },

    async detectAndTrackFaces(input, canvas, displaySize) {
      const labels = ['harmoni', 'razan'];
      const labeledFaceDescriptors = await Promise.all(
        labels.map(async (label) => {
          const imgUrl = `/images/${label}.jpg`;
          const img = await faceapi.fetchImage(imgUrl);
          const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

          if (!fullFaceDescription) {
            throw new Error(`No face detected for ${label}`);
          }

          const faceDescriptors = [fullFaceDescription.descriptor];
          return new faceapi.LabeledFaceDescriptors(label, faceDescriptors);
        })
      );

      const maxDescriptorDistance = 0.6;
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance);

      const processVideo = async () => {
        if (this.isVideoPlaying) {
          const fullFaceDescriptions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors();
          const resizedDetections = faceapi.resizeResults(fullFaceDescriptions, displaySize);
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

          const results = fullFaceDescriptions.map((fd) => faceMatcher.findBestMatch(fd.descriptor));
          results.forEach((bestMatch, i) => {
            const box = fullFaceDescriptions[i].detection.box;
            const text = bestMatch.toString();
            const drawBox = new faceapi.draw.DrawBox(box, { label: text });
            drawBox.draw(canvas);
          });

          // Introduce a delay (e.g., 1000ms) before processing the next frame
          setTimeout(processVideo, 100);
        }
      };

      processVideo();
    },

    stopVideo() {
      this.isVideoPlaying = false;
    },
  },
};
</script>


  
  <style scoped>
  /* Add any scoped styles here if needed */
  </style>
  