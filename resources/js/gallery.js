var imageIndex = 1;
showImages(imageIndex);

// Next/previous controls
function nextImage(n) {
	showImages(imageIndex += n);
}

// Thumbnail image controls
function currentImage(n) {
	showImages(imageIndex = n);
}

function showImages(n) {
	var i;
	var imgs = document.getElementsByClassName("myImages");
	var thumbs = document.getElementsByClassName("demo-thumb");
	var captionText = document.getElementById("caption");

	if (n > imgs.length) {imageIndex = 1}
	if (n < 1) {imageIndex = imgs.length}
	for (i = 0; i < imgs.length; i++) {
		imgs[i].style.display = "none";
	}
	for (i = 0; i < thumbs.length; i++) {
		thumbs[i].className = thumbs[i].className.replace(" active", "");
	}
	imgs[imageIndex-1].style.display = "block";
	thumbs[imageIndex-1].className += " active";
	captionText.innerHTML = thumbs[imageIndex-1].alt;
}

// Open the Modal
function openModal() {
	document.getElementById('myModal').style.display = "block";
}

// Close the Modal
function closeModal() {
	document.getElementById('myModal').style.display = "none";
}
