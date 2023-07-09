//buttons
let startButton = document.querySelector(".but");
let userName = document.querySelector(".user-input");
let prompt = document.querySelector(".prompt");
let okButton = document.querySelector(".ok");
let cancelButton = document.querySelector(".cancle");
let cover = document.querySelector(".cover-screen");

startButton.onclick = function () {
  cover.style.cssText = "display: none;";
  prompt.style.cssText = "transform: translateY(0)";
};

okButton.onclick = function () {
  prompt.style.cssText = "transform: translateY(-500px)";
  document.querySelector(".name span").innerHTML = userName.value || "Un Known";
  //show card for 2s
  blocks.forEach(function (e) {
    e.classList.add("flipped");
    setTimeout(() => {
      e.classList.remove("flipped");
    }, duration * 2);
  });
};

cancelButton.onclick = function () {
  prompt.style.cssText = "transform: translateY(-500px)";
  cover.style.cssText = "display: block;";
  // document.querySelector(".name span").innerHTML = "Un Known";
};

let duration = 1000;
let mainContainer = document.querySelector(".main-container");
let blocks = Array.from(mainContainer.children);

let range = [...Array(blocks.length).keys()];

//shuffle array elements
shuffle(range);
//make function that shuffle array
function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // random num
    random = Math.floor(Math.random() * current);
    current--;
    //swap elemets
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

//add random  order to blocks
blocks.forEach(function (ele, index) {
  ele.style.order = range[index];
  ele.addEventListener("click", function () {
    flip(ele);
  });
});

function flip(block) {
  block.classList.add("flipped");
  //check flipped card
  let flippedBlocks = blocks.filter((flipped) =>
    flipped.classList.contains("flipped")
  );

  if (flippedBlocks.length === 2) {
    stopClicking();
    matchedImage(flippedBlocks[0], flippedBlocks[1]);
  }
}
//stop clicking
function stopClicking() {
  //add no clicking class
  mainContainer.classList.add("no-click");
  //enable cicking after 1.5 s
  setTimeout(() => {
    mainContainer.classList.remove("no-click");
  }, duration);
}

//check matched images
function matchedImage(FirstBlock, secondBlock) {
  let triesNumber = document.querySelector(".trys span");

  if (FirstBlock.dataset.character === secondBlock.dataset.character) {
    document.getElementById("succes").play();
    FirstBlock.classList.remove("flipped");
    secondBlock.classList.remove("flipped");

    FirstBlock.classList.add("matched");
    secondBlock.classList.add("matched");
  } else {
    triesNumber.innerHTML = parseInt(triesNumber.innerHTML) + 1;
    document.getElementById("fail").play();
    setTimeout(() => {
      FirstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");
    }, duration);
  }
}
