// Dev-Start mit Schutz gegen mehrfach laufende Server.
//
// Hintergrund: `next dev` weicht stillschweigend auf den naechsten freien Port
// aus (3000 -> 3001 -> 3002 ...), wenn der gewuenschte Port belegt ist. Wird der
// Befehl mehrfach gestartet (oder ein Terminal mit "X" geschlossen statt Ctrl+C),
// stapeln sich unsichtbar mehrere Dev-Server samt Worker-Pools auf und fressen RAM.
//
// Dieser Wrapper prueft den Port VORHER und bricht mit klarer Meldung ab, statt
// einen zweiten Server auf einem anderen Port hochzufahren.

import net from "node:net";
import { spawn } from "node:child_process";

const PORT = Number(process.env.PORT) || 3000;

function isPortInUse(port) {
  // Ohne Host-Angabe bindet Node auf "::" (IPv6-Dualstack) – exakt so wie
  // `next dev`. Nur so wird ein bereits laufender Server zuverlaessig erkannt;
  // ein Bind auf "127.0.0.1" wuerde unter Windows nicht mit "::" kollidieren.
  return new Promise((resolve) => {
    const tester = net
      .createServer()
      .once("error", (err) => resolve(err.code === "EADDRINUSE"))
      .once("listening", () => tester.close(() => resolve(false)))
      .listen(port);
  });
}

const inUse = await isPortInUse(PORT);

if (inUse) {
  console.error(
    `\n\x1b[31m✖ Port ${PORT} ist bereits belegt.\x1b[0m\n` +
      `  Es laeuft wahrscheinlich schon ein Dev-Server.\n\n` +
      `  -> Vorhandenen Server im richtigen Terminal mit \x1b[1mStrg+C\x1b[0m beenden,\n` +
      `     oder unter http://localhost:${PORT} oeffnen.\n\n` +
      `  Verirrte Node-Prozesse aufraeumen (PowerShell):\n` +
      `     \x1b[36mStop-Process -Name node -Force\x1b[0m\n`
  );
  process.exit(1);
}

// Port frei -> echten Dev-Server starten, alle weiteren Argumente durchreichen.
const args = ["dev", "-p", String(PORT), ...process.argv.slice(2)];
const child = spawn("next", args, { stdio: "inherit", shell: true });

child.on("exit", (code) => process.exit(code ?? 0));
