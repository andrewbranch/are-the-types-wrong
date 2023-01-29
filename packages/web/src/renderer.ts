import { type ResolutionKind, type ResolutionProblemKind } from "are-the-types-wrong-core";
import { allResolutionKinds } from "are-the-types-wrong-core/utils";
import { computed, state, subscribe } from "./state";

interface Events {
  onPackageNameInput: (value: string) => void;
  onCheck: () => void;
}

const problemKinds: Record<ResolutionProblemKind, string> = {
  NoResolution: "💀 Failed to resolve",
  UntypedResolution: "❌ No types",
  FalseCJS: "🎭 Masquerading as CJS",
  FalseESM: "👺 Masquerading as ESM",
  CJSResolvesToESM: "😵‍💫 ESM-only",
};

const resolutionKinds: Record<ResolutionKind, string> = {
  node10: "<code>node10</code>",
  "node16-cjs": "<code>node16</code> (from CJS)",
  "node16-esm": "<code>node16</code> (from ESM)",
  bundler: "<code>bundler</code>",
};

export function subscribeRenderer(events: Events) {
  document.addEventListener("DOMContentLoaded", () => {
    const packageNameInput = document.getElementById("package-name") as HTMLInputElement;
    const messageElement = document.getElementById("message") as HTMLDivElement;
    const checkButton = document.getElementById("check") as HTMLButtonElement;
    const form = document.getElementById("form") as HTMLFormElement;
    const problemsElement = document.getElementById("problems") as HTMLParagraphElement;
    const resolutionsElement = document.getElementById("resolutions") as HTMLTableElement;
    const detailsElement = document.getElementById("details") as HTMLDivElement;
    const detailsPreElement = detailsElement.querySelector("pre") as HTMLPreElement;

    packageNameInput.addEventListener("input", () => {
      events.onPackageNameInput(packageNameInput.value);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      events.onCheck();
    });

    computed(
      "packageInfo",
      ({ info, parsed }) => {
        if (parsed?.error) {
          return {
            className: "error",
            text: parsed.error,
          };
        }
        if (info?.error) {
          return {
            className: "error",
            text: info.error,
          };
        }
        if (info?.status === "success") {
          return {
            className: "",
            // Unfortunately, the registry entry only contains the unpacked size, and only
            // sometimes, and a HEAD request of the tarball doesn't send the length. Boo.
            text: info.data.size
              ? `Checking will stream whatever ${info.data.size} bytes gzipped is`
              : `Checking will stream the gzipped package`,
          };
        }
      },
      (message) => {
        messageElement.textContent = message?.text ?? null;
        messageElement.className = message?.className ?? "";
      }
    );

    subscribe("packageInfo.parsed", () => {
      if (state.packageInfo.parsed) {
        clearResult();
      }
    });

    subscribe("packageInfo.info.status", () => {
      if (state.packageInfo.info?.status === "success") {
        checkButton.disabled = false;
      } else {
        checkButton.disabled = true;
      }
    });

    subscribe("checks", () => {
      if (state.checks?.status === "success") {
        clearMessage();
        detailsElement.className = "";
        const { analysis, problemSummaries, resolutionProblems } = state.checks.data;
        detailsPreElement.textContent = JSON.stringify(analysis, null, 2);
        if (problemSummaries.length) {
          problemsElement.innerHTML = `<ul>${problemSummaries
            .map((problem) => {
              return `<li>${problem.messageHtml}</li>`;
            })
            .join("")}</ul>`;
        } else {
          problemsElement.textContent = "No problems found 🌟";
        }

        if (analysis.containsTypes) {
          const subpaths = Object.keys(analysis.entrypointResolutions);
          const entrypoints = subpaths.map((s) =>
            s === "." ? analysis.packageName : `${analysis.packageName}/${s.substring(2)}`
          );
          resolutionsElement.className = "";
          resolutionsElement.innerHTML = `
            <thead>
              <tr>
                <th></th>
                ${entrypoints.map((entrypoint) => `<th><code>"${entrypoint}"</code></th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${allResolutionKinds
                .map(
                  (resolutionKind) => `
                <tr>
                  <td>${resolutionKinds[resolutionKind]}</td>
                  ${subpaths
                    .map((subpath) => {
                      const problems = resolutionProblems.filter(
                        (problem) => problem.entrypoint === subpath && problem.resolutionKind === resolutionKind
                      );
                      return `<td>${
                        problems.length ? problems.map((problem) => problemKinds[problem.kind]).join("<br />") : "✅"
                      }</td>`;
                    })
                    .join("")}
                </tr>`
                )
                .join("")}
              </tbody>`;
        }
      } else {
        clearResult();
      }
    });

    function clearResult() {
      detailsElement.className = "display-none";
      detailsPreElement.textContent = null;
      problemsElement.textContent = null;
      resolutionsElement.className = "display-none";
    }

    function clearMessage() {
      messageElement.textContent = null;
      messageElement.className = "";
    }
  });
}
