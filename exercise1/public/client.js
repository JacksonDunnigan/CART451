
let startHue = 0;
let endHue = 0;
const textarea = document.getElementById('queryResult');

document.getElementById("searchForm").addEventListener("submit", function(event){
  event.preventDefault();

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
          console.log(data[0]);

          let text = '';
          // Parses the data
          for (var i = 0; i < data.length; i++){
            text += data[i].Name +' by '+data[i].Author+'\n'+'\n';
            startHue += data[i].Price;
            endHue += data[i].year%100;
          }
          queryResultContainer.value = text;

          // Set the CSS variable values
          textarea.style.setProperty('--start-hue', startHue);
          textarea.style.setProperty('--end-hue', endHue);

        })
        .catch(error => console.error('Error:', error));
    });
});

