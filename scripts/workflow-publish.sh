#!/bin/sh

set -xe

cat | docker build -f - -t tmp `mktemp -d` << 'EOF'
FROM flyio/flyctl:v0.0.233 as flyio
FROM node:lts-alpine
COPY --from=flyio /flyctl /
RUN apk add curl bind-tools go-ipfs
EOF

docker run --rm -w /app -v $(pwd):/app tmp sh -c 'env && yarn && yarn build'
docker run --rm -w /app -v $(pwd):/app -e IPFS_API=$IPFS_API -e WEB_PATH=$WEB_PATH -e FLY_ACCESS_TOKEN=$FLY_ACCESS_TOKEN -e DOMAIN=$DOMAIN tmp sh scripts/publish.sh
