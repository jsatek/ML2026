"""Scrape materiallogiq.com into research/site-snapshot.json.

Usage: python3 research/scrape_site.py [cache_dir]
Requires: beautifulsoup4, pillow. Pages are cached in cache_dir (default /tmp/ml-scrape).

The snapshot is raw-ish data; scripts/build-content.mjs turns it into packages/content.
"""
import io, json, re, sys, os, html, urllib.request
from collections import OrderedDict
from bs4 import BeautifulSoup
from PIL import Image

BASE = 'https://materiallogiq.com'
CACHE = sys.argv[1] if len(sys.argv) > 1 else '/tmp/ml-scrape'
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'site-snapshot.json')
os.makedirs(CACHE, exist_ok=True)
UA = {'User-Agent': 'Mozilla/5.0 (ML2026 research)'}

def fetch(url, binary=False):
    key = os.path.join(CACHE, re.sub(r'[^A-Za-z0-9._-]+', '_', url)[-180:])
    if os.path.exists(key):
        data = open(key, 'rb').read()
    else:
        data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()
        open(key, 'wb').write(data)
    return data if binary else data.decode('utf-8', 'ignore')

def absu(u):
    if not u: return u
    if u.startswith('//'): return 'https:' + u
    if u.startswith('/'): return BASE + u
    return u

def text(el):
    return re.sub(r'\s+', ' ', el.get_text(' ')).strip() if el else ''

def main_content(soup):
    return soup.select_one('[data-elementor-type="wp-page"]') or soup

def swatch_hex(url):
    """Average color of the central 60% of a swatch image."""
    try:
        im = Image.open(io.BytesIO(fetch(url, binary=True))).convert('RGB')
        w, h = im.size
        im = im.crop((w * .2, h * .2, w * .8, h * .8)).resize((1, 1), Image.Resampling.BOX)
        return '#%02x%02x%02x' % im.getpixel((0, 0))
    except Exception as e:
        print('  swatch failed', url, e)
        return None

pages = json.loads(fetch(f'{BASE}/wp-json/wp/v2/pages?per_page=100&_fields=id,slug,link,title,modified'))
title_of = {p['slug']: html.unescape(p['title']['rendered']) for p in pages}

NON_PRODUCT = {'blog', 'contact', 'inspiration', 'materialize', 'new-home', 'portfolio', 'products', 'resources',
               'pet-felt', 'silk-metal', 'wood', 'wood-wool', 'ceiling-baffles', 'ceiling-clouds', 'ceiling-panels',
               'ceiling-tiles', 'wall-panels', 'wall-tiles', 'wall-systems'}

def parse_product(slug):
    soup = BeautifulSoup(fetch(f'{BASE}/{slug}/'), 'html.parser')
    ld = None
    for s in soup.find_all('script', type='application/ld+json'):
        try:
            d = json.loads(s.string or '')
            if isinstance(d, dict) and d.get('@type') == 'Product': ld = d
        except Exception: pass
    main = main_content(soup)
    for t in main(['script', 'style', 'noscript']): t.decompose()

    # Intro paragraph + bullets: first long <p> and the first <ul> after it.
    intro = next((p for p in main.find_all('p') if len(text(p)) > 120 and not p.find_parent(class_='table-row')), None)
    features = []
    if intro:
        ul = intro.find_next('ul')
        if ul: features = [text(li) for li in ul.find_all('li') if text(li)]
    summary = None
    if intro:
        nxt = [p for p in intro.find_all_next('p', limit=12) if len(text(p)) > 60 and 'fire' in text(p).lower()]
        summary = text(nxt[0]) if nxt else None

    # Specs: .table-row pairs inside each tab
    specs = OrderedDict()
    for row in main.select('.table-row'):
        cells = row.select('.cell')
        if len(cells) < 2: continue
        label = text(cells[0]).rstrip(':')
        val_el = cells[1]
        for br in val_el.find_all('br'): br.replace_with('\n')
        lines = [re.sub(r'\s+', ' ', l).strip() for l in val_el.get_text('\n').split('\n')]
        lines = [l for l in lines if l]
        if label and lines and label not in specs:
            specs[label] = lines[0] if len(lines) == 1 else lines

    # Finishes: gallery-container h3 groups
    finishes = []
    for grid in main.select('.gallery-container .grid-wrap'):
        group = text(grid.find('h3'))
        for cell in grid.select('.image-grid > div'):
            img, cap = cell.find('img'), cell.find('p')
            if img and cap:
                finishes.append({'name': text(cap), 'group': group, 'image': absu(img.get('src'))})

    # Images: full-size links to uploads (inspiration + design options)
    gallery, options = [], []
    for a in main.find_all('a', href=True):
        h = absu(a['href'])
        if not re.search(r'/wp-content/uploads/.*\.(jpe?g|png|webp)$', h, re.I): continue
        title = a.get('data-envira-caption') or a.get('title') or ''
        if a.find_parent(class_='envira-gallery-wrap'):
            img = a.find('img')
            options.append({'name': html.unescape(title or (img.get('alt') if img else '') or ''), 'image': h})
        elif h not in gallery:
            gallery.append(h)

    # Documents: buttons grouped under h3 headings in the Resources section
    docs = []
    for col in main.select('.elementor-column, .e-con'):
        h3 = col.find('h3')
        if not h3: continue
        group = text(h3)
        if group not in ('Specification', 'Drawings', 'Technical', 'Sustainability'): continue
        for a in col.select('a.qodef-qi-button'):
            href = a.get('href', '#')
            label = text(a)
            if href and href != '#' and label:
                d = {'group': group, 'label': label, 'href': absu(href)}
                if d not in docs: docs.append(d)

    related = []
    rel_h = main.find(lambda t: t.name in ('h2', 'h3') and text(t) == 'Related Products')
    if rel_h:
        related = [text(h) for h in rel_h.find_all_next(class_='elementor-image-box-title', limit=3)]

    # Text fallback for pages whose intro isn't in <p>/<ul>: walk the visible lines.
    lines = [l.strip() for l in main.get_text('\n').split('\n') if l.strip()]
    long_i = next((i for i, l in enumerate(lines) if len(l) > 80), None)
    intro_text, heading_words = text(intro), []
    if long_i is not None:
        j = long_i
        while j > 0 and lines[j - 1] != 'Materialize': j -= 1
        heading_words = lines[j:long_i]
        if len(intro_text) < 80: intro_text = lines[long_i]
        if not features:
            end = lines.index('Inspiration', long_i) if 'Inspiration' in lines[long_i:] else long_i + 1
            features = [l for l in lines[long_i + 1:end] if len(l) < 140]
    plain_finishes = []
    if 'Finish & Colors' in lines and not finishes:
        i = lines.index('Finish & Colors')
        plain_finishes = lines[i + 1:lines.index('Resources', i)] if 'Resources' in lines[i:] else []
    heading = [text(h) for h in main.find_all(['h1', 'h2'], limit=6)]
    return {
        'slug': slug, 'title': title_of.get(slug, slug), 'url': f'{BASE}/{slug}/',
        'headings': heading, 'heroWords': heading_words, 'description': intro_text, 'plainFinishes': plain_finishes, 'ldDescription': (ld or {}).get('description'),
        'ldCategory': (ld or {}).get('category'), 'features': features, 'summary': summary,
        'specs': specs, 'finishes': finishes, 'gallery': gallery, 'designOptions': options,
        'documents': docs, 'related': related,
    }

