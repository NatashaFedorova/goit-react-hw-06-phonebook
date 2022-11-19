import Section from 'components/Section';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import { Title, TitleContactsSection } from './App.styled';
import { Background } from 'components/constants/Background.styled';

const App = () => {
  return (
    <Background>
      <Section>
        <Title>Phonebook</Title>
        <ContactForm />
      </Section>
      <Section>
        <TitleContactsSection>Contacts</TitleContactsSection>
        <Filter />
        <ContactList />
      </Section>
    </Background>
  );
};

export default App;


