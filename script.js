const vehicle = document.querySelector('.vehicle');
const slots = document.querySelectorAll('.slot'); // Define slots globally

function moveVehicle() {
    // Move vehicle to a random slot
    const randomSlotIndex = Math.floor(Math.random() * slots.length);
    const randomSlot = slots[randomSlotIndex];
    const slotPosition = randomSlot.getBoundingClientRect();

    // Calculate the center coordinates of the slot
    const slotCenterX = slotPosition.left + (slotPosition.width / 2);
    const slotCenterY = slotPosition.top + (slotPosition.height / 2);

    // Animate the movement of the vehicle to the slot center
    let duration = 2000; // Animation duration in milliseconds
    let startTime = null;

    function animateVehicle(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let percentage = Math.min(progress / duration, 1);
        const vehicleX = vehicle.offsetLeft + (slotCenterX - vehicle.offsetLeft) * percentage;
        const vehicleY = vehicle.offsetTop + (slotCenterY - vehicle.offsetTop) * percentage;
        vehicle.style.left = vehicleX + 'px';
        vehicle.style.top = vehicleY + 'px';
        if (percentage < 1) {
            requestAnimationFrame(animateVehicle);
        } else {
            // Occupy the slot
            randomSlot.classList.add('occupied');
            randomSlot.innerHTML = '<span class="slot-label">Occupied</span>';

            // Vacate the slot after 2 seconds
            setTimeout(() => {
                randomSlot.classList.remove('occupied');
                randomSlot.innerHTML = '<span class="slot-label">Empty</span>';
            }, 2000);

            // Reset vehicle position after reaching the target slot
            setTimeout(() => {
                vehicle.style.left = '10px'; // Reset to the left
                vehicle.style.top = '10px'; // Reset to the top
            }, 2000);
        }
    }

    requestAnimationFrame(animateVehicle);
}

// Simulate vehicle movement
setInterval(moveVehicle, 5000); // Repeat every 5 seconds
