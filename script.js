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

// Functions

// Add Item function

function addItem(e) {
  e.preventDefault();

  const newItem = `${itemInput.value[0].toUpperCase()}${itemInput.value.slice(
    1,
    itemInput.value.length
  )}`;

  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');

  li.appendChild(button);

  itemList.appendChild(li);

  // clear the input field
  itemInput.value = '';
}

// Create Button function

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

// Create Button function

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// Event Listeners
itemForm.addEventListener('submit', addItem);

// ADD ITEMS TO LIST
