import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDir } from '../../actions/file';
import { setPopupDisplay } from '../../reducers/fileReducer';
import Input from '../../utils/input/Input'

const Popup = () => {
    const [dirName, setDirName] = useState('')
    const { popupDisplay, currentDir } = useSelector(state => state.files)
    const dispatch = useDispatch()

    function closePopupHandler() {
        dispatch(setPopupDisplay('none'))
    }

    function createHanlder() {
        dispatch(createDir(currentDir, dirName))
        closePopupHandler()
        setDirName('')
    }

    return (
        <div
            className='popup'
            style={{ display: popupDisplay }}
            onClick={closePopupHandler}
        >
            <div className="popup__content" onClick={e => e.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Create a new dir</div>
                    <button
                        className="popup__close"
                        onClick={closePopupHandler}
                    >X</button>
                </div>
                <Input type="text" placeholder="Enter a folder name..." value={dirName} setValue={setDirName} />
                <button
                    className="popup__create"
                    onClick={createHanlder}
                >Crate</button>
            </div>
        </div>
    );
};

export default Popup;