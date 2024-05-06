import argparse
import geocoder
import ipinfo
import requests
import re






def search_full_name(full_name):
    overall_result = {
        'first_name': full_name.split(' ')[0],
        'last_name': full_name.split(' ')[1],
        'address': None,
        'phone_number': None
        # Add more attributes as needed
    }

    # Search on whitepages.be
    search_url = f'https://www.whitepages.be/Search/Person/?what='+full_name.split(' ')[0]+'+'+full_name.split(' ')[1] +'&where='
    response = requests.get(search_url)
    pattern = r'"phone":"(\+\d+)"'
    pattern1 = r'class="wg-address">\s+([^<\r\n]+)'
    match = re.search(pattern, response.text)
    match1 = re.search(pattern1, response.text)
    if match:
        overall_result['phone_number'] = match.group(1)
    if match1:
        overall_result['address'] = match1.group(1)
    return overall_result





def search_ip_address(ip_address):
    g = geocoder.ip(ip_address)
    aadress = g.latlng
    access_token = '36a3d0ea76fa20'
    handler = ipinfo.getHandler(access_token)
    details = handler.getDetails(ip_address)
    city = details.city if hasattr(details, 'city') else 'cannot find'
    isp = details.org if hasattr(details, 'org') else 'cannot find'
    
    return {
        "IP Address": ip_address,
        "Lat/Lon": aadress,
        "City": city,
        "ISP": isp
    }

def search_username(username):
    user = username.split('@')[1]
    return {
        "Username": user,
       "Twitch": util('https://www.twitch.tv/' + user, re.compile("channel=.*"), 10),
        "Reddit": util('https://www.reddit.com/user/' + user, re.compile("profileId"), 10),
        "Snapchat": util('https://www.snapchat.com/add/' + user,re.compile("snapchat.com/add") , 5),
        "Facebook": util('https://www.facebook.com/' + user,re.compile("country_name") , 5),
        "Instagram": util('https://www.instagram.com/' + user,re.compile("profilePage_") , 5)
    }

def util(url, pattern, num_attempts):
    for _ in range(num_attempts):
        r = requests.get(url)
        if re.search(pattern, r.text) is not None:
            return "Yes"
    return "No"

    

def save_result(result, file_name):
    with open(file_name, 'a') as file:
        for key, value in result.items():
            file.write(f"{key}: {value}\n")
        file.write("\n")

def main():
    parser = argparse.ArgumentParser(prog='passive', description='Passive Recognition Tool')
    parser.add_argument('-fn', metavar='full_name', help='Search with full name')
    parser.add_argument('-ip', metavar='ip_address', help='Search with IP address')
    parser.add_argument('-u', metavar='username', help='Search with username')

    args = parser.parse_args()

    if args.fn:
        full_name_result = search_full_name(args.fn)
        print(full_name_result)
        save_result(full_name_result, 'result.txt')

    if args.ip:
        ip_result = search_ip_address(args.ip)
        print(ip_result)
        save_result(ip_result, 'result2.txt')

    if args.u:
        username_result = search_username(args.u)
        print(username_result)
        save_result(username_result, 'result3.txt')

if __name__ == '__main__':
    main()