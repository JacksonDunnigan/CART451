// app.js
document.addEventListener("DOMContentLoaded", function() {
    // URL of the API
    const apiUrl = "https://data.cityofnewyork.us/resource/vfnx-vebw.json";

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Process and display the data in the left column
            const dataList = document.getElementById("data-list");

            data.forEach(item => {
                const listItem = document.createElement("li");

                // Squirrel ID remains in the list item
                const squirrelIdButton = document.createElement("button");
                squirrelIdButton.textContent = `Squirrel ID: ${item.unique_squirrel_id}`;
                squirrelIdButton.classList.add("dropdown-button");

                // Dropdown menu with other item values
                const dropdown = document.createElement("div");
                dropdown.classList.add("dropdown-content");
                dropdown.innerHTML = `
                    <p>Location: ${round(item.x)} ${round(item.y)}</p>
                    <p>Fur Colour: ${item.highlight_fur_color}</p>
                    <p>Date Spotted: ${item.date}</p>
                `;

                // Append the squirrel ID button and dropdown to the list item
                listItem.appendChild(squirrelIdButton);
                listItem.appendChild(dropdown);

                // Add a click event to update the selected squirrel data
                listItem.addEventListener("click", () => {
                    updateSelectedSquirrelData(item);
                });

                dataList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
});
