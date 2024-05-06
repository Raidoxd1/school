import socket
import argparse

def scan_port(host, port, udp=False):
    try:
        if udp:
            sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        else:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((host, port))
        if result == 0:
            print(f"Port {port} is open")

        else:
            print(f"Port {port} is closed")
        sock.close()
    except socket.error:
        print("Could not connect to the host")

def main():
    parser = argparse.ArgumentParser(description="Simple port scanner")
    parser.add_argument("host", help="The target host to scan")
    parser.add_argument("-p", help="Range of ports to scan")
    parser.add_argument("-u", "--udp", action="store_true", help="Perform UDP scan")
    parser.add_argument("-t", "--tcp", action="store_true", help="Perform TCP scan")
    args = parser.parse_args()

    if args.tcp or not args.udp:
        if args.p:
            if '-' in args.p:
                start_port, end_port = args.p.split('-')
                for port in range(int(start_port), int(end_port) + 1):
                    scan_port(args.host, port)
            else:
                port = int(args.p)
                scan_port(args.host, port)
        else:
            print("Please provide the range of ports to scan using the -p option")

    if args.udp:
        if args.p:
            if '-' in args.p:
                start_port, end_port = args.p.split('-')
                for port in range(int(start_port), int(end_port) + 1):
                    scan_port(args.host, port, udp=True)
            else:
                port = int(args.p)
                scan_port(args.host, port, udp=True)
        else:
            print("Please provide the range of ports to scan using the -p option")

if __name__ == "__main__":
    main()
