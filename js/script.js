const receiptName = document.getElementById("receiptName");
const receiptDate = document.getElementById("receiptDate");
const receiptMoms = document.getElementById("receiptMoms");

const itemsDiv = document.getElementById('itemsDiv');
const addItemDiv = document.getElementById("addItemDiv");
const createKvittoButton = document.getElementById("createKvittoButton");

const addItemName = document.getElementById("addItemName");
const addItemPrice = document.getElementById("addItemPrice");
const addItemAmount = document.getElementById("addItemAmount");
const addItemButton = document.getElementById("addItemButton");


let items = [];

if (localStorage.getItem("receiptName")) {
    receiptName.value = localStorage.getItem("receiptName");
}

if (localStorage.getItem("receiptDate")) {
    receiptDate.value = localStorage.getItem("receiptDate");
}

if (localStorage.getItem("receiptMoms")) {
    receiptMoms.value = localStorage.getItem("receiptMoms");
}

if (localStorage.getItem("items")) {
    items = JSON.parse(localStorage.getItem("items"));
    updateItemPreview();
}


receiptName.oninput = () => {
    localStorage.setItem("receiptName", receiptName.value);
}

receiptDate.oninput = () => {
    localStorage.setItem("receiptDate", receiptDate.value);
}

receiptMoms.oninput = () => {
    localStorage.setItem("receiptMoms", receiptMoms.value);
}

addItemButton.onclick = addItem;

function addItem() {
    const newItem = {
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        name: addItemName.value, 
        price: parseFloat(addItemPrice.value),
        amount: parseFloat(addItemAmount.value)
    }

    items.push(newItem)
    localStorage.setItem("items", JSON.stringify(items));

    updateItemPreview();

    addItemName.value = '';
    addItemPrice.value = '';
    addItemAmount.value = '';

}


function updateItemPreview() {
    const itemPreview = document.getElementById("itemPreview");
    itemPreview.innerHTML = '';

    const itemsPreviewHeader = document.createElement("div");
    itemsPreviewHeader.classList.add("itemsPreviewHeader");

    itemsPreviewHeader.innerHTML = `
        <h2 class="translateText" data-english="Item" data-swedish="Vara">Item</h2>
        <h2 class="translateText" data-english="Amount" data-swedish="Antal">Amount</h2>
        <h2 class="translateText" data-english="Price" data-swedish="Pris">Price</h2>
        <h2 class="translateText" data-english="Total" data-swedish="Totalt">Total</h2>
    `; 
    

    const emptyAllButton = createRemoveButton("Empty all", "Töm alla", () => {
        items = [];
        localStorage.setItem("items", JSON.stringify(items));
        updateItemPreview();
    });
    itemsPreviewHeader.appendChild(emptyAllButton);


    itemPreview.appendChild(itemsPreviewHeader);

    items.forEach(item => {
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        
        newItem.innerHTML = `
            <p>${item.name}</p>
            <p>${item.amount}</p>
            <p>${(item.price * 1).toFixed(2)}</p>
            <p>${(item.price * item.amount).toFixed(2)}</p>
        `;

        const removeButton = createRemoveButton('Remove', 'Ta bort', () => {
            items = items.filter(i => i.id !== item.id);
            localStorage.setItem("items", JSON.stringify(items));
            updateItemPreview();
        });
        newItem.appendChild(removeButton);

        itemPreview.appendChild(newItem);
    });
}

function createRemoveButton(englist_text, swedish_text, func) {
    const removeButton = document.createElement('div');
    removeButton.classList.add('removeButton');

    const removeImage = document.createElement('img');
    removeImage.src = 'img/remove.svg';
    removeButton.appendChild(removeImage);

    const removeText = document.createElement('p');
    removeText.classList.add('translateText');
    removeText.setAttribute('data-english', englist_text);
    removeText.setAttribute('data-swedish', swedish_text);

    removeButton.appendChild(removeText);

    removeButton.onclick = () => {
        func()
    }

    return removeButton;
}

createKvittoButton.onclick = createKvitto;

function createKvitto() {
    const kvitto = document.createElement('div');
    kvitto.classList.add("kvitto");

    const header = document.createElement('header');

    const h1 = document.createElement('h1');
    h1.innerHTML = receiptName.value;
    header.appendChild(h1);

    kvitto.appendChild(header);

    const boughtItems = document.createElement('div');
    boughtItems.classList.add("boughtItems");

    const boughtItemsHeader = document.createElement("div");
    boughtItemsHeader.classList.add("boughtItemsHeader", "translateText");

    boughtItemsHeader.innerHTML = `
        <h2 class="translateText" data-english="Item" data-swedish="Vara">Item</h2>
        <h2 class="translateText" data-english="Amount" data-swedish="Antal">Amount</h2>
        <h2 class="translateText" data-english="Price" data-swedish="Styckpris">Price</h2>
        <h2 class="translateText" data-english="Total" data-swedish="Totalt">Total</h2>
    `;



    boughtItems.appendChild(boughtItemsHeader);

    items.forEach(item => {
        const newItem = document.createElement('div');
        newItem.classList.add('item', "translateText");
        
        newItem.innerHTML = `
            <p class="translateText" data-english="${item.name}" data-swedish="${item.name}"></p>
            <p class="translateText" data-english="${item.amount}" data-swedish="${item.amount}"></p>
            <p class="translateText" data-english="${(item.price * 1).toFixed(2)}" data-swedish="${(item.price * 1).toFixed(2)}"></p>
            <p class="translateText" data-english="${(item.price * item.amount).toFixed(2)}" data-swedish="${(item.price * item.amount).toFixed(2)}"></p>
        `;

        boughtItems.appendChild(newItem);
    });

    kvitto.appendChild(boughtItems);
    let totalPrice = items.reduce((accumulator, item) => accumulator + (item.price * item.amount), 0);

    const total = document.createElement('div');
    total.classList.add("total");
    total.innerHTML = `
        <p class="translateText" data-english="Total:" data-swedish="Totalt:">Total:</p>
        <p>${totalPrice.toFixed(2)} kr</p>
    `;


    kvitto.appendChild(total);


    const kvittoFooter = createKvittoFooter();
    kvitto.appendChild(kvittoFooter);

    document.getElementById("receipts").innerHTML = '';
    document.getElementById("receipts").appendChild(kvitto);

    setLanguage(localStorage.getItem('language'));
    window.print();
}

function createKvittoFooter() {
    const receiptDate = document.getElementById("receiptDate");
    const receiptMoms = document.getElementById("receiptMoms");

    const kvittoFooter = document.createElement('footer');
    kvittoFooter.classList.add("kvittoFooter");

    const date = document.createElement('div');

    date.innerHTML = `
        <p class="translateText" data-english="Date:" data-swedish="Datum:">Date:</p>
        <p>${receiptDate.value}</p>
    `;

    kvittoFooter.appendChild(date);

    moms = document.createElement('div');
    moms.innerHTML = `
        <p class="translateText" data-english="VAT:" data-swedish="Moms:"></p>
        <p>${receiptMoms.value}</p>
    `;
    kvittoFooter.appendChild(moms);

    return kvittoFooter;
}