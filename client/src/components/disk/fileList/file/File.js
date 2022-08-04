import React from 'react';
import './file.css'
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import { deleteFile, downloadFile } from '../../../../actions/file';

const File = ({ file }) => {
    const dispatch = useDispatch()
    const { currentDir } = useSelector(state => state.files)

    function openDirHandler() {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    function downloadClickHandler(event) {
        event.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    return (
        <div className='file' onClick={openDirHandler}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{file.size}</div>

            {file.type !== 'dir' && <button 
                className='file__btn file__download'
                onClick={downloadClickHandler}    
            >download</button>}
            <button onClick={deleteClickHandler} className='file__btn file__delete'>delete</button>
        </div>
    );
};

export default File;