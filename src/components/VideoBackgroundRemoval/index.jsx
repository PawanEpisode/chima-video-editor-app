import React, { useRef, useState, useEffect } from "react";
import * as bodySegmentation from "@tensorflow-models/body-segmentation";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import { Button } from "antd";

const VideoBackgroundRemoval = () => {
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const [segmenter, setSegmenter] = useState(null);
  const [videoFile, setVideoFile] = useState('');

  useEffect(() => {
    const loadModel = async () => {
      const model = bodySegmentation.SupportedModels.BodyPix;
      const segmenterConfig = {
        architecture: "ResNet50",
        outputStride: 32,
        quantBytes: 2,
      };
      const segmenterInstance = await bodySegmentation.createSegmenter(
        model,
        segmenterConfig
      );
      setSegmenter(segmenterInstance);
    };
    loadModel();
  }, []);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setVideoFile(URL.createObjectURL(file));
  };

  const handleRemove = () => {
    setVideoFile('');
    // Clear the file input manually
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const processSegmentation = async (segmentation) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const imgData = ctx.getImageData(0, 0, video.videoWidth, video.videoHeight);

    for (let i = 0; i < imgData.data.length; i += 4) {
      const pixelIndex = i / 4;
      if (!segmentation.data[pixelIndex]) {
        imgData.data[i + 3] = 0; // Make the pixel transparent
      }
    }
    ctx.putImageData(imgData, 0, 0);
  };

  const segmentPersons = async () => {
    if (segmenter && videoRef.current.readyState >= 3) {
      const segmentationConfig = {
        multiSegmentation: false,
        segmentBodyParts: false,
      };
      const segmentation = await segmenter.segmentPeople(
        videoRef.current,
        segmentationConfig
      );
      await processSegmentation(segmentation[0].mask.mask);
      requestAnimationFrame(segmentPersons);
    }
  };

  useEffect(() => {
    if (videoFile) {
      const video = videoRef.current;
      video.onloadeddata = () => {
        canvasRef.current.width = video.videoWidth;
        canvasRef.current.height = video.videoHeight;
        segmentPersons();
      };
    }
  }, [videoFile, segmenter]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = canvasRef.current.src;
    link.download = 'backgroundRemovedVideo.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);  
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <h1>Background Removal</h1>
      <div className="w-[50%] flex justify-between  gap-8 px-4 py-6 border border-gray-400 items-center rounded-2xl shadow-2xl">
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        <Button danger={true} disabled={!videoFile} onClick={handleRemove}>
          Remove
        </Button>
        {videoFile.length > 0 ? (
          <button type='button' onClick={handleDownload} className={"w-full mt-2 text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"}>
              Download
          </button>
        ): null}
      </div>
      <div className="w-full p-10 flex justify-between">
        <video ref={videoRef} src={videoFile} autoPlay loop muted controls />
        {videoFile ? (
          <canvas ref={canvasRef}></canvas>
        ) : (
          <video src={"videoFile"} autoPlay loop muted controls />
        )}
      </div>
    </div>
  );
};

export default VideoBackgroundRemoval;
