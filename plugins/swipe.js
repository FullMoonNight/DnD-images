const $imgBlock = document.querySelector(".content");

[...$imgBlock.querySelectorAll(".img-block")].forEach((image) => {
  image.addEventListener("mousedown", (evt) => {
    evt.preventDefault();
    let currentDragElem = evt.target.closest(".img-block");

    const imgBlockDim = $imgBlock.getBoundingClientRect();
    const elemDim = currentDragElem.getBoundingClientRect();
    const shift = elemShift(currentDragElem);
    let dropElem;

    let imgCopy = currentDragElem.cloneNode(true);
    imgCopy.style.opacity = 0.5;
    currentDragElem.insertAdjacentElement("afterend", imgCopy);

    currentDragElem.style.cssText = `
      position: absolute;
      z-index: 1000;
      width: ${elemDim.width / 2}px;
      height: ${elemDim.height / 2}px;
      cursor: grabbing;`;
    currentDragElem.querySelector(".img").style.cssText += `
      width: 150px;
      height: 150px;`;
    moveAt(evt.clientX, evt.clientY);

    function moveAt(x, y) {
      currentDragElem.style.top = y - shift.top / 2 - imgBlockDim.top / 2 + "px";
      currentDragElem.style.left = x - shift.left / 2 - imgBlockDim.left / 2 + "px";
    }

    function elemShift(elem) {
      return {
        top: evt.clientY - elemDim.top + imgBlockDim.top,
        left: evt.clientX - elemDim.left + imgBlockDim.left,
        bottom: elemDim.bottom - evt.clientY + imgBlockDim.top,
        right: elemDim.right - evt.clientX + imgBlockDim.left,
      };
    }

    function swipeImage(elemSide) {
      let swipedImage = elemSide.closest(".img-block");
      imgCopy.remove();
      if (elemSide.dataset.side === "left") swipedImage.before(imgCopy);
      else swipedImage.after(imgCopy);
    }

    function onMouseMove(evt) {
      moveAt(evt.clientX, evt.clientY);
      currentDragElem.style.display = "none";
      let currentDropElem = document.elementFromPoint(evt.clientX, evt.clientY);
      currentDragElem.style.display = "";
      if (
        currentDropElem.dataset.type === "swipe" &&
        currentDropElem != dropElem &&
        currentDropElem.closest(".img-block") != imgCopy
      )
        swipeImage(currentDropElem);
      dropElem = currentDropElem;
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener(
      "mouseup",
      (event) => {
        document.removeEventListener("mousemove", onMouseMove);
        currentDragElem.style.cssText = "";
        currentDragElem.querySelector(".img").style.cssText += `
      width: 300px;
      height: 300px;`;
        currentDragElem.remove();
        imgCopy.after(currentDragElem);
        imgCopy.remove();
      },
      { once: true }
    );
  });
});
