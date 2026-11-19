"""One-off helper: crops real product photos to 1200x630 Open Graph images (client/public/og/*.jpg).
Not part of the build. Run: python3 scripts/make-og-images.py (needs Pillow)."""
from PIL import Image
import os
PUB = os.path.join(os.path.dirname(__file__), '..', 'client', 'public')
# slug: (source photo, vertical centre of the crop as a fraction of the photo height)
JOBS = {
    'business': ('kits/bodymist-soap.webp', 0.50),
    'scent-marketing': ('images/Campaign_Her001.webp', 0.45),
    'hotels-spas': ('shop/cover-soaps.webp', 0.50),
    'salons-barbershops': ('images/Studio_4 Fragrances.webp', 0.42),
    'amenities': ('shop/cover-soaps.webp', 0.55),
    'corporate-gifts': ('kits/bodymist-soap.webp', 0.55),
    'private-label': ('images/Campaign_Soaps_001.png', 0.45),
    'barbershop-case-study': ('images/Studio_4 Fragrances.webp', 0.60),
}
os.makedirs(os.path.join(PUB, 'og'), exist_ok=True)
for slug, (src, cy) in JOBS.items():
    im = Image.open(os.path.join(PUB, src)).convert('RGB')
    w, h = im.size
    ch = round(w * 630 / 1200)
    top = min(max(round(h * cy - ch / 2), 0), h - ch)
    out = im.crop((0, top, w, top + ch)).resize((1200, 630), Image.LANCZOS)
    out.save(os.path.join(PUB, 'og', f'{slug}.jpg'), quality=82, optimize=True, progressive=True)
    print(slug, os.path.getsize(os.path.join(PUB, 'og', f'{slug}.jpg')) // 1024, 'kB')
