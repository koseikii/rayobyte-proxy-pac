function FindProxyForURL(url, host) {
    // Define the Rayobyte proxy (replace with your details)
    var rayobyteProxy = "PROXY proxy.rayobyte.com:8080";  // Replace with Rayobyte proxy and port
    var rayobyteAuthProxy = "PROXY yourusername:yourpassword@proxy.rayobyte.com:8080";  // Replace with your credentials

    // Instagram domains
    var instagramDomains = [
        "instagram.com",
        "www.instagram.com",
        "api.instagram.com",
        "graph.instagram.com",
        "m.instagram.com",
        "scontent-xx.xx.fbcdn.net"
    ];

    // If the host matches Instagram, use the proxy (Rayobyte in this case)
    for (var i = 0; i < instagramDomains.length; i++) {
        if (shExpMatch(host, instagramDomains[i])) {
            // You can choose either the authenticated proxy or the simple proxy here
            return rayobyteAuthProxy;  // Use authenticated proxy
            // return rayobyteProxy;  // Use non-authenticated proxy
        }
    }

    // Example: Route traffic for '*.example.com' through Rayobyte proxy
    if (shExpMatch(host, "*.example.com")) {
        return rayobyteProxy;
    }

    // Default case: Direct connection for all other traffic
    return "DIRECT";
}
