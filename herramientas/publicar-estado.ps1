<#
  publicar-estado.ps1
  ---------------------------------------------------------------------------
  Revisa si el servidor de Minecraft está arriba y, SOLO cuando el estado
  cambia (online <-> offline), publica status.json en el repo de chiriCS.

  Así la web muestra online/offline real, sin llenar el historial de commits
  con un commit cada pocos minutos.

  Se ejecuta sola con la tarea programada: "chiriCS-EstadoServidor"
#>

$ErrorActionPreference = "Stop"

# ----------------------------- Configuración -----------------------------
$RepoPath   = "C:\Users\Remii\chiriCS"
$StatusName = "status.json"
$ServerHost = "127.0.0.1"
$ServerPort = 25565
$Version    = "1.20.1"
$LogFile    = Join-Path $env:LOCALAPPDATA "chiriCS-estado.log"

$StatusFile = Join-Path $RepoPath $StatusName

function Write-Log($msg) {
    $line = "[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $msg
    Add-Content -Path $LogFile -Value $line -Encoding UTF8
}

function Test-ServerPort {
    $client = New-Object System.Net.Sockets.TcpClient
    try {
        $task = $client.ConnectAsync($ServerHost, $ServerPort)
        return ($task.Wait(2000) -and $client.Connected)
    } catch {
        return $false
    } finally {
        $client.Close()
    }
}

# ------------------------- 1. Detectar el estado -------------------------
$online = Test-ServerPort

$prev = $null
if (Test-Path $StatusFile) {
    try { $prev = Get-Content $StatusFile -Raw | ConvertFrom-Json } catch { $prev = $null }
}

if ($prev -and ($prev.online -eq $online)) {
    Write-Log "Sin cambios (online=$online). No se publica nada."
    exit 0
}

# ----------------------- 2. Escribir status.json -------------------------
$payload = [ordered]@{
    online  = $online
    version = $Version
    updated = (Get-Date).ToString("yyyy-MM-ddTHH:mm:sszzz")
}
$json = $payload | ConvertTo-Json

# UTF-8 sin BOM: un BOM rompería el JSON.parse del navegador.
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($StatusFile, $json, $utf8NoBom)
Write-Log "Cambio de estado -> online=$online. Publicando..."

# ------------------------- 3. Publicar en GitHub -------------------------
$git = (Get-Command git -ErrorAction SilentlyContinue).Source
if (-not $git) { $git = "C:\Program Files\Git\cmd\git.exe" }
if (-not (Test-Path $git)) {
    Write-Log "ERROR: no se encontró git."
    exit 1
}

Push-Location $RepoPath
try {
    # Se agrega SOLO status.json: los demás archivos sin commitear quedan intactos.
    & $git add $StatusName 2>&1 | Out-Null

    $msg = if ($online) { "estado: servidor ONLINE" } else { "estado: servidor OFFLINE" }
    & $git commit -m $msg 2>&1 | Out-Null

    $push = & $git push 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Log "ERROR al hacer push: $push"
    } else {
        Write-Log "Publicado OK (online=$online)."
    }
} catch {
    Write-Log "ERROR: $($_.Exception.Message)"
} finally {
    Pop-Location
}
