import { NewsResponse, Article } from '../types/news';
import { SortOption } from '../App';

// Enhanced mock data with realistic news content and category-specific images
const generateMockArticles = (page: number, category: string = 'general'): Article[] => {
  const categoryData = {
    general: {
      source: 'Global News Network',
      images: [
        'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800', // News/newspaper
        'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800', // World/globe
        'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800', // Government/politics
        'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=800', // Earth/environment
        'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800' // General news
      ],
      articles: [
        'Breaking: Major Climate Summit Reaches Historic Agreement on Carbon Emissions',
        'Tech Innovation: AI Breakthrough Promises Revolutionary Healthcare Solutions',
        'Economic Update: Markets Show Strong Recovery Amid Policy Changes',
        'Space Exploration: Mars Mission Reveals Groundbreaking Discoveries',
        'Education Revolution: New Learning Technologies Transform Classrooms',
        'Global Trade: International Commerce Reaches Record Highs',
        'Infrastructure: Smart Cities Initiative Launches Worldwide',
        'Energy Transition: Renewable Sources Hit 50% of Global Production',
        'Digital Privacy: New Regulations Protect Consumer Data Rights',
        'Medical Research: Gene Therapy Shows Promise for Rare Diseases',
        'Transportation: Electric Vehicle Sales Surge Globally',
        'Agriculture: Vertical Farming Revolutionizes Food Production',
        'Communication: 6G Networks Begin Testing Phase',
        'Environment: Ocean Cleanup Project Exceeds Expectations',
        'Innovation: Quantum Computing Reaches Commercial Viability',
        'Society: Remote Work Policies Reshape Urban Planning',
        'Security: Cybersecurity Measures Strengthen Against New Threats',
        'Finance: Digital Currency Adoption Accelerates Worldwide',
        'Research: Antarctic Ice Study Reveals Climate Insights',
        'Development: Sustainable Building Materials Gain Popularity'
      ]
    },
    business: {
      source: 'Business Today',
      images: [
        'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg?auto=compress&cs=tinysrgb&w=800', // Business meeting
        'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800', // Stock market
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800', // Finance charts
        'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=800', // Office building
        'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=800' // Business handshake
      ],
      articles: [
        'Startup Unicorn: Green Energy Company Reaches $10 Billion Valuation',
        'Market Analysis: Cryptocurrency Adoption Accelerates in Financial Sector',
        'Corporate News: Tech Giant Announces Massive Expansion Plans',
        'Supply Chain Innovation: AI-Powered Logistics Reduce Delivery Times',
        'Investment Trends: ESG Funds Attract Record Capital Inflows',
        'Merger Alert: Two Industry Leaders Announce Strategic Partnership',
        'IPO Watch: Biotech Company Prepares for Public Offering',
        'Earnings Report: Quarterly Results Exceed Market Expectations',
        'Trade Update: International Commerce Agreements Boost Economy',
        'Banking News: Digital Payment Systems See Unprecedented Growth',
        'Real Estate: Commercial Property Market Shows Strong Recovery',
        'Retail Revolution: E-commerce Platforms Expand Globally',
        'Manufacturing: Automation Technologies Increase Efficiency',
        'Venture Capital: Record Funding Round for Clean Tech Startup',
        'Economic Policy: New Tax Reforms Support Small Business Growth',
        'Corporate Governance: Companies Adopt Sustainable Practices',
        'Market Volatility: Investors Navigate Uncertain Economic Climate',
        'Innovation Hub: Tech Incubators Foster Entrepreneurship',
        'Global Economy: Emerging Markets Drive International Growth',
        'Financial Services: Fintech Solutions Transform Banking Industry'
      ]
    },
    technology: {
      source: 'Tech Innovation Daily',
      images: [
        'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800', // Computer/technology
        'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=800', // Circuit board
        'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800', // AI/robotics
        'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800', // Data center
        'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=800' // Programming
      ],
      articles: [
        'Quantum Computing Breakthrough: New Processor Achieves Quantum Supremacy',
        'AI Ethics: New Framework Ensures Responsible Artificial Intelligence Development',
        'Cybersecurity Alert: Advanced Threat Detection System Prevents Major Attack',
        'Mobile Innovation: Next-Generation Smartphones Feature Revolutionary Battery Technology',
        'Cloud Computing: Edge Networks Deliver Ultra-Low Latency Applications',
        'Software Development: Low-Code Platforms Democratize App Creation',
        'Internet Infrastructure: Fiber Optic Networks Expand to Rural Areas',
        'Gaming Technology: Virtual Reality Reaches New Levels of Immersion',
        'Blockchain Innovation: Decentralized Systems Enhance Data Security',
        'Machine Learning: Neural Networks Achieve Human-Level Performance',
        'Robotics Advancement: Autonomous Systems Transform Manufacturing',
        'Data Analytics: Big Data Solutions Provide Business Insights',
        'Web Development: Progressive Web Apps Gain Market Adoption',
        'Hardware Innovation: Processors Achieve Record Performance Levels',
        'Network Security: Zero-Trust Architecture Becomes Industry Standard',
        'Digital Transformation: Legacy Systems Migrate to Modern Platforms',
        'Open Source: Community-Driven Projects Accelerate Innovation',
        'Tech Education: Coding Bootcamps Address Skills Gap',
        'Emerging Tech: Augmented Reality Applications Expand Beyond Gaming',
        'Platform Economy: API-First Strategies Drive Business Growth'
      ]
    },
    entertainment: {
      source: 'Entertainment Weekly',
      images: [
        'https://images.pexels.com/photos/3709369/pexels-photo-3709369.jpeg?auto=compress&cs=tinysrgb&w=800', // Movie theater
        'https://images.pexels.com/photos/3709370/pexels-photo-3709370.jpeg?auto=compress&cs=tinysrgb&w=800', // Music concert
        'https://images.pexels.com/photos/3709371/pexels-photo-3709371.jpeg?auto=compress&cs=tinysrgb&w=800', // Theater stage
        'https://images.pexels.com/photos/3709372/pexels-photo-3709372.jpeg?auto=compress&cs=tinysrgb&w=800', // Gaming setup
        'https://images.pexels.com/photos/3709373/pexels-photo-3709373.jpeg?auto=compress&cs=tinysrgb&w=800' // Celebrity event
      ],
      articles: [
        'Film Festival Spotlight: Independent Cinema Gains Global Recognition',
        'Music Industry: Streaming Platforms Transform Artist Revenue Models',
        'Gaming Revolution: Virtual Reality Experiences Reach New Heights',
        'Theater Renaissance: Digital Platforms Bring Live Performances to Global Audiences',
        'Celebrity News: Stars Launch Charitable Foundation for Arts Education',
        'Box Office Report: Summer Blockbusters Break Revenue Records',
        'Music Charts: New Artists Dominate Streaming Platforms',
        'Television Update: Streaming Services Invest in Original Content',
        'Awards Season: Critics Announce Annual Film and TV Nominations',
        'Concert Tours: Live Music Industry Shows Strong Recovery',
        'Publishing News: Digital Books Gain Market Share',
        'Art World: Contemporary Artists Embrace Digital Mediums',
        'Fashion Week: Sustainable Design Takes Center Stage',
        'Sports Entertainment: Esports Tournaments Draw Massive Audiences',
        'Cultural Events: International Festivals Celebrate Diversity',
        'Media Trends: Podcast Industry Experiences Unprecedented Growth',
        'Celebrity Interviews: Stars Discuss Social Impact Initiatives',
        'Entertainment Technology: AI Creates Personalized Content Experiences',
        'Industry Analysis: Merger Creates New Entertainment Powerhouse',
        'Creative Arts: Virtual Galleries Transform Art Exhibition Experience'
      ]
    },
    health: {
      source: 'Health & Wellness Today',
      images: [
        'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800', // Medical equipment
        'https://images.pexels.com/photos/3938024/pexels-photo-3938024.jpeg?auto=compress&cs=tinysrgb&w=800', // Healthcare worker
        'https://images.pexels.com/photos/3938025/pexels-photo-3938025.jpeg?auto=compress&cs=tinysrgb&w=800', // Healthy lifestyle
        'https://images.pexels.com/photos/3938026/pexels-photo-3938026.jpeg?auto=compress&cs=tinysrgb&w=800', // Medical research
        'https://images.pexels.com/photos/3938027/pexels-photo-3938027.jpeg?auto=compress&cs=tinysrgb&w=800' // Wellness/fitness
      ],
      articles: [
        'Medical Breakthrough: Gene Therapy Shows Promise for Rare Diseases',
        'Mental Health: Digital Therapy Platforms Improve Access to Care',
        'Nutrition Science: Plant-Based Diets Show Remarkable Health Benefits',
        'Fitness Innovation: Wearable Technology Revolutionizes Personal Health Monitoring',
        'Pandemic Preparedness: New Vaccine Technology Enables Rapid Response',
        'Cancer Research: Immunotherapy Treatments Show Promising Results',
        'Public Health: Preventive Care Programs Reduce Healthcare Costs',
        'Medical Devices: Smart Implants Monitor Patient Health in Real-Time',
        'Pharmaceutical News: New Drug Approvals Offer Hope for Patients',
        'Healthcare Policy: Universal Coverage Initiatives Gain Support',
        'Wellness Trends: Mindfulness Programs Improve Employee Health',
        'Medical Education: Virtual Reality Training Enhances Surgical Skills',
        'Aging Research: Longevity Studies Reveal Lifestyle Factors',
        'Pediatric Care: New Treatments Improve Children\'s Health Outcomes',
        'Global Health: International Cooperation Addresses Disease Outbreaks',
        'Telemedicine: Remote Consultations Expand Healthcare Access',
        'Health Technology: AI Diagnostics Improve Early Disease Detection',
        'Rehabilitation: Advanced Prosthetics Restore Patient Mobility',
        'Environmental Health: Air Quality Improvements Benefit Public Health',
        'Sports Medicine: Recovery Techniques Enhance Athletic Performance'
      ]
    },
    science: {
      source: 'Science Daily',
      images: [
        'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800', // Laboratory
        'https://images.pexels.com/photos/2280572/pexels-photo-2280572.jpeg?auto=compress&cs=tinysrgb&w=800', // Space/astronomy
        'https://images.pexels.com/photos/2280573/pexels-photo-2280573.jpeg?auto=compress&cs=tinysrgb&w=800', // Research/microscope
        'https://images.pexels.com/photos/2280574/pexels-photo-2280574.jpeg?auto=compress&cs=tinysrgb&w=800', // Environmental science
        'https://images.pexels.com/photos/2280575/pexels-photo-2280575.jpeg?auto=compress&cs=tinysrgb&w=800' // Physics/chemistry
      ],
      articles: [
        'Astronomy Discovery: Potentially Habitable Exoplanet Found in Nearby System',
        'Climate Research: Ocean Currents Show Unexpected Resilience to Temperature Changes',
        'Physics Breakthrough: Scientists Achieve Room-Temperature Superconductivity',
        'Biology Innovation: CRISPR Technology Enables Precise Cellular Reprogramming',
        'Environmental Science: Coral Reefs Show Remarkable Recovery Using New Restoration Methods',
        'Space Exploration: Mars Rover Discovers Evidence of Ancient Microbial Life',
        'Materials Science: New Composite Materials Revolutionize Construction Industry',
        'Neuroscience: Brain-Computer Interfaces Enable Paralyzed Patients to Control Devices',
        'Chemistry Advance: Catalysts Improve Efficiency of Clean Energy Production',
        'Geology Update: Earthquake Prediction Models Achieve Greater Accuracy',
        'Marine Biology: Deep Sea Exploration Reveals New Species',
        'Atmospheric Science: Ozone Layer Shows Signs of Recovery',
        'Particle Physics: Large Hadron Collider Discovers New Subatomic Particles',
        'Biotechnology: Synthetic Biology Creates Sustainable Manufacturing Processes',
        'Paleontology: Fossil Discovery Provides Insights into Evolution',
        'Renewable Energy: Solar Cell Efficiency Reaches Record Levels',
        'Computational Science: Supercomputers Model Complex Climate Systems',
        'Archaeological Find: Ancient Civilization Reveals Advanced Technology',
        'Molecular Biology: Protein Folding Research Advances Drug Development',
        'Astrophysics: Black Hole Observations Confirm Einstein\'s Predictions'
      ]
    },
    sports: {
      source: 'Sports Central',
      images: [
        'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=800', // Stadium/sports venue
        'https://images.pexels.com/photos/1618270/pexels-photo-1618270.jpeg?auto=compress&cs=tinysrgb&w=800', // Athletes competing
        'https://images.pexels.com/photos/1618271/pexels-photo-1618271.jpeg?auto=compress&cs=tinysrgb&w=800', // Team sports
        'https://images.pexels.com/photos/1618272/pexels-photo-1618272.jpeg?auto=compress&cs=tinysrgb&w=800', // Olympic sports
        'https://images.pexels.com/photos/1618273/pexels-photo-1618273.jpeg?auto=compress&cs=tinysrgb&w=800' // Fitness/training
      ],
      articles: [
        'Olympic Update: Athletes Break Multiple World Records at International Championships',
        'Technology in Sports: AI Analytics Transform Team Strategy and Player Performance',
        'Youth Sports: New Programs Promote Inclusivity and Mental Health Awareness',
        'Professional League News: Sustainability Initiatives Transform Stadium Operations',
        'Fitness Trends: Virtual Training Platforms Connect Athletes Globally',
        'Championship Results: Underdog Team Wins National Tournament',
        'Player Transfer: Star Athlete Signs Record-Breaking Contract',
        'Sports Medicine: New Recovery Techniques Reduce Injury Time',
        'Fan Experience: Stadium Technology Enhances Spectator Engagement',
        'Women\'s Sports: Professional Leagues See Unprecedented Growth',
        'International Competition: World Cup Preparations Begin',
        'College Athletics: Student-Athletes Benefit from New Scholarship Programs',
        'Extreme Sports: Adventure Racing Gains Mainstream Popularity',
        'Sports Broadcasting: Streaming Services Acquire Major League Rights',
        'Athletic Performance: Nutrition Science Optimizes Training Results',
        'Coaching Innovation: Data Analytics Improve Team Strategies',
        'Sports Equipment: Advanced Materials Enhance Athletic Performance',
        'Disability Sports: Paralympic Athletes Inspire Global Audiences',
        'Sports Psychology: Mental Training Becomes Essential for Success',
        'Community Sports: Local Programs Promote Health and Wellness'
      ]
    }
  };

  const categoryInfo = categoryData[category as keyof typeof categoryData] || categoryData.general;
  const authors = [
    'Sarah Johnson', 'Dr. Michael Chen', 'Emma Rodriguez', 'Dr. James Wilson', 'Lisa Thompson',
    'Robert Kim', 'Jennifer Walsh', 'David Park', 'Maria Santos', 'Thomas Anderson',
    'Dr. Alex Kumar', 'Rachel Green', 'Mark Stevens', 'Sophie Chang', 'Carlos Martinez',
    'Amanda Foster', 'Jake Morrison', 'Nina Patel', 'Oliver Wright', 'Grace Liu'
  ];
  
  return Array.from({ length: 10 }, (_, index) => {
    const globalIndex = page * 10 + index;
    const articleIndex = globalIndex % categoryInfo.articles.length;
    const imageIndex = globalIndex % categoryInfo.images.length;
    const authorIndex = globalIndex % authors.length;
    
    // Create unique article titles by adding variation
    let title = categoryInfo.articles[articleIndex];
    if (globalIndex >= categoryInfo.articles.length) {
      const variations = [
        'Update: ', 'Latest: ', 'Breaking: ', 'Exclusive: ', 'Report: ',
        'Analysis: ', 'Investigation: ', 'Study: ', 'Research: ', 'Alert: '
      ];
      const variationIndex = Math.floor(globalIndex / categoryInfo.articles.length) % variations.length;
      title = variations[variationIndex] + title;
    }
    
    const descriptions = [
      'Scientists and researchers worldwide are collaborating on this groundbreaking development that could reshape our understanding.',
      'Industry experts predict this innovation will have far-reaching implications across multiple sectors and communities.',
      'New data reveals unprecedented insights that challenge conventional wisdom and open new possibilities.',
      'This development represents a significant milestone in ongoing efforts to address global challenges.',
      'Stakeholders are closely monitoring the situation as it continues to evolve and impact various industries.',
      'The announcement has generated widespread interest among professionals and the general public alike.',
      'Early results suggest this could be a game-changing advancement with long-term benefits.',
      'Experts are calling this one of the most significant developments in recent years.',
      'The implications of this discovery extend beyond initial expectations and could influence future research.',
      'This breakthrough demonstrates the power of innovation and collaborative scientific effort.'
    ];
    
    return {
      source: { id: 'demo', name: categoryInfo.source },
      author: authors[authorIndex],
      title: title,
      description: descriptions[globalIndex % descriptions.length],
      url: `#article-${category}-${page}-${index}-${globalIndex}`,
      urlToImage: categoryInfo.images[imageIndex],
      publishedAt: new Date(Date.now() - globalIndex * 3600000).toISOString(),
      content: `This is demo content for article ${globalIndex + 1}. Get your free API key from newsapi.org to see real news articles with full content and latest updates from trusted sources around the world.`
    };
  });
};

