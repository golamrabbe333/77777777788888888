set -e
  pnpm install
  pnpm --filter @workspace/website run build
  