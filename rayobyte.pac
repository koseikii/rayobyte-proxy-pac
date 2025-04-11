function FindProxyForURL(url, host) {
    // Define Rayobyte proxy and optional authentication
    var proxy = "PROXY proxy.rayobyte.com:8080";  // Replace with Rayobyte proxy and port
    var authProxy = "PROXY yourusername:yourpassword@proxy.rayobyte.com:8080";  // Replace with your credentials

    // Check if the client is on Wi-Fi (in this case, using a static IP range for Wi-Fi as an example)
    var isWiFi = isInNet(myIpAddress(), "192.168.0.0", "255.255.255.0");  // Adjust this based on your local Wi-Fi network IP range

    // Route traffic for Instagram, Facebook, and related services through Rayobyte proxy if Wi-Fi
    if (isWiFi) {
        if (shExpMatch(host, "*.instagram.com") || 
            shExpMatch(host, "*.fbcdn.net") || 
            shExpMatch(host, "*.akamaihd.net") || 
            shExpMatch(host, "*.instagram.net") || 
            shExpMatch(host, "*.facebook.com") || 
            shExpMatch(host, "*.fb.com") || 
            shExpMatch(host, "*.whatsapp.net") || 
            shExpMatch(host, "*.messenger.com") || 
            shExpMatch(host, "*.cdninstagram.com") || 
            shExpMatch(host, "*.t.co") || 
            shExpMatch(host, "*.twitter.com")) {
            return proxy;
        }
    } else {
        // When not on Wi-Fi (mobile data or other), ensure less proxying for faster browsing
        if (shExpMatch(host, "*.example.com")) {
            return proxy;
        }
    }

    // Route traffic for video services like YouTube, Vimeo, or streaming services, if on Wi-Fi for better speed
    if (isWiFi && (shExpMatch(host, "*.youtube.com") || 
                   shExpMatch(host, "*.vimeo.com") || 
                   shExpMatch(host, "*.dailymotion.com"))) {
        return proxy;
    }

    // Ensure direct connection for general web browsing when not on Wi-Fi
    if (!isWiFi) {
        return "DIRECT";
    }

    // Ensure local traffic (private or internal IP ranges) does not go through the proxy
    if (isInNet(host, "192.168.0.0", "255.255.255.0") || 
        isInNet(host, "10.0.0.0", "255.0.0.0") || 
        isInNet(host, "172.16.0.0", "255.240.0.0")) {
        return "DIRECT";
    }

    // Default: Direct connection for all other traffic
    return "DIRECT";
}
