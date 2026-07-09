import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const PAGES_TO_ANALYZE: { label: string; file: string }[] = [
  // Bretao catalog (9 pages)
  ...Array.from({ length: 9 }, (_, i) => ({
    label: `bretao_p${i + 1}`,
    file: `/home/z/my-project/extracted_pdfs/bretao_pages/page_${String(i + 1).padStart(2, '0')}.png`,
  })),
  // SER-Dir catalog (24 pages)
  ...Array.from({ length: 24 }, (_, i) => ({
    label: `serdir_p${i + 1}`,
    file: `/home/z/my-project/extracted_pdfs/serdir_pages/page_${String(i + 1).padStart(2, '0')}.png`,
  })),
];

const PROMPT = `This is a page from a NEW HOLLAND safety footwear (calzado de seguridad) catalog.
Extract ALL information visible on the page as JSON with this exact structure:
{
  "page_type": "cover" | "product" | "index" | "back",
  "brand_colors": { "primary": "#hex", "secondary": "#hex", "accent": "#hex" },
  "models": [
    {
      "code": "e.g. NHF 2243 or ENH 2201",
      "name": "model name (e.g. Torreano, Cascavel) if visible",
      "gender": "feminino | masculino | unisex if determinable (NHF = women, ENH = men)",
      "type": "botina/bota/sapato (boot/shoe)",
      "materials": ["material names in Portuguese as written"],
      "sizes": "size range e.g. 34-46",
      "safety_features": ["any safety features visible"],
      "intended_use": "intended work environment if mentioned",
      "price": "price if visible with currency"
    }
  ],
  "raw_text": "ALL text on the page, transcribed exactly"
}
Return ONLY the JSON, no other text.`;

async function main() {
  const zai = await ZAI.create();
  const results: Record<string, any> = {};

  const batchSize = 4;
  for (let i = 0; i < PAGES_TO_ANALYZE.length; i += batchSize) {
    const batch = PAGES_TO_ANALYZE.slice(i, i + batchSize);
    const settled = await Promise.all(
      batch.map(async (p) => {
        if (!fs.existsSync(p.file)) return { label: p.label, error: 'file not found' };
        try {
          const buf = fs.readFileSync(p.file);
          const b64 = buf.toString('base64');
          const resp = await zai.chat.completions.createVision({
            messages: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: PROMPT },
                  { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
                ],
              },
            ],
            thinking: { type: 'disabled' },
          });
          const content = resp.choices[0]?.message?.content || '';
          const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
          let parsed: any = null;
          try {
            parsed = JSON.parse(cleaned);
          } catch {
            parsed = { raw: content };
          }
          return { label: p.label, data: parsed };
        } catch (e: any) {
          return { label: p.label, error: e.message };
        }
      })
    );
    for (const r of settled) results[r.label] = r;
    console.log(`Processed batch ${i / batchSize + 1}/${Math.ceil(PAGES_TO_ANALYZE.length / batchSize)}`);
  }

  fs.writeFileSync('/home/z/my-project/extracted_pdfs/catalog_data.json', JSON.stringify(results, null, 2));
  console.log('Saved to catalog_data.json');
  for (const [label, res] of Object.entries(results)) {
    const r = res as any;
    if (r.data?.models?.length) {
      console.log(`\n=== ${label} ===`);
      for (const m of r.data.models) {
        console.log(`  ${m.code} | ${m.name || '?'} | ${m.type || '?'} | sizes:${m.sizes || '?'} | ${m.price || '?'}`);
      }
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
