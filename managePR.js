/**
 * managePR.js
 *
 * A PR management module that provides full lifecycle control over pull requests
 * via the GitHub REST API. Instead of directly creating a PR, this module lets
 * you list, review, approve, request changes, merge, and close pull requests.
 *
 * Usage (Node.js >= 18):
 *   node managePR.js <command> [options]
 *
 * Commands:
 *   list       – List open pull requests for a repo
 *   view       – View details of a specific PR
 *   approve    – Approve a PR
 *   request-changes – Request changes on a PR
 *   comment    – Post a review comment on a PR
 *   merge      – Merge a PR (merge | squash | rebase)
 *   close      – Close a PR without merging
 *   status     – Show CI/check status for a PR
 *
 * Environment variables:
 *   GITHUB_TOKEN  – Personal access token with `repo` scope (required)
 *   GITHUB_OWNER  – Repository owner (org or user), e.g. "krishna2700"
 *   GITHUB_REPO   – Repository name, e.g. "agent-trial"
 */

const BASE_URL = "https://api.github.com";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getEnv(key) {
  const value = process.env[key];
  if (!value) {
    console.error(`Error: environment variable ${key} is not set.`);
    process.exit(1);
  }
  return value;
}

async function githubRequest(path, { method = "GET", body } = {}) {
  const token = getEnv("GITHUB_TOKEN");
  const url = `${BASE_URL}${path}`;

  const options = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "managePR-script/1.0",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const res = await fetch(url, options);
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const msg = data?.message || res.statusText;
    console.error(`GitHub API error [${res.status}]: ${msg}`);
    if (data?.errors) {
      data.errors.forEach((e) => console.error(" -", e.message || JSON.stringify(e)));
    }
    process.exit(1);
  }

  return data;
}

function repoPath() {
  const owner = getEnv("GITHUB_OWNER");
  const repo = getEnv("GITHUB_REPO");
  return `/repos/${owner}/${repo}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleString();
}

function printDivider() {
  console.log("─".repeat(60));
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

async function listPRs({ state = "open", limit = 20 } = {}) {
  console.log(`\nListing ${state} pull requests...\n`);
  const prs = await githubRequest(`${repoPath()}/pulls?state=${state}&per_page=${limit}`);

  if (!prs.length) {
    console.log(`No ${state} pull requests found.`);
    return;
  }

  prs.forEach((pr) => {
    printDivider();
    console.log(`#${pr.number}  ${pr.title}`);
    console.log(`  Author  : ${pr.user.login}`);
    console.log(`  Branch  : ${pr.head.label} → ${pr.base.label}`);
    console.log(`  State   : ${pr.state}${pr.draft ? " (draft)" : ""}`);
    console.log(`  Created : ${formatDate(pr.created_at)}`);
    console.log(`  URL     : ${pr.html_url}`);
  });
  printDivider();
  console.log(`\nTotal: ${prs.length} PR(s)`);
}

async function viewPR(prNumber) {
  if (!prNumber) {
    console.error("Error: PR number is required. Usage: node managePR.js view <pr-number>");
    process.exit(1);
  }

  const [pr, reviews, checks] = await Promise.all([
    githubRequest(`${repoPath()}/pulls/${prNumber}`),
    githubRequest(`${repoPath()}/pulls/${prNumber}/reviews`),
    githubRequest(`${repoPath()}/commits/${await getPRHeadSHA(prNumber)}/check-runs`),
  ]);

  printDivider();
  console.log(`PR #${pr.number}: ${pr.title}`);
  printDivider();
  console.log(`Author  : ${pr.user.login}`);
  console.log(`Branch  : ${pr.head.label} → ${pr.base.label}`);
  console.log(`State   : ${pr.state}${pr.draft ? " (draft)" : ""}`);
  console.log(`Mergeable: ${pr.mergeable ?? "unknown"}`);
  console.log(`Created : ${formatDate(pr.created_at)}`);
  console.log(`Updated : ${formatDate(pr.updated_at)}`);
  console.log(`URL     : ${pr.html_url}`);

  if (pr.body) {
    console.log(`\nDescription:\n${pr.body.trim()}`);
  }

  if (reviews.length) {
    console.log(`\nReviews (${reviews.length}):`);
    reviews.forEach((r) => {
      console.log(`  [${r.state}] ${r.user.login} – ${formatDate(r.submitted_at)}`);
      if (r.body) console.log(`    "${r.body.trim()}"`);
    });
  }

  if (checks?.check_runs?.length) {
    console.log(`\nCI Checks (${checks.check_runs.length}):`);
    checks.check_runs.forEach((c) => {
      const icon = c.conclusion === "success" ? "✓" : c.conclusion === "failure" ? "✗" : "…";
      console.log(`  ${icon} ${c.name}: ${c.status} / ${c.conclusion ?? "pending"}`);
    });
  }
  printDivider();
}

