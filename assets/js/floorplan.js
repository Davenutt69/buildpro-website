document.addEventListener("DOMContentLoaded", function() {
    const roomSelect = document.getElementById("room-select");
    const materialSelect = document.getElementById("material-select");
    const applyChangesButton = document.getElementById("apply-changes");

    applyChangesButton.addEventListener("click", function() {
        const selectedRoomId = roomSelect.value;
        const selectedMaterial = materialSelect.value;

        // Get the selected room and update its fill color (material)
        const room = document.getElementById(selectedRoomId);
        if (room) {
            room.setAttribute("fill", selectedMaterial);
        }
    });
});
