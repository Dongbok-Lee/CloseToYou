import { ButtonContainer } from "././FloatingButtonStyle";
import AddIcon from "../../assets/icons/etc/plus-small.svg";
import DeleteIcon from "../../assets/icons/etc/delete.svg";
import EditIcon from "../../assets/icons/etc/edit.svg";
import NfcIcon from '../../assets/icons/etc/nfc.svg';

const icons = {
  add: AddIcon,
  delete: DeleteIcon,
  edit: EditIcon,
  nfc: NfcIcon
};

const FloatingButton = ({ type, onTouchStart }) => {
  return (
    <ButtonContainer onTouchStart={() => handleClick()} type = {type} isdeleteType={type === "delete"} tabIndex={0}>
      <img src={icons[type]} alt={`${type} icon`} style={{ width: "2rem", height: "2rem" }} />
    </ButtonContainer>
  );
};

export default FloatingButton;