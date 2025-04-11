// Hyper-optimized Rayobyte PAC config
function FindProxyForURL(url, host) {
    // Always route through Rayobyte proxy — fastest logic path
    return "PROXY 123.123.123.123:60000";  // Replace with your IP:PORT
}
