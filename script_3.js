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

    // Calculate the distance to move horizontally and vertically
    const deltaX = slotCenterX - vehicle.offsetLeft;
    const deltaY = slotCenterY - vehicle.offsetTop;

    // Calculate the maximum allowed movement distance
    const maxX = window.innerWidth - vehicle.offsetWidth;
    const maxY = window.innerHeight - vehicle.offsetHeight;

    // Calculate the duration of the animation based on the distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const duration = Math.min(distance * 0.5, 2000); // Limit the duration to 2 seconds

    // Animate the movement of the vehicle
    let startTime = null;

    function animateVehicle(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        const vehicleX = vehicle.offsetLeft + (deltaX * percentage);
        const vehicleY = vehicle.offsetTop + (deltaY * percentage);
        vehicle.style.left = Math.max(0, Math.min(vehicleX, maxX)) + 'px';
        vehicle.style.top = Math.max(0, Math.min(vehicleY, maxY)) + 'px';
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