def parse_listing(slug):
    """Category/material landing page: intro paragraph + product links."""
    soup = BeautifulSoup(fetch(f'{BASE}/{slug}/'), 'html.parser')
    main = main_content(soup)
    intro = next((text(p) for p in main.find_all('p') if len(text(p)) > 100), '')
    links = []
    for a in main.find_all('a', href=True):
        h = a['href'].rstrip('/').split('/')[-1]
        if h in title_of and h not in NON_PRODUCT and h not in links: links.append(h)
    faqs = []
    for q in main.select('.elementor-tab-title, .qodef-accordion-title, .e-n-accordion-item-title'):
        faqs.append(text(q))
    return {'slug': slug, 'title': title_of.get(slug), 'intro': intro, 'products': links, 'faqs': faqs}

def parse_resources():
    soup = BeautifulSoup(fetch(f'{BASE}/resources/'), 'html.parser')
    main = main_content(soup)
    out = []
    for a in main.find_all('a', href=True):
        h = a['href']
        if '/wp-content/uploads/' in h:
            # nearest preceding heading = product block
            head = a.find_previous(['h2', 'h3', 'h4', 'h5'])
            out.append({'product': text(head), 'label': text(a), 'href': absu(h)})
    return out

product_slugs = [p['slug'] for p in pages if p['slug'] not in NON_PRODUCT]
snapshot = {'source': BASE, 'products': [], 'listings': [], 'resources': [], 'portfolio': []}
for slug in sorted(product_slugs):
    print('product', slug)
    p = parse_product(slug)
    for f in p['finishes']:
        f['hex'] = swatch_hex(f['image'])
    snapshot['products'].append(p)
for slug in ['ceiling-tiles', 'ceiling-panels', 'ceiling-clouds', 'ceiling-baffles', 'wall-panels', 'wall-tiles',
             'wall-systems', 'pet-felt', 'silk-metal', 'wood', 'wood-wool']:
    print('listing', slug)
    snapshot['listings'].append(parse_listing(slug))
snapshot['resources'] = parse_resources()

for item in json.loads(re.sub(r'^[^\[]*', '', fetch(f'{BASE}/wp-json/wp/v2/portfolio?per_page=100'), count=1)):
    soup = BeautifulSoup(fetch(item['link']), 'html.parser')
    body = soup.select_one('[data-elementor-type="single-post"], article, main') or soup
    facts = {}
    for k in ('Market', 'Application', 'Material', 'Year', 'Product'):
        el = body.find(string=re.compile(rf'^\s*{k}\s*$'))
        if el:
            nxt = el.find_next(string=lambda s: s.strip())
            facts[k.lower()] = nxt.strip() if nxt else None
    paras = [text(p) for p in body.find_all('p') if len(text(p)) > 80]
    imgs = [absu(i.get('src')) for i in body.find_all('img') if '/uploads/' in (i.get('src') or '')]
    snapshot['portfolio'].append({'slug': item['slug'], 'name': html.unescape(item['title']['rendered']),
                                  'url': item['link'], 'story': paras[:1], 'facts': facts, 'images': imgs})

json.dump(snapshot, open(OUT, 'w'), indent=1)
print('wrote', OUT, len(snapshot['products']), 'products')