async function getPRHeadSHA(prNumber) {
  const pr = await githubRequest(`${repoPath()}/pulls/${prNumber}`);
  return pr.head.sha;
}

async function approvePR(prNumber, comment = "LGTM!") {
  if (!prNumber) {
    console.error("Error: PR number is required. Usage: node managePR.js approve <pr-number> [comment]");
    process.exit(1);
  }

  console.log(`\nApproving PR #${prNumber}...`);
  const review = await githubRequest(`${repoPath()}/pulls/${prNumber}/reviews`, {
    method: "POST",
    body: { event: "APPROVE", body: comment },
  });

  console.log(`PR #${prNumber} approved.`);
  console.log(`Review ID: ${review.id}`);
  console.log(`Submitted: ${formatDate(review.submitted_at)}`);
}

async function requestChanges(prNumber, comment) {
  if (!prNumber || !comment) {
    console.error(
      "Error: PR number and comment are required.\n" +
        "Usage: node managePR.js request-changes <pr-number> <comment>"
    );
    process.exit(1);
  }

  console.log(`\nRequesting changes on PR #${prNumber}...`);
  const review = await githubRequest(`${repoPath()}/pulls/${prNumber}/reviews`, {
    method: "POST",
    body: { event: "REQUEST_CHANGES", body: comment },
  });

  console.log(`Changes requested on PR #${prNumber}.`);
  console.log(`Review ID: ${review.id}`);
}

async function commentOnPR(prNumber, comment) {
  if (!prNumber || !comment) {
    console.error(
      "Error: PR number and comment are required.\n" +
        "Usage: node managePR.js comment <pr-number> <comment>"
    );
    process.exit(1);
  }

  console.log(`\nPosting comment on PR #${prNumber}...`);
  const issue_comment = await githubRequest(`${repoPath()}/issues/${prNumber}/comments`, {
    method: "POST",
    body: { body: comment },
  });

  console.log(`Comment posted: ${issue_comment.html_url}`);
}

async function mergePR(prNumber, method = "merge", commitMessage) {
  if (!prNumber) {
    console.error(
      "Error: PR number is required.\n" +
        "Usage: node managePR.js merge <pr-number> [merge|squash|rebase] [commit-message]"
    );
    process.exit(1);
  }

  const validMethods = ["merge", "squash", "rebase"];
  if (!validMethods.includes(method)) {
    console.error(`Error: merge method must be one of: ${validMethods.join(", ")}`);
    process.exit(1);
  }

  const pr = await githubRequest(`${repoPath()}/pulls/${prNumber}`);

  if (pr.state !== "open") {
    console.error(`Error: PR #${prNumber} is not open (state: ${pr.state})`);
    process.exit(1);
  }

  if (pr.mergeable === false) {
    console.error(`Error: PR #${prNumber} has merge conflicts and cannot be merged automatically.`);
    process.exit(1);
  }

  console.log(`\nMerging PR #${prNumber} "${pr.title}" using ${method} strategy...`);

  const body = {
    merge_method: method,
    ...(commitMessage ? { commit_message: commitMessage } : {}),
  };

  const result = await githubRequest(`${repoPath()}/pulls/${prNumber}/merge`, {
    method: "PUT",
    body,
  });

  console.log(`PR #${prNumber} merged successfully!`);
  console.log(`SHA: ${result.sha}`);
  console.log(`Message: ${result.message}`);
}

async function closePR(prNumber) {
  if (!prNumber) {
    console.error("Error: PR number is required. Usage: node managePR.js close <pr-number>");
    process.exit(1);
  }

  console.log(`\nClosing PR #${prNumber}...`);
  const pr = await githubRequest(`${repoPath()}/pulls/${prNumber}`, {
    method: "PATCH",
    body: { state: "closed" },
  });

  console.log(`PR #${prNumber} "${pr.title}" has been closed.`);
  console.log(`URL: ${pr.html_url}`);
}

