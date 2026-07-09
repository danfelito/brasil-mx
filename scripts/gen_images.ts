import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const IMAGES: { name: string; prompt: string; size: string }[] = [
  {
    name: 'boot-vira-francesa',
    size: '1024x1024',
    prompt: 'Professional e-commerce product photo of a single premium hand-stitched brown leather vira francesa style safety boot with vulcanized rubber sole, side view, centered on pure white background, soft studio lighting, sharp focus, no text, catalog style',
  },
  {
    name: 'boot-floater-brown',
    size: '1024x1024',
    prompt: 'Professional e-commerce product photo of a single medium brown floater leather work boot with stitched sole, side view, centered on pure white background, soft studio lighting, sharp focus, no text, catalog style',
  },
  {
    name: 'boot-women-napa',
    size: '1024x1024',
    prompt: 'Professional e-commerce product photo of a single elegant womens brown napa leather ankle safety boot, side view, centered on pure white background, soft studio lighting, sharp focus, no text, catalog style',
  },
  {
    name: 'boot-crazy-dark',
    size: '1024x1024',
    prompt: 'Professional e-commerce product photo of a single dark brown distressed crazy leather safety boot, side view, centered on pure white background, soft studio lighting, sharp focus, no text, catalog style',
  },
  {
    name: 'boot-nobuck-caramel',
    size: '1024x1024',
    prompt: 'Professional e-commerce product photo of a single caramel tan nobuck leather safety work boot, side view, centered on pure white background, soft studio lighting, sharp focus, no text, catalog style',
  },
  {
    name: 'boot-nobuck-black',
    size: '1024x1024',
    prompt: 'Professional e-commerce product photo of a single black nobuck leather industrial safety boot with white PU sole, side view, centered on pure white background, soft studio lighting, sharp focus, no text, catalog style',
  },
  {
    name: 'boot-chocolate',
    size: '1024x1024',
    prompt: 'Professional e-commerce product photo of a single dark chocolate brown nobuck leather safety boot, side view, centered on pure white background, soft studio lighting, sharp focus, no text, catalog style',
  },
  {
    name: 'brand-banner',
    size: '1344x768',
    prompt: 'Wide cinematic banner of a row of safety work boots in various brown and black leather tones lined up on a wooden workshop bench, warm industrial lighting, navy blue tones in background, professional photography, no text',
  },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const zai = await ZAI.create();
  const outDir = '/home/z/my-project/public/products';
  for (const img of IMAGES) {
    const outPath = `${outDir}/${img.name}.png`;
    if (fs.existsSync(outPath)) {
      console.log(`SKIP exists: ${img.name}`);
      continue;
    }
    let ok = false;
    for (let attempt = 0; attempt < 4 && !ok; attempt++) {
      try {
        const resp = await zai.images.generations.create({ prompt: img.prompt, size: img.size as any });
        const b64 = resp.data[0].base64;
        fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
        console.log(`OK: ${img.name}`);
        ok = true;
      } catch (e: any) {
        console.log(`ERR ${img.name} (attempt ${attempt + 1}): ${e.message.slice(0, 100)}`);
        await sleep(8000);
      }
    }
    if (!ok) console.log(`FAILED: ${img.name} after retries`);
    await sleep(2500);
  }
  console.log('DONE generating images');
}

main().then(() => process.exit(0)).catch((e) => { console.error('FATAL', e); process.exit(1); });
