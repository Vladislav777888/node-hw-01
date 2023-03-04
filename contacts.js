const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join("./db/contacts.json");

async function listContacts() {
  try {
    const result = await fs.readFile(contactsPath, "utf-8");
    const parsedResult = JSON.parse(result);

    console.table(parsedResult);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const result = contacts.find(
      (contact) => contact.id === contactId.toString()
    );

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const idx = contacts.findIndex(
      (contact) => contact.id === contactId.toString()
    );
    const result = contacts.splice(idx, 1);

    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const contact = { name, email, phone, id: uuidv4() };

  const result = await fs.readFile(contactsPath, "utf-8");
  const parsedResult = JSON.parse(result);
  const obj = [...parsedResult, contact];

  await fs.writeFile(contactsPath, JSON.stringify(obj));

  console.log(contact);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
