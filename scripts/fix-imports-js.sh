#!/bin/bash

echo "🔎 Corrigindo imports relativos para .js..."

find src -type f \( -name "*.ts" -o -name "*.tsx" \) | while read file
do
  perl -pi -e '
    s/from "(\.{1,2}\/[^"]+?)"/from "$1.js"/g
  ' "$file"

done

echo "✅ Imports corrigidos!"