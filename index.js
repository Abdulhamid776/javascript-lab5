/* Variables */
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');
const robohashImg = document.getElementById('robohash-img');

/* Functions */
// Create the updateBatteryStatus() function
function updateBatteryStatus(battery) {
    console.log(battery);
    // Update the charging status
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    // Update the charge level
    chargeLevel.textContent = (battery.level * 100) + "%";
    chargeMeter.value = battery.level * 100;

    // Fetch image from RoboHash API
    const percentage = Math.round(battery.level * 100);
    const imageUrl = `https://robohash.org/${percentage}.png`;
    
    // Create image element
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = `RoboHash for ${percentage}%`;
    
    // Append image to the HTML page
    const robohashContainer = document.querySelector('#robohash');
    robohashContainer.innerHTML = ''; // Clear previous image
    robohashContainer.appendChild(img);
}

// Using the getBattery() method of the navigator object, 
//create a promise to retrieve the battery information
navigator.getBattery().then(battery => {
    // Update the battery information when the promise resolves
    updateBatteryStatus(battery);
    // Event listener for changes to the charging status
    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    });
    // Event listener for changes to the charge level
    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    });
});
