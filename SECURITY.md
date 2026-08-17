# Security Policy

## Supported version

This repository is an educational prototype. Security fixes are applied to the latest commit on the `main` branch; no released production version is currently supported.

## Reporting a vulnerability

Do not publish credentials, exploit details, sensitive files, or personal data in a public issue.

Use GitHub's private vulnerability-reporting option for this repository when available. If it is unavailable, open a minimal issue requesting a private reporting channel and omit all sensitive technical details.

Include:

- the affected file or component;
- the impact and prerequisites;
- safe reproduction steps;
- a suggested mitigation, if known.

## Scope and safety

The smart contract and upload flow have not received a professional security audit. Use local networks or testnets only. IPFS content is not private by default, and on-chain access control does not encrypt uploaded files.
