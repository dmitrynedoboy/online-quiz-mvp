import React from 'react';
import './Modal.scss'
function Modal({message}) {

  function exitHandler(evt){
    const closestParent = evt.target.closest('.modal-window');
    closestParent.style.display = 'none';
  }

  return (
    
    <div className="modal-window">

      <div className="modal-window__content">
        <div className="cl-btn-2 waiting-room__close-button" onClick={exitHandler}>
          <div>
              <div className="leftright"></div>
              <div className="rightleft"></div>
              <span className="close-btn">Выйти</span>
          </div>

        </div>
        <p>{message}</p>
      </div>

    </div>
  );
}

export default Modal;
