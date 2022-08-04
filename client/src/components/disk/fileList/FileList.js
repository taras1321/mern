import React from 'react';
import { useSelector } from 'react-redux';
import File from './file/File'
import './filelist.css'

const FileList = () => {
    const files = useSelector(state => state.files.files)

    return (
        <div className='filelist'>
            <div className="filelist__header">
                <div className="filelist__name">Name</div>
                <div className="filelist__date">Date</div>
                <div className="filelist__size">Size</div>
            </div>

            {files.map(file => (
              <File file={file} key={file._id} />  
            ))}
        </div>
    );
};

export default FileList;