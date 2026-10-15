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

function Add-ArticleContentChecks {
    param(
        [string]$Directory,
        [string]$Slug,
        [string]$Path,
        [hashtable]$KnownSlugs,
        [ref]$Errors,
        [ref]$Warnings
    )

    $content = Get-Content -LiteralPath $Path -Raw
    $frontmatterMatch = [regex]::Match($content, '(?s)\A---\r?\n(?<frontmatter>.*?)\r?\n---(?:\r?\n|$)')
    if (-not $frontmatterMatch.Success) {
        if ($Directory -eq "cloud") {
            Add-ErrorItem -Message "Cloud article '$Slug' is missing YAML frontmatter." -Errors $Errors
        }
        return
    }

    $frontmatter = $frontmatterMatch.Groups["frontmatter"].Value
    $body = $content.Substring($frontmatterMatch.Length)

    if ($Directory -eq "cloud") {
        $verifiedMatch = [regex]::Match($frontmatter, '(?m)^verifiedOn:\s*(?<value>\d{4}-\d{2}-\d{2})\s*$')
        $reviewMatch = [regex]::Match($frontmatter, '(?m)^reviewBy:\s*(?<value>\d{4}-\d{2}-\d{2})\s*$')
        $lastmodMatch = [regex]::Match($frontmatter, '(?m)^lastmod:\s*(?<value>\d{4}-\d{2}-\d{2})\s*$')

        if (-not $verifiedMatch.Success) {
            Add-ErrorItem -Message "Cloud article '$Slug' is missing a valid verifiedOn date (YYYY-MM-DD)." -Errors $Errors
        }
        if (-not $reviewMatch.Success) {
            Add-ErrorItem -Message "Cloud article '$Slug' is missing a valid reviewBy date (YYYY-MM-DD)." -Errors $Errors
        }
        if (-not $lastmodMatch.Success) {
            Add-ErrorItem -Message "Cloud article '$Slug' is missing a valid lastmod date (YYYY-MM-DD)." -Errors $Errors
        }

        if ($verifiedMatch.Success -and $reviewMatch.Success -and $lastmodMatch.Success) {
            try {
                $verifiedDate = [DateTime]::ParseExact($verifiedMatch.Groups["value"].Value, "yyyy-MM-dd", [Globalization.CultureInfo]::InvariantCulture)
                $reviewDate = [DateTime]::ParseExact($reviewMatch.Groups["value"].Value, "yyyy-MM-dd", [Globalization.CultureInfo]::InvariantCulture)
                $lastmodDate = [DateTime]::ParseExact($lastmodMatch.Groups["value"].Value, "yyyy-MM-dd", [Globalization.CultureInfo]::InvariantCulture)
                $today = [DateTime]::Today

                if ($verifiedDate -gt $today) {
                    Add-ErrorItem -Message "Cloud article '$Slug' has a verifiedOn date in the future." -Errors $Errors
                }
                if ($reviewDate -lt $verifiedDate) {
                    Add-ErrorItem -Message "Cloud article '$Slug' has a reviewBy date earlier than verifiedOn." -Errors $Errors
                }
                if ($verifiedDate -lt $lastmodDate) {
                    Add-WarningItem -Message "Cloud article '$Slug' was edited after its verifiedOn date; recheck the factual claims." -Warnings $Warnings
                }
                if ($reviewDate -lt $today) {
                    Add-WarningItem -Message "Cloud article '$Slug' is past its reviewBy date ($($reviewDate.ToString('yyyy-MM-dd')))." -Warnings $Warnings
                }
            } catch {
                Add-ErrorItem -Message "Cloud article '$Slug' contains an invalid verification, review, or lastmod date." -Errors $Errors
            }
        }
    }

    $relatedSlugs = [regex]::Matches($frontmatter, '(?m)^\s*-\s*["'']?/(?<slug>[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)["'']?\s*$')
    foreach ($match in $relatedSlugs) {
        $targetSlug = $match.Groups["slug"].Value
        if (-not $KnownSlugs.ContainsKey($targetSlug)) {
            Add-ErrorItem -Message "Article '$Slug' has a related link to unknown slug '$targetSlug'." -Errors $Errors
        }
    }

    $bodyLinks = [regex]::Matches($body, '\]\(/(?<slug>[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)(?:[?#][^)]+)?\)')
    foreach ($match in $bodyLinks) {
        $targetSlug = $match.Groups["slug"].Value
        if (-not $KnownSlugs.ContainsKey($targetSlug)) {
            Add-ErrorItem -Message "Article '$Slug' has an internal link to unknown slug '$targetSlug'." -Errors $Errors
        }
    }
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
$knownSlugMap = @{}
foreach ($registeredCollection in @($registry.collections)) {
    foreach ($registeredArticle in @($registeredCollection.articles)) {
        if ($registeredArticle.slug) {
            $knownSlugMap[[string]$registeredArticle.slug] = $registeredCollection.dir
        }
    }
}

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
            continue
        }

        Add-ArticleContentChecks `
            -Directory ([string]$collection.dir) `
            -Slug $slug `
            -Path $absoluteMdPath `
            -KnownSlugs $knownSlugMap `
            -Errors ([ref]$errors) `
            -Warnings ([ref]$warnings)
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
