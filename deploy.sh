#!/usr/bin/env sh

set -e

npm run build

cd dist
git init
git add .
git commit -m 'deploy'

git push -f git@github.com:mikhailperetyatko/vue-app.git master:gh-pages

cd -