"""Turn research/site-snapshot.json into packages/content/*.json.

Usage: python3 research/build_content.py
Real content comes from materiallogiq.com. Anything invented is marked
`"placeholder": true` (sample projects) or noted in `_note`.
"""
import json, os, re
from collections import OrderedDict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
snap = json.load(open(os.path.join(ROOT, 'research/site-snapshot.json')))
OUT = os.path.join(ROOT, 'packages/content')
SRC = 'Content scraped from materiallogiq.com (see research/). Images and documents link to the live site.'

def slugify(s): return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

listings = {l['slug']: l for l in snap['listings']}

# --- Taxonomy -------------------------------------------------------------
categories = [
    {'slug': 'ceiling-tiles', 'name': 'Ceiling Tiles', 'group': 'Ceilings'},
    {'slug': 'ceiling-panels', 'name': 'Ceiling Panels', 'group': 'Ceilings'},
    {'slug': 'ceiling-clouds', 'name': 'Ceiling Clouds', 'group': 'Ceilings'},
    {'slug': 'ceiling-baffles', 'name': 'Ceiling Baffles', 'group': 'Ceilings'},
    {'slug': 'wall-panels', 'name': 'Wall Panels', 'group': 'Walls'},
    {'slug': 'wall-tiles', 'name': 'Wall Tiles', 'group': 'Walls'},
]
for c in categories:
    c['summary'] = listings[c['slug']]['intro']
    c['faqs'] = listings[c['slug']]['faqs']

materials = [
    {'slug': 'pet-felt', 'name': 'PET Felt'},
    {'slug': 'silk-metal', 'name': 'Silk Metal', 'aka': 'Micro-perforated aluminum'},
    {'slug': 'wood', 'name': 'Wood'},
    {'slug': 'wood-wool', 'name': 'Wood Wool'},
]
for m in materials:
    m['summary'] = listings[m['slug']]['intro']
    m['faqs'] = listings[m['slug']]['faqs']

def material_of(p):
    t = p['title'].lower()
    if 'silk metal' in t: return 'silk-metal'
    if 'wood wool' in t: return 'wood-wool'
    if 'wood slat' in t: return 'wood'
    return 'pet-felt'

KEYWORDS = [('baffle', 'ceiling-baffles'), ('cloud', 'ceiling-clouds'), ('squell', 'ceiling-clouds'),
            ('trell', 'ceiling-clouds'), ('ceiling tile', 'ceiling-tiles'), ('grille', 'ceiling-panels'),
            ('linear', 'ceiling-panels'), ('ceiling and wall', 'ceiling-panels'), ('panel', 'wall-panels')]

def types_of(p):
    found = [c['slug'] for c in categories if p['slug'] in listings[c['slug']]['products']]
    t = p['title'].lower()
    for kw, cat in KEYWORDS:
        if kw in t and cat not in found: found.append(cat)
    order = [c['slug'] for c in categories]
    return sorted(set(found), key=order.index)

def display_name(p):
    t = p['title']
    if ' – ' in t:
        tail = t.split(' – ', 1)[1].strip()
        return t.split(' – ')[0] if tail.lower().startswith('ceiling and wall') else tail.upper()
    return t

NAMES = {}
for p in snap['products']:
    NAMES[p['slug']] = display_name(p)

def first_sentence(s, limit=150):
    s = re.sub(r'\s+', ' ', s or '').strip()
    m = re.match(r'(.+?[.!?])(\s|$)', s)
    out = m.group(1) if m else s
    return out if len(out) <= limit else out[:limit].rsplit(' ', 1)[0] + '…'

def nrc_of(specs):
    vals = []
    for k, v in specs.items():
        if 'nrc' in k.lower():
            for x in (v if isinstance(v, list) else [v]):
                vals += [float(n) for n in re.findall(r'\d?\.\d+', x)]
    return max(vals) if vals else None

def fire_of(specs):
    for k, v in specs.items():
        if 'fire' in k.lower():
            s = ' '.join(v) if isinstance(v, list) else v
            m = re.search(r'Class\s*-?\s*([ABC])', s, re.I)
            if m: return m.group(1).upper()
    return None

