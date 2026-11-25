export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { registerDnsFix } = await import("./instrumentation-node");
    await registerDnsFix();
  }
}
