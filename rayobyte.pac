function FindProxyForURL(url, host) {
    // Define Rayobyte proxies
    var primaryProxy = "PROXY yourusername:yourpassword@proxy.rayobyte.com:8080";  // Primary proxy
    var backupProxy = "PROXY yourusername:yourpassword@backup.proxy.rayobyte.com:8080";  // Backup proxy

    // Function to determine if a proxy should be used based on host
    function shouldUseProxy(host) {
        // Define the domains that should use the proxy
        var proxyDomains = [
            "*.example.com",
            "*.anotherexample.com"
        ];

        // Check if the host matches any of the proxy domains
        for (var i = 0; i < proxyDomains.length; i++) {
            if (shExpMatch(host, proxyDomains[i])) {
                return true;
            }
        }
        return false;
    }

    // Check if the host should use a proxy
    if (shouldUseProxy(host)) {
        // Example: Prioritize primary proxy but fallback to backup if needed
        if (shExpMatch(host, "*.example.com")) {
            return primaryProxy;  // Use primary proxy for example.com
        } else if (shExpMatch(host, "*.anotherexample.com")) {
            return backupProxy;  // Use backup proxy for anotherexample.com
        }
    }

    // Default: Direct connection for all other traffic
    return "DIRECT";
}
