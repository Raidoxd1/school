
import subprocess
import os
import winreg
import re


def find_and_terminate_process(file_name):
    cmd = "tasklist /FO CSV"
    output = subprocess.check_output(cmd).decode().split("\n")
    
    for line in output[1:]:
        if line.strip():
            process_info = line.split('","')
            process_name = process_info[0].strip('"')
            process_pid = process_info[1].strip('"')

            if file_name in process_name:
                process_path = find_process_path(process_pid)
                ip_addresses = find_ip_addresses_in_file(process_path)
                
                print(f"Found process: {process_name} (PID: {process_pid})")
                print("IP Addresses found in the file:", ip_addresses)
                
                os.system(f"taskkill /F /PID {process_pid}")
                print("Process terminated successfully.")

def find_process_path(process_pid):
    cmd = f"wmic process where ProcessId={process_pid} get ExecutablePath"
    output = subprocess.check_output(cmd).decode().split("\n")
    
    for line in output[1:]:
        if line.strip():
            return line.strip()

    return None

def find_ip_addresses_in_file(file_path):
    with open(file_path, "r", encoding='utf-8', errors='ignore') as file:
        file_content = file.read()

    ip_pattern = r"\b(?:\d{1,3}\.){3}\d{1,3}\b"
    ip_addresses = re.findall(ip_pattern, file_content)

    return ip_addresses

# Enter the file name you want to search for

def remove_from_startup(program_name):
    registry_locations = [
        (winreg.HKEY_CURRENT_USER, r"Software\Microsoft\Windows\CurrentVersion\Run"),
        (winreg.HKEY_CURRENT_USER, r"Software\Microsoft\Windows\CurrentVersion\RunOnce"),
        (winreg.HKEY_LOCAL_MACHINE, r"Software\Microsoft\Windows\CurrentVersion\Run"),
        (winreg.HKEY_LOCAL_MACHINE, r"Software\Microsoft\Windows\CurrentVersion\RunOnce")
    ]

    for key, startup_path in registry_locations:
            registry_key = winreg.OpenKey(key, startup_path, 0, winreg.KEY_ALL_ACCESS)
            value_name = None

            for i in range(winreg.QueryInfoKey(registry_key)[1]):
                value_name = winreg.EnumValue(registry_key, i)[0]
                if value_name.lower() == program_name.lower():
                    break

            if value_name is not None:
                winreg.DeleteValue(registry_key, value_name)
                print(f"Program '{program_name}' removed from startup in location: {startup_path}")
            else:
                print(f"Program '{program_name}' is not found in startup at location: {startup_path}")

            winreg.CloseKey(registry_key)

        


file_to_find = "mal-track.exe"

find_and_terminate_process(file_to_find)
remove_from_startup(file_to_find)