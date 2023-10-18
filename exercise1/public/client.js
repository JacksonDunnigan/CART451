document.getElementById("searchForm").addEventListener("submit", function(event){
  event.preventDefault();

  // document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    const yearInput = document.getElementById('year');
    const genreInput = document.getElementById('genre');
    const priceInput = document.getElementById('price');
    const queryResultContainer = document.getElementById('queryResult');

    submitButton.addEventListener('click', () => {
      const year = yearInput.value;
      const genre = genreInput.value;
      const price = priceInput.value;

      const queryParams = `?year=${year}&genre=${genre}&price=${price}`;

      fetch(`/query${queryParams}`)
        .then(response => response.json())
        .then(data => {
          console.log('Query result:', data);

          
          // Do something with the query result
        
          // Update the query result container with the selected values
          queryResultContainer.innerHTML = JSON.stringify(data, null, 2);

        })
        .catch(error => console.error('Error:', error));
    });
  // });
});

