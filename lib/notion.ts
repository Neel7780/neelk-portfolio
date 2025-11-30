import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const extractDatabaseId = (idOrUrl: string): string => {
  if (!idOrUrl) return "";
  // If it's a URL, extract the ID (last 32 chars usually, or regex match)
  const match = idOrUrl.match(/([a-fA-F0-9]{32}|[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})/);
  const id = match ? match[0] : idOrUrl;

  if (id.length === 32) {
    return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
  }
  return id;
};

const queryDatabase = async (id: string, sorts: any[]) => {
  try {
    // Using raw fetch because the Notion SDK is behaving erratically in this environment
    const response = await fetch(`https://api.notion.com/v1/databases/${id}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NOTION_SECRET}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sorts }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Notion API error: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    return await response.json();
  } catch (error: any) {
    // Check if it's a "Page ID" issue (which might manifest as 400 Invalid Request URL)
    if (error.message.includes('invalid_request_url') || error.message.includes('400')) {
      console.log(`Database query failed for ID ${id}. Checking if it's a Page with an inline database...`);
      // Try to fetch children to find a database
      try {
        const childrenResponse = await fetch(`https://api.notion.com/v1/blocks/${id}/children`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${process.env.NOTION_SECRET}`,
            "Notion-Version": "2022-06-28",
          },
        });
        
        if (childrenResponse.ok) {
          const children = await childrenResponse.json();
          const childDb = children.results.find((b: any) => b.type === 'child_database');
          if (childDb) {
            console.log(`Found child database: ${childDb.id}. Retrying query...`);
            return await queryDatabase(childDb.id, sorts);
          }
        }
      } catch (childError) {
        console.warn("Failed to check for child database:", childError);
      }
    }
    throw error;
  }
};

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export interface Experience {
  id: string;
  role: string;
  org: string;
  date: string;
  description: string;
}

export const getProjects = async (): Promise<Project[]> => {
  if (!process.env.NOTION_SECRET || !process.env.NOTION_PROJECTS_DB_ID) {
    console.warn("Notion credentials missing, using fallback data for Projects.");
    return [
      {
        id: "1",
        title: "AlgoVisualizer",
        tags: ["C++", "DSA"],
        description: "Interactive pathfinding algorithm visualizer with real-time animation and step-by-step execution.",
        link: "#",
      },
      {
        id: "2",
        title: "CampusConnect",
        tags: ["MERN Stack"],
        description: "Student collaboration platform for project teams, study groups, and campus events.",
        link: "#",
      },
      {
        id: "3",
        title: "DevPortfolio",
        tags: ["Next.js"],
        description: "High-performance personal website with flashlight reveal interaction and smooth animations.",
        link: "#",
      },
    ];
  }

  try {
    const databaseId = extractDatabaseId(process.env.NOTION_PROJECTS_DB_ID!);
    console.log(`Fetching projects from database ID: ${databaseId}`);
    
    const response = await queryDatabase(databaseId, [
      {
        timestamp: "created_time",
        direction: "ascending",
      },
    ]) as any;

    return response.results.map((page: any) => {
      return {
        id: page.id,
        title: page.properties.Name?.title[0]?.plain_text || "Untitled",
        description: page.properties.Description?.rich_text[0]?.plain_text || "",
        tags: page.properties.Tags?.multi_select.map((tag: any) => tag.name) || [],
        link: page.properties.Link?.url || "#",
      };
    });
  } catch (error: any) {
    console.error("Failed to fetch projects from Notion:", error.message || error);
    if (error.code === 'object_not_found') {
      console.error("HINT: The database ID was not found. Make sure you have shared the database with the 'Neel Portfolio' integration.");
    } else if (error.code === 'invalid_request_url') {
      console.error("HINT: The request URL was invalid. This usually means the ID provided is for a Page, not a Database. Please ensure you are using a Database ID.");
    }
    return [
      {
        id: "1",
        title: "AlgoVisualizer",
        tags: ["C++", "DSA"],
        description: "Interactive pathfinding algorithm visualizer with real-time animation and step-by-step execution.",
        link: "#",
      },
      {
        id: "2",
        title: "CampusConnect",
        tags: ["MERN Stack"],
        description: "Student collaboration platform for project teams, study groups, and campus events.",
        link: "#",
      },
      {
        id: "3",
        title: "DevPortfolio",
        tags: ["Next.js"],
        description: "High-performance personal website with flashlight reveal interaction and smooth animations.",
        link: "#",
      },
    ];
  }
};

export const getExperience = async (): Promise<Experience[]> => {
  if (!process.env.NOTION_SECRET || !process.env.NOTION_EXPERIENCE_DB_ID) {
    console.warn("Notion credentials missing, using fallback data for Experience.");
    return [
      {
        id: "1",
        role: "Core Team Member",
        org: "Google Developer Groups (GDG) on Campus DAU",
        date: "2024 - Present",
        description: "Organizing technical workshops, hackathons, and mentoring students in web technologies.",
      },
      {
        id: "2",
        role: "Freelance Full Stack Developer",
        org: "Open for Hire",
        date: "Present",
        description: "Building high-performance web applications for clients using Next.js and MERN Stack.",
      },
    ];
  }

  try {
    const databaseId = extractDatabaseId(process.env.NOTION_EXPERIENCE_DB_ID!);
    console.log(`Fetching experience from database ID: ${databaseId}`);
    
    const response = await queryDatabase(databaseId, [
      {
        property: "Date", 
        direction: "descending",
      },
    ]) as any;

    return response.results.map((page: any) => {
      return {
        id: page.id,
        role: page.properties.Role?.title[0]?.plain_text || "Untitled Role",
        org: page.properties.Organization?.rich_text[0]?.plain_text || "",
        date: page.properties.Date?.rich_text[0]?.plain_text || "",
        description: page.properties.Description?.rich_text[0]?.plain_text || "",
      };
    });
  } catch (error: any) {
    console.error("Failed to fetch experience from Notion:", error.message || error);
    if (error.code === 'object_not_found') {
      console.error("HINT: The database ID was not found. Make sure you have shared the database with the 'Neel Portfolio' integration.");
    } else if (error.code === 'invalid_request_url') {
      console.error("HINT: The request URL was invalid. This usually means the ID provided is for a Page, not a Database. Please ensure you are using a Database ID.");
    }
    return [
      {
        id: "1",
        role: "Core Team Member",
        org: "Google Developer Groups (GDG) on Campus DAU",
        date: "2024 - Present",
        description: "Organizing technical workshops, hackathons, and mentoring students in web technologies.",
      },
      {
        id: "2",
        role: "Freelance Full Stack Developer",
        org: "Open for Hire",
        date: "Present",
        description: "Building high-performance web applications for clients using Next.js and MERN Stack.",
      },
    ];
  }
};
