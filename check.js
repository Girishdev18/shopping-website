const savedAddress = JSON.parse(localStorage.getItem("userAddress"));

if (savedAddress) {
    document.getElementById("nameList").innerHTML =
        `<option value="${savedAddress.name}">`;

    document.getElementById("phoneList").innerHTML =
        `<option value="${savedAddress.phone}">`;

    document.getElementById("emailList").innerHTML =
        `<option value="${savedAddress.email}">`;

    document.getElementById("addressList").innerHTML =
        `<option value="${savedAddress.address}">`;
}

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("addressform");
    const submitBtn = document.getElementById("submit");

    let hasSubmitted = false; // 🔑 IMPORTANT

    const fields = [
        {
            input: document.getElementById("name"),
            error: document.querySelectorAll(".error")[0],
            status: document.querySelectorAll(".status")[0],
            validate: v => v.trim().length >= 5,
            msg: "Name must be at least 5 characters !"
        },
        {
            input: document.getElementById("phone"),
            error: document.querySelectorAll(".error")[1],
            status: document.querySelectorAll(".status")[1],
            validate: v => /^\d{10}$/.test(v),
            msg: "Enter valid 10-digit phone number !"
        },
        {
            input: document.getElementById("email"),
            error: document.querySelectorAll(".error")[2],
            status: document.querySelectorAll(".status")[2],
            validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            msg: "Enter valid email address !"
        },
        {
            input: document.getElementById("Address"),
            error: document.querySelectorAll(".error")[3],
            status: document.querySelectorAll(".status")[3],
            validate: v => v.trim().length >= 10,
            msg: "Address must be at least 10 characters !"
        },
        {
            input: document.getElementById("pincode"),
            error: document.querySelectorAll(".error")[4],
            status: document.querySelectorAll(".status")[4],
            validate: v => /^\d{6}$/.test(v),
            msg: "Enter valid 6-digit pincode !"
        },
        {
            input: document.getElementById("state"),
            error: document.querySelectorAll(".error")[5],
            status: document.querySelectorAll(".status")[5],
            validate: v => /^[A-Za-z\s]{2,}$/.test(v),
            msg: "State is required !"
        }
    ];

    function validateField(field) {
        const value = field.input.value.trim();

        // Clear everything first
        field.error.textContent = "";
        field.status.className = "status";

        // If empty
        if (!value) {
            if (hasSubmitted) {
                field.error.textContent = "Please fill this field ";
                field.error.style.color="red";
                field.error.style.fontfamily="Arial, Helvetica, sans-serif";
            }
            return false;
        }

        // If invalid
        if (!field.validate(value)) {
            field.error.textContent = field.msg;
            field.status.className = "status invalid";
            return false;
        }

        // If valid
        field.status.className = "status valid";
        return true;
    }

    function validateAll() {
        let validForm = true;
        fields.forEach(field => {
            if (!validateField(field)) validForm = false;
        });
        return validForm;
    }

    // Live typing validation
    fields.forEach(field => {
        field.input.addEventListener("input", () => {
            validateField(field); // 👈 clears "Please fill" immediately
        });
    });

    const message= document.getElementById("msg");
    const loader = document.getElementById("loader");


    // Submit click
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        hasSubmitted = true; // 👈 KEY LINE

        if (!validateAll()) return;


        const addressData = {
            name: fields[0].input.value,
            phone: fields[1].input.value,
            email: fields[2].input.value,
            address: fields[3].input.value,
            pincode: fields[4].input.value,
            state: fields[5].input.value,
            type: document.getElementById("addressType").value
        };

        localStorage.setItem("userAddress", JSON.stringify(addressData));

        message.textContent="Address saved successfully!";

        setTimeout(() => {
        window.location.href = "pay.html";
        }, 2000); // 2 seconds
    });
});
