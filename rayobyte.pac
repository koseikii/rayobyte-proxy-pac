function FindProxyForURL(url, host) {
    // Define Rayobyte proxy
    var proxy = "PROXY proxy.rayobyte.com:8080";  // Replace with Rayobyte proxy and port

    // Optional: Authentication if required (username:password)
    var authProxy = "PROXY yourusername:yourpassword@proxy.rayobyte.com:8080";  // Replace with your credentials

    // Example: Route traffic for '*.example.com' through Rayobyte proxy
    if (shExpMatch(host, "*.example.com")) {
        return proxy;
    }

    // Example: Route traffic for '*.otherdomain.com' through Rayobyte proxy
    if (shExpMatch(host, "*.otherdomain.com")) {
        return proxy;
    }

    // Example: Route traffic for '*.anotherdomain.com' through Rayobyte proxy
    if (shExpMatch(host, "*.anotherdomain.com")) {
        return proxy;
    }

    // If the URL is from an internal network (local or private IP range), connect directly (no proxy)
    if (isInNet(host, "192.168.0.0", "255.255.255.0")) {
        return "DIRECT";
    }

    // Example: Use the proxy for any domain that matches a specific pattern (e.g., *.api.com)
    if (shExpMatch(host, "*.api.com")) {
        return proxy;
    }

    // Default: Direct connection for all other traffic
    return "DIRECT";
}
