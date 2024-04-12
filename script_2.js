// Get all slots
const slots = document.querySelectorAll('.slot');

// Function to randomly occupy slots
function occupySlot() {
    const randomSlotIndex = Math.floor(Math.random() * slots.length);
    const randomSlot = slots[randomSlotIndex];
    if (!randomSlot.classList.contains('occupied')) {
        randomSlot.classList.add('occupied');
        randomSlot.innerHTML = '<span class="slot-label">Occupied</span>';
    }
}

// Function to randomly vacate slots
function vacateSlot() {
    const occupiedSlots = document.querySelectorAll('.slot.occupied');
    if (occupiedSlots.length > 0) {
        const randomOccupiedSlotIndex = Math.floor(Math.random() * occupiedSlots.length);
        const randomOccupiedSlot = occupiedSlots[randomOccupiedSlotIndex];
        randomOccupiedSlot.classList.remove('occupied');
        randomOccupiedSlot.innerHTML = '<span class="slot-label">Empty</span>';
    }
}

// Simulate vehicles arriving and leaving every few seconds
setInterval(() => {
    occupySlot();
    setTimeout(vacateSlot, 2000); // Vacate slot after 2 seconds
}, 5000); // Repeat every 5 seconds