PLAIN_HEX = {'Painted': '#7d8b84', 'Primed Clear': '#b9a27c', 'Primed White': '#e8e4da'}

def match_related(label, self_slug):
    words = [w for w in re.findall(r'[A-Za-z]+', label) if len(w) > 2]
    best, score = None, 0
    for slug, name in NAMES.items():
        if slug == self_slug: continue
        hay = (slug + ' ' + name).lower()
        s = sum(2 if w.isupper() and w.lower() in hay else (1 if w.lower() in hay else 0) for w in words)
        if name.lower() in label.lower(): s += 5
        if s > score: best, score = slug, s
    return best

def token(name): return re.sub(r'[^a-z]', '', name.lower())

def photo_score(url, slug):
    """Prefer photos named after this product; demote photos named after other products."""
    fname = token(url.rsplit('/', 1)[-1])
    own = token(NAMES[slug])
    score = 3 if own and own in fname else 0
    score += sum(1 for w in slug.split('-')[-2:] if len(w) > 3 and w in fname)
    score -= sum(2 for s, n in NAMES.items() if s != slug and len(token(n)) > 3 and token(n) in fname and token(n) not in own)
    return score

FEATURED = ['pet-felt-ceiling-tiles-coffa', 'silk-metal-baffles', 'wood-slat-panels-slatta', 'wood-wool-engraved-panels']

products = []
for p in snap['products']:
    specs = OrderedDict((k.strip(), v) for k, v in p['specs'].items())
    finishes = [{'name': f['name'], 'hex': f['hex'] or '#cccccc', 'group': f['group'], 'image': f['image']} for f in p['finishes']]
    if not finishes:
        finishes = [{'name': n, 'hex': PLAIN_HEX.get(n, '#cccccc'), 'group': 'Finishes', 'image': None} for n in p['plainFinishes']]
    gallery = [g for g in p['gallery'] if not re.search(r'logo|favicon|Gemini|removebg', g, re.I)]
    gallery.sort(key=lambda g: -photo_score(g, p['slug']))
    related = []
    for r in p['related']:
        m = match_related(r, p['slug'])
        if m and m not in related: related.append(m)
    nrc = nrc_of(specs)
    if nrc is None:  # some pages only state NRC in the feature bullets
        for f_ in p['features']:
            if 'NRC' in f_: nrc = max(float(n) for n in re.findall(r'\d?\.\d+', f_))
    types = types_of(p)
    products.append({
        'slug': p['slug'],
        'name': NAMES[p['slug']],
        'fullName': p['title'],
        'material': material_of(p),
        'category': types[0],
        'types': types,
        'tagline': first_sentence(p['ldDescription'] or p['description']),
        'description': p['description'],
        'features': p['features'],
        'specs': specs,
        'attributes': {'fireRating': fire_of(specs), 'nrc': nrc, 'acoustic': nrc is not None},
        'finishes': finishes,
        'designOptions': [o for o in p['designOptions'] if o['name']],
        'images': {'hero': gallery[0] if gallery else None, 'gallery': gallery[:10]},
        'related': related,
        'featured': p['slug'] in FEATURED,
        'source': p['url'],
    })

# --- Resources -------------------------------------------------------------
TYPE_OF = {
    'Data Sheet': 'data-sheet', 'CSI Spec': 'csi-spec', 'Installation Instructions': 'installation',
    'Cleaning Guide': 'care', 'Care & Maintenance': 'care', 'CSI Specs': 'csi-spec', 'Warranty': 'warranty', 'Standard Details': 'details',
    'Acoustical Tests': 'tests', 'Fire Tests': 'tests', 'Light Reflectance': 'tests', 'SDS': 'sds',
    'LEED Contributions': 'sustainability', 'HPD': 'sustainability', 'VOC Emissions': 'sustainability',
}
resource_types = [
    {'slug': 'data-sheet', 'name': 'Data Sheets'}, {'slug': 'csi-spec', 'name': 'CSI Specs'},
    {'slug': 'installation', 'name': 'Installation'}, {'slug': 'cad', 'name': 'CAD & BIM'},
    {'slug': 'details', 'name': 'Standard Details'}, {'slug': 'tests', 'name': 'Test Reports'},
    {'slug': 'sustainability', 'name': 'Sustainability'}, {'slug': 'sds', 'name': 'Safety Data Sheets'},
    {'slug': 'care', 'name': 'Cleaning & Care'}, {'slug': 'warranty', 'name': 'Warranty'},
]
by_href = OrderedDict()
pmap = {p['slug']: p for p in products}
for p in snap['products']:
    for d in p['documents']:
        rec = by_href.setdefault(d['href'], {'label': d['label'], 'products': []})
        if p['slug'] not in rec['products']: rec['products'].append(p['slug'])
