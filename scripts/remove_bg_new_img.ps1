Add-Type -AssemblyName System.Drawing

$inputPath = 'd:\AI_final\VrushitForever\src\assets\new_img.jpg'
$outputPath = 'd:\AI_final\VrushitForever\src\assets\new_img-transparent.png'

$src = [System.Drawing.Bitmap]::new($inputPath)
$bmp = [System.Drawing.Bitmap]::new($src.Width, $src.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($src, 0, 0, $src.Width, $src.Height)
$g.Dispose()
$src.Dispose()

$w = $bmp.Width
$h = $bmp.Height
$visited = [bool[,]]::new($w, $h)
$queue = [System.Collections.Generic.Queue[System.Drawing.Point]]::new()

function IsBackgroundPixel([System.Drawing.Color]$c) {
  $lum = ($c.R + $c.G + $c.B) / 3.0
  $d1 = [math]::Abs([int]$c.R - [int]$c.G)
  $d2 = [math]::Abs([int]$c.R - [int]$c.B)
  $d3 = [math]::Abs([int]$c.G - [int]$c.B)
  $delta = [math]::Max($d1, [math]::Max($d2, $d3))
  return ($lum -ge 182 -and $delta -le 22)
}

function EnqueueIfBackground([int]$x, [int]$y) {
  if ($x -lt 0 -or $y -lt 0 -or $x -ge $w -or $y -ge $h) { return }
  if ($visited[$x, $y]) { return }

  $c = $bmp.GetPixel($x, $y)
  if (IsBackgroundPixel $c) {
    $visited[$x, $y] = $true
    $queue.Enqueue([System.Drawing.Point]::new($x, $y))
  }
}

for ($x = 0; $x -lt $w; $x++) {
  EnqueueIfBackground $x 0
  EnqueueIfBackground $x ($h - 1)
}

for ($y = 0; $y -lt $h; $y++) {
  EnqueueIfBackground 0 $y
  EnqueueIfBackground ($w - 1) $y
}

while ($queue.Count -gt 0) {
  $p = $queue.Dequeue()
  $x = $p.X
  $y = $p.Y

  $orig = $bmp.GetPixel($x, $y)
  $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $orig.R, $orig.G, $orig.B))

  EnqueueIfBackground ($x - 1) $y
  EnqueueIfBackground ($x + 1) $y
  EnqueueIfBackground $x ($y - 1)
  EnqueueIfBackground $x ($y + 1)
}

# Soften the cut edge for cleaner compositing.
for ($y = 1; $y -lt ($h - 1); $y++) {
  for ($x = 1; $x -lt ($w - 1); $x++) {
    $c = $bmp.GetPixel($x, $y)
    if ($c.A -eq 0) { continue }

    $n1 = $bmp.GetPixel($x - 1, $y).A
    $n2 = $bmp.GetPixel($x + 1, $y).A
    $n3 = $bmp.GetPixel($x, $y - 1).A
    $n4 = $bmp.GetPixel($x, $y + 1).A

    if ($n1 -eq 0 -or $n2 -eq 0 -or $n3 -eq 0 -or $n4 -eq 0) {
      if (IsBackgroundPixel $c) {
        $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(95, $c.R, $c.G, $c.B))
      }
    }
  }
}

$bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

Write-Output "Created: $outputPath"