function FindProxyForURL(url, host) {
    // Define proxy servers with placeholder IPs and ports (replace with real ones)
    var proxies = [
        "SOCKS5 203.0.113.1:1080",  // IPRoyal Proxy (sample IP)
        "SOCKS5 203.0.113.2:1080",  // Rayobyte Proxy (sample IP)
        "SOCKS5 203.0.113.3:1080",  // IPNux Proxy (sample IP)
        "SOCKS5 203.0.113.4:1080",  // MarsProxies Proxy (sample IP)
        "SOCKS5 203.0.113.5:1080"   // Aproxy Proxy (sample IP)
    ];

    // Test for local or intranet traffic
    if (isPlainHostName(host) ||
        shExpMatch(host, "*.local") ||
        isInNet(host, "10.0.0.0", "255.0.0.0") ||
        isInNet(host, "172.16.0.0", "255.240.0.0") ||
        isInNet(host, "192.168.0.0", "255.255.0.0")) {
        return "DIRECT";
    }

    // Loop through proxy list with fallback
    for (var i = 0; i < proxies.length; i++) {
        if (isResolvable(host)) {
            return proxies[i];
        }
    }

    // Default to direct connection if all proxies fail
    return "DIRECT";
}
