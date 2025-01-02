export function getSubdomain(reqHost) {
    const host = reqHost || window.location.hostname;
    const subdomain = host.split(".")[0];
    return subdomain;
  }
  