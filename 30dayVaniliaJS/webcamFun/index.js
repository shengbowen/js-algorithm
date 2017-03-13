const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
	navigator.mediaDevices.getUserMedia({video: true, audio:false})
		.then( localMedia => {
			video.src = window.URL.createObjectURL(localMedia);
			video.play();
		} )
		.catch(err => console.log('some error', err));
}

getVideo();

function painToCanvas() {
	const { videoWidth: width, videoHeight: height } = video;

	canvas.width = width;
	canvas.height = height;

	// setInterval(() => ctx.drawImage(video, 0, 0, width, height), 16);

	function animation() {
		ctx.drawImage(video, 0, 0, width, height);

		let pixels = ctx.getImageData(0, 0, width, height);

		// pixels = redEffect(pixels);
		// pixels = rgbSplit(pixels);
		pixels = greenScreen(pixels);


		ctx.putImageData(pixels, 0, 0);

		requestAnimationFrame(animation);
	}

	animation();

}

video.addEventListener('canplay', painToCanvas);

function takePhoto() {
	snap.currentTime = 0 ;
	snap.play();

	const data = canvas.toDataURL('image/jpg');
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'profile');

	link.innerHTML = `<img src="${data}" alt="screenshot" />`;

	strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function greenScreen(pixels) {
	const levels = {};
	document.querySelectorAll('.rgb input').forEach((input) => {
		levels[input.name] = input.value;
	});

	for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
      // debugger;
    }
  }

  return pixels;
}

// painToCanvas();