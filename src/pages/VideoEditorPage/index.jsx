import React, { useEffect, useRef, useState } from 'react'
import { Button, Popover } from "antd";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import {fetchFile, toBlobURL,  } from '@ffmpeg/util';
import { Slider, Spin } from "antd"
import { sliderValueToVideoTime } from '../../utils/helperFunctions'
import VideoPlayer from '../../components/VideoPlayer/index.jsx'
import VideoUpload from '../../components/VideoUpload/index.jsx'
import VideoBackgroundRemoval from '../../components/VideoBackgroundRemoval/index.jsx';
import { useLocation } from 'react-router-dom';

const VideoEditorPage = () => {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);
  const resultantVideoRef = useRef(null);
  const messageRef = useRef(null);
	const [videoFile, setVideoFile] = useState(null)
	const [videoPlayerState, setVideoPlayerState] = useState()
	const [videoPlayer, setVideoPlayer] = useState()

	const [sliderValues, setSliderValues] = useState([0, 100])
	const [processing, setProcessing] = useState(false)
	const [trimming, setTrimming] = useState(false)

  const [segmentTime, setSegmentTime] = useState(2); // default to 2 seconds
  const [segmentNumber, setSegmentNumber] = useState(0);

  const { pathname } = useLocation();

  useEffect(() => {
    const ffmpegLoad = async () => {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
      const ffmpeg = ffmpegRef.current;
      ffmpeg.on('log', ({ message }) => {
        if (messageRef.current) {
          messageRef.current.innerHTML = message;
      }
      console.log(message);
      });
      // toBlobURL is used to bypass CORS issue, urls with the same
      // domain can be used directly.
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      setLoaded(true);
  }
  ffmpegLoad();

  return () => {
    setVideoFile(null);
    setVideoPlayerState(null);
  }
  },[])

	useEffect(() => {
		const min = sliderValues[0]
		// when the slider values are updated, updating the
		// video time
		if (min !== undefined && videoPlayerState && videoPlayer) {
			videoPlayer.seek(sliderValueToVideoTime(
				videoPlayerState.duration, min
			))
		}
	}, [sliderValues])

	useEffect(() => {
		if (videoPlayer && videoPlayerState) {
			// allowing users to watch only the portion of
			// the video selected by the slider
			const [min, max] = sliderValues

			const minTime =sliderValueToVideoTime(videoPlayerState.duration,min)
			const maxTime =sliderValueToVideoTime(videoPlayerState.duration,max)

			if (videoPlayerState.currentTime < minTime) {
				videoPlayer.seek(minTime)
			}
			if (videoPlayerState.currentTime > maxTime) {
				// looping logic
				videoPlayer.seek(minTime)
			}
		}
	}, [videoPlayerState])

	useEffect(() => {
		// when the current videoFile is removed,
		// restoring the default state
		if (!videoFile) {
			setVideoPlayerState(undefined)
			setSliderValues([0, 100])
      setProcessing(false)
      setTrimming(false)
      // resultantVideoRef.current = null
      videoRef.current = null
		}
	}, [videoFile])

  const handleSegmentTimeChange = (e) => {
    setSegmentTime(parseInt(e.target.value));
  };

  const handleSegmentNumberChange = (e) => {
      setSegmentNumber(parseInt(e.target.value));
  };

  const handleTranscode = async () => {
    setProcessing(true);
    const inputFileName = 'input.mp4';
    const outputFileName = `output_${segmentNumber}.mp4`;
    const ffmpeg = ffmpegRef.current;

    try {
        // Fetch file and write it to the FFmpeg file system
        await ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));

        // Execute the FFmpeg command to split the video
        await ffmpeg.exec([
          '-i', inputFileName,
          '-f', 'segment',
          '-segment_time', `${segmentTime}`,
          '-g', '9',
          '-sc_threshold', '0',
          '-force_key_frames', 'expr:gte(t,n_forced*9)',
          '-reset_timestamps', '1',
          '-map', '0',
          'output_%d.mp4'
        ]);

        // Read the output file
        const data = await ffmpeg.readFile(outputFileName);
        if(resultantVideoRef.current) {
          resultantVideoRef.current.src = URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
        }
    } catch (err) {
        console.error('Error executing FFmpeg command:', err);
    } finally {
        setProcessing(false);
    }
};

