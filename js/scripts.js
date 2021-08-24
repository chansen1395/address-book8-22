// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function (id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function (id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, bothAddresses) { // pretend also passing in address2
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.bothAddresses = bothAddresses; // Passing in a literal object constructed by both address inputs
  // this.address =  {home: address, email: address2}

}
// newContact => A new object using the Contact constructor
// newContact = { firstName: "value", lastName: "value", phoneNumber: "value" }

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};


// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function (key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}


  function showContact(contactId) {
    const contact = addressBook.findContact(contactId);
    if (contact.bothAddresses.homeAddress === "") {
      $("#address1").remove();
    } else if (contact.bothAddresses.homeAddress != "") {
      $("#show-contact").append();
    }

    $("#show-contact").show();
    $(".first-name").html(contact.firstName);
    $(".last-name").html(contact.lastName);
    $(".phone-number").html(contact.phoneNumber);
    $(".address1").html(contact.bothAddresses.homeAddress);
    $(".address2").html(contact.bothAddresses.emailAddress);
    let buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
  }


function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function () {
  attachContactListeners();
  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedAddress = $("input#new-address").val();
    var inputtedAddress2 = $("input#new-address2").val();
    var bothAddresses = { homeAddress: inputtedAddress, emailAddress: inputtedAddress2 }
    // var bothAddresses = [inputtedAddress, inputtedAddress2];
    // bothAddresses.homeAddress <--- that would equal inputtedAddress
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-address").val("");
    $("input#new-address2").val("");
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, bothAddresses);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});