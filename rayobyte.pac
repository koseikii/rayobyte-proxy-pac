function FindProxyForURL(url, host) {
    // Define the IPRoyal HTTP proxy server address (use the correct IP and port from IPRoyal)
    var proxyAddress = "proxy.iproyal.com:80"; // Example HTTP proxy, replace with the actual proxy and port

    // List of domains or servers for which we want to avoid proxy usage (fast servers like gaming servers)
    var fastServers = [
        "game-server1.example.com",  // Replace with actual gaming servers for low-latency connection
        "game-server2.example.com",
        "streaming-service.com",     // For streaming, bypass the proxy for better speed
        "fast-webserver.com"
    ];

    // Direct traffic to proxy if the host matches one of the fast servers (skip proxy for these)
    for (var i = 0; i < fastServers.length; i++) {
        if (dnsDomainIs(host, fastServers[i])) {
            return "DIRECT"; // No proxy for these fast servers
        }
    }

    // Default action: route all traffic through IPRoyal's HTTP proxy
    return "HTTP " + proxyAddress; // Use HTTP proxy for everything else
}
