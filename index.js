function render(selector, dataArray) {
  let $contentPosition = document.querySelector(selector);
  $contentPosition.innerHTML = `
    <div class="image-row">
      ${createBlocks(dataArray)}
    </div>
  `;

  function createBlocks(array) {
    let wrapper = document.createElement("div");
    array.forEach((elem, index) => {
      wrapper.insertAdjacentHTML(
        "beforeend",
        `
        <div class="img-block img-${index + 1}">
          <div class="img">
            <div class="left" data-type="swipe" data-side="left"></div>
            <div class="right" data-type="swipe" data-side="right"></div>
          </div>
        </div>`
      );
      wrapper.querySelector(`.img-${index + 1}`).querySelector(".img").style.cssText = `
        background: url(${elem});
        background-size: cover;
      `;
    });
    return wrapper.innerHTML;
  }
}
