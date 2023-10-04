window.onload = function(){
  mouseClicked = false;
  currentSelectedNode = null;


  // Opens nested menus
  document.addEventListener('click', function handleClick(event) {
    // Menu navigation
    openMenu(event.target);
      // console.log(1);
  });

  // Open Menu
  function openMenu(node){
    var currentNode = node;
    var currentNodeChild = document.getElementById(currentNode.id + "Div");
    if (currentNode.nodeName == "BUTTON" && currentNode.classList.contains('parentButton')){
      // Closes any previously opened nodes
      if (currentSelectedNode !== null && currentSelectedNode !== currentNode) {
        currentSelectedNode.classList.remove('clicked');
        document.getElementById(currentSelectedNode.id + "Div").style.display = "none";
      }

      // Opens and recolours the proper boxes
      if (currentNode.classList.contains('clicked')){
        currentNode.classList.remove('clicked');
        currentNodeChild.style.display = "none";
      } else {
        currentSelectedNode = currentNode;
        currentNode.classList.add('clicked');
        currentNodeChild.style.display = "block";
      }
    }
  }
  
}