mat_name = {m['slug']: m['name'] for m in materials}
resources = []
for href, rec in by_href.items():
    label = re.sub(r'\s*\(?zip( file)?\)?$', '', rec['label']).strip()
    if label == 'CSI Specs': label = 'CSI Spec'
    rtype = 'cad' if re.match(r'^(DWG|SKP|RFA|OBJ|STP|3DM)$', label) else TYPE_OF.get(label, 'details' if 'Detail' in label else None)
    assert rtype, f'unmapped document label {label!r}'
    ext = href.rsplit('.', 1)[-1].upper()
    fmt = label if rtype == 'cad' else ext
    prods = rec['products']
    mats = sorted({pmap[s]['material'] for s in prods})
    if len(prods) == 1:
        title = f"{pmap[prods[0]]['name']} {label}"
    elif len(mats) == 1:
        title = f"{mat_name[mats[0]]} {label}"
    else:
        title = label
    if rtype == 'cad': title += ' files'
    m = re.search(r'/uploads/(\d{4})/(\d{2})/', href)
    resources.append({
        'id': slugify(href.rsplit('/', 1)[-1].rsplit('.', 1)[0]),
        'title': title, 'type': rtype, 'products': prods, 'materials': mats,
        'format': fmt, 'size': None, 'updated': f'{m.group(1)}-{m.group(2)}' if m else None, 'href': href,
    })

# --- Projects --------------------------------------------------------------
sectors = ['Education', 'Government', 'Hospitality', 'Office', 'Transportation']
steak = snap['portfolio'][0]
steak_imgs = [i for i in dict.fromkeys(steak['images']) if 'Steakhouse' in i]
projects = [
    {
        'slug': '16-prime-steakhouse', 'name': '16 Prime Steakhouse', 'sector': 'Hospitality',
        'location': 'Kansas City, MO', 'year': 2024, 'architect': None, 'size': None,
        'summary': 'Custom PET felt clouds that shape an intimate, luxurious dining room.',
        'story': steak['story'], 'quote': None, 'products': [], 'materials': ['pet-felt'],
        'applications': ['Clouds'], 'custom': True, 'images': steak_imgs, 'featured': True,
        'placeholder': False, 'source': steak['url'],
    },
    {
        'slug': 'middle-school-remodel-mn', 'name': 'Middle School Remodel', 'sector': 'Education',
        'location': 'Minnesota', 'year': None, 'architect': None, 'size': None,
        'summary': 'A featured Materialize project combining PET felt clouds, baffles, and ceiling tiles.',
        'story': ['Featured on the Materialize page as an example of the Listen, Explore, Filter, Realize, Fulfill process. Project details to come.'],
        'quote': None, 'products': [], 'materials': ['pet-felt'], 'applications': ['Clouds', 'Baffles', 'Ceiling Tiles'],
        'custom': True, 'images': ['https://materiallogiq.com/wp-content/uploads/2023/11/Materialize-Middle-School-MN.jpg'],
        'featured': True, 'placeholder': False, 'source': 'https://materiallogiq.com/materialize/',
    },
]
SETTINGS = [  # filename keyword -> (setting label, sector)
    ('ConferenceRoom', 'Conference Room', 'Office'), ('Office', 'Open Office', 'Office'),
    ('Station', 'Transit Station', 'Transportation'), ('Airport', 'Airport Concourse', 'Transportation'),
    ('Classroom', 'Classroom', 'Education'), ('Library', 'Library', 'Education'), ('School', 'School Commons', 'Education'),
    ('Restaurant', 'Restaurant', 'Hospitality'), ('Hotel', 'Hotel Lobby', 'Hospitality'), ('Lobby', 'Lobby', 'Office'),
    ('SwimmingPool', 'Aquatic Center', 'Government'), ('Gym', 'Recreation Center', 'Government'),
    ('Courthouse', 'Courthouse', 'Government'), ('Reception', 'Reception', 'Office'),
]
used_settings = set()
for p in products:
    for img in p['images']['gallery']:
        fname = img.rsplit('/', 1)[-1]
        if 'healthcare' in fname.lower(): continue  # no healthcare market on the site
        for kw, label, sector in SETTINGS:
            if kw.lower() in fname.lower() and label not in used_settings:
                used_settings.add(label)
                projects.append({
                    'slug': slugify(f"{label} {p['name']}"), 'name': f"{label} with {p['name']}",
                    'sector': sector, 'location': 'Sample project', 'year': None, 'architect': None, 'size': None,
                    'summary': f"Placeholder case study built from a real {p['name']} inspiration photo. Replace with a real project.",
                    'story': ['Placeholder narrative: describe the design challenge, the client\'s goals, and the constraints the team worked within.',
                              'Explain how the specified materials solved acoustic, durability, or aesthetic problems.'],
                    'quote': None, 'products': [p['slug']] + p['related'][:1], 'materials': [p['material']],
                    'applications': [], 'custom': False, 'images': [img], 'featured': False, 'placeholder': True, 'source': None,
                })
                break
        if len(projects) >= 10: break
    if len(projects) >= 10: break

