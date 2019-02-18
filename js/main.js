/* WATS 3020 Image Maker Code */

class ImageMaker {
  constructor() {
    this.imagePreview = document.querySelector('#image-preview');
    this.topText = document.createElement('p');
    this.topText.setAttribute('class', 'top-text');
    this.imagePreview.appendChild(this.topText);
    this.bottomText = document.createElement('p');
    this.bottomText.setAttribute('class', 'bottom-text');
    this.imagePreview.appendChild(this.bottomText);
    this.backgroundInput = document.forms[0].querySelector('select[name="backgroundImage"]');
    this.topTextInput = document.forms[0].querySelector('input[name="topText"]');
    this.bottomTextInput = document.forms[0].querySelector('input[name="bottomText"]');
  }
  drawPreview() {
    this.imagePreview.style.backgroundImage = `url("images/${this.backgroundInput.value}")`;
    this.topText.innerHTML = this.topTextInput.value;
    this.bottomText.innerHTML = this.bottomTextInput.value;
  }
  downloadImage() {
    this.drawPreview();
    generateImage();
  }
}

    let imageMaker = new ImageMaker();

    function generateImage(elementID = "image-preview", height = "800px", width = "1280px") {
      let htmlTemplate = document.getElementById(elementID);
      htmlTemplate.style.height = height;
      htmlTemplate.style.width = width;
      let imageName = "image_" + Date.now();

      // Generate image and prompt download for user.
      domtoimage.toJpeg(htmlTemplate, {
          quality: 0.95
        })
        .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = imageName;
          link.href = dataUrl;
          link.click();
        });
    }

    function applyEventListeners() {
      let inputs = document.querySelectorAll('input, select, textarea');
      for (input of inputs) {
        input.addEventListener("change", function (event) {
          imageMaker.drawPreview();
        })
      }
      let imageForm = document.querySelector('form');
      imageForm.addEventListener('submit', function (event) {
        event.preventDefault();
        imageMaker.downloadImage();
      })
    }
    
    // Apply event listeners on page load.
    applyEventListeners();