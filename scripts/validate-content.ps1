param(
    [string]$RepoRoot = ".",
    [string[]]$CollectionDirs
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Add-ErrorItem {
    param(
        [string]$Message,
        [ref]$Errors
    )
    $Errors.Value += $Message
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Add-WarningItem {
    param(
        [string]$Message,
        [ref]$Warnings
    )
    $Warnings.Value += $Message
    Write-Host "[WARN]  $Message" -ForegroundColor Yellow
}

$root = (Resolve-Path -Path $RepoRoot).Path
$collectionsPath = Join-Path $root "docs/collections.json"

if ($CollectionDirs -and $CollectionDirs.Count -eq 1 -and $CollectionDirs[0] -match ",") {
    $CollectionDirs = @($CollectionDirs[0].Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ })
}

if (-not (Test-Path -LiteralPath $collectionsPath)) {
    Write-Host "[ERROR] Missing docs/collections.json" -ForegroundColor Red
    exit 1
}

$errors = @()
$warnings = @()

try {
    $registry = Get-Content -LiteralPath $collectionsPath -Raw | ConvertFrom-Json -Depth 100
} catch {
    Write-Host "[ERROR] Unable to parse docs/collections.json: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

if (-not $registry.site) {
    Add-WarningItem -Message "Missing top-level site metadata block." -Warnings ([ref]$warnings)
}

if (-not $registry.collections) {
    Add-ErrorItem -Message "Missing top-level collections array." -Errors ([ref]$errors)
}

$collections = @($registry.collections)
if ($CollectionDirs -and $CollectionDirs.Count -gt 0) {
    $collections = @($collections | Where-Object { $CollectionDirs -contains $_.dir })
    if ($collections.Count -eq 0) {
        Add-ErrorItem -Message "No collections found matching -CollectionDirs: $($CollectionDirs -join ', ')" -Errors ([ref]$errors)
    }
}

$globalSlugMap = @{}

foreach ($collection in $collections) {
    foreach ($field in @("dir", "title", "description", "articles")) {
        if (-not $collection.$field) {
            Add-ErrorItem -Message "Collection '$($collection.dir)' is missing required field '$field'." -Errors ([ref]$errors)
        }
    }

    if (-not $collection.articles) {
        continue
    }

    $localSlugs = @{}

    foreach ($article in @($collection.articles)) {
        foreach ($field in @("slug", "title", "description", "category")) {
            if (-not $article.$field) {
                Add-ErrorItem -Message "Collection '$($collection.dir)' has article missing '$field'." -Errors ([ref]$errors)
            }
        }

        if (-not $article.slug) {
            continue
        }

        $slug = [string]$article.slug
        $relativeMdPath = Join-Path "docs/$($collection.dir)" "$slug.md"
        $absoluteMdPath = Join-Path $root $relativeMdPath

        if ($localSlugs.ContainsKey($slug)) {
            Add-ErrorItem -Message "Duplicate slug '$slug' inside collection '$($collection.dir)'." -Errors ([ref]$errors)
        } else {
            $localSlugs[$slug] = $true
        }

        if ($globalSlugMap.ContainsKey($slug)) {
            Add-ErrorItem -Message "Global duplicate slug '$slug' across '$($globalSlugMap[$slug])' and '$($collection.dir)'." -Errors ([ref]$errors)
        } else {
            $globalSlugMap[$slug] = $collection.dir
        }

        if (-not (Test-Path -LiteralPath $absoluteMdPath)) {
            Add-ErrorItem -Message "Missing markdown file for slug '$slug': $relativeMdPath" -Errors ([ref]$errors)
        }
    }
}

Write-Host ""
Write-Host "Validation summary" -ForegroundColor Cyan
Write-Host "- Collections checked: $($collections.Count)"
Write-Host "- Slugs checked: $($globalSlugMap.Count)"
Write-Host "- Warnings: $($warnings.Count)"
Write-Host "- Errors: $($errors.Count)"

if ($errors.Count -gt 0) {
    exit 1
}

Write-Host "Content registry integrity checks passed." -ForegroundColor Green
exit 0
