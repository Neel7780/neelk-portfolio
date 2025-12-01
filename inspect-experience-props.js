const fetch = globalThis.fetch || require('node-fetch');
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_SECRET });

function extractDatabaseId(idOrUrl) {
  if (!idOrUrl) return '';
  const match = idOrUrl.match(/([a-fA-F0-9]{32}|[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})/);
  const id = match ? match[0] : idOrUrl;
  if (id.length === 32) return `${id.slice(0,8)}-${id.slice(8,12)}-${id.slice(12,16)}-${id.slice(16,20)}-${id.slice(20)}`;
  return id;
}

(async ()=>{
  const raw = process.env.NOTION_EXPERIENCE_DB_ID;
  console.log('Raw:', raw);
  const id = extractDatabaseId(raw);
  console.log('Extracted:', id);
  try{
    const page = await notion.request({ path: `pages/${id}`, method: 'get' });
    console.log('It is a page with title:', page.properties?.title || 'N/A');
    const children = await notion.request({ path: `blocks/${id}/children`, method: 'get' });
    const childDb = children.results.find(b => b.type === 'child_database');
    if(childDb) {
      console.log('Found childDB id:', childDb.id);
      const db = await notion.request({ path: `databases/${childDb.id}`, method: 'get' });
      console.log('DB title:', db.title?.[0]?.plain_text);
      // query one page
      const res = await notion.request({ path: `databases/${childDb.id}/query`, method: 'post', body: { page_size:1 } });
      const p = res.results[0];
      console.log('Available Properties:', Object.keys(p.properties));
      console.log('Full properties JSON:', JSON.stringify(p.properties, null, 2));
    } else {
      console.log('Not a page or no child DB');
    }
  }catch(e){
    console.error(e);
  }
})();