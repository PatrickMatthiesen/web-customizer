import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
    matches: ["https://*/*"],
    run_at: "document_start"
}

console.log("The extension is going strong");

