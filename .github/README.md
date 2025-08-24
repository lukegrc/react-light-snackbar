# GitHub Workflows

This directory contains GitHub Actions workflows for the React Light Snackbar project.

## Workflows Overview

### 1. CI (`ci.yml`)

- **Triggers**: Push to main/develop branches, Pull Requests
- **Purpose**: Continuous Integration - runs linting, type checking, and building
- **Matrix**: Tests against Node.js 16.x, 18.x, and 20.x
- **Artifacts**: Uploads build outputs for verification

### 2. Release (`release.yml`)

- **Triggers**: Push of version tags (e.g., `v1.0.0`)
- **Purpose**: Automated npm publishing and GitHub release creation
- **Requirements**: NPM_TOKEN secret configured

### 3. Dependency Review (`dependency-review.yml`)

- **Triggers**: Pull Requests to main/develop
- **Purpose**: Reviews dependency changes for security and licensing issues
- **Fail Condition**: Moderate or higher severity issues

### 4. Security (`security.yml`)

- **Triggers**: Weekly schedule, Push to main/develop, Pull Requests
- **Purpose**: Security audits, vulnerability scanning, and outdated package checks
- **Requirements**: SNYK_TOKEN secret for enhanced security scanning

### 5. CodeQL (`codeql.yml`)

- **Triggers**: Weekly schedule, Push to main/develop, Pull Requests
- **Purpose**: Advanced security analysis using GitHub's CodeQL engine
- **Languages**: JavaScript/TypeScript analysis

## Required Secrets

To use all workflows, configure these secrets in your repository:

### NPM_TOKEN

- **Purpose**: Authentication for npm publishing
- **How to get**: Generate from [npmjs.com](https://www.npmjs.com/settings/tokens)
- **Required for**: Release workflow

### SNYK_TOKEN

- **Purpose**: Enhanced security scanning with Snyk
- **How to get**: Sign up at [snyk.io](https://snyk.io) and get your API token
- **Required for**: Security workflow (optional but recommended)

## Setup Instructions

1. **Enable GitHub Actions** in your repository settings
2. **Configure Secrets**:
   - Go to Settings → Secrets and variables → Actions
   - Add `NPM_TOKEN` with your npm authentication token
   - Add `SNYK_TOKEN` with your Snyk API token (optional)
3. **Branch Protection** (recommended):
   - Protect main and develop branches
   - Require status checks to pass before merging
   - Require dependency review approval

## Workflow Triggers

- **CI**: Runs on every push and PR to main/develop
- **Release**: Only runs when you push a version tag
- **Security**: Weekly + on push/PR
- **CodeQL**: Weekly + on push/PR
- **Dependency Review**: On every PR

## Customization

You can customize these workflows by:

- Modifying Node.js versions in the matrix
- Adjusting security thresholds
- Changing schedule frequencies
- Adding additional build steps or tests

## Troubleshooting

- **Build failures**: Check the CI workflow logs for specific errors
- **Security issues**: Review the Security and CodeQL workflow results
- **Dependency issues**: Check the Dependency Review workflow for flagged packages
- **Publishing issues**: Verify NPM_TOKEN is correctly configured
