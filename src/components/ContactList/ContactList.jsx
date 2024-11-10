import Contact from "../Contact/Contact";
import "./ContactList.module.css";

function ContactList({ contacts, deleteContact }) {
  return (
    <ul>
      {contacts.map((contact) => (
        <Contact
          contact={contact}
          key={contact.id}
          deleteContact={deleteContact}
        />
      ))}
    </ul>
  );
}

export default ContactList;
