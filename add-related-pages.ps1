# RelatedPages-Einbau-Script
# Fuegt RelatedPages-Komponente in die 6 Hauptseiten ein.
# Idempotent: kann mehrfach ausgefuehrt werden, ohne Schaden anzurichten.
#
# Aufruf:
#   cd C:\Projekte\webdesign-alcor\v2-nextjs
#   powershell -ExecutionPolicy Bypass -File .\add-related-pages.ps1

$ErrorActionPreference = "Stop"

$pages = @(
    @{ Path = "src\app\leistungen\page.tsx"; Key = "leistungen" }
    @{ Path = "src\app\referenzen\page.tsx"; Key = "referenzen" }
    @{ Path = "src\app\preise\page.tsx"; Key = "preise" }
    @{ Path = "src\app\ueber-mich\page.tsx"; Key = "uebermich" }
    @{ Path = "src\app\blog\page.tsx"; Key = "blog" }
    @{ Path = "src\app\termin\page.tsx"; Key = "termin" }
)

$results = @()

foreach ($page in $pages) {
    $path = $page.Path
    $key = $page.Key

    if (-not (Test-Path $path)) {
        $results += "[SKIP] $path - Datei nicht gefunden"
        continue
    }

    $content = Get-Content $path -Raw

    # Pruefen ob bereits eingebaut
    if ($content -match "RELATED_FOR\.$key") {
        $results += "[OK]   $path - bereits eingebaut, uebersprungen"
        continue
    }

    # 1. Imports einfuegen (falls noch nicht da)
    $importsAdded = $false
    if ($content -notmatch "from '@/components/sections/related-pages'") {
        # Nach dem letzten existierenden import einfuegen
        $importBlock = "import { RelatedPages } from '@/components/sections/related-pages'`r`nimport { RELATED_FOR } from '@/lib/related-pages'"
        # Finde den letzten import, fuege danach ein
        $content = $content -replace "(?m)^(import .+ from .+;?\r?\n)(?!import)", "`$1$importBlock`r`n"
        $importsAdded = $true
    }

    # 2. Komponente vor schliessendem </> oder </main> einfuegen
    $componentTag = "      <RelatedPages pages={RELATED_FOR.$key} />"
    $componentInserted = $false

    if ($content -match "(\s+)</>\s*\)\s*\}\s*$") {
        # Ersetzt direkt vor dem schliessenden </>
        $content = $content -replace "(\s+)(</>\s*\)\s*\}\s*)$", "`r`n$componentTag`r`n`$1`$2"
        $componentInserted = $true
    } elseif ($content -match "(\s+)</main>\s*\)\s*\}\s*$") {
        $content = $content -replace "(\s+)(</main>\s*\)\s*\}\s*)$", "`r`n$componentTag`r`n`$1`$2"
        $componentInserted = $true
    }

    if ($componentInserted) {
        Set-Content -Path $path -Value $content -NoNewline
        $results += "[ADD]  $path - RelatedPages eingebaut"
    } else {
        $results += "[WARN] $path - Schliessendes Tag nicht gefunden, manuell einbauen!"
    }
}

Write-Host ""
Write-Host "=== Ergebnis ===" -ForegroundColor Cyan
foreach ($r in $results) {
    if ($r -like "[ADD]*") {
        Write-Host $r -ForegroundColor Green
    } elseif ($r -like "[OK]*") {
        Write-Host $r -ForegroundColor DarkGray
    } elseif ($r -like "[WARN]*") {
        Write-Host $r -ForegroundColor Yellow
    } else {
        Write-Host $r -ForegroundColor DarkYellow
    }
}

Write-Host ""
Write-Host "Naechster Schritt:" -ForegroundColor Cyan
Write-Host "  npm run type-check" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Wenn alles passt:" -ForegroundColor Cyan
Write-Host "  git add ." -ForegroundColor White
Write-Host "  git commit -m 'feat: RelatedPages on all main pages'" -ForegroundColor White
Write-Host "  git push" -ForegroundColor White
