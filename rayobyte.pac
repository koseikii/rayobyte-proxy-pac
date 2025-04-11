function FindProxyForURL(url, host) {
    // Rayobyte Proxy (IP Whitelisted for max speed — no auth in PAC)
    var proxy = "PROXY proxy.rayobyte.com:8080";

    // Fastest routing logic — match only if needed, skip DIRECT fallback
    if (dnsDomainIs(host, ".example.com") || shExpMatch(host, "*.example.com")) {
        return proxy;
    }

    // For everything else — route through Rayobyte for max control
    return proxy;
}
