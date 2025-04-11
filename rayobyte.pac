function FindProxyForURL(url, host) {
    // === Local and Bypass Domains ===
    if (
        isPlainHostName(host) ||
        dnsDomainIs(host, ".local") ||
        isInNet(host, "10.0.0.0", "255.0.0.0") ||
        isInNet(host, "172.16.0.0", "255.240.0.0") ||
        isInNet(host, "192.168.0.0", "255.255.0.0") ||
        isInNet(host, "127.0.0.1", "255.255.255.255")
    ) {
        return "DIRECT";
    }

    // === Fast Route Domains (Force Proxy) ===
    var proxyDomains = [
        ".netflix.com", ".hulu.com", ".disneyplus.com", ".tiktok.com",
        ".facebook.com", ".instagram.com", ".youtube.com", ".x.com",
        ".twitter.com", ".reddit.com", ".openai.com", ".github.com"
    ];

    for (var i = 0; i < proxyDomains.length; i++) {
        if (dnsDomainIs(host, proxyDomains[i])) {
            return fastestProxy();
        }
    }

    // === Default Route (Direct) ===
    return "DIRECT";
}

// === Fastest Proxy Selector Logic ===
function fastestProxy() {
    // Proxy priority (fastest first based on global performance)
    var rayobyte = "PROXY rayobyte-proxy.ph:8080";
    var nordvpn = "PROXY nordvpn-proxy.net:443";
    var smartproxy = "PROXY smartproxy.global:10000";
    var brightdata = "PROXY brtdata-res.proxy:22225";
    var oxylabs = "PROXY oxy.proxy.io:60000";

    // Psiphon is not a PAC-supported proxy, so excluded in logic
    // because it's a tunnel-based app not HTTP/SOCKS-based

    // Smart rotation logic — try in order
    return rayobyte + "; " + nordvpn + "; " + smartproxy + "; " + brightdata + "; " + oxylabs + "; DIRECT";
}
