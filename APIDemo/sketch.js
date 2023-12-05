// sketch.js
let selectedSquirrelData = null;
let squirrelImage;
let mapImage;
let colourList = ['White', 'Grey', 'Cinnamon', 'Black'];
let furColorChanged = false;

function preload(){
    squirrelImage = loadImage('squirrelSilhouette.png');
    mapImage = loadImage('map.png');
}

function setup() {
    const canvasWidth = select('#p5-canvas-container').width;
    const canvasHeight = select('#p5-canvas-container').height;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("p5-canvas-container"); // Attach the canvas to the container

    background(240); // Set the background color to beige
}

function draw() {
    // Clear the canvas
    clear();

    // Draws the background map
    image(mapImage, 0,0);

    // Check if a squirrel is selected
    if (selectedSquirrelData) {
        
        
        squirrelInfo = `
            Squirrel ID: ${selectedSquirrelData.unique_squirrel_id}
            Location: ${round(selectedSquirrelData.x)} ${round(selectedSquirrelData.y)}
            Fur Colour: ${selectedSquirrelData.highlight_fur_color}
            Date Spotted: ${selectedSquirrelData.date}
            Chasing: ${selectedSquirrelData.chasing}
            Climbing: ${selectedSquirrelData.climbing}
        `;
    
        // console.log(squirrelInfo.highlight_fur_color);
        if (squirrelInfo.includes("Fur Colour: undefined")){
            const tempColour = 'Brown';
            squirrelInfo = squirrelInfo.replace(/Fur Colour: undefined/, `Fur Colour: ${tempColour}`);
        }

        // Squirrel's body
        push();       
        
        imageMode(CENTER);
        switch(selectedSquirrelData.highlight_fur_color) {
            case 'White':
                tint(255, 255, 255, 255);
                stroke(10)
                break;
            case 'Gray':
                tint(255, 255, 255, 255);
                break;
            case 'Cinnamon':
                tint(255, 0, 0, 255);
                break;
            case 'Black':
                tint(0, 0, 0, 255);
                break;
            default:
                tint(165, 42, 42, 255);
                break;
        }
        image(squirrelImage, width / 12, height / 8, squirrelImage.width / 8, squirrelImage.height / 8);


        // Display the selected squirrel info on the canvas
        textSize(14);
        textAlign(LEFT);
        fill(0); // Set text color to black
        text(squirrelInfo, width / 10, 20);

        // draws the squirrels coordinate
        var tempX = map(selectedSquirrelData.x, -73.99, -73.90, width * .3, width * .9)
        var tempY = map(selectedSquirrelData.y, 40.75, 40.79, height * .1, height * .5)

        fill(165, 42, 42);
        ellipse(tempX, tempY, 5);
        pop();

    }
}

// Function to update the selected squirrel data
function updateSelectedSquirrelData(data) {
    selectedSquirrelData = data;
    console.log(selectedSquirrelData)
}
