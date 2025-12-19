const cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cartItems");
const totalBox = document.getElementById("totalPrice");


function renderCart() {

    let grandTotal = 0;
    let originalTotal = 0;
    let totalItems = 0;

    container.innerHTML = `<h2>Total Items</h2>`;
    const cardsWrapper = document.createElement("div");
    cardsWrapper.className = "cards-wrapper";

    if (cart.length === 0) {
        container.innerHTML += `<p class="empty-cart">Cart is empty 😢</p>`;
        totalBox.innerHTML = "";
        return;
    }

    cart.forEach((item, index) => {
        item.qty = item.qty || 1;

        const itemTotal = item.price * item.qty;
        const itemOriginal = (item.price + 500) * item.qty;

        grandTotal += itemTotal;
        originalTotal += itemOriginal;
        totalItems += item.qty;

        const card = document.createElement("div");
        card.className = "cart-card";

        card.innerHTML = `
            <img src="${item.image}">
            <h2>${item.name}</h2>

                <p class="price"> ₹${item.price}</p>

                <span class="qnty">Quantity :</span>
                <button class="dec"> − </button>    
                <span class="qty">${item.qty}</span>
                <button class="inc"> + </button>

            <p class="total">
                Item Total : ₹<span class="item-total">${itemTotal}</span>
            </p>

            <button class="remove-btn">Remove</button>
            `;

        const qtyEl = card.querySelector(".qty");
        const totalEl = card.querySelector(".item-total");

        // ➕ Increase
        card.querySelector(".inc").onclick = () => {
            item.qty++;
            qtyEl.innerText = item.qty;
            totalEl.innerText = item.price * item.qty;
            saveCart();
            updateTotalBox();
             updateProceedButton();
        };

        // ➖ Decrease
        card.querySelector(".dec").onclick = () => {
            if (item.qty > 1) {
                item.qty--;
                qtyEl.innerText = item.qty;
                totalEl.innerText = item.price * item.qty;
                saveCart();
                updateTotalBox();
             updateProceedButton();
            }
        };

        // 🗑 Remove
        card.querySelector(".remove-btn").onclick = () => {
             card.classList.add("fade-out");
            setTimeout(() =>{
            cart.splice(index, 1);

            saveCart();
            renderCart();
             updateProceedButton();
            },400);
        };

        cardsWrapper.appendChild(card);
    });

    container.appendChild(cardsWrapper);
    updateTotalBox();
    updateProceedButton();
}


// 🔄 Update Total Box Only
function updateTotalBox() {

    let subtotal = 0;
    let original = 0;
    let items = 0;

    const DISCOUNT_PERCENT = 5; // 10% discount
    const GST_PERCENT = 7;      // 18% GST

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        original += item.price  * item.qty;
        items += item.qty;
    });

    const discountAmount = Math.round((subtotal * DISCOUNT_PERCENT) / 100);
    const priceAfterDiscount = subtotal - discountAmount;
    const gstAmount = Math.round((priceAfterDiscount * GST_PERCENT) / 100);
    const grandTotal = priceAfterDiscount + gstAmount;

    const orderSummary = {
        items:items,
        subtotal:subtotal,
        discount: discountAmount,
        gst: gstAmount,
        grandTotal:grandTotal,
    };

    localStorage.setItem("orderSummary", JSON.stringify(orderSummary));
    // ✅ END

    totalBox.innerHTML = `
        <h2>Total Price</h2>

        <div class="total-price">
            <div class="total-details">
            <div class="row">
                <span>Items Selected :</span>
                <span>${items}</span>
            </div>

            <div class="row">
                <span>Original Price :</span>
                <span>₹${original}</span>
            </div>

            <div class="row">
                <span>Discount (${DISCOUNT_PERCENT}%) :</span>
                <span> - ₹${discountAmount}</span>
            </div>

            <div class="row">
                <span>Price After Discount :</span>
                <span>₹${priceAfterDiscount}</span>
            </div>

            <div class="row">
                <span>GST (${GST_PERCENT}%) :</span>
                <span>₹${gstAmount}</span>
            </div>

            <div class="row">
                <span>Delivery Charges :</span>
                <span class="free">FREE</span>
            </div>

            <hr>

            <div class="row-grand">
                <span>Grand Total :</span>
                <span>₹${grandTotal}</span>
            </div>
            </div>
        </div>
    `;
}

const proceedBtn = document.getElementById("proceedBtn");

function updateProceedButton() {
    if (cart.length > 0) {
        proceedBtn.classList.add("enabled"); // for styling
        proceedBtn.disabled = false;
        proceedBtn.style.cursor = "pointer";
        proceedBtn.style.opacity = "1"; // optional
        proceedBtn.style.display = cart.length > 0 ? "inline-block" : "none";

    } else {
        proceedBtn.classList.remove("enabled");
        proceedBtn.disabled = true;
        proceedBtn.style.opacity = "0.5"; // optional: visually show disabled
    }
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

renderCart();
updateProceedButton(); // ensures button state is correct on page load

