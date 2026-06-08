"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BlogCard from "../../components/BlogCard";

// Mock blog data matching premium Ayurvedic/wellness topics as fallback
const MOCK_BLOG_POSTS = [
  {
    id: 1,
    title: "Why you Need More Magnesium in Your Daily Diet",
    slug: "need-magnesium-daily-diet",
    category: "Nutrition",
    date: "2026-01-12",
    views: 342,
    likes: 128,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600",
    author: {
      name: "Igor MARTY",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
    },
    excerpt: "Magnesium is one of the six essential macro-minerals that is required by the body for energy production and synthesis of protein and enzymes. It contributes to the development of bones and most importantly it is responsible for synthesis of your DNA and RNA.",
    content: "Magnesium is one of the six essential macro-minerals that is required by the body for energy production and synthesis of protein and enzymes. It contributes to the development of bones and most importantly it is responsible for synthesis of your DNA and RNA.\n\nSigns of magnesium deficiency can range from subtle muscle twitches and fatigue to more severe conditions like chronic insomnia, irregular heartbeat, and high anxiety. Unfortunately, modern intensive agriculture has depleted mineral levels in soils, making it increasingly difficult to meet our daily requirements through standard meals alone.\n\nTo naturally replenish your magnesium levels, Ayurveda recommends introducing mineral-rich whole foods into your diet. Some of the best clean sources include dark leafy greens like spinach and kale, organic pumpkin seeds, almonds, black beans, and even premium dark chocolate (in moderation). Integrating these nutrient-dense elements with warm digestion-boosting spices like cumin, ginger, and black pepper helps maximize absorption and ensures your system fully integrates these essential nutrients."
  },
  {
    id: 2,
    title: "Understanding Doshas: Find Your Body Constitution",
    slug: "understanding-doshas-prakriti",
    category: "Daily Routine",
    date: "2026-03-24",
    views: 580,
    likes: 214,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
    author: {
      name: "Dr. Naveen Kumar",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100"
    },
    excerpt: "In Ayurveda, wellness is achieved by balancing the three vital energies: Vata, Pitta, and Kapha. Learn how to identify your unique Prakriti (constitution) and customize your daily lifestyle accordingly for ultimate harmony.",
    content: "In Ayurveda, wellness is achieved by balancing the three vital energies or doshas: Vata (air and space), Pitta (fire and water), and Kapha (earth and water). Learn how to identify your unique Prakriti (constitution) and customize your daily lifestyle accordingly for ultimate harmony.\n\nEvery individual is born with a unique combination of these three energies, which dictates their physical build, digestive patterns, temperament, and emotional strengths. Vata represents movement and flow; when out of balance, it manifests as dry skin, bloating, anxiety, and restlessness. Pitta controls metabolism and digestion; an imbalance leads to skin rashes, acid reflux, irritability, and excessive body heat. Kapha represents structure and stability; its imbalance causes lethargy, weight gain, congestion, and possessiveness.\n\nAchieving perfect equilibrium does not mean trying to make Vata, Pitta, and Kapha equal. Rather, it means keeping them in the natural ratio you were born with. To start, observe your responses to different climates, foods, and stress. Warm, cooked foods pacify Vata. Cool, sweet fruits and bitter herbs soothe Pitta. Warm, light, and spicy foods stimulate sluggish Kapha. By tailoring your meals and routine, you unlock a state of radiant health."
  },
  {
    id: 3,
    title: "The Magic of Ashwagandha: Benefits & Daily Uses",
    slug: "magic-of-ashwagandha",
    category: "Nutrition",
    date: "2026-04-05",
    views: 720,
    likes: 310,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600",
    author: {
      name: "Dr. Naveen Kumar",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100"
    },
    excerpt: "Known as the 'strength of a horse', Ashwagandha is Ayurveda's most revered adaptogen. Discover how this powerful herb reduces stress, boosts mental clarity, supports sleep, and enhances physical vitality.",
    content: "Known as the 'strength of a horse', Ashwagandha is Ayurveda's most revered adaptogen. Discover how this powerful herb reduces stress, boosts mental clarity, supports sleep, and enhances physical vitality.\n\nAshwagandha (Withania somnifera) has been used for thousands of years to bolster the nervous system and help the body adapt to physical, chemical, and emotional stressors. Unlike modern stimulants, it builds deep energy reserves without overexcitement, making it a perfect solution for modern occupational burnout and chronic fatigue.\n\nScientific research confirms that Ashwagandha significantly lowers cortisol levels—the primary stress hormone—while supporting healthy thyroid function, memory, and cognitive sharpness. For optimal results, take half a teaspoon of organic Ashwagandha powder (churna) mixed with warm organic milk, a touch of honey, and a pinch of cardamom before bed. This simple, traditional ritual calms the mind, builds tissue integrity (ojas), and prepares the body for deeply restorative sleep."
  },
  {
    id: 4,
    title: "Panchakarma: The Ultimate Ayurvedic Detoxification",
    slug: "panchakarma-ultimate-ayurvedic-detox",
    category: "Panchakarma",
    date: "2026-05-18",
    views: 412,
    likes: 189,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    author: {
      name: "Dr. Naveen Kumar",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100"
    },
    excerpt: "Panchakarma is a comprehensive five-fold cellular cleansing therapy that releases accumulated metabolic toxins (Ama) from the deep tissues of the body. Explore how it restores the natural intelligence of your system.",
    content: "Panchakarma is a comprehensive five-fold cellular cleansing therapy that releases accumulated metabolic toxins (Ama) from the deep tissues of the body. Explore how it restores the natural intelligence of your system.\n\nIn our modern lives, we are constantly exposed to environmental toxins, processed foods, and emotional stress. Over time, these factors lead to the accumulation of Ama—a sticky, toxic byproduct of weak digestion that clogs our physical channels (srotas) and impairs our immunity. Panchakarma goes beyond simple surface-level detoxes; it penetrates the deepest tissues of the body to liquefy and safely eliminate these deep-seated impurities.\n\nThe classic Panchakarma therapy consists of three vital phases: Purvakarma (preparatory oiling and sweating to loosen toxins), Pradhanakarma (the five main purification actions including therapeutic emesis, purgation, basti enemas, nasal administration, and bloodletting), and Paschatkarma (restorative routine to rebuild digestive strength). Entering a Panchakarma retreat under expert guidance is one of the most powerful steps you can take to reset your health, restore mental clarity, and extend your cellular lifespan."
  },
  {
    id: 5,
    title: "Morning Rituals (Dinacharya) for All-Day Vitality",
    slug: "morning-rituals-dinacharya",
    category: "Daily Routine",
    date: "2026-05-20",
    views: 890,
    likes: 412,
    image: "https://images.unsplash.com/photo-1518173946687-a4c8a383392c?auto=format&fit=crop&q=80&w=600",
    author: {
      name: "Dr. Naveen Kumar",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100"
    },
    excerpt: "How you start your morning sets the baseline for your entire day's energy and mental balance. From tongue scraping to self-massage (Abhyanga), discover the five life-changing Ayurvedic practices you should adopt.",
    content: "How you start your morning sets the baseline for your entire day's energy and mental balance. From tongue scraping to self-massage (Abhyanga), discover the five life-changing Ayurvedic practices you should adopt.\n\nDinacharya refers to the daily morning rituals designed to align our physical body with solar rhythms. Modern science is beginning to validate what Ayurvedic sages realized millennia ago: our bodies operate on tight circadian clocks. Disruption of these natural rhythms is a major driver of chronic fatigue, metabolic disorders, and mood instability.\n\nA classic, highly transformative morning routine begins before sunrise. First, practice tongue scraping (Jihwa Prakshalana) to remove overnight toxins and stimulate digestion. Next, rinse your mouth with warm sesame oil (Gandusha) to strengthen gums and clarify the senses. Follow with Abhyanga—a gentle self-massage with warm, herbalized oils that nourishes the skin, calms the nervous system, and improves circulation. Finally, drink a cup of warm water to awaken the gut. These simple acts of self-care establish a solid foundation of mindfulness, resilience, and energy that lasts all day."
  }
];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/`);
        if (response.ok) {
          const data = await response.json();
          // Filter to active articles
          const activePosts = data.filter(
            (p) => !p.status || String(p.status).toLowerCase() === "active"
          );

          if (activePosts.length > 0) {
            // Map relative image/avatar URLs to absolute paths
            const mappedPosts = activePosts.map((p) => {
              const postImg = p.image && !p.image.startsWith("http") ? `${process.env.NEXT_PUBLIC_SERVER_URL}${p.image}` : p.image;
              
              let authorAvatar = p.author?.avatar;
              if (authorAvatar && !authorAvatar.startsWith("http")) {
                authorAvatar = `${process.env.NEXT_PUBLIC_SERVER_URL}${authorAvatar}`;
              }

              return {
                ...p,
                image: postImg,
                author: {
                  name: p.author?.name || p.author_name || "Dr. Naveen Kumar",
                  avatar: authorAvatar || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100"
                }
              };
            });
            setPosts(mappedPosts);
          } else {
            setPosts([]);
          }
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Failed to fetch blog posts from backend:", error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Get unique categories from fetched posts
  const getUniqueCategories = () => {
    const seen = new Set();
    const result = ["All"];
    posts.forEach((post) => {
      if (post.category) {
        const normalized = post.category.trim();
        const lower = normalized.toLowerCase();
        if (!seen.has(lower)) {
          seen.add(lower);
          result.push(normalized);
        }
      }
    });
    return result;
  };

  const categoriesToRender = getUniqueCategories();

  // Filter posts based on category and search query (case-insensitive)
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (post.category && post.category.toLowerCase() === selectedCategory.toLowerCase());
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8f6f0] flex flex-col">
      {/* Navbar Integration */}
      <Navbar />

      {/* Main Header / Hero Section */}
      <div className="pt-32 md:pt-40 pb-16 px-6 text-center max-w-[1200px] mx-auto w-full">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#1a1a1a] mb-6 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Ayurveda <span className="italic text-[#c9b79c]">Chronicles</span>
        </h1>

        {/* Decorative Divider */}
        <div className="w-[60px] h-[1px] bg-[#c9b79c] mx-auto my-6" />
        <p className="text-sm md:text-base text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
          A collection of curated articles on ancient healing, holistic nutrition, and mindful living, bridging time-tested Vedic secrets with the demands of modern lives.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="w-full max-w-[900px] mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          {categoriesToRender.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] tracking-[2px] uppercase px-4 py-2 border transition-all duration-300 font-semibold ${
                  isActive
                    ? "bg-[#6b7c5b] border-[#6b7c5b] text-white"
                    : "bg-transparent border-gray-300/60 text-gray-500 hover:border-[#6b7c5b] hover:text-[#6b7c5b]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Real-time Search Box */}
        <div className="relative w-full md:w-[260px]">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#e2dada] px-4 py-2 text-xs focus:outline-none focus:border-[#6b7c5b] transition-all text-[#1a1a1a]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a1a1a] text-xs font-semibold"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Blog Posts list container */}
      <div className="flex-grow w-full max-w-[1200px] mx-auto px-6 pb-24 flex flex-col items-center">
        {isLoading ? (
          <div className="text-center py-20 font-lato text-sm text-gray-400">
            Loading articles...
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="w-full flex flex-col items-center">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[#e2dada]/40 w-full max-w-[900px] p-8 shadow-sm">
            <span className="text-sm text-gray-400 font-light block mb-2">
              No articles found matching your criteria.
            </span>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-[10px] tracking-[2px] uppercase text-[#6b7c5b] font-bold border-b border-[#6b7c5b] pb-0.5 mt-4 hover:text-[#c9b79c] hover:border-[#c9b79c] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer Integration */}
      <Footer />
    </div>
  );
}
