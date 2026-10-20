export const email = 'rajputminesh22@gmail.com';
export const profiles = [
  { label: 'GitHub', href: 'https://github.com/mineshrajput22' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mineshrajput22' },
  { label: 'Email', href: `mailto:${email}` },
];
export const projects = [
  {
    number: '01', name: 'NoteStack.AI', category: 'Personal project', year: '2026',
    image: '/images/projects/notestack-homepage.webp',
    alt: 'NoteStack.AI homepage introducing notes and editable action plans with a dashboard preview',
    description: 'A place for notes to become next steps. Review an AI-generated plan, keep what helps, and move tasks onto a board.',
    stack: ['React', 'TypeScript', 'Express', 'MongoDB', 'Gemini'],
    live: 'https://notestack-ai.101mineshrajput.workers.dev/',
    code: 'https://github.com/mineshrajput22/NoteStack.AI',
    role: 'Full-stack development',
    contribution: 'Built the notes workspace, authentication, APIs, and Kanban workflow.',
    detail: 'I built the notes workspace, authentication, APIs, and Kanban workflow. The interesting part was deciding how much context to give the AI: related notes are ranked, responses are validated with Zod, and unchanged results are cached. Suggestions stay editable, with a fallback when the AI cannot produce a usable plan.',
  },
  {
    number: '02', name: 'Chequers9', category: 'Client commission', year: '',
    image: '/images/projects/chequers9-homepage.webp',
    alt: 'Chequers9 architecture studio website showing its project-led homepage',
    description: 'An architecture studio’s work, given room to breathe. A responsive website with project imagery and an interactive 3D introduction.',
    stack: ['React', 'Three.js', 'Tailwind CSS'],
    live: 'https://chequers9architects.com/',
    code: 'https://github.com/mineshrajput22/Chequers9',
    role: 'Design, development & deployment',
    contribution: 'Handled the client website from design through deployment and maintenance.',
    detail: 'I handled the entire commission independently, from design through deployment and maintenance. The focus was making projects easy to browse on a phone while keeping large images and the 3D scene lightweight. Responsive images and deferred scene loading keep the work accessible before the visual effects arrive.',
  },
  {
    number: '03', name: 'DropDox', category: 'Personal project', year: '',
    image: '/images/projects/dropdox-homepage.webp', alt: 'DropDox public homepage with image storage introduction and sign-in links',
    description: 'A file-storage app for uploading, organising, and finding documents. Built around a straightforward drag-and-drop workflow.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Clerk'],
    live: 'https://drop-dox-app.vercel.app',
    code: 'https://github.com/mineshrajput22/DropDox',
    role: 'Full-stack development',
    contribution: 'Built file management, Clerk authentication, and ImageKit uploads backed by PostgreSQL.',
    detail: 'I built the application with Next.js and TypeScript, connected Clerk authentication with an OTP flow, and integrated ImageKit uploads. The file-management interface includes starred items and trash, backed by PostgreSQL.',
  },
  {
    number: '04', name: 'Architectural Walkthrough', category: 'Client commission', year: '',
    image: '/images/projects/walkthrough-homepage.webp', alt: 'Architectural Walkthrough public interface with a guided apartment view and room navigation',
    description: 'An interactive architectural walkthrough, bringing a space into the browser so it can be explored online.',
    stack: ['JavaScript', 'Interactive web'],
    live: 'https://architectural-walkthrough-demo.101mineshrajput.workers.dev/',
    code: 'https://github.com/mineshrajput22/architectural-walkthrough-demo',
    role: 'Design, development & deployment',
    contribution: 'Designed, developed, deployed, and maintained the interactive walkthrough.',
    detail: 'An independent client commission. I handled design, development, deployment, and maintenance, taking the experience from the initial idea to a live website.',
  },
];
export const skillGroups = [
  { label: 'INTERFACE', title: 'What you interact with', description: 'Responsive interfaces, reusable components, and interactive 3D experiences.', core: ['React', 'TypeScript'], items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Redux Toolkit', 'TanStack Query', 'Tailwind CSS', 'Three.js'] },
  { label: 'SYSTEMS', title: 'What makes it work', description: 'APIs, authentication, and data that carry a feature beyond the screen.', core: ['Node.js', 'PostgreSQL'], items: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'PostgreSQL', 'JWT'] },
  { label: 'DELIVERY', title: 'From build to browser', description: 'Testing and deployment, with room for AI-powered features.', core: ['Git', 'Docker'], items: ['Git', 'Jest', 'Docker', 'AWS', 'Google Gemini'] },
];
