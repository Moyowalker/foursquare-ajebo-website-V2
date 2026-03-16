param(
  [switch]$ShowReferenced,
  [switch]$ShowAvailable
)

$ErrorActionPreference = 'Stop'

$workspaceRoot = Split-Path -Parent $PSScriptRoot
$srcRoot = Join-Path $workspaceRoot 'src'
$publicRoot = Join-Path $workspaceRoot 'public'
$imageRoot = Join-Path $publicRoot 'images'

if (-not (Test-Path $srcRoot)) {
  throw "Could not find src directory at $srcRoot"
}

if (-not (Test-Path $imageRoot)) {
  throw "Could not find image directory at $imageRoot"
}

$sourceFiles = Get-ChildItem -Path $srcRoot -Recurse -Include *.ts,*.tsx -File
$imageRegex = '(?i)/images/[A-Za-z0-9_./-]+\.(jpg|jpeg|png|webp|gif|svg)'

$referenced = New-Object System.Collections.Generic.HashSet[string]

foreach ($file in $sourceFiles) {
  $matches = Select-String -Path $file.FullName -Pattern $imageRegex -AllMatches
  foreach ($match in $matches) {
    foreach ($value in $match.Matches.Value) {
      if ($value -and -not $value.EndsWith('/')) {
        [void]$referenced.Add($value)
      }
    }
  }
}

$available = New-Object System.Collections.Generic.HashSet[string]
$publicPath = (Resolve-Path $publicRoot).Path

Get-ChildItem -Path $imageRoot -Recurse -File | ForEach-Object {
  $relative = $_.FullName.Substring($publicPath.Length).TrimStart([char[]]@('\', '/'))
  $normalized = '/' + ($relative -replace '\\', '/')
  [void]$available.Add($normalized)
}

$referencedSorted = @($referenced) | Sort-Object
$availableSorted = @($available) | Sort-Object
$missing = $referencedSorted | Where-Object { $_ -notin $availableSorted }
$unused = $availableSorted | Where-Object { $_ -notin $referencedSorted }

Write-Host "Image Audit"
Write-Host "==========="
Write-Host "Referenced in code: $($referencedSorted.Count)"
Write-Host "Available in public/images: $($availableSorted.Count)"
Write-Host "Missing files: $($missing.Count)"
Write-Host "Unused files: $($unused.Count)"
Write-Host ""

if ($missing.Count -gt 0) {
  Write-Host "Missing Paths"
  Write-Host "-------------"
  $missing | ForEach-Object { Write-Host $_ }
  Write-Host ""

  Write-Host "Missing By Section"
  Write-Host "------------------"
  $missing |
    Group-Object {
      $parts = ($_ -split '/')
      if ($parts.Count -gt 2) { $parts[2] } else { 'root' }
    } |
    Sort-Object Name |
    ForEach-Object { Write-Host ("{0}: {1}" -f $_.Name, $_.Count) }
  Write-Host ""
}

if ($unused.Count -gt 0) {
  Write-Host "Unused Paths"
  Write-Host "------------"
  $unused | ForEach-Object { Write-Host $_ }
  Write-Host ""
}

if ($ShowReferenced) {
  Write-Host "Referenced Paths"
  Write-Host "----------------"
  $referencedSorted | ForEach-Object { Write-Host $_ }
  Write-Host ""
}

if ($ShowAvailable) {
  Write-Host "Available Paths"
  Write-Host "---------------"
  $availableSorted | ForEach-Object { Write-Host $_ }
  Write-Host ""
}

if ($missing.Count -gt 0) {
  exit 1
}

exit 0
