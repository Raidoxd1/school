import time
import os
import argparse
import subprocess

# Encryption function
def encrypt_file(file_path, key):
    with open(file_path, 'rb') as file:
        file_contents = file.read()

    # XOR each byte of the file with a key
    encrypted_contents = bytes(byte ^ key[i % len(key)] for i, byte in enumerate(file_contents))

    with open(file_path, 'wb') as encrypted_file:
        encrypted_file.write(encrypted_contents)

    print('File encrypted successfully.')


# Decryption function
def decrypt_file(file_path, key):
    with open(file_path, 'rb') as encrypted_file:
        encrypted_contents = encrypted_file.read()

    # XOR each byte of the encrypted file with the same key
    decrypted_contents = bytes(byte ^ key[i % len(key)] for i, byte in enumerate(encrypted_contents))

    with open(file_path, 'wb') as decrypted_file:
        decrypted_file.write(decrypted_contents)

    print('File decrypted successfully.')


def increase_size(file_path):
    size_increment = 101 * 1024 * 1024  # 101 MB in bytes

    # Incremental integer value
    increment = 100001

    # Read the contents of the file
    with open(file_path, 'rb') as file:
        file_contents = file.read()

    # Create additional data based on the desired size increment
    additional_data = b'\x00' * size_increment

    # Increment the integer value and convert it to bytes
    increment_bytes = str(increment).encode()

    # Append the additional data and increment bytes to the file contents
    updated_file_contents = file_contents + additional_data + increment_bytes

    # Write the updated contents back to the file, overwriting its previous contents
    with open(file_path, 'wb') as file:
        file.write(updated_file_contents)


# File path
parser = argparse.ArgumentParser()
parser.add_argument('arg1', help='File path')
args = parser.parse_args()

file_path = args.arg1
key = b'assa'

# Check if the file path contains "calc.exe"
process_name = 'calc.exe'
process_cmd = f'taskkill /IM {process_name} /F /T'
process = subprocess.run(process_cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
if process.returncode == 0:
    print(f"{process_name} process terminated successfully.")


# Encrypt the file
encrypt_file(file_path, key)
increase_size(file_path)

print('File encrypted. It will remain inaccessible for 101 seconds.')

# Wait for 15 seconds
time.sleep(101)

# Decrypt the file
decrypt_file(file_path, key)
