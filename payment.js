document.addEventListener("DOMContentLoaded", () => {

    /* =======================
       ORDER SUMMARY
    ======================== */
   const summary = JSON.parse(localStorage.getItem("orderSummary"));


    document.getElementById("items").textContent = summary.items ;
    document.getElementById("amount").textContent = summary.grandTotal ;



    /* =======================
       ELEMENTS
    ======================== */
    const radios = document.querySelectorAll("input[name='payment']");
    const cardBox = document.getElementById("cardBox");
    const upiBox = document.getElementById("upiBox");
    const placeBtn = document.getElementById("placeBtn");
    const message = document.getElementById("message");
    const processingMsg = document.getElementById("process");
    const backBtn = document.querySelector(".back");
    const click=document.getElementById("click");

    const [cardNumber, expiry, cvv] = cardBox.querySelectorAll("input");
    const upiInput = upiBox.querySelector("input");

    let selectedPayment = null;

    cardBox.style.display = "none";
    upiBox.style.display = "none";
    processingMsg.style.display = "none";

    /* =======================
       ERROR HELPERS
    ======================== */
    const cardErr = createError(cardNumber);
    const expErr = createError(expiry);
    const cvvErr = createError(cvv);
    const upiErr = createError(upiInput);

    function createError(input) {
        const err = document.createElement("small");
        err.style.color = "red";
        err.style.display = "none";
        err.style.marginLeft = "80px";
        input.after(err);
        return err;
    }

    function show(err, msg) {
        err.textContent = msg;
        err.style.display = "block";
        err.textContent = msg;
         err.style.display = "block"; 
         err.style.fontFamily="Arial, Helvetica, sans-serif";
          err.style.marginLeft="80px";
          err.style.marginbottom="80px";
    }

    function hide(err) {
        err.style.display = "none";
    }

    /* =======================
       PAYMENT SELECTION
    ======================== */
    radios.forEach(radio => {
        radio.addEventListener("change", () => {
            selectedPayment = radio.value;
            message.textContent = "";
            message.style.display = "none";

            hide(cardErr); hide(expErr); hide(cvvErr); hide(upiErr);

            cardBox.style.display = "none";
            upiBox.style.display = "none";

            if (selectedPayment === "card") cardBox.style.display = "block";
            if (selectedPayment === "upi") upiBox.style.display = "block";
        });
    });

    /* =======================
       FIELD VALIDATION
    ======================== */
    cardNumber.addEventListener("input", () => validateCardNumber(true));
    expiry.addEventListener("input", () => validateExpiry(true));
    cvv.addEventListener("input", () => validateCVV(true));
    upiInput.addEventListener("input", () => validateUPI(true));

    function validateCardNumber(showError) {
        const v = cardNumber.value.trim();
        if (!v) { if(showError) show(cardErr, "The input field cannot be empty"); return false; }
        if (!/^\d{16}$/.test(v)) { if(showError) show(cardErr, "Card number must be 16 digits"); return false; }
        hide(cardErr); return true;
    }

    function validateExpiry(showError) {
        const v = expiry.value.trim();
        if (!v) { if(showError) show(expErr, "The input field cannot be empty"); return false; }
        if (!/^\d{2}\/\d{2}$/.test(v)) { if(showError) show(expErr, "Format MM/YY"); return false; }
        hide(expErr); return true;
    }

    function validateCVV(showError) {
        const v = cvv.value.trim();
        if (!v) { if(showError) show(cvvErr, "The input field cannot be empty"); return false; }
        if (!/^\d{3}$/.test(v)) { if(showError) show(cvvErr, "CVV must be 3 digits"); return false; }
        hide(cvvErr); return true;
    }

    function validateUPI(showError) {
        const v = upiInput.value.trim();
        if (!v) { if(showError) show(upiErr, "The input field cannot be empty"); return false; }
        if (!/^[\w.-]+@[\w]+$/.test(v)) { if(showError) show(upiErr, "Invalid UPI ID"); return false; }
        hide(upiErr); return true;
    }

    /* =======================
       PLACE ORDER CLICK
    ======================== */
    placeBtn.addEventListener("click", () => {

        if (!selectedPayment) {
            message.textContent = "Please select a payment option!";
            message.style.color = "red";
            message.style.fontFamily = "Arial, Helvetica, sans-serif";
            message.style.fontSize = "16px";
            message.style.textAlign = "center";
            message.style.marginBottom = "20px";
            message.style.display = "block";
            return;
        }   

        // VALIDATE FIELDS
        if (selectedPayment === "card") {
            const valid = validateCardNumber(true) & validateExpiry(true) & validateCVV(true);
            if (!valid) return;
        }
        if (selectedPayment === "upi") {
            if (!validateUPI(true)) return;
        }

        // SHOW PROCESSING MESSAGE ABOVE BUTTON
        processingMsg.style.display = "flex";

        // DISABLE BUTTONS
        placeBtn.disabled = true;
        backBtn.disabled = true;

       
            setTimeout(() => {

        const paymentBox = document.querySelector(".payment");

       // GET USERNAME
       const savedAddress = JSON.parse(localStorage.getItem("userAddress"));

       let username = "Customer"; // fallback

       if (savedAddress && savedAddress.name) {
        username = savedAddress.name;
}


       // CLEAR ENTIRE CARD CONTENT
       paymentBox.innerHTML = "";

       // TURN CARD GREEN & CENTER CONTENT
        paymentBox.classList.add("success", "success-content");

       // INSERT SUCCESS CONTENT
         paymentBox.innerHTML = `
        <svg class="tick" viewBox="0 0 52 52">
          <circle class="tick-circle" cx="26" cy="26" r="25"/>
          <path class="tick-check" d="M14 27 l7 7 l17 -17"/>
        </svg>

        <h2 class="thanks">Thank you, ${username} !</h2>
        <p class="textorder">Your order is confirmed 🎉</p>

          <button id="successBackBtn" class="success-btn">Back to shop</button>

    `;

    // SHOW BUTTON AFTER TICK ANIMATION
        setTimeout(() => {
                        const successBtn = document.getElementById("successBackBtn");

           successBtn.style.display = "inline-block";

        // REDIRECT ON CLICK
        successBtn.addEventListener("click", () => {
          window.location.href = "index.html"; // change if needed
         });
         
         }, 2000);

         // CLEAR CART
          localStorage.removeItem("cart");
          localStorage.removeItem("orderSummary");

        }, 2000);

    });
});
