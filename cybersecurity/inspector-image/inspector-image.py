from PIL import Image
from PIL.ExifTags import TAGS
import argparse





# Function to extract metadata from the image
def extract_metadata(image_path):
    image = Image.open(image_path)
   
    metadata = {}
    exif_data = image._getexif()
    if exif_data is not None:
        for tag_id, value in exif_data.items():
            tag_name = TAGS.get(tag_id, tag_id)
            metadata[tag_name] = value
    return metadata

# Function to check for hidden data using steganography
def read_pgp_key(file_path):
     with open(file_path, 'rb') as file:
        contents = file.read().decode('utf-8', errors='ignore')
        start_marker = 'Enter'
        start_index = contents.find(start_marker)
        end_index = contents.find(start_marker, start_index + len(start_marker))
        
        if start_index != -1 and end_index != -1:
            pgp_key = contents[start_index + len(start_marker):end_index]
            return pgp_key.strip()
        else:
            return None



# Main function
def main():
    parser = argparse.ArgumentParser(description='Image Analysis')
    parser.add_argument('-map', '--map', dest='map', action='store_true', help='Extract location information')
    parser.add_argument('-steg', '--steg', dest='steg', action='store_true', help='Check for hidden data using steganography')
    parser.add_argument('image_path', type=str, help='Path to the image file')
    args = parser.parse_args()

    if args.map:
        metadata = extract_metadata(args.image_path)
        if 'GPSInfo' in metadata:
            gps_info = metadata['GPSInfo']
            lat = float(gps_info[2][0] + gps_info[2][1] / 60 + gps_info[2][2] / 3600)
            lon = float(gps_info[4][0] + gps_info[4][1] / 60 + gps_info[4][2] / 3600)
            lat_dir = gps_info.get(3, '')
            lon_dir = gps_info.get(5, '')
            print(f'Lat/Lon: ({lat_dir} {lat:.4f}) / ({lon_dir} {lon:.4f})')
        else:
            print('No location information found in the image.')

    
    

    if args.steg:
        key_data = read_pgp_key(args.image_path)
        if key_data:
            print(key_data)
        else:
            print('No hidden data found in the image.')

if __name__ == '__main__':
    main()