export const newsApi = {
  async getTopHeadlines(
    country: string = 'us', 
    category?: string, 
    page: number = 1
  ): Promise<NewsResponse> {
    // Simulate API delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    console.log('Using demo data. Get a free API key from newsapi.org to see real news.');
    const mockArticles = generateMockArticles(page - 1, category);
    return {
      status: 'ok',
      totalResults: 100,
      articles: mockArticles
    };
  },

  async searchNews(query: string, page: number = 1, sortBy: SortOption = 'publishedAt'): Promise<NewsResponse> {
    // Simulate API delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    console.log('Using demo data. Get a free API key from newsapi.org to see real news.');
    let mockArticles = generateMockArticles(page - 1, 'general').map(article => ({
      ...article,
      title: `${article.title}`,
      description: `This search result contains "${query}". ${article.description}`
    }));

    // Sort mock articles based on sortBy parameter
    if (sortBy === 'relevancy') {
      // For relevancy, we'll simulate by putting articles with query in title first
      mockArticles = mockArticles.sort((a, b) => {
        const aRelevant = a.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
        const bRelevant = b.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
        return bRelevant - aRelevant;
      });
    } else if (sortBy === 'popularity') {
      // For popularity, we'll simulate by random but consistent ordering
      mockArticles = mockArticles.sort((a, b) => a.title.localeCompare(b.title));
    }
    // publishedAt is already sorted by date (newest first) in generateMockArticles

    return {
      status: 'ok',
      totalResults: 50,
      articles: mockArticles
    };
  },
};