const convertToMp4Trimmed = async () => {
  if(!videoPlayerState) return
  setTrimming(true);
  const inputFileName = "gif.mp4";
  const outputFileName = "output.mp4";
  const ffmpeg = ffmpegRef.current;

  // writing the video file to memory
  await ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));

  const [min, max] = sliderValues;
  const minTime = sliderValueToVideoTime(videoPlayerState.duration, min);
  const maxTime = sliderValueToVideoTime(videoPlayerState.duration, max);

  try {
      // Execute FFmpeg command to trim the video
      await ffmpeg.exec([
        '-i', inputFileName,
        '-ss', `${minTime}`,
        '-to', `${maxTime}`,
        '-r:v', '24',
        '-s', '720x480',
        '-c:v', 'libx264',  // or any other codec you prefer
        '-preset', 'ultrafast', // Use a faster preset
        '-crf', '28', // Lower quality to speed up processing
        '-c:a', 'aac',
        '-strict', 'experimental',
        outputFileName
      ]);

      //  Execute FFmpeg command to trim the video and apply slow-motion
      await ffmpeg.exec([
        '-i', outputFileName,
        '-r:v', '24',
        '-s', '720x480',
        '-preset', 'superfast', // Use a faster preset
        '-crf', '28', // Lower quality to speed up processing
        '-vf', `setpts=2*PTS,minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=30'`,
        'outputFileName.mp4'
      ]);

      // Reading the resulting file
      const data = await ffmpeg.readFile('outputFileName.mp4');

      // Debug log for checking if data is retrieved correctly
      console.log('Output file data:', data);

      // Convert the file to a URL and set it to the video element
      const mp4Url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
      
      // Debug log for checking the generated URL
      console.log('Generated mp4 URL:', mp4Url);

      if (resultantVideoRef.current) {
        resultantVideoRef.current.src = mp4Url;
          console.log('Video source set successfully');
      } else {
          console.error('resultantVideoRef.current is null');
      }

    } catch (error) {
        console.error("Error during FFmpeg execution:", error);
    } finally {
      setTrimming(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resultantVideoRef.current.src;
    link.download = 'trimmed.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);  
  };

  const getLogsContent = () => {
    return (
      (processing || trimming) ? <div className='w-full'>
                <h1>Logs</h1>
              <p className='w-64 text-blue-600 font-semibold mt-4' ref={messageRef}></p>
              </div> : null
    )
  }

  const isTrimVideoPage = pathname === '/trimVideo'
  const isSplitVideoPage = pathname === '/splitVideo'
  const isBackgroundRemovalVideoPage = pathname === '/backgroundRemoval'
  console.log('editorpage', videoPlayerState, resultantVideoRef.current?.src, pathname)

	return (
    <>
      {!isBackgroundRemovalVideoPage ? <div className='w-full flex justify-between items-center'>
        <Spin
          className='flex flex-col gap-12'
          spinning={!loaded}
          tip={!loaded ? "Waiting for FFmpeg to load..."
                    :"Processing..."}
        >
          {videoFile ? (
              <div className='flex flex-col gap-6 mb-6'>
                <h1>Video Uploaded</h1>
                <VideoPlayer
                src={URL.createObjectURL(videoFile)}
                onPlayerChange={(videoPlayer) => {
                  setVideoPlayer(videoPlayer)
                }}
                onChange={(videoPlayerState) => {
                  setVideoPlayerState(videoPlayerState)
                }}
              />
              </div>
            ) : (
              <>
                <h1>Upload a Video</h1>
                <video ref={videoRef} controls></video><br/>
              </>
            )}
          <div className={"w-full flex flex-col gap-6"}>
            <VideoUpload
              disabled={!!videoFile}
              onChange={(videoFile) => {
                setVideoFile(videoFile)
              }}
              onRemove={() => {
                setVideoFile(null)
              }}
            />
          </div>
        </Spin>
        {isTrimVideoPage ? <div className={"flex flex-col gap-4"}>
            <h3>Trim Video (Slow-Motion)</h3>
            <Slider
              disabled={!videoPlayerState}
              value={sliderValues}
              range={true}
              onChange={(values) => {
                setSliderValues(values)
              }}
              tooltip={{
                formatter: null,
              }}
            />
            <div className={"w-full flex"}>
              <Popover placement='bottom' id='trimmed-popover' content={getLogsContent()} open={trimming}>
                <Button 
                  disabled={!loaded || !videoPlayerState || processing}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${trimming ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`} 
                  onClick={convertToMp4Trimmed}
                >
                  {trimming ? "Trimming...": 'Convert to Trimmed mp4'}
                </Button>
              </Popover>
            </div>
            {resultantVideoRef.current?.src ? (
                  <button type='button' onClick={handleDownload} className={"w-full mt-2 text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"}>
                      Download
                  </button>
              ): null}
        </div> : null}
        {isSplitVideoPage ? <div className='flex flex-col gap-10 mt-10'>
              <h1>Split Video Into Equal Segments</h1>
              <div>
                  <label className="block text-gray-700 font-bold mb-2">
                      Segment Time (seconds):
                      <input
                          type="number"
                          value={segmentTime}
                          onChange={handleSegmentTimeChange}
                          min="1"
                          max="5"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                  </label>
              </div>
              <div>
                  <label className="block text-gray-700 font-bold mb-2">
                      Segment Number:
                      <input
                          type="number"
                          value={segmentNumber}
                          onChange={handleSegmentNumberChange}
                          min="0"
                          max={'10'}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                  </label>
              </div>
              <Popover placement='bottom' id='transcode-popover' content={getLogsContent()} open={processing}>
                <Button 
                  onClick={handleTranscode} 
                  disabled={!loaded || !videoPlayerState || trimming}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${processing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
                >
                  {processing ? 'Processing...' : 'Transcode and Split'}
                </Button>
              </Popover>
              {resultantVideoRef.current?.src ? (
                  <button type='button' onClick={handleDownload} className={"w-full mt-2 text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"}>
                      Download
                  </button>
              ): null}
        </div> : null}
        <div className={""}>
              <h3>Resulting Mp4 Video</h3>
              <video ref={resultantVideoRef} controls></video>
        </div>
      </div> : null}
      {isBackgroundRemovalVideoPage ? <div className='w-full'>
        <VideoBackgroundRemoval />
      </div> : null}
    </>
	)
}

export default VideoEditorPage