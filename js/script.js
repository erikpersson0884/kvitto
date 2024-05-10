const receiptName = document.getElementById("receiptName");
const receiptDate = document.getElementById("receiptDate");
const receiptMoms = document.getElementById("receiptMoms");

const treasurerName = document.getElementById("treasurerName");
const buyerName = document.getElementById("buyerName");

const itemsDiv = document.getElementById('itemsDiv');
const addItemDiv = document.getElementById("addItemDiv");
const createKvittoButton = document.getElementById("createKvittoButton");
const removeInfoButton = document.getElementById("removeInfoButton");

const addItemName = document.getElementById("addItemName");
const addItemPrice = document.getElementById("addItemPrice");
const addItemAmount = document.getElementById("addItemAmount");
const addItemButton = document.getElementById("addItemButton");


const customSekFormatter = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    minimumFractionDigits: 2, // Ensures at least two decimal places
    maximumFractionDigits: 2, // Ensures at most two decimal places
});

function formatCurrency(number) {
    const formattedValue = customSekFormatter.format(number).replace(',', '.');
    return formattedValue;
}


let items = [];

receiptName.value = localStorage.getItem("receiptName") || '';
receiptDate.value = localStorage.getItem("receiptDate") || '';
receiptMoms.value = localStorage.getItem("receiptMoms") || 25;

treasurerName.value = localStorage.getItem("treasurerName") || '';
buyerName.value = localStorage.getItem("buyerName") || '';

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

treasurerName.oninput = () => {
    localStorage.setItem("treasurerName", treasurerName.value);
}

buyerName.oninput = () => {
    localStorage.setItem("buyerName", buyerName.value);
}

removeInfoButton.onclick = () => {
    ["receiptName", "receiptDate", "receiptMoms", "treasurerName", "buyerName"].forEach(item => localStorage.removeItem(item));
    receiptName.value = '';
    receiptDate.value = '';
    receiptMoms.value = 25;
    treasurerName.value = '';
    buyerName.value = '';
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
            <p>${formatCurrency(item.price)}</p>
            <p>${formatCurrency(item.price * item.amount)}</p>
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
    boughtItemsHeader.classList.add("boughtItemsHeader");

    tag = "h3";
    boughtItemsHeader.innerHTML = `
        <${tag} class="translateText" data-english="Item" data-swedish="Vara">Item</${tag}>
        <${tag} class="translateText" data-english="Amount" data-swedish="Antal">Amount</${tag}>
        <${tag} class="translateText" data-english="Price" data-swedish="Styckpris">Price</${tag}>
        <${tag} class="translateText" data-english="Total" data-swedish="Totalt">Total</${tag}>
    `;


    boughtItems.appendChild(boughtItemsHeader);

    items.forEach(item => {
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        
        newItem.innerHTML = `
            <p>${item.name}</p>
            <p>${item.amount}</p>
            <p>${formatCurrency(item.price * 1)}</p>
            <p>${formatCurrency(item.price * item.amount)}</p>
        `;

        boughtItems.appendChild(newItem);
    });

    kvitto.appendChild(boughtItems);
    let totalPrice = items.reduce((accumulator, item) => accumulator + (item.price * item.amount), 0);
    const total = document.createElement('div');
    total.classList.add("total");
    total.innerHTML = `
        <p class="translateText" data-english="Total:" data-swedish="Totalt:">Total:</p>
        <p>${formatCurrency(totalPrice)} kr</p>
    `;


    kvitto.appendChild(total);

    const kvittoFooter = createKvittoFooter(totalPrice);
    kvitto.appendChild(kvittoFooter);

    const signatureSection = createSignatureSection();
    kvitto.appendChild(signatureSection);

    document.getElementById("receipts").innerHTML = '';
    document.getElementById("receipts").appendChild(kvitto);

    setLanguage(localStorage.getItem('language'));
    window.print();
}


function createKvittoFooter(totalPrice) {
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
        <p>${formatCurrency(receiptMoms.value * 0.01 * totalPrice)}, ${receiptMoms.value}%</p>
    `;
    kvittoFooter.appendChild(moms);


    return kvittoFooter;
}

function createSignatureSection() {
    const signatureSection = document.createElement('section');
    signatureSection.classList.add("signatureSection");
    signatureSection.innerHTML = `
        <div>
            <p class="translateText explanationText" data-english="Treasurer signature" data-swedish="Kassör signatur">Treasurer signature</p>
            <div>
                <p>${treasurerName.value}</p>
                <p class="translateText explanationText" data-english="Treasurer, Name clarification" data-swedish="Kassör, Namnförtydligande"></p>
            </div>
        </div>

        <div>
            <p class="translateText explanationText" data-english="Buyer signature" data-swedish="Inköpare signatur">Buyer signature</p>
            <div>
                <p>${buyerName.value}</p>
                <p class="translateText explanationText" data-english="Buyer, Name clarification" data-swedish="Inköpare, Namnförtydligande">Treasurer, Name clarification</p>
            </div>
        </div>
    `;


    return signatureSection;

}


