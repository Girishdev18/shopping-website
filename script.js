    document.addEventListener("DOMContentLoaded", () => {
        const message = document.querySelector(".message");
        const goCartBtn = document.getElementById("gotocart");
        const button = document.getElementById("expandBtn");
        const title = document.getElementById('title');
        const div = document.getElementById("itemBox");

        // Expand animation
        button.addEventListener("click", () => {
            div.classList.toggle("fullscreen");
            title.classList.toggle("visible", div.classList.contains("fullscreen"));
        });

        // Products data
        const products = {
            1: { name: "iPhone 15 Pro Max", price: 120000, image: "WhatsApp Image 2025-12-14 at 14.47.12.jpeg" },
            2: { name: "Ear Buds", price: 1000, image: "WhatsApp Image 2025-12-14 at 14.48.38.jpeg" },
            3: { name: "120W Charger", price: 500, image: "WhatsApp Image 2025-12-14 at 14.49.32.jpeg" },
            4: { name: "Smart Watch", price: 2500, image: "WhatsApp Image 2025-12-14 at 14.51.59.jpeg" },
            5: { name: "Home Theatre", price: 6500, image: "WhatsApp Image 2025-12-14 at 14.54.06.jpeg" },
            6: { name: "Smart LED TV", price: 30000, image: "WhatsApp Image 2025-12-14 at 14.54.06 (1).jpeg" },
            7: { name: "RC Car", price: 2500, image: "WhatsApp Image 2025-12-14 at 14.54.07.jpeg" },
            8: { name: "Gimbal", price: 6000, image: "WhatsApp Image 2025-12-14 at 14.54.07 (1).jpeg" },
            9: { name: "Camera", price: 35000, image: "WhatsApp Image 2025-12-14 at 14.54.07 (2).jpeg" },
            10: { name: "Calculator", price: 500, image: "WhatsApp Image 2025-12-14 at 14.57.23.jpeg" },
            11: { name: "Powerbank", price: 1500, image: "WhatsApp Image 2025-12-14 at 14.57.24.jpeg" },
            12: { name: "Keyboard", price: 300, image: "WhatsApp Image 2025-12-14 at 14.57.24 (1).jpeg" },
            13: { name: "Mouse", price: 200, image: "WhatsApp Image 2025-12-14 at 14.57.24 (2).jpeg" },
            14: { name: "CCTV Camera", price: 2000, image: "WhatsApp Image 2025-12-14 at 14.57.25.jpeg" },
            15: { name: "Laptop", price: 40000, image: "WhatsApp Image 2025-12-14 at 14.57.25 (1).jpeg" },
            16: { name: "Projector", price: 5000, image: "WhatsApp Image 2025-12-15 at 17.05.49.jpeg" },
            17: { name: "Tablet", price: 15000, image: "WhatsApp Image 2025-12-15 at 17.06.03.jpeg" },
            18: { name: "Printer", price: 35800, image: "WhatsApp Image 2025-12-15 at 17.06.03 (1).jpeg" },
        };

        // Load cart from localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Handle Add to Cart buttons
        document.querySelectorAll(".card").forEach(card => {
            const id = card.dataset.id;
            const addBtn = card.querySelector(".card-btn");

            if (cart.some(item => item.id == id)){
                markadded(addBtn);
            }

            addBtn.addEventListener("click", () => {
                let existingItem = cart.find(item => item.id == id);
                if(cart.some(item => item.id==id)) return;
                markadded(addBtn);
                if (!existingItem) {
                    cart.push({
                        id: id,
                        ...products[id],
                        qty: 1
                    });
                    localStorage.setItem("cart", JSON.stringify(cart));
                    addBtn.disabled = true;
                    addBtn.innerText = "Added";
                    message.innerText = `${products[id].name} added to cart`;
                    message.classList.add("show");
                    setTimeout(() => message.classList.remove("show"), 1500);
                }
            });

            function markadded(addBtn) {
                addBtn.innerText="Added";
                addBtn.style.backgroundColor="red";
                addBtn.disabled=true;
                addBtn.style.cursor="not-allowed";
            }
        });

        // Go to Cart animation
        goCartBtn.addEventListener("click", () => {
            const itemBox = document.getElementById("itemBox");
            itemBox.classList.add("rotate-3d");
            setTimeout(() => window.location.href = "final.html", 800);
        });

        // Navigation buttons logic
        let index = 0;
        const lists = document.querySelectorAll(".items-list");

        function updateLists(direction) {
            lists.forEach((list, i) => {
                list.classList.remove("active", "prev", "next", "slide-left", "slide-right");
                if (i === index) list.classList.add("active");
                else if (i < index) list.classList.add("prev");
                else list.classList.add("next");

                if (direction === "next" && i === index) list.classList.add("slide-right");
                if (direction === "prev" && i === index) list.classList.add("slide-left");
            });
        }

        window.Nextunc = function() {
            if (index < lists.length - 1) {
                index++;
                updateLists("next");
                updateButtons();
            }
        };

        window.Prevfunc = function() {
            if (index > 0) {
                index--;
                updateLists("prev");
                updateButtons();
            }
        };

        function updateButtons() {
            const prevBtn = document.querySelector(".first");
            const nextBtn = document.querySelector(".second");
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index === lists.length - 1;
        }

        updateLists();
    });
