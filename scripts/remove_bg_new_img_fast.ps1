Add-Type -AssemblyName System.Drawing

$code = @"
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class BgRemover
{
    public static void Remove(string inputPath, string outputPath)
    {
        using (var src = new Bitmap(inputPath))
        using (var bmp = new Bitmap(src.Width, src.Height, PixelFormat.Format32bppArgb))
        {
            using (var g = Graphics.FromImage(bmp))
            {
                g.DrawImage(src, 0, 0, src.Width, src.Height);
            }

            int w = bmp.Width;
            int h = bmp.Height;
            var rect = new Rectangle(0, 0, w, h);
            var data = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);

            try
            {
                int stride = data.Stride;
                int bytes = stride * h;
                byte[] px = new byte[bytes];
                Marshal.Copy(data.Scan0, px, 0, bytes);

                bool[] visited = new bool[w * h];
                var queue = new Queue<int>();

                Func<int, int, bool> isBg = (x, y) =>
                {
                    int i = y * stride + x * 4;
                    int b = px[i + 0];
                    int g = px[i + 1];
                    int r = px[i + 2];

                    double lum = (r + g + b) / 3.0;
                    int d1 = Math.Abs(r - g);
                    int d2 = Math.Abs(r - b);
                    int d3 = Math.Abs(g - b);
                    int delta = Math.Max(d1, Math.Max(d2, d3));

                    return lum >= 182.0 && delta <= 22;
                };

                Action<int, int> enqueue = (x, y) =>
                {
                    if (x < 0 || y < 0 || x >= w || y >= h) return;
                    int v = y * w + x;
                    if (visited[v]) return;
                    if (!isBg(x, y)) return;
                    visited[v] = true;
                    queue.Enqueue(v);
                };

                for (int x = 0; x < w; x++)
                {
                    enqueue(x, 0);
                    enqueue(x, h - 1);
                }

                for (int y = 0; y < h; y++)
                {
                    enqueue(0, y);
                    enqueue(w - 1, y);
                }

                while (queue.Count > 0)
                {
                    int v = queue.Dequeue();
                    int x = v % w;
                    int y = v / w;
                    int i = y * stride + x * 4;

                    px[i + 3] = 0;

                    enqueue(x - 1, y);
                    enqueue(x + 1, y);
                    enqueue(x, y - 1);
                    enqueue(x, y + 1);
                }

                for (int y = 1; y < h - 1; y++)
                {
                    for (int x = 1; x < w - 1; x++)
                    {
                        int i = y * stride + x * 4;
                        if (px[i + 3] == 0) continue;

                        int aL = px[y * stride + (x - 1) * 4 + 3];
                        int aR = px[y * stride + (x + 1) * 4 + 3];
                        int aU = px[(y - 1) * stride + x * 4 + 3];
                        int aD = px[(y + 1) * stride + x * 4 + 3];

                        if (aL == 0 || aR == 0 || aU == 0 || aD == 0)
                        {
                            if (isBg(x, y))
                            {
                                px[i + 3] = 95;
                            }
                        }
                    }
                }

                Marshal.Copy(px, 0, data.Scan0, bytes);
            }
            finally
            {
                bmp.UnlockBits(data);
            }

            bmp.Save(outputPath, ImageFormat.Png);
        }
    }
}
"@

Add-Type -TypeDefinition $code -ReferencedAssemblies 'System.Drawing'

$inputPath = 'd:\AI_final\VrushitForever\src\assets\new_img.jpg'
$outputPath = 'd:\AI_final\VrushitForever\src\assets\new_img-transparent.png'

[BgRemover]::Remove($inputPath, $outputPath)
Write-Output "Created: $outputPath"