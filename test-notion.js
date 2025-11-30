const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: "secret_placeholder",
});

console.log("Notion Client initialized");
console.log("Keys on notion.databases:", Object.keys(notion.databases));

// Test if we can use request directly
try {
    console.log("notion.request exists:", typeof notion.request);
} catch (e) {
    console.error(e);
}
