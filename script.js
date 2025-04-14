// **SHOPPING LIST PROJECT

// Shopping List - Project Into
// Add Items To List
// Setting Up Git & GitHub (Optional)
// Remove & Clear Items
// Clear UI State
// Filter Items
// Local Storage Crash Course
// Add Item To Local Storage
// Display Items From Local Storage
// Remove Items From Local Storage
// Set Item To Edit
// Update & Reset State
// Prevent Duplicate Items
// Deploy To Netlify

//
//

// Shopping list project specs

// 1. Add items to list via form
// 2. Remove items from list by clicking the 'X' button
// 3. Clear all items with 'clear' button
// 4. Filter the items by typing in the filter field
// 5. Add localStorage to persist items
// 6. Click on an item to put into 'edit mode' and add to form
// 7. Update item
// 8. Deploy to Netlify

//
//

// Bring all the elements to be selected and
// put them at the top (global scope) so they can
// be accessed by multiple functions

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

// Functions

//
//

// CREATE BUTTON

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

// CREATE ICON

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// CONVERT INPUT VALUE TO PROPERCASE

function toProperCase(word) {
  word = word.toLowerCase().trim();
  if (word.length === 0) return '';
  return `${word[0].toUpperCase()}${word.slice(1, word.length)}`;
}

//
//

// DISPLAY ITEMS FROM STORAGE

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));

  checkUI();
}

// ADD ITEMS

function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = toProperCase(itemInput.value);

  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  if (newItem.length > 15) {
    alert('Please enter an item with 15 characters or less');
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert('That item already exists!');
      return;
    }
  }

  // Create item DOM element
  addItemToDom(newItem);

  // Add Item to local storage
  addItemToStorage(newItem);

  checkUI();

  // clear the input field
  itemInput.value = '';
}

//
//

// ADD ITEM TO DOM

function addItemToDom(item) {
  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');

  li.appendChild(button);

  // Add li to the DOM

  itemList.appendChild(li);
}

//
//

// ADD ITEMS TO LOCAL STORAGE

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // Add new items to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//
//

// GET ITEMS FROM STORAGE

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

//
//

// ON CLICK ITEM

function onClickItem(e) {
  // check if what we are clicking on contains 'remove-item'
  // then traverse the DOM till we get the parent element (li)
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}
//
//

// PREVENT DUPLICATE ITEM / CHECK IF ITEM EXISTS
function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();

  return itemsFromStorage.includes(item);
}

// EDIT ITEM
function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  // add edit-mode class that turns the list item color
  // to gray
  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>&nbsp;&nbsp;Update Item';
  formBtn.style.backgroundColor = '#30A3D1';
  itemInput.value = item.textContent;
}

// REMOVE ITEM

function removeItem(item) {
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

// REMOVE ITEM FROM STORAGE
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Reset to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// CLEAR ALL ITEMS

// function clearItems() {
//   while (itemList.firstChild) {
//     itemList.removeChild(itemList.firstChild);
//   }

//   // Clear from local storage
//   localStorage.removeItem('items');

//   checkUI();
// }
function clearItems() {
  if (confirm('Are you sure')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }

  // Clear from local storage
  localStorage.removeItem('items');

  checkUI();
}

// FILTER ITEMS

function filterItems(e) {
  const items = document.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    // then check if the text is found in itemName
    // if not found it will return -1

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }

    // console.log(itemName);
  });
}

//

// SET CLEAR BUTTON AND FILTER ITEMS DISPLAY TO DYNAMIC

function checkUI() {
  itemInput.value = '';

  // Add items here
  const items = document.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add Item';
  formBtn.style.backgroundColor = '#333';

  isEditMode = false;
}

// Initialize app

function init() {
  // EVENT LISTENERS

  // ADD ITEMS TO LIST
  itemForm.addEventListener('submit', onAddItemSubmit);

  // REMOVE ITEMS FROM LIST
  itemList.addEventListener('click', onClickItem);

  // CLEAR ALL ITEMS
  clearBtn.addEventListener('click', clearItems);

  // FILTER ITEMS
  itemFilter.addEventListener('input', filterItems);

  // DISPLAY ITEMS FROM STORAGE (IF AVAILABLE)
  document.addEventListener('DOMContentLoaded', displayItems);

  // RESET UI - remove filter, remove clear all button, reset UI
  checkUI();
}

init();
