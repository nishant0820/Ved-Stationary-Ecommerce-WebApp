import jimp from 'jimp';

async function removeBackground(inputPath, outputPath) {
  try {
    const image = await jimp.read(inputPath);
    const targetColor = { r: 255, g: 255, b: 255, a: 255 }; // white
    const tolerance = 40; // Allow 40/255 distance for off-white compression artifacts

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      const isWhite = Math.abs(red - targetColor.r) <= tolerance &&
                      Math.abs(green - targetColor.g) <= tolerance &&
                      Math.abs(blue - targetColor.b) <= tolerance;

      if (isWhite) {
        this.bitmap.data[idx + 3] = 0; // Alpha
      }
    });

    image.autocrop(); // Automatically crop any transparent border

    await image.writeAsync(outputPath);
    console.log("Image successfully background-removed and cropped!", outputPath);
  } catch (err) {
    console.error("Jimp script error processing image:", err);
  }
}

removeBackground('public/logo.jpeg', 'public/logo.png');
