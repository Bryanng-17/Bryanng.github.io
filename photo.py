from PIL import Image, ImageDraw, ImageFont

# Settings
text = "Bryan"
font_path = "COOPBL.TTF"  # Change to your logo's font if you have it
font_size = 120          # Adjust as needed
text_color = (80, 80, 80, 255)  # Dark gray, fully opaque

# Create a transparent image
img_width, img_height = 400, 150  # Adjust as needed
image = Image.new("RGBA", (img_width, img_height), (255, 255, 255, 0))

# Load font
font = ImageFont.truetype(font_path, font_size)

# Get text size and position
draw = ImageDraw.Draw(image)
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
x = (img_width - text_width) // 2
y = (img_height - text_height) // 2

# Draw text
draw.text((x, y), text, font=font, fill=text_color)

# Save as PNG with transparency
image.save("bryan-logo.png")
print("Logo saved as bryan-logo.png")