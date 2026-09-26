from pathlib import Path
import shutil, hashlib, json, zipfile
b=Path(__file__).resolve().parent.parent
files=['index.html','styles.css','app.js','scrollcraft.css','scrollcraft.js','assets/favicon.png','assets/skm-logo.png','assets/portrait-samuel-v3.webp','assets/fonts/hanken-grotesk.woff2','assets/fonts/LICENSE.txt']
files += ['projects/'+k+'.html' for k in ['security','rabah','lumos','employed','frontdesk']] + ['projects/project.css','projects/project.js']
files += ['assets/projects/'+x+'.webp' for x in ['security-mark','frontdesk-mark','rabah-website','lumos-console','employed-demo']]
site=b/'site';site.mkdir(exist_ok=True)
for path in files:
 dest=site/path;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(b/path,dest)
# Remove only stale generated package files; source assets and prior screenshots stay intact.
for path in site.rglob('*'):
 if path.is_file() and str(path.relative_to(site)) not in files:path.unlink()
manifest=[dict(file=f,bytes=(site/f).stat().st_size,sha256=hashlib.sha256((site/f).read_bytes()).hexdigest()) for f in sorted(files)]
(b/'package-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
with zipfile.ZipFile(b/'samuel-king-mensah-portfolio.zip','w',zipfile.ZIP_DEFLATED) as z:
 for f in files:z.write(site/f,f)
print(f'Packaged {len(files)} files; ZIP {(b/"samuel-king-mensah-portfolio.zip").stat().st_size} bytes')
