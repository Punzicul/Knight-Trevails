allSquares = document.getElementsByClassName("square");
startButton = document.getElementById("start")

knightImage = document.querySelector("img");

board = []

let startLocation, targetLocation;


class Node {
    constructor(location) {
        this.location = location;
        this.square = allSquares[this.location[1]*8 + this.location[0]]
        this.children = [];
        this.initializeChildren();
        this.getChildren = function getChildren() {
            return this.children;
        }
    }
  
    initializeChildren() {
        let x = this.location[0];
        let y = this.location[1];
        
        if (x >= 1 && y >= 2) {
          this.children.push([x - 1, y - 2]);
        }
        if (x >= 1 && y <= 5) {
          this.children.push([x - 1, y + 2]);
        }
        
        if (x <= 6 && y >= 2) {
          this.children.push([x + 1, y - 2]);
        }
        if (x <= 6 && y <= 5) {
          this.children.push([x + 1, y + 2]);
        }
        
        if (x >= 2 && y >= 1) {
          this.children.push([x - 2, y - 1]);
        }
        if (x >= 2 && y <= 6) {
          this.children.push([x - 2, y + 1]);
        }
        
        if (x <= 5 && y >= 1) {
          this.children.push([x + 2, y - 1]);
        }
        if (x <= 5 && y <= 6) {
          this.children.push([x + 2, y + 1]);
        }
    }
    
}

function initializeBoard(){
    for(let i = 0; i < 8; i++){
        line = []
        for(let j = 0; j < 8; j++){
            newNode = new Node([j, i])
            line.push(newNode)
        }
        board.push(line)
    }
}

initializeBoard()


// add click listeners for all squares

function clearAllSelected(color) {
    for (let i = 0; i < allSquares.length; i++) {
      let currentSquare = allSquares[i];
  
      if (getComputedStyle(currentSquare).backgroundColor === color) {
        if (i - 8 >= 0 && getComputedStyle(allSquares[i - 8]).backgroundColor === "rgb(212, 224, 229)") {
          currentSquare.style.backgroundColor = "rgb(117, 153, 174)";
        } else if (i % 8 !== 0 && i - 1 >= 0 && getComputedStyle(allSquares[i - 1]).backgroundColor === "rgb(212, 224, 229)") {
          currentSquare.style.backgroundColor = "rgb(117, 153, 174)";
        } else if (i + 8 < allSquares.length && getComputedStyle(allSquares[i + 8]).backgroundColor === "rgb(212, 224, 229)") {
          currentSquare.style.backgroundColor = "rgb(117, 153, 174)";
        } else if ((i + 1) % 8 !== 0 && i + 1 < allSquares.length && getComputedStyle(allSquares[i + 1]).backgroundColor === "rgb(212, 224, 229)") {
          currentSquare.style.backgroundColor = "rgb(117, 153, 174)";
        } else if (i - 8 >= 0 && getComputedStyle(allSquares[i - 8]).backgroundColor === "rgb(117, 153, 174)") {
          currentSquare.style.backgroundColor = "rgb(212, 224, 229)";
        } else if (i % 8 !== 0 && i - 1 >= 0 && getComputedStyle(allSquares[i - 1]).backgroundColor === "rgb(117, 153, 174)") {
          currentSquare.style.backgroundColor = "rgb(212, 224, 229)";
        } else if (i + 8 < allSquares.length && getComputedStyle(allSquares[i + 8]).backgroundColor === "rgb(117, 153, 174)") {
          currentSquare.style.backgroundColor = "rgb(212, 224, 229)";
        } else if ((i + 1) % 8 !== 0 && i + 1 < allSquares.length && getComputedStyle(allSquares[i + 1]).backgroundColor === "rgb(117, 153, 174)") {
          currentSquare.style.backgroundColor = "rgb(212, 224, 229)";
        }
      }
    }
}
  
function getNodeWithIndex(index){
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            currentNode = board[j][i]
            if (currentNode.location[0] == index[0] && currentNode.location[1] == index[1]){
                return currentNode
            }
        }
    }
}

function bfsSearch(startNode, goal) {
    let queue = [[startNode, []]]; // Each element in the queue will contain a node and the path leading to that node.
    let visited = new Set();

    while (queue.length > 0) {
        let [currentNode, path] = queue.shift(); // Dequeue the first element from the queue.
        path.push(currentNode.location);

        if (currentNode.location[0] === goal[0] && currentNode.location[1] === goal[1]) {
            return path; // We found the goal, so we return the path.
        }

        let children = currentNode.getChildren();
        let currentNodeKey = currentNode.location.join(',');
        if (!visited.has(currentNodeKey)) {
            visited.add(currentNodeKey); // Mark the current node as visited.
            for (let i = 0; i < children.length; i++) {
                let childNode = getNodeWithIndex(children[i]);
                let childNodeKey = childNode.location.join(',');
                if (!visited.has(childNodeKey)) {
                    queue.push([childNode, [...path]]); // Enqueue the child node along with a copy of the current path.
                }
            }
        }
    }

    return null; // If we've reached this point, there's no valid path to the goal, so return null.
}

function getShortestPath() {
    startingNode = getNodeWithIndex(startLocation);
    path = bfsSearch(startingNode, targetLocation);
    return path;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  

function startListeners(){
    for(let i = 0; i < allSquares.length; i++){
        let currentSquare = allSquares[i]
    
        currentSquare.addEventListener('click', function handleClick(){
            clearAllSelected("rgb(173, 28, 50)")
            currentSquare.style.backgroundColor = "rgb(173, 28, 50)";
            startLocation = [i % 8, Math.floor(i / 8)];
        })
    }

    onkeydown = function (e) {
        e = e || window.event;
        let hovered = document.querySelectorAll(":hover");
      
        if (e.key == "g") {
          console.log(hovered);
          for (let i = 0; i < hovered.length; i++) {
            currentObj = hovered[i];
            clearAllSelected("rgb(28, 151, 173)")
            if (Array.from(allSquares).includes(currentObj)) {
              currentObj.style.backgroundColor = "rgb(28, 151, 173)";
              indexOfSquare = Array.from(allSquares).indexOf(currentObj)
              targetLocation = [indexOfSquare % 8, Math.floor(indexOfSquare / 8)];

            }
          }
        }
    };

    startButton.addEventListener('click', async function handleClick(){
        clearAllSelected("rgb(46, 179, 79)");

        if (targetLocation != null && startLocation != null){
            console.log(targetLocation, startLocation);
            path = getShortestPath();
            console.log(path);

            for(let i = 0; i < path.length; i++){
                square = getNodeWithIndex(path[i]).square;
                square.style.backgroundColor = "rgb(46, 179, 79)";
                knightImage.src = "knight.png";
                knightImage.classList.add("knight");
                square.appendChild(knightImage);
                await sleep(1000);
            }
        }
    })
      
}

startListeners()