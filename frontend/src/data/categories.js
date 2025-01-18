export const Categories = [
    // 1. - 3. Semester
    { value: "BSYS", label: "Operating Systems" },
    { value: "PROG", label: "Coding" },
    { value: "NET", label: "Networking Technologies" },
    { value: "ALDA", label: "Algorithms & Datastructures" },
    { value: "IntroAI", label: "AI and Data Science" },
    { value: "ITSEC", label: "IT Security" },
    { value: "NETA", label: "Linux System Administration" },
    { value: "SE", label: "Software Design & Engineering" },
    { value: "TCOM", label: "Telecommunications Systems" },
  ];

  export const SubCategories = [
    // BSYS - Operating Systems
    { category: "BSYS", value: "Windows", label: "Windows" },
    { category: "BSYS", value: "Linux", label: "Linux" },
    { category: "BSYS", value: "Virtualization", label: "Virtualization" },
  
    // PROG - Coding
    { category: "PROG", value: "Python", label: "Python" },
    { category: "PROG", value: "JavaScript", label: "JavaScript" },
    { category: "PROG", value: "C", label: "C" },
    { category: "PROG", value: "Java", label: "Java" },
  
    // NET - Networking Technologies
    { category: "NET", value: "LAN", label: "LAN" },
    { category: "NET", value: "WAN", label: "WAN" },
    { category: "NET", value: "Routing", label: "Routing Protocols" },
  
    // ALDA - Algorithms & Data Structures
    { category: "ALDA", value: "Sorting Algorithms", label: "Sorting Algorithms" },
    { category: "ALDA", value: "Graph Algorithms", label: "Graph Algorithms" },
    { category: "ALDA", value: "Trees", label: "Trees" },
  
    // IntroAI - AI and Data Science
    { category: "IntroAI", value: "Machine Learning", label: "Machine Learning" },
    { category: "IntroAI", value: "Data Analytics", label: "Data Analytics" },
    { category: "IntroAI", value: "Deep Learning", label: "Deep Learning" },
  
    // ITSEC - IT Security
    { category: "ITSEC", value: "Network Security", label: "Network Security" },
    { category: "ITSEC", value: "Ethical Hacking", label: "Ethical Hacking" },
    { category: "ITSEC", value: "Cryptography", label: "Cryptography" },
  
    // NETA - Linux System Administration
    { category: "NETA", value: "DNS", label: "DNS" },
    { category: "NETA", value: "SMTP", label: "Mail Services" },
    { category: "NETA", value: "WEB", label: "Webservices" },
    { category: "NETA", value: "FTP", label: "Fileservices" },
    { category: "NETA", value: "FW", label: "Gateways & Firewalling" },
  
    // SE - Software Design & Engineering
    { category: "SE", value: "UML", label: "UML" },
    { category: "SE", value: "Agile Methodologies", label: "Agile Methodologies" },
    { category: "SE", value: "Design Patterns", label: "Design Patterns" },
  
    // TCOM - Telecommunications Systems
    { category: "TCOM", value: "DSL", label: "DSL" },
    { category: "TCOM", value: "Fiber Optics", label: "Fiber Optics" },
    { category: "TCOM", value: "Mobile Networks", label: "Mobile Networks" },
  ];
  
  export const SortOptions = [
    { value: "", label: "Sort by" },
    { value: "rating", label: "Rating" },
    { value: "title", label: "Title" },
    { value: "tutor", label: "Tutor" },
    
  ];