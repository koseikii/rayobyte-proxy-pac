function FindProxyForURL(url, host) {
    // Rayobyte Proxy Server Configuration
    var proxy = "PROXY proxy.rayobyte.com:8080";  // Replace with Rayobyte's proxy IP/hostname and port
    var authProxy = "PROXY username:password@proxy.rayobyte.com:8080";  // If authentication is required

    // Use proxy for all URLs (You can customize this if you only want certain domains to use the proxy)
    if (shExpMatch(host, "*")) {
        return proxy;  // Route all traffic through the proxy
    }

    // Alternative: Use proxy only for specific domains
    // if (shExpMatch(host, "*.example.com")) {
    //     return proxy;
    // }

    // For other cases, use a direct connection
    return "DIRECT";
}

// Customizing for different types of traffic
function FindProxyForURL(url, host) {
    // List of proxy rules for specific hosts (feel free to add more)
    var proxy = "PROXY proxy.rayobyte.com:8080";  // Change with your actual proxy server
    var authProxy = "PROXY username:password@proxy.rayobyte.com:8080"; // Include if authentication is needed

    // Route traffic through the proxy for common traffic types
    if (shExpMatch(host, "*.example.com")) {
        return proxy;
    }

    // Proxy route for domains ending with '.edu' or '.gov'
    if (shExpMatch(host, "*.edu") || shExpMatch(host, "*.gov")) {
        return proxy;
    }

    // Fallback: Direct connection for all other cases
    return "DIRECT";
}