async function prStatus(prNumber) {
  if (!prNumber) {
    console.error("Error: PR number is required. Usage: node managePR.js status <pr-number>");
    process.exit(1);
  }

  const pr = await githubRequest(`${repoPath()}/pulls/${prNumber}`);
  const sha = pr.head.sha;
  const checksData = await githubRequest(`${repoPath()}/commits/${sha}/check-runs`);
  const statusData = await githubRequest(`${repoPath()}/commits/${sha}/statuses`);

  printDivider();
  console.log(`CI Status for PR #${prNumber}: ${pr.title}`);
  printDivider();
  console.log(`Head commit: ${sha.slice(0, 8)}`);
  console.log(`Branch     : ${pr.head.ref}`);
  console.log(`Mergeable  : ${pr.mergeable ?? "unknown"}`);

  if (checksData.check_runs?.length) {
    console.log(`\nCheck Runs (${checksData.check_runs.length}):`);
    checksData.check_runs.forEach((c) => {
      const icon = c.conclusion === "success" ? "✓" : c.conclusion === "failure" ? "✗" : "○";
      console.log(`  ${icon} [${(c.conclusion || c.status).padEnd(10)}] ${c.name}`);
      if (c.details_url) console.log(`       ${c.details_url}`);
    });
  } else {
    console.log("\nNo check runs found.");
  }

  if (statusData?.length) {
    console.log(`\nCommit Statuses (${statusData.length}):`);
    statusData.forEach((s) => {
      const icon = s.state === "success" ? "✓" : s.state === "failure" ? "✗" : "○";
      console.log(`  ${icon} [${s.state.padEnd(10)}] ${s.context}`);
    });
  }

  printDivider();
}

// ---------------------------------------------------------------------------
// CLI Entry Point
// ---------------------------------------------------------------------------

function printHelp() {
  console.log(`
managePR.js – GitHub Pull Request Manager
==========================================

Environment variables:
  GITHUB_TOKEN   Personal access token with 'repo' scope
  GITHUB_OWNER   Repository owner (org or username)
  GITHUB_REPO    Repository name

Commands:
  list [open|closed|all]                       List pull requests
  view <pr-number>                             View PR details + reviews + CI
  approve <pr-number> [comment]                Approve a PR
  request-changes <pr-number> <comment>        Request changes on a PR
  comment <pr-number> <comment>               Post a comment on a PR
  merge <pr-number> [merge|squash|rebase]      Merge a PR
  close <pr-number>                            Close a PR without merging
  status <pr-number>                           Show CI/check status for a PR
  help                                         Show this help message

Examples:
  GITHUB_TOKEN=ghp_xxx GITHUB_OWNER=krishna2700 GITHUB_REPO=agent-trial \\
    node managePR.js list

  GITHUB_TOKEN=ghp_xxx GITHUB_OWNER=krishna2700 GITHUB_REPO=agent-trial \\
    node managePR.js view 42

  GITHUB_TOKEN=ghp_xxx GITHUB_OWNER=krishna2700 GITHUB_REPO=agent-trial \\
    node managePR.js approve 42 "Looks great, ship it!"

  GITHUB_TOKEN=ghp_xxx GITHUB_OWNER=krishna2700 GITHUB_REPO=agent-trial \\
    node managePR.js merge 42 squash

  GITHUB_TOKEN=ghp_xxx GITHUB_OWNER=krishna2700 GITHUB_REPO=agent-trial \\
    node managePR.js close 42
`);
}

async function main() {
  const [, , command, ...args] = process.argv;

  switch (command) {
    case "list":
      await listPRs({ state: args[0] || "open" });
      break;
    case "view":
      await viewPR(args[0]);
      break;
    case "approve":
      await approvePR(args[0], args[1]);
      break;
    case "request-changes":
      await requestChanges(args[0], args.slice(1).join(" "));
      break;
    case "comment":
      await commentOnPR(args[0], args.slice(1).join(" "));
      break;
    case "merge":
      await mergePR(args[0], args[1] || "merge", args[2]);
      break;
    case "close":
      await closePR(args[0]);
      break;
    case "status":
      await prStatus(args[0]);
      break;
    case "help":
    case "--help":
    case "-h":
    case undefined:
      printHelp();
      break;
    default:
      console.error(`Unknown command: ${command}`);
      printHelp();
      process.exit(1);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
