function FindProxyForURL(url, host) {
    // Define the proxy servers with their latency (in milliseconds)
    var proxies = {
        "bright_data": "PROXY 12.34.56.78:8080", // Bright Data (Luminati) - 50 ms
        "oxylabs": "PROXY 23.45.67.89:8080",    // Oxylabs - 50 ms
        "smartproxy": "PROXY 34.56.78.90:8080",  // SmartProxy - 40 ms
        "highproxies": "PROXY 45.67.89.01:8080", // HighProxies - 70 ms
        "stormproxies": "PROXY 56.78.90.12:8080" // StormProxies - 60 ms
    };

    // Predefined latency (response time in ms) for each proxy
    var proxyPerformance = {
        "bright_data": 50,  // Bright Data - 50 ms
        "oxylabs": 50,      // Oxylabs - 50 ms
        "smartproxy": 40,   // SmartProxy - 40 ms (fastest)
        "highproxies": 70,  // HighProxies - 70 ms
        "stormproxies": 60  // StormProxies - 60 ms
    };

    // Sort proxies by latency in ascending order (fastest first)
    var sortedProxies = Object.keys(proxyPerformance).sort(function(a, b) {
        return proxyPerformance[a] - proxyPerformance[b];
    });

    // Select the fastest proxy (lowest latency)
    var fastestProxy = proxies[sortedProxies[0]]; // Fastest proxy with the lowest latency

    // Gaming-related domains (examples: Steam, Epic Games, Xbox Live)
    if (shExpMatch(host, "*.steam.com") || shExpMatch(host, "*.epicgames.com") || shExpMatch(host, "*.xbox.com")) {
        // Gaming traffic should use the fastest proxy for minimal latency
        return fastestProxy;
    }

    // App-related domains (examples: Google Play, Netflix, Spotify)
    if (shExpMatch(host, "*.google.com") || shExpMatch(host, "*.netflix.com") || shExpMatch(host, "*.spotify.com")) {
        // App traffic should route through the fastest proxy to avoid any buffering or lag
        return fastestProxy;
    }

    // Social Media and Entertainment traffic (e.g., YouTube, Facebook, Instagram)
    if (shExpMatch(host, "*.youtube.com") || shExpMatch(host, "*.facebook.com") || shExpMatch(host, "*.instagram.com")) {
        // Entertainment traffic routing through the fastest proxy to ensure a smooth experience
        return fastestProxy;
    }

    // Additional app-specific traffic (e.g., Discord, Telegram, WhatsApp)
    if (shExpMatch(host, "*.discord.com") || shExpMatch(host, "*.telegram.org") || shExpMatch(host, "*.whatsapp.com")) {
        // Route messaging app traffic through the fastest proxy
        return fastestProxy;
    }

    // Specific website routing (e.g., banking, security-related websites)
    if (shExpMatch(host, "*.bank.com") || shExpMatch(host, "*.securepay.com")) {
        // Security-sensitive traffic should go through the fastest proxy
        return fastestProxy;
    }

    // Default behavior: Use the fastest proxy for all other URLs
    return fastestProxy;
}

