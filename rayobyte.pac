function FindProxyForURL(url, host) {
    // Define your proxy address from IPRoyal (replace with your actual proxy address)
    var proxyAddress = "proxy.iproyal.com:1080"; // Example for SOCKS5 proxy
    
    // List of known gaming servers or other fast routes if needed
    var fastHosts = [
        "game-server1.example.com", // Replace with actual fast server domains or IP ranges
        "game-server2.example.com",
        "game-server3.example.com"
    ];

    // Check if the host matches any of the known fast servers
    for (var i = 0; i < fastHosts.length; i++) {
        if (dnsDomainIs(host, fastHosts[i])) {
            return "SOCKS5 " + proxyAddress; // Use proxy for fast game servers
        }
    }

    // Default rule for general traffic – route through IPRoyal's proxy
    return "SOCKS5 " + proxyAddress; // All other traffic uses IPRoyal's proxy
}
