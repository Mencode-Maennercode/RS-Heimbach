// Erneuert den Instagram Access Token (60 Tage gueltig) und schreibt den neuen
// Wert automatisch per GitHub-API zurueck ins Repository-Secret
// INSTAGRAM_ACCESS_TOKEN - keine manuelle Aktion noetig. Braucht dafuer ein
// GH_PAT mit "repo"-Scope (siehe .github/workflows/instagram-token-refresh.yml).
import sodium from "libsodium-wrappers";

const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const githubToken = process.env.GH_PAT;
const repo = process.env.GITHUB_REPOSITORY;

if (!accessToken || !githubToken || !repo) {
  console.error("Fehlende Umgebungsvariablen (INSTAGRAM_ACCESS_TOKEN, GH_PAT, GITHUB_REPOSITORY).");
  process.exit(1);
}

async function refreshInstagramToken() {
  const url = new URL("https://graph.instagram.com/refresh_access_token");
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", accessToken);

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok || !data.access_token) {
    throw new Error(data.error?.message || `Instagram Refresh fehlgeschlagen (${res.status})`);
  }

  console.log("Neuer Instagram-Token erhalten, gueltig fuer", data.expires_in, "Sekunden.");
  return data.access_token;
}

async function updateGithubSecret(secretValue) {
  const ghHeaders = {
    Authorization: `Bearer ${githubToken}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const keyRes = await fetch(`https://api.github.com/repos/${repo}/actions/secrets/public-key`, {
    headers: ghHeaders,
  });
  if (!keyRes.ok) {
    throw new Error(`Public Key konnte nicht geladen werden (${keyRes.status})`);
  }
  const { key, key_id } = await keyRes.json();

  await sodium.ready;
  const binKey = sodium.from_base64(key, sodium.base64_variants.ORIGINAL);
  const binSecret = sodium.from_string(secretValue);
  const encryptedBytes = sodium.crypto_box_seal(binSecret, binKey);
  const encryptedValue = sodium.to_base64(encryptedBytes, sodium.base64_variants.ORIGINAL);

  const putRes = await fetch(`https://api.github.com/repos/${repo}/actions/secrets/INSTAGRAM_ACCESS_TOKEN`, {
    method: "PUT",
    headers: { ...ghHeaders, "Content-Type": "application/json" },
    body: JSON.stringify({ encrypted_value: encryptedValue, key_id }),
  });

  if (!putRes.ok) {
    throw new Error(`Secret-Update fehlgeschlagen (${putRes.status}): ${await putRes.text()}`);
  }
}

async function main() {
  const newToken = await refreshInstagramToken();
  await updateGithubSecret(newToken);
  console.log("GitHub Secret INSTAGRAM_ACCESS_TOKEN automatisch aktualisiert.");
}

main().catch((err) => {
  console.error("Automatische Token-Erneuerung fehlgeschlagen:", err.message);
  process.exit(1);
});
