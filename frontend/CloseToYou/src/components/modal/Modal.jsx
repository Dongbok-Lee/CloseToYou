import ModalStyle from './ModalStyle';
import Button from '../button/Button';
import Input from '../input/Input';

const Modal = ({ modalType, modalSize, onTouchStart, children }) => {

    const deleteText = "정말 삭제 하시겠어요?";

    return(
            <ModalStyle modalType={ modalType } modalSize={ modalSize }>
                <div className="modal-container">
                    <div className="modal-up-box">                
                        <div className="close-icon-box">
                            <div className="close-icon" tabIndex={0} onTouchStart={ onTouchStart }></div>
                        </div>
                    </div>
                    <div className="modal-down-box">
                        <div className="modal-down-input">
                            { modalType === 'delete' && <div className="modal-delete-text">{ deleteText }</div>}
                            { modalSize === 'large' && modalType !== 'delete' && <Input inputSize="medium"></Input>}
                            { modalType !== 'delete' && <Input inputSize="medium"></Input>}
                        </div>
                        <div className="modal-down-button">
                            <Button btnSize='small' onTouchStart={ onTouchStart }>{ children }</Button> 
                        </div>
                    </div>
                </div>
            </ModalStyle>        
    );
}

export default Modal;
