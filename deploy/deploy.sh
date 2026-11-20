#!/usr/bin/env bash
# Runs on the VPS. GitHub Actions' SSH key is locked to this script (see authorized_keys),
# and it's also fine to run by hand: /opt/inzozi/deploy/deploy.sh
set -euo pipefail
cd /opt/inzozi

git pull --ff-only --quiet origin master
echo "Deploying $(git log -1 --format='%h %s')"

# If the build fails, compose stops here and the old container keeps serving.
docker compose up -d --build --remove-orphans
docker image prune -f >/dev/null

for i in $(seq 1 15); do
  if docker compose exec -T inzozi-web wget -qO /dev/null http://127.0.0.1:3000; then
    echo "Deployed OK"; exit 0
  fi
  sleep 2
done
echo "Site not responding after deploy" >&2
docker compose logs --tail 30 inzozi-web >&2
exit 1
