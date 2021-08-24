// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

let addressBook = new AddressBook();
let contact = new Contact("Ada", "Lovelace", "503-555-0100");
let contact2 = new Contact("Grace", "Hopper", "503-555-0199");
addressBook.addContact(contact);
addressBook.addContact(contact2);
addressBook.deleteContact(1);
addressBook.contacts;





let pdx = { name: "Portland" };
let sfo = { name: "San Francisco" };
let sea = { name: "Seattle" };
let cso = { name: "Aktau" };
let dzn = { name: "Zhezkazgan" };

let usa = { name: "United States of America", cities: [pdx, sfo, sea] };
let kazakhstan = { name: "Kazakhstan", cities: [cso, dzn] };
let uruguay = { name: "Uruguay", cities: [] };

let mlz = { name: "Melo" };
uruguay.cities.push(mlz);

usa.cities.forEach(function(city) {
  console.log("Let's go to " + city.name + "!");
});





let tomatoes = { name: "Tomatoes", price: 2.99 };
let cucumbers = { name: "Cucumbers", price: 0.99 };
let onions = { name: "Onions", price: 0.79 };

let groceryStore = { name: "Michael's corner market", products: [tomatoes, cucumbers, onions] };

let iPhone = { name: "iPhone", price: 699 };
let android = { name: "Android", price: 499 };
let windowsPhone = { name: "Windows Phone", price: 399 };

let phoneStore = { name: "RadioShack", products: [iPhone, android, windowsPhone] };

let stores = [groceryStore, phoneStore];

stores.forEach(function(store) {
  console.log(store.name + " sells:");
  store.products.forEach(function(product) {
    console.log(product.name);
  });
  console.log("\n");
});