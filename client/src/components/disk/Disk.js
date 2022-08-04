import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from '../../actions/file';
import FileList from './fileList/FileList';
import Popup from './Popup'
import './disk.css'
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer';

const Disk = () => {
    const dispatch = useDispatch()
    const { currentDir, dirStack } = useSelector(state => state.files)
    const [dragEnter, setDragEnter] = useState(false)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDir])

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    function dragEnterHandler(event) {
        event.preventDefault()
        setDragEnter(true)
    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        setDragEnter(false)
    }

    function dropHandler(event) {
        event.preventDefault()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }


    return (
        !dragEnter ? (
            <div
                className='disk'
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragEnterHandler}
            >
                <div className="disk__btns">
                    <button className="disk__back" onClick={backClickHandler}>Back</button>
                    <button className="disk__create" onClick={showPopupHandler}>Create dir</button>
                    <div className="disk__upload">
                        <label htmlFor="disk__upload-input" className="disk__upload-label">Upload file</label>
                        <input
                            type="file"
                            id="disk__upload-input"
                            className="disk__upload-input"
                            multiple={true}
                            onChange={e => fileUploadHandler(e)}
                        />
                    </div>
                </div>

                <FileList />
                <Popup />
            </div>
        ) : (
            <div
                className="drop-area"
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragEnterHandler}
                onDrop={dropHandler}
            >
                Drop file here
            </div>
        )
    )
}

export default Disk;
