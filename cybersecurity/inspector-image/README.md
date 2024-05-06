# inspector-image

## Description


Your program should show the pgp key which is hidden in the image<br>

The location where this photo was taken<br>

The project has to be written in an interpreted language .<br>

<br>

1. Steganography is the practice of concealing information within other non-secret data in order to hide its existence. <br>
It involves embedding secret data, such as text, images, or files, into carrier files, such as images, audio files, or videos, without arousing suspicion. <br>
The goal is to make the hidden data blend seamlessly with the carrier file, making it difficult for anyone to detect or recognize the presence of the hidden information.<br>
<br>
2. Information can be hidden in normal files using various techniques, collectively known as steganography. Steganography is the practice of concealing data within other data to make it less conspicuous. Here's a clear <br>explanation of how information can be hidden in normal files:<br>
<br>
File Formats: Steganography can be employed in various file formats, including images (such as JPEG, PNG, or BMP), audio files (such as MP3 or WAV), video files (such as MP4 or AVI), and even text files (such as PDF or <br>DOCX).<br><br>
3. This program extracts metadata from an image file using PIL and displays location information if available. <br>
It also supports checking for hidden data using steganography by reading a jpeg key file and printing the encoded key if found.




## Usage

$> pip install pillow<br><br>

$>  python3 inspector-image.py -map image.jpeg<br>
Lat/Lon: (E 32.0866) / ( 34.8851)<br>

$> python3 inspector-image.py -steg image.jpeg<br>
-----BEGIN PGP PUBLIC KEY BLOCK-----<br>
Version: 01<br>
[pgp key here]<br>
-----END PGP PUBLIC KEY BLOCK-----<br>


## Audit

- [Audit file](https://github.com/01-edu/public/tree/master/subjects/cybersecurity/inspector-image/audit)

## Author

**Raido Lump**
- [Git profile](https://01.kood.tech/git/raidoxd "raidoxd")
- Discord - Friendly#4382