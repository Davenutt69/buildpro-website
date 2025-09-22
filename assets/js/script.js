document.addEventListener("DOMContentLoaded", function () {
    /* =============== NAVBAR TOGGLE (MOBILE) =============== */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    /* =============== COUNTER ANIMATION =============== */
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        const animateCounter = () => {
            let target = +counter.getAttribute("data-target");
            let count = 0;
            let increment = target / 100;

            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.floor(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        };
        animateCounter();
    });

    /* =============== TESTIMONIALS SLIDER =============== */
    let slides = document.querySelectorAll(".testimonial-slide");
    let index = 0;
    let autoSlideInterval = setInterval(nextSlide, 5000);

    function updateSlides(newIndex) {
        slides[index].classList.remove("active");
        index = (newIndex + slides.length) % slides.length;
        slides[index].classList.add("active");
    }

    function nextSlide() {
        updateSlides(index + 1);
    }

    function prevSlide() {
        updateSlides(index - 1);
    }

    if (document.querySelector(".next-btn") && document.querySelector(".prev-btn")) {
        document.querySelector(".next-btn").addEventListener("click", function () {
            clearInterval(autoSlideInterval);
            nextSlide();
            autoSlideInterval = setInterval(nextSlide, 5000);
        });

        document.querySelector(".prev-btn").addEventListener("click", function () {
            clearInterval(autoSlideInterval);
            prevSlide();
            autoSlideInterval = setInterval(nextSlide, 5000);
        });
    }

    if (slides.length > 0) {
        slides[index].classList.add("active");
    }

    /* =============== TEMPLATE PREVIEW FUNCTIONALITY =============== */
    const viewTemplateBtns = document.querySelectorAll(".view-template");

    viewTemplateBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const templateImage = this.parentElement.querySelector("img").src;
            openTemplatePreview(templateImage);
        });
    });

    function openTemplatePreview(imageSrc) {
        const previewModal = document.createElement("div");
        previewModal.classList.add("template-preview-modal");
        previewModal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <img src="${imageSrc}" alt="Template Preview">
            </div>
        `;
        document.body.appendChild(previewModal);

        previewModal.querySelector(".close-btn").addEventListener("click", () => {
            previewModal.remove();
        });

        previewModal.addEventListener("click", (event) => {
            if (event.target === previewModal) {
                previewModal.remove();
            }
        });
    }

    /* =============== CUSTOMIZATION SECTION FUNCTIONALITY =============== */
    const customizationOptions = document.querySelectorAll(".option-box");

    customizationOptions.forEach(option => {
        option.addEventListener("click", function () {
            customizationOptions.forEach(opt => opt.classList.remove("selected"));
            this.classList.add("selected");

            const selectedOption = this.dataset.option;
            updateCustomization(selectedOption);
        });
    });

    function updateCustomization(selectedOption) {
        alert(`You selected: ${selectedOption}`);
    }

    /* =============== DYNAMIC PRICING CALCULATION =============== */
    const priceElements = document.querySelectorAll(".price-update");

    function updatePricing() {
        let basePrice = 50000;
        const selectedOptions = document.querySelectorAll(".option-box.selected");

        selectedOptions.forEach(option => {
            basePrice += parseInt(option.dataset.price);
        });

        priceElements.forEach(priceEl => {
            priceEl.textContent = `$${basePrice.toLocaleString()}`;
        });
    }

    /* =============== 3D PREVIEW (Three.js) =============== */
    if (document.getElementById("threeD-container")) {
        initThreeD();
    }

    function initThreeD() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("threeD-container").appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0xff6600 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 2;

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        animate();
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("quote-request-form");
    const popup = document.getElementById("thank-you-popup");
    const closeBtn = document.getElementById("close-popup");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const action = form.getAttribute("action");

        fetch(action, {
            method: "POST",
            body: formData,
        }).then(response => {
            popup.style.display = "flex";
            form.reset();

            // Auto-close after 5 seconds
            setTimeout(() => {
                popup.style.display = "none";
            }, 5000);
        }).catch(error => {
            alert("Oops! Something went wrong. Please try again.");
        });
    });

    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });
});
