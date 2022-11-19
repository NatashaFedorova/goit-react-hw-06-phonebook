import ContactItem from 'components/ContactItem';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getContactsList, getFilterValue } from 'redux/selectors';
import { List } from './ContactList.styled';

export const ContactList = () => {
  const contacts = useSelector(getContactsList);
  const filter = useSelector(getFilterValue);

  const visibilityContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <List>
      {visibilityContacts.map(contact => {
        return <ContactItem key={contact.id} contact={contact} />;
      })}
    </List>
  );
};

ContactList.propTypes = {
  visibleContacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
