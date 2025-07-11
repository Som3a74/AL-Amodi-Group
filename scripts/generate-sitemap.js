import { writeFile, readFile } from 'fs/promises';
import { resolve } from 'path';

async function generateSitemap() {
  const baseUrl = 'https://www.alamoudigroup.com'; // Please change this to your actual domain
  const sitemapPath = resolve('public', 'sitemap.xml');
  const productsPath = resolve('src', 'data', 'products.json');

  try {
    // Read products data
    const productsFile = await readFile(productsPath, 'utf8');
    const { products } = JSON.parse(productsFile);

    // Get all unique categories
    const categories = [...new Set(products.map(p => p.category))];
    
    // Get all product IDs
    const productIds = products.map(p => p.id);

    const staticRoutes = [
      '/',
      '/contact',
      '/products',
      '/cart',
    ];

    const today = new Date().toISOString();

    const sitemapEntries = [
      // Static routes
      ...staticRoutes.map(route => ({
        loc: `${baseUrl}${route}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.8',
      })),
      // Category pages
      ...categories.map(category => ({
        loc: `${baseUrl}/category/${encodeURIComponent(category)}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.7',
      })),
      // Product pages
      ...productIds.map(id => ({
        loc: `${baseUrl}/products/${id}`,
        lastmod: today,
        changefreq: 'monthly',
        priority: '0.6',
      })),
    ];

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `
  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>
`).join('')}
</urlset>`;

    await writeFile(sitemapPath, sitemapXml);
    console.log(`Sitemap generated successfully at ${sitemapPath}`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap(); 