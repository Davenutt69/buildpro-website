document.addEventListener("DOMContentLoaded", function () {
    const viewButtons = document.querySelectorAll(".view-template");
    const floorPlanSection = document.getElementById("floor-plan-section");
    const floorPlanImage = document.getElementById("floor-plan-image");
    const roomList = document.getElementById("room-list");
    const materialSelection = document.querySelector(".material-selection");
    const proceedButton = document.getElementById("proceed-customization");

    // Floor plan data
    const floorPlans = {
        modern: {
            image: "assets/images/floor-modern.jpg",
            rooms: [
                { name: "Living Room", size: "20x15 ft" },
                { name: "Bedroom", size: "15x12 ft" },
                { name: "Kitchen", size: "12x10 ft" },
                { name: "Bathroom", size: "10x8 ft" }
            ]
        },
        luxury: {
            image: "assets/images/floor-luxury.jpg",
            rooms: [
                { name: "Grand Living Room", size: "30x20 ft" },
                { name: "Master Suite", size: "25x18 ft" },
                { name: "Gourmet Kitchen", size: "20x15 ft" },
                { name: "Spa Bathroom", size: "15x12 ft" }
            ]
        },
        cottage: {
            image: "assets/images/floor-cottage.jpg",
            rooms: [
                { name: "Cozy Living Room", size: "18x14 ft" },
                { name: "Small Bedroom", size: "12x10 ft" },
                { name: "Compact Kitchen", size: "10x8 ft" },
                { name: "Bathroom", size: "8x6 ft" }
            ]
        },
        custom: {
            image: "assets/images/floor-custom.jpg",
            rooms: [
                { name: "Your Custom Design", size: "Flexible" }
            ]
        }
    };

    // Add event listeners to all view buttons
    viewButtons.forEach(button => {
        button.addEventListener("click", function () {
            const template = this.dataset.template;
            const selectedPlan = floorPlans[template];

            if (selectedPlan) {
                // Update UI with selected plan details
                floorPlanImage.src = selectedPlan.image;
                floorPlanImage.classList.remove("hidden");

                // Update room details
                roomList.innerHTML = "";
                selectedPlan.rooms.forEach(room => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `${room.name} - ${room.size}`;
                    roomList.appendChild(listItem);
                });

                // Show floor plan section and material selection
                floorPlanSection.classList.add("expanded");
                document.querySelector(".room-details").classList.remove("hidden");
                materialSelection.classList.remove("hidden");
                proceedButton.classList.remove("hidden");
            }
        });
    });
});
