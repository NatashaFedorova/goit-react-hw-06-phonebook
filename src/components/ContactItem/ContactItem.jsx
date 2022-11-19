import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { Item, About, BtnDelete } from './ContactItem.styled';

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();
  const { id, name, number } = contact;
  return (
    <>
      <Item>
        <About>
          {name}: {number}
        </About>
        <BtnDelete type="button" onClick={() => dispatch(deleteContact(id))}>
          Delete
        </BtnDelete>
      </Item>
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};

export default ContactItem;
