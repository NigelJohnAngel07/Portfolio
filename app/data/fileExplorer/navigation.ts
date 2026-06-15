import home from "/assets/home.svg";
import info from "/assets/info.svg";
import stack from "/assets/stack.svg";
import folderIcon from "/assets/folderIcon.svg";
import documents from "/assets/documents.svg";
import imageIcon from "/assets/imageIcon.svg" 

export type FileType = 'Folder' | 'PDF' | 'tech' | 'project';

export interface FileItem {
  name: string;
  type: FileType;
  icon: string;
  size: string;
  Date?: string;
  Description?: string;
  content?: string;
  category?: string;
  children?: FileItem[];
}

export const navigation: FileItem[] = [
  {
    name: "Home",
    type: "Folder",
    icon: home,
    size: "6 Items",
    children: [
      {
        name: "About",
        type: "Folder",
        icon: info,
        size: "1 item",
        children: [{ name: "about.pdf", type: "PDF", icon: "/assets/pdf.svg", size: "2 MB", content: "ABOUT_VIEW" }]
      },
      {
        name: "Tech Stack",
        type: "Folder",
        icon: stack,
        size: "18 items",
        children: [
          // Languages
          { name: "Python", type: "tech", icon: "/assets/python.svg", size: "1 KB", category: "Languages" },
          { name: "C", type: "tech", icon: "/assets/c.svg", size: "1 KB", category: "Languages" },
          { name: "C++", type: "tech", icon: "/assets/cpp.svg", size: "1 KB", category: "Languages" },
          { name: "Java", type: "tech", icon: "/assets/java.svg", size: "1 KB", category: "Languages" },
          { name: "TypeScript", type: "tech", icon: "/assets/typescript.svg", size: "1 KB", category: "Languages" },
          { name: "PHP", type: "tech", icon: "/assets/php.svg", size: "1 KB", category: "Languages" },
          
          // Frameworks & Libraries
          { name: "React.js", type: "tech", icon: "/assets/react.svg", size: "1 KB", category: "Frameworks & Libraries" },
          { name: "Tailwind CSS", type: "tech", icon: "/assets/tailwind.svg", size: "1 KB", category: "Frameworks & Libraries" },
          { name: "React Router v7", type: "tech", icon: "/assets/react-router.svg", size: "1 KB", category: "Frameworks & Libraries" },
          { name: "Laravel", type: "tech", icon: "/assets/laravel.svg", size: "1 KB", category: "Frameworks & Libraries" },
          { name: "Spring Boot", type: "tech", icon: "/assets/spring-boot.svg", size: "1 KB", category: "Frameworks & Libraries" },
          
          // Databases & Cloud
          { name: "PostgreSQL", type: "tech", icon: "/assets/postgresql.svg", size: "1 KB", category: "Databases & Cloud" },
          { name: "MySQL", type: "tech", icon: "/assets/mysql.svg", size: "1 KB", category: "Databases & Cloud" },
          { name: "AWS", type: "tech", icon: "/assets/aws.svg", size: "1 KB", category: "Databases & Cloud" },
          
          // Tools & Methodologies
          { name: "Git", type: "tech", icon: "/assets/git.svg", size: "1 KB", category: "Tools & Methodologies" },
          { name: "Linux", type: "tech", icon: "/assets/linux.svg", size: "1 KB", category: "Tools & Methodologies" },
          { name: "Postman", type: "tech", icon: "/assets/postman.svg", size: "1 KB", category: "Tools & Methodologies" },
          { name: "Figma", type: "tech", icon: "/assets/figma.svg", size: "1 KB", category: "Tools & Methodologies" },
        ]
      },
      {
        name: "Projects",
        type: "Folder",
        icon: folderIcon,
        size: "1 item",
        children: [{ name: "ReClaim.pdf", type: "project", icon: "/assets/pdf.svg", size: "5 MB", content: "RECLAIM_VIEW", Date: "2025", Description: "Sustainability app" }]
      },
      { name: "Certification", type: "Folder", icon: documents, size: "0 Item", children: [] },
      { name: "Photos", type: "Folder", icon: imageIcon, size: "0 Item", children: [] },
      { name: "resume.pdf", type: "PDF", icon: "/assets/pdf.svg", size: "1.2 MB", content: "RESUME_VIEW", Description: "Sustainability app" }
    ]
  }
];