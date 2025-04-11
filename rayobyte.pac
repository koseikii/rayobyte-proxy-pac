function FindProxyForURL(url, host) {
    // Domains to bypass proxy (local, LAN, etc.)
    if (isPlainHostName(host) || dnsDomainIs(host, ".local") || 
        shExpMatch(host, "127.*") || shExpMatch(host, "10.*") || 
        shExpMatch(host, "192.168.*")) {
        return "DIRECT";
    }

    // Proxy list: replace with your actual proxy credentials and IPs
    var brightData = "PROXY 123.45.67.89:2222";  // Bright Data IP:Port
    var oxylabs = "PROXY 98.76.54.32:60000";     // Oxylabs IP:Port
    var expressVPN = "PROXY 111.22.33.44:1080";  // Hypothetical ExpressVPN SOCKS5
    var cloudflare = "PROXY 104.21.92.125:8080"; // Custom reverse proxy through Cloudflare (if set up)

    // Try in order of speed preference
    return brightData + "; " + oxylabs + "; " + expressVPN + "; " + cloudflare + "; DIRECT";
}
