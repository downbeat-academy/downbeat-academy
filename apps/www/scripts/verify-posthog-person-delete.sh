#!/usr/bin/env bash
# Checks that POSTHOG_PERSONAL_API_KEY can delete persons, without deleting anything.
#
# It sends an empty bulk_delete. PostHog checks the key's scopes before validating
# the body, so the status code answers the question:
#   400 -> key is valid and has person:write (the empty body was rejected)
#   403 -> key is valid but lacks person:write, or is not scoped to this project
#   401 -> key is invalid or revoked
#
# Usage: POSTHOG_PERSONAL_API_KEY=phx_... ./apps/www/scripts/verify-posthog-person-delete.sh
set -euo pipefail

: "${POSTHOG_PERSONAL_API_KEY:?Set POSTHOG_PERSONAL_API_KEY}"
HOST="${POSTHOG_API_HOST:-https://us.posthog.com}"
PROJECT_ID="${POSTHOG_PROJECT_ID:-513825}"

status=$(curl -sS -o /dev/null -w '%{http_code}' \
	-X POST "$HOST/api/environments/$PROJECT_ID/persons/bulk_delete/" \
	-H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \
	-H 'Content-Type: application/json' \
	-d '{}')

case "$status" in
	400) echo "OK ($status): key has person:write on project $PROJECT_ID" ;;
	403) echo "FAIL ($status): key lacks person:write, or is not scoped to project $PROJECT_ID" >&2; exit 1 ;;
	401) echo "FAIL ($status): key is invalid or revoked" >&2; exit 1 ;;
	*)   echo "UNEXPECTED ($status): check the host and project id" >&2; exit 1 ;;
esac
