export const books = [
  {
    id: "book-001",
    slug: "featured-book",
    title: "Featured Book",
    author: "STACKRA TECHNOLOGIES",
    category: "Technology",
    description:
      "A practical technology resource designed to help learners understand modern concepts and apply their knowledge to real-world projects.",
    year: "2026",
    pages: "120",
    format: "Digital",
    cover: "/books/covers/featured-book.png",
    pdf: "/books/pdfs/featured-book.pdf",
    featured: true,
    popular: true,
  },

  {
    id: "book-002",
    slug: "ai-and-the-future",
    title: "AI & The Future",
    author: "STACKRA TECHNOLOGIES",
    category: "AI & Machine Learning",
    description:
      "Explore artificial intelligence and understand how intelligent technologies are transforming businesses, products and everyday life.",
    year: "2026",
    pages: "150",
    format: "Digital",
    cover: "/books/covers/ai-and-the-future.png",
    pdf: "/books/pdfs/ai-and-the-future.pdf",
    featured: true,
    popular: true,
  },

  {
    id: "book-003",
    slug: "build-with-technology",
    title: "Build With Technology",
    author: "STACKRA TECHNOLOGIES",
    category: "Software Development",
    description:
      "Learn the foundations of modern software development and discover how technology can be transformed into useful digital products.",
    year: "2026",
    pages: "135",
    format: "Digital",
    cover: "/books/covers/build-with-technology.png",
    pdf: "/books/pdfs/build-with-technology.pdf",
    featured: true,
    popular: false,
  },

  {
    id: "book-004",
    slug: "latest-technology-guide",
    title: "Latest Technology Guide",
    author: "STACKRA TECHNOLOGIES",
    category: "Technology",
    description:
      "A practical guide covering important concepts and technologies for modern learners and developers.",
    year: "2026",
    pages: "110",
    format: "Digital",
    cover: "/books/covers/latest-technology-guide.png",
    pdf: "/books/pdfs/latest-technology-guide.pdf",
    featured: false,
    popular: true,
  },

  {
    id: "book-005",
    slug: "introduction-to-ai",
    title: "Introduction to Artificial Intelligence",
    author: "STACKRA TECHNOLOGIES",
    category: "AI & Machine Learning",
    description:
      "An easy-to-follow introduction to artificial intelligence, intelligent systems and the technologies powering the AI revolution.",
    year: "2026",
    pages: "140",
    format: "Digital",
    cover: "/books/covers/introduction-to-ai.png",
    pdf: "/books/pdfs/introduction-to-ai.pdf",
    featured: false,
    popular: true,
  },

  {
    id: "book-006",
    slug: "modern-software-development",
    title: "Modern Software Development",
    author: "STACKRA TECHNOLOGIES",
    category: "Software Development",
    description:
      "Understand modern software development practices, technologies and approaches used to build scalable digital applications.",
    year: "2026",
    pages: "125",
    format: "Digital",
    cover: "/books/covers/modern-software-development.png",
    pdf: "/books/pdfs/modern-software-development.pdf",
    featured: false,
    popular: false,
  },
];

export const categories = [
  "AI & Machine Learning",
  "Software Development",
  "Business & Technology",
  "Computer Science",
  "Career & Skills",
];

export function getBookBySlug(slug) {
  return books.find((book) => book.slug === slug);
}

export function getFeaturedBooks() {
  return books.filter((book) => book.featured);
}

export function getPopularBooks() {
  return books.filter((book) => book.popular);
}
