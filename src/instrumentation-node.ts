const BROKEN = new Set(["127.0.0.1", "::1", "localhost"]);

type DnsModule = typeof import("dns");

function looksLocalhostOnly(dns: DnsModule) {
  const servers = dns.getServers();
  return (
    servers.length === 0 ||
    servers.every((s) => BROKEN.has(s.toLowerCase()))
  );
}

async function dnsActuallyWorks(dns: DnsModule): Promise<boolean> {
  try {
    await Promise.race([
      dns.promises.resolve("example.com", "A"),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("probe-timeout")), 2500),
      ),
    ]);
    return true;
  } catch {
    // Timeout, ENOTFOUND, ESERVFAIL, refused — any failure means the
    // local resolver is unusable (the mongodb+srv failure mode).
    return false;
  }
}

async function workingServers(): Promise<string[]> {
  const candidates: string[] = [];

  if (process.platform === "win32") {
    try {
      const { execSync } = await import("child_process");
      const out = execSync("netsh interface ipv4 show dnsservers", {
        encoding: "utf8",
        timeout: 3000,
        windowsHide: true,
      });
      for (const ip of out.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) ?? []) {
        if (!BROKEN.has(ip)) candidates.push(ip);
      }
    } catch {
      // fall through to public resolvers
    }
  }

  candidates.push("1.1.1.1", "8.8.8.8", "9.9.9.9");
  return [...new Set(candidates)];
}

export async function registerDnsFix() {
  if (process.env.DNS_FIX === "0") return;

  const { default: dns } = await import("dns");

  // Healthy platforms (Vercel, Linux with systemd-resolved, Docker
  // 127.0.0.11, etc.) never enter this path.
  if (!looksLocalhostOnly(dns)) return;
  if (await dnsActuallyWorks(dns)) return;

  dns.setServers(await workingServers());
}
