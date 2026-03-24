const Jimp = require('jimp');

async function processLogo() {
  try {
    const image = await Jimp.read('public/logo.jpeg');
    const tolerance = 40; 
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      if (Math.abs(red - 255) <= tolerance && 
          Math.abs(green - 255) <= tolerance && 
          Math.abs(blue - 255) <= tolerance) {
        this.bitmap.data[idx + 3] = 0; // Transparent
      }
    });

    image.autocrop();
    await image.writeAsync('public/logo.png');
    console.log('Saved public/logo.png successfully!');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processLogo();
