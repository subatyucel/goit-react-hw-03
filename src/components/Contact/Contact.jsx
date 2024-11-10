import "./Contact.module.css";

function Contact({ contact, deleteContact }) {
  return (
    <li className="contact-container">
      <div className="contact-info">
        <h2>{contact.name}</h2>
        <p>{contact.number}</p>
      </div>
      <button onClick={() => deleteContact(contact.id)}>Delete</button>
    </li>
  );
}

export default Contact;
