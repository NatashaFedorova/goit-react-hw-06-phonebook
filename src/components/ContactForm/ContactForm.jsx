import PropTypes from 'prop-types';
import * as yup from 'yup';
import 'yup-phone';
import { Formik, ErrorMessage } from 'formik';
import { DataForm, Input, Label, BtnSubmit, Error } from './ContactForm.styled';
import { addContact } from 'redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsList } from 'redux/selectors';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().phone().required(),
});

const initialValues = {
  name: '',
  number: '+',
};

const nameCheck = (contacts, value) => {
  return contacts.find(
    ({ name }) => value.toLowerCase() === name.toLowerCase()
  );
};

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContactsList);

  const handleSubmit = ({ name, number }, { resetForm }) => {
    const nameCheckResult = nameCheck(contacts, name);
    if (nameCheckResult) {
      alert(`${name} is already in contact`);
      return;
    }

    dispatch(addContact(name, number));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <DataForm autoComplete="off">
        <Label>
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessage name="name" component={Error} />
        </Label>

        <Label>
          Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses"
            required
          />
          <ErrorMessage name="number" component={Error} />
        </Label>
        <BtnSubmit type="submit">Add contact</BtnSubmit>
      </DataForm>
    </Formik>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactForm;
