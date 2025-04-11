// List of proxies with predefined speed (ms) — lower ms indicates faster proxy
var proxyList = [
    "proxy1.oxylabs.io:8080",   // Oxylabs Proxy 1 (assumed fast)
    "proxy2.oxylabs.io:8080",   // Oxylabs Proxy 2 (assumed fast)
    "proxy1.rayobyte.com:8080", // Rayobyte Proxy 1 (fast)
    "proxy2.rayobyte.com:8080", // Rayobyte Proxy 2 (fast)
    "proxy.philippines1.com:8080", // Philippines Proxy 1 (local fast)
    "proxy.philippines2.com:8080"  // Philippines Proxy 2 (local fast)
];

// Initialize a counter for rotating proxies
var proxyIndex = 0;

// Function to simulate response time of proxies
function simulateResponseTimes() {
    // Response times for each proxy (lower ms means faster)
    var responseTimes = {
        "proxy1.oxylabs.io": 20,  // ms (fastest)
        "proxy2.oxylabs.io": 25,  // ms
        "proxy1.rayobyte.com": 30, // ms
        "proxy2.rayobyte.com": 35, // ms
        "proxy.philippines1.com": 15, // ms (local fast)
        "proxy.philippines2.com": 18  // ms (local fast)
    };

    // Sort proxies by response time (ascending order)
    var sortedProxies = Object.keys(responseTimes).sort((a, b) => responseTimes[a] - responseTimes[b]);

    // Return the fastest proxy (first in the sorted list)
    return sortedProxies[0];
}

// Function to handle local and global proxy selection
function FindProxyForURL(url, host) {
    // Direct connection for local addresses (no proxy)
    if (shExpMatch(host, "*.local") || shExpMatch(host, "localhost")) {
        return "DIRECT";
    }

    // Custom rules for specific domains (you can add more specific domains)
    if (shExpMatch(host, "*example1.com*")) {
        return "PROXY proxy1.oxylabs.io:8080; DIRECT"; // Priority to Oxylabs Proxy 1
    }
    
    if (shExpMatch(host, "*example2.com*")) {
        return "PROXY proxy1.rayobyte.com:8080; DIRECT"; // Priority to Rayobyte Proxy 1
    }

    // Dynamic proxy selection for general cases (rotate proxies or select fastest)
    var bestProxy = simulateResponseTimes();

    // Proxy rotation logic to prevent overloading one proxy (round-robin)
    proxyIndex = (proxyIndex + 1) % proxyList.length;

    // Return the selected best proxy or rotate through proxy list
    return "PROXY " + bestProxy + "; DIRECT";
}

// Additional improvements:

// Geo-Targeting: If you can implement or use a geo-IP API, you could integrate logic like:
function selectProxyBasedOnLocation() {
    // Example: Determine the fastest proxy based on user's geographical location.
    // This could be implemented with a real geo-IP service if integrated.

    var userCountry = getUserLocation(); // Function to get user's location (not implemented)
    
    // Logic to prioritize local proxy based on country
    if (userCountry === "PH") {
        return "PROXY proxy.philippines1.com:8080; DIRECT";
    }
    
    // Default case to use the fastest proxy
    return simulateResponseTimes();
}

// Function to simulate retrieving user's location (can be replaced with real geo-IP service)
function getUserLocation() {
    // Dummy function: Replace with a real geolocation detection API if needed
    return "PH"; // Example: assuming the user is in the Philippines
}

// Final proxy selection logic
function FindProxyForURL(url, host) {
    var bestProxy = selectProxyBasedOnLocation();

    // Return the selected best proxy
    return bestProxy;
}
