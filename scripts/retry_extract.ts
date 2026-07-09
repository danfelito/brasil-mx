import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const EXISTING = JSON.parse(fs.readFileSync('/home/z/my-project/extracted_pdfs/catalog_data.json', 'utf-8'));

const ALL_PAGES: { label: string; file: string }[] = [
  ...Array.from({ length: 9 }, (_, i) => ({ label: `bretao_p${i + 1}`, file: `/home/z/my-project/extracted_pdfs/bretao_pages/page_${String(i + 1).padStart(2, '0')}.png` })),
  ...Array.from({ length: 24 }, (_, i) => ({ label: `serdir_p${i + 1}`, file: `/home/z/my-project/extracted_pdfs/serdir_pages/page_${String(i + 1).padStart(2, '0')}.png` })),
];

const PROMPT = `This is a page from a NEW HOLLAND safety footwear catalog.
Extract ALL information visible as JSON:
{
  "page_type": "cover|product|index|back",
  "brand_colors": {"primary":"#hex","secondary":"#hex","accent":"#hex"},
  "models": [
    {"code":"e.g. NHF 2243","name":"model name if visible","gender":"feminino|masculino|unisex","type":"botina/bota/sapato","materials":["names in Portuguese"],"sizes":"size range","safety_features":["features visible"],"intended_use":"work environment","price":"price with currency"}
  ],
  "raw_text":"ALL text transcribed exactly"
}
Return ONLY JSON.`;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const zai = await ZAI.create();
  const failed = ALL_PAGES.filter((p) => {
    const r = EXISTING[p.label];
    return !r || 'error' in r;
  });
  console.log(`Retrying ${failed.length} pages sequentially with delays...`);

  for (const p of failed) {
    if (!fs.existsSync(p.file)) {
      console.log(`SKIP (no file): ${p.label}`);
      continue;
    }
    let done = false;
    for (let attempt = 0; attempt < 3 && !done; attempt++) {
      try {
        const buf = fs.readFileSync(p.file);
        const b64 = buf.toString('base64');
        const resp = await zai.chat.completions.createVision({
          messages: [{ role: 'user', content: [
            { type: 'text', text: PROMPT },
            { type: 'image_url', image_url: { url: `data:image/png;base64,${b64}` } },
          ]}],
          thinking: { type: 'disabled' },
        });
        const content = resp.choices[0]?.message?.content || '';
        const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
        let parsed: any = null;
        try { parsed = JSON.parse(cleaned); } catch { parsed = { raw: content }; }
        EXISTING[p.label] = { label: p.label, data: parsed };
        const cnt = parsed?.models?.length || 0;
        console.log(`OK: ${p.label} (${cnt} models)`);
        done = true;
      } catch (e: any) {
        if (e.message.includes('429')) {
          console.log(`429 on ${p.label}, waiting 8s (attempt ${attempt + 1})`);
          await sleep(8000);
        } else {
          console.log(`ERR: ${p.label}: ${e.message.slice(0, 80)}`);
          EXISTING[p.label] = { label: p.label, error: e.message };
          done = true;
        }
      }
    }
    await sleep(2500);
  }

  fs.writeFileSync('/home/z/my-project/extracted_pdfs/catalog_data.json', JSON.stringify(EXISTING, null, 2));
  console.log('Saved.');
}

main().catch((e) => { console.error(e); process.exit(1); });
