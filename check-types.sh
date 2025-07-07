#!/bin/bash

echo "🔍 Scanning for suspicious type definitions in ./app/..."

# Zoek naar 'Props' type-definities
grep -rni --include=\*.ts --include=\*.tsx "type Props" ./app/

# Zoek naar 'PageProps'
grep -rni --include=\*.ts --include=\*.tsx "PageProps" ./app/

# Zoek naar 'Promise' in type-definities
grep -rni --include=\*.ts --include=\*.tsx "Promise<" ./app/

echo "✅ Scan voltooid."
