import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import archiver from 'archiver';

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  if (!slug) return new NextResponse('Slug is required', { status: 400 });

  const folderPath = path.join(process.cwd(), 'public', 'photos', slug);
  if (!fs.existsSync(folderPath)) return new NextResponse('Folder not found', { status: 404 });

  const files = fs.readdirSync(folderPath).filter(file =>
    /\.(jpe?g|png|webp)$/i.test(file)
  );

  if (files.length === 0) return new NextResponse('No images found', { status: 404 });

  const zipStream = new ReadableStream({
    start(controller) {
      const archive = archiver('zip', { zlib: { level: 9 } });

      archive.on('data', chunk => controller.enqueue(chunk));
      archive.on('end', () => controller.close());
      archive.on('error', err => controller.error(err));

      files.forEach(file => {
        const filePath = path.join(folderPath, file);
        archive.file(filePath, { name: file });
      });

      archive.finalize();
    },
  });

  return new NextResponse(zipStream, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${slug}.zip"`,
    },
  });
}
