export const Categories = [
  // 1. - 3. Semester
  { value: "Operating Systems", label: "Operating Systems" },
  { value: "Coding", label: "Coding" },
  { value: "Networking Technologies", label: "Networking Technologies" },
  { value: "Algorithms & Datastructures", label: "Algorithms & Datastructures" },
  { value: "AI and Data Science", label: "AI and Data Science" },
  { value: "IT Security", label: "IT Security" },
  { value: "Linux System Administration", label: "Linux System Administration" },
  { value: "Software Design & Engineering", label: "Software Design & Engineering" },
  { value: "Telecommunications Systems", label: "Telecommunications Systems" },
];

export const SubCategories = [
  // BSYS - Operating Systems
  { category: "Operating Systems", value: "Windows", label: "Windows" },
  { category: "Operating Systems", value: "Linux", label: "Linux" },
  { category: "Operating Systems", value: "Virtualization", label: "Virtualization" },

  // PROG - Coding
  { category: "Coding", value: "Python", label: "Python" },
  { category: "Coding", value: "JavaScript", label: "JavaScript" },
  { category: "Coding", value: "C", label: "C" },
  { category: "Coding", value: "Java", label: "Java" },

  // NET - Networking Technologies
  { category: "Networking Technologies", value: "LAN", label: "LAN" },
  { category: "Networking Technologies", value: "WAN", label: "WAN" },
  { category: "Networking Technologies", value: "Routing", label: "Routing Protocols" },

  // ALDA - Algorithms & Data Structures
  {
    category: "Algorithms & Datastructures",
    value: "Sorting Algorithms",
    label: "Sorting Algorithms",
  },
  { category: "Algorithms & Datastructures", value: "Graph Algorithms", label: "Graph Algorithms" },
  { category: "Algorithms & Datastructures", value: "Trees", label: "Trees" },

  // IntroAI - AI and Data Science
  { category: "Algorithms & Datastructures", value: "Machine Learning", label: "Machine Learning" },
  { category: "Algorithms & Datastructures", value: "Data Analytics", label: "Data Analytics" },
  { category: "Algorithms & Datastructures", value: "Deep Learning", label: "Deep Learning" },

  // ITSEC - IT Security
  { category: "IT Security", value: "Network Security", label: "Network Security" },
  { category: "IT Security", value: "Ethical Hacking", label: "Ethical Hacking" },
  { category: "IT Security", value: "Cryptography", label: "Cryptography" },

  // NETA - Linux System Administration
  { category: "Networking Technologies", value: "DNS", label: "DNS" },
  { category: "Networking Technologies", value: "SMTP", label: "Mail Services" },
  { category: "Networking Technologies", value: "WEB", label: "Webservices" },
  { category: "Networking Technologies", value: "FTP", label: "Fileservices" },
  { category: "Networking Technologies", value: "FW", label: "Gateways & Firewalling" },

  // SE - Software Design & Engineering
  { category: "Software Design & Engineering", value: "UML", label: "UML" },
  {
    category: "Software Design & EngineeringE",
    value: "Agile Methodologies",
    label: "Agile Methodologies",
  },
  { category: "Software Design & Engineering", value: "Design Patterns", label: "Design Patterns" },

  // TCOM - Telecommunications Systems
  { category: "Telecommunications Systems", value: "DSL", label: "DSL" },
  { category: "Telecommunications Systems", value: "Fiber Optics", label: "Fiber Optics" },
  { category: "Telecommunications Systems", value: "Mobile Networks", label: "Mobile Networks" },
];

export const SortOptions = [
  { value: "", label: "Sort by" },
  { value: "rating", label: "Rating" },
  { value: "title", label: "Title" },
  { value: "tutor", label: "Tutor" },
];
