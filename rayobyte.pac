function FindProxyForURL(url, host) {
    // Define Rayobyte proxy
    var proxy = "PROXY proxy.rayobyte.com:8080";  // Replace with Rayobyte proxy and port

    // Optional: Authentication if required (username:password)
    var authProxy = "PROXY yourusername:yourpassword@proxy.rayobyte.com:8080";  // Replace with your credentials

    // Route traffic for Instagram and related domains through Rayobyte proxy
    if (shExpMatch(host, "*.instagram.com") || 
        shExpMatch(host, "*.fbcdn.net") || 
        shExpMatch(host, "*.akamaihd.net") || 
        shExpMatch(host, "*.instagram.net") || 
        shExpMatch(host, "*.facebook.com") || 
        shExpMatch(host, "*.fb.com")) {
        return proxy;
    }

    // Example: Route traffic for '*.example.com' through Rayobyte proxy (if needed)
    if (shExpMatch(host, "*.example.com")) {
        return proxy;
    }

    // If the URL is from an internal network (local or private IP range), connect directly (no proxy)
    if (isInNet(host, "192.168.0.0", "255.255.255.0")) {
        return "DIRECT";
    }

    // Default: Direct connection for all other traffic
    return "DIRECT";
}