# --- Site -----------------------------------------------------------------
site = {
    '_note': SRC,
    'name': 'Material Logiq',
    'tagline': 'Where fabrication meets imagination.',
    'intro': "With a 40-year history of delivering best-in-class acoustical and architectural products and solutions, we are proving what's possible when you pair deep industry expertise with a genuine desire to solve everyday design challenges.",
    'stats': [
        {'value': '40 yrs', 'label': 'acoustical and architectural expertise'},
        {'value': str(len(products)), 'label': 'product systems'},
        {'value': str(len(materials)), 'label': 'core materials'},
    ],
    'values': [
        {'title': 'Experienced, yet scrappy', 'text': "Loaded with knowledge, curiosity, and a passion for tackling your project's unique challenges."},
        {'title': 'Imaginative and collaborative', 'text': "With a true spirit to solve the unsolvable and discover what's next."},
        {'title': 'Practical ingenuity', 'text': 'Designing products that are long on purpose and aesthetics, short on wasteful, tedious processes.'},
    ],
    'process': [
        {'step': 'Listen', 'text': 'Clarify your vision and constraints.'},
        {'step': 'Explore', 'text': 'Create solution options.'},
        {'step': 'Filter', 'text': 'Construct a quote.'},
        {'step': 'Realize', 'text': 'Craft your vision.'},
        {'step': 'Fulfill', 'text': 'Deliver on site, on time, on budget.'},
    ],
    'materialize': {
        'title': 'Materialize',
        'text': "Our process starts by saying “Yes,” then we solve. We listen and understand what needs to be accomplished and customize solutions to your specification. Then we build it. That's Materialize.",
    },
    'sampleLimit': 8,
    'contact': {'email': 'sales@materiallogiq.com', 'phone': '800.220.8412', 'address': '123 Columbia Ct North, Chaska, MN 55318'},
    'nav': [{'label': 'Products', 'href': '/products'}, {'label': 'Projects', 'href': '/projects'}, {'label': 'Resources', 'href': '/resources'}],
}

def w(name, obj):
    with open(os.path.join(OUT, name), 'w') as f:
        f.write(json.dumps(obj, indent=2, ensure_ascii=False) + '\n')

w('site.json', site)
w('products.json', {'_note': SRC, 'categories': categories, 'materials': materials, 'products': products})
w('projects.json', {'_note': SRC + ' Projects with "placeholder": true are invented from inspiration photos.', 'sectors': sectors, 'projects': projects})
w('resources.json', {'_note': SRC + ' File sizes are not published on the site.', 'types': resource_types, 'resources': resources})
print(len(products), 'products', len(resources), 'resources', len(projects), 'projects')
for p in projects: print(' ', p['name'], p['sector'], p['products'])
