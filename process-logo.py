from PIL import Image
import os

def remove_bg(input_path, output_path):
    print(f"Opening {input_path}")
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    # Replace white pixels with transparent
    for item in datas:
        # Check if the pixel is near-white
        if item[0] > 235 and item[1] > 235 and item[2] > 235:
            new_data.append((255, 255, 255, 0)) # transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # Auto-crop bounding box to make it tightly fit
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

remove_bg("public/logo.jpeg", "public/logo.png")
