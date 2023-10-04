window.onload =  function(){
    // get the myFavs element and add an event listener (click) to it:
      document.getElementById("myFavs").addEventListener("click", async function(){
        // get the values of the two input fields
        let favFruit = document.getElementById("fruit").value;
        let favVeg = document.getElementById("veg").value;
        console.log(favVeg);
        console.log(favFruit);

        let jsonVals = {fruit : favFruit, veg : favVeg}
        let response = await fetch('http://localhost:4200/passTheFood?' + new URLSearchParams(jsonVals));

        // let  response = await fetch('http://localhost:4200?' + new URLSearchParams(jsonVals));
        // let response = await fetch(`http://localhost:4200/fruits/${favFruit}/vegs/${favVeg}`);
        console.log(await response.text());
        // console.log(await response.text());
        
      })//click function
    }