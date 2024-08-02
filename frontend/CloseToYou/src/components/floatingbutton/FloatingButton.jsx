import { ButtonContainer } from '././FloatingButtonStyle';
import AddIcon from '../../assets/icons/etc/plus-small.svg';
import DeleteIcon from '../../assets/icons/etc/delete.svg';
import EditIcon from '../../assets/icons/etc/edit.svg'

const icons = {
  add: AddIcon,
  delete: DeleteIcon,
  edit: EditIcon,
};

const FloatingButton = ({ type, handleClick }) => {
  return (
    <ButtonContainer onTouchStart={() => handleClick()} isAddType={type === 'add'} tabIndex={0}>
      <img src={icons[type]} alt={`${type} icon`} style={{ width: '2rem', height: '2rem' }} />
    </ButtonContainer>
  );
};

export default FloatingButton;
