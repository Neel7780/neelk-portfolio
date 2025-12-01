const fetch = globalThis.fetch || require('node-fetch');

function extractDatabaseId(idOrUrl) {
  if (!idOrUrl) return '';
  const match = idOrUrl.match(/([a-fA-F0-9]{32}|[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})/);
  const id = match ? match[0] : idOrUrl;
  if (id.length === 32) return `${id.slice(0,8)}-${id.slice(8,12)}-${id.slice(12,16)}-${id.slice(16,20)}-${id.slice(20)}`;
  return id;
}

(async ()=>{
  const raw = process.env.NOTION_EXPERIENCE_DB_ID;
  const id = extractDatabaseId(raw);
  console.log('Extracted:', id);

  const headers = {
    'Authorization': `Bearer ${process.env.NOTION_SECRET}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
  };

  // Check blocks children for child_database
  const childrenRes = await fetch(`https://api.notion.com/v1/blocks/${id}/children`, { headers });
  const children = await childrenRes.json();
  const childDb = children.results.find(b => b.type === 'child_database');
  console.log('Found child DB:', childDb?.id);
  if (!childDb) return;
  const dbId = childDb.id;

  // Query database via raw fetch
  const qRes = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, { method: 'POST', headers, body: JSON.stringify({ page_size: 1 }) });
  const data = await qRes.json();
  const page = data.results[0];
  console.log('Available properties:', Object.keys(page.properties));
  console.log('Properties:', JSON.stringify(page.properties, null, 2));
})();