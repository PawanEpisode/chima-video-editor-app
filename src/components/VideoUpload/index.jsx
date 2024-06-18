import { Button, Upload } from 'antd'
import React, { useRef, useState } from 'react'

const VideoUpload = ({ disabled, onChange = () => { }, onRemove = () => { } }) => {
    const fileInputRef = useRef(null);
    const [videoFile, setVideoFile] = useState(null);

    const handleRemove = () => {
        onRemove();
        // Clear the file input manually
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        setVideoFile(file)
        onChange(file);
    };

    return (
        <div className='w-full flex gap-6 items-center'>
            <input 
            ref={fileInputRef}
            type="file" 
            disabled={disabled}
            accept="video/*" 
            onChange={handleVideoUpload} 
            className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            <Button
                danger={true}
                disabled={!disabled}
                onClick={handleRemove}
            >
                Remove
            </Button>
        </div>
    )
}

export default VideoUpload