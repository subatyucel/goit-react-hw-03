import { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import data from "./data.json";

function App() {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState(data);

  useEffect(() => {
    const localContacts = localStorage.getItem("contacts");
    if (localContacts) setContacts(JSON.parse(localContacts));
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts)), [contacts];
  });

  function handleSearch(e) {
    setSearch(e.target.value.toLowerCase());
  }

  function addContact(newContact) {
    setContacts((c) => [...c, newContact]);
  }

  function deleteContact(id) {
    setContacts((contacts) => contacts.filter((c) => c.id !== id));
  }

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search)
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} />
      <SearchBox search={search} handleSearch={handleSearch} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
}

export default App;
