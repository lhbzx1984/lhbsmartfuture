import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Wand2,
  Image,
  Video,
  Zap,
  ArrowRight,
  Play,
  Star,
  ChevronRight,
  Layers,
  Film,
  Camera,
  Brush,
  Globe,
  Users,
  Shield,
  Infinity,
  Eye,
  Heart,
  Download,
  Share2,
  Maximize2,
} from 'lucide-react';

// Gallery showcase data
const GALLERY_ITEMS = [
  {
    id: 1,
    title: '赛博朋克都市',
    category: '科幻/城市',
    prompt: 'Cyberpunk city at night, neon lights, rain reflections, futuristic architecture',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cinematic%20cyberpunk%20city%20at%20night%20neon%20lights%20rainy%20streets%20futuristic%20skyscrapers%20volumetric%20lighting%208k%20ultra%20realistic&image_size=landscape_16_9',
    likes: 12400,
    views: 89200,
    tag: '热门',
  },
  {
    id: 2,
    title: '梦幻森林精灵',
    category: '奇幻/生物',
    prompt: 'Enchanted forest elf, bioluminescent plants, magical particles, fantasy art',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fantasy%20enchanted%20forest%20elf%20princess%20bioluminescent%20plants%20magical%20particles%20ethereal%20glow%20dreamlike%20atmosphere%20hyperrealistic&image_size=portrait_4_3',
    likes: 9800,
    views: 67500,
    tag: '精选',
  },
  {
    id: 3,
    title: '太空探索者',
    category: '科幻/太空',
    prompt: 'Astronaut on alien planet, ringed planet in sky, sci-fi exploration',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=astronaut%20exploring%20alien%20planet%20surface%20massive%20ringed%20gas%20giant%20in%20sky%20sci-fi%20exploration%20cinematic%20lighting%20epic%20scale&image_size=landscape_16_9',
    likes: 15200,
    views: 112000,
    tag: '推荐',
  },
  {
    id: 4,
    title: '东方水墨山水',
    category: '艺术/传统',
    prompt: 'Chinese ink wash landscape painting, mountains, mist, traditional art style',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20Chinese%20ink%20wash%20painting%20landscape%20misty%20mountains%20flowing%20river%20pine%20trees%20elegant%20brushwork%20artistic%20masterpiece&image_size=square',
    likes: 7600,
    views: 54300,
    tag: '艺术',
  },
  {
    id: 5,
    title: '机械姬觉醒',
    category: '科幻/角色',
    prompt: 'Android awakening, intricate mechanical details, glowing eyes, portrait',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=android%20woman%20awakening%20intricate%20mechanical%20details%20glowing%20blue%20eyes%20chrome%20and%20ceramic%20skin%20cinematic%20portrait%20studio%20lighting&image_size=portrait_4_3',
    likes: 18900,
    views: 134000,
    tag: '爆款',
  },
  {
    id: 6,
    title: '深海巨鲸',
    category: '自然/海洋',
    prompt: 'Giant whale swimming through deep ocean, light rays, underwater scene',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=majestic%20giant%20whale%20swimming%20through%20deep%20ocean%20god%20rays%20piercing%20water%20underwater%20scene%20ethereal%20blue%20tones%20photorealistic&image_size=landscape_16_9',
    likes: 11200,
    views: 78900,
    tag: '震撼',
  },
  {
    id: 7,
    title: '古风侠客行',
    category: '武侠/人物',
    prompt: 'Chinese swordsman warrior, ancient costume, bamboo forest, wuxia style',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20swordsman%20warrior%20elegant%20ancient%20costume%20bamboo%20forest%20mist%20wuxia%20style%20dynamic%20pose%20cinematic%20composition&image_size=portrait_4_3',
    likes: 13400,
    views: 95600,
    tag: '热门',
  },
  {
    id: 8,
    title: '未来飞行器',
    category: '科幻/载具',
    prompt: 'Futuristic flying vehicle concept design, sleek aerodynamic, city background',
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20flying%20vehicle%20concept%20design%20sleek%20aerodynamic%20silver%20body%20hovering%20above%20futuristic%20city%20product%20visualization%208k%20render&image_size=landscape_16_9',
    likes: 8900,
    views: 62100,
    tag: '设计',
  },
];

const FEATURE_CARDS = [
  {
    icon: Wand2,
    title: '文字生图',
    desc: '输入描述词，即刻生成好莱坞级视觉作品',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Image,
    title: '图生图编辑',
    desc: '上传参考图，AI智能理解并重新创作',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: Video,
    title: '视频生成',
    desc: '静态图片动态化，创造沉浸式视频体验',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Layers,
    title: '无限画布',
    desc: '节点式工作流，自由组合创意无限可能',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Brush,
    title: '局部重绘',
    desc: '精确涂抹区域，AI智能修补或替换内容',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Maximize2,
    title: '高清放大',
    desc: '一键提升分辨率至4K级超清画质',
    gradient: 'from-indigo-500 to-violet-600',
  },
];

const STATS = [
  { value: '10M+', label: '生成作品' },
  { value: '500K+', label: '活跃用户' },
  { value: '99.9%', label: '服务可用性' },
  { value: '<3s', label: '平均响应' },
];

export default function LandingPage() {
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  const categories = ['全部', ...Array.from(new Set(GALLERY_ITEMS.map((item) => item.category.split('/')[0])))];

  const filteredGallery =
    activeCategory === '全部'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category.includes(activeCategory));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id') || '0');
            setVisibleItems((prev) => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px] animate-bounce" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/12 blur-[140px] animate-pulse" style={{ animationDuration: '11s' }} />
        <div className="absolute bottom-[-10%] left-[30%] w-[550px] h-[550px] rounded-full bg-fuchsia-600/10 blur-[130px] animate-pulse" style={{ animationDuration: '14s' }} />
        <div className="absolute top-[60%] left-[-5%] w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-[100px]" style={{ animationDuration: '18s', animation: 'bounce 18s ease-in-out infinite' }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/30' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg shadow-fuchsia-500/25 group-hover:shadow-fuchsia-500/40 transition-all group-hover:scale-105">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0a0a0f] animate-pulse" />
            </div>
            <span className="text-xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">Kacey</span>
              <span className="text-white/90 ml-1 font-bold">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#gallery" className="text-sm text-white/60 hover:text-white transition-colors">作品画廊</a>
            <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">核心能力</a>
            <a href="#stats" className="text-sm text-white/60 hover:text-white transition-colors">数据洞察</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/canvas"
              className="hidden sm:flex px-5 py-2.5 text-sm font-bold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all items-center gap-2 group"
            >
              进入工作台
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/canvas"
              className="px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-400 hover:via-fuchsia-400 hover:to-pink-400 rounded-xl shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              立即创作
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-xs font-medium text-white/70">全新升级 · 多模态引擎驱动</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight">
              <span className="block">用想象力</span>
              <span className="block mt-2 bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
                重塑视觉世界
              </span>
            </h1>

            <p className="text-lg text-white/55 leading-relaxed max-w-lg">
              新一代AIGC创作平台，集成最先进的多模态大模型。从文字到图像、从图像到视频，
              让每一个创意瞬间变为令人惊叹的视觉现实。
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/canvas"
                className="group relative px-8 py-4 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-2xl font-bold text-base shadow-[0_0_40px_rgba(168,85,247,0.35)] hover:shadow-[0_0_60px_rgba(168,85,247,0.5)] transition-all duration-300 overflow-hidden flex items-center gap-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Sparkles className="w-5 h-5 relative z-10" />
                <span className="relative z-10">开始免费创作</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="group px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl font-bold text-base transition-all flex items-center gap-3">
                <Play className="w-5 h-5 text-fuchsia-400" />
                浏览作品集
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-[#0a0a0f] overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1.5 text-white font-semibold">4.98</span>
                </div>
                <p className="text-xs text-white/40 mt-0.5">来自 500,000+ 创作者的好评</p>
              </div>
            </div>
          </div>

          {/* Right hero visual */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main featured image */}
              <div className="absolute inset-4 rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(168,85,247,0.25)] border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-700">
                <img
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=stunning%20futuristic%20AI-generated%20artwork%20cosmic%20nebula%20swirling%20colors%20vibrant%20purple%20pink%20cyan%20ethereal%20light%20particles%20digital%20art%20masterpiece%204K%20quality&image_size=square"
                  alt="Featured AI Art"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">星际幻境</p>
                      <p className="text-xs text-white/60">由 Kacey AI 生成</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-pink-400" />
                      <span className="text-sm text-white/80">28.5K</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -left-8 top-12 w-44 p-3 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 -rotate-6 shadow-xl hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%203D%20clay%20character%20kawaii%20style%20soft%20lighting%20pastel%20colors%20adorable%20figure%20minimalist%20background&image_size=square"
                  alt=""
                  className="w-full aspect-square object-cover rounded-xl mb-2"
                />
                <p className="text-xs font-medium text-white/90 truncate">3D粘土风格</p>
                <p className="text-[10px] text-white/45">@creative_user</p>
              </div>

              <div className="absolute -right-6 bottom-20 w-48 p-3 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 rotate-6 shadow-xl hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hyperrealistic%20portrait%20of%20beautiful%20woman%20cinematic%20lighting%20bokeh%20professional%20photography%20golden%20hour%20elegant&image_size=portrait_4_3"
                  alt=""
                  className="w-full aspect-[4/3] object-cover rounded-xl mb-2"
                />
                <p className="text-xs font-medium text-white/90 truncate">人像摄影级</p>
                <p className="text-[10px] text-white/45">@pro_photographer</p>
              </div>

              {/* Glow effect behind main card */}
              <div className="absolute inset-8 rounded-3xl bg-gradient-to-br from-violet-500/20 via-fuchsia-500/20 to-pink-500/20 blur-3xl -z-10" />
            </div>
          </div>
        </div>

        {/* Bottom wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 82C1248 74 1344 58 1392 50L1440 42V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="url(#heroGradient)" fillOpacity="0.4"/>
            <defs>
              <linearGradient id="heroGradient" x1="0" y1="0" x2="1440" y2="0">
                <stop stopColor="#8B5CF6" stopOpacity="0.3"/>
                <stop offset="0.5" stopColor="#D946EF" stopOpacity="0.2"/>
                <stop offset="1" stopColor="#EC4899" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section id="stats" className="relative py-16 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center space-y-2">
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-white/45 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full mb-6">
              <Wand2 className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-bold text-violet-300 uppercase tracking-wider">Core Capabilities</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
              强大的{' '}
              <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                创作引擎
              </span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              六大核心能力，覆盖从灵感到成品的完整创作链路
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURE_CARDS.map((feature, index) => (
              <div
                key={feature.title}
                data-animate
                data-id={index}
                className={`group relative p-8 rounded-3xl bg-white/[0.03] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.06] transition-all duration-500 cursor-pointer ${visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{feature.desc}</p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/30 group-hover:text-fuchsia-400 transition-colors">
                  了解更多
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Hover glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity pointer-events-none`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Showcase Section */}
      <section id="gallery" className="py-32 relative bg-gradient-to-b from-transparent via-violet-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full mb-6">
              <Globe className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-bold text-pink-300 uppercase tracking-wider">Community Creations</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
              探索无限{' '}
              <span className="bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
                创意可能
              </span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              来自全球创作者的精选作品，每一张都是AI与想象力的完美碰撞
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry-like grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
            {filteredGallery.map((item, index) => (
              <div
                key={item.id}
                data-animate
                data-id={item.id + 100}
                className={`break-inside-avoid group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/15 cursor-pointer transition-all duration-500 ${visibleItems.has(item.id + 100) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 80}ms` }}
                onClick={() => setSelectedImage(item)}
              >
                {/* Tag badge */}
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg">
                  <span className="text-[10px] font-bold text-fuchsia-300 uppercase tracking-wider">{item.tag}</span>
                </div>

                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-white mb-1 group-hover:text-fuchsia-200 transition-colors">{item.title}</h3>
                  <p className="text-xs text-white/40 mb-3">{item.category}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-white/40">
                        <Heart className="w-3.5 h-3.5" />
                        <span className="text-xs">{(item.likes / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/40">
                        <Eye className="w-3.5 h-3.5" />
                        <span className="text-xs">{(item.views / 1000).toFixed(1)}K</span>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-lg bg-white/5 hover:bg-fuchsia-500/20 text-white/40 hover:text-fuchsia-300 transition-all">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Quick action bar on hover */}
                <div className="absolute bottom-16 left-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <button className="flex-1 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" />
                    查看详情
                  </button>
                  <button className="py-2 px-3 bg-fuchsia-500/80 hover:bg-fuchsia-500 backdrop-blur-md rounded-lg text-xs font-bold text-white transition-all">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View all button */}
          <div className="text-center mt-12">
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl font-bold transition-all">
              探索更多作品
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Video / Motion Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
                <Film className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Video Generation</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                静态变动态<br />
                <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">让画面活起来</span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed">
                上传一张图片或输入场景描述，我们的视频生成引擎将为你创建电影级的动态影像。
                从微妙的镜头运动到完整的叙事动画，一切尽在掌握。
              </p>

              <div className="space-y-4">
                {[
                  { icon: Camera, label: '智能镜头运镜' },
                  { icon: Zap, label: '秒级渲染速度' },
                  { icon: Shield, label: '稳定画面输出' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-white/70 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(251,146,60,0.15)] group">
                <img
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cinematic%20video%20frame%20sci-fi%20spaceship%20traveling%20through%20colorful%20nebula%20space%20scene%20motion%20blur%20dramatic%20lighting%204K%20film%20still&image_size=landscape_16_9"
                  alt="Video generation demo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <button className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-fuchsia-500/30 transition-all">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </button>
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-8 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 blur-3xl -z-10 rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-fuchsia-900/30 to-pink-900/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.2),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.15),transparent_50%)]" />

            {/* Content */}
            <div className="relative px-8 py-20 sm:px-16 sm:py-28 text-center">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
                准备好开启你的
                <br />
                <span className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-pink-200 bg-clip-text text-transparent">
                  AI创作之旅了吗？
                </span>
              </h2>
              <p className="text-lg text-white/55 max-w-2xl mx-auto mb-12 leading-relaxed">
                加入超过50万创作者的行列，用最前沿的AIGC技术释放你的无限创造力。
                免费开始，无需信用卡。
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/canvas"
                  className="group px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:scale-105 transition-all duration-300 flex items-center gap-3"
                >
                  <Sparkles className="w-6 h-6" />
                  立即开始创作
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/canvas"
                  className="group px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl font-bold text-lg transition-all flex items-center gap-3"
                >
                  了解更多
                </Link>
              </div>

              {/* Mini trust line */}
              <div className="mt-12 flex items-center justify-center gap-8 text-white/30 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  数据安全加密
                </div>
                <div className="flex items-center gap-2">
                  <Infinity className="w-4 h-4" />
                  无限创作额度
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  社区支持
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-black">Kacey AI</span>
              </Link>
              <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                新一代多模态AIGC创作平台。让每个人都能成为视觉创作者。
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white/70 mb-4">产品</h4>
              <div className="space-y-2.5">
                {['文字生图', '图生图', '视频生成', '无限画布'].map((item) => (
                  <a key={item} href="#" className="block text-sm text-white/40 hover:text-white/70 transition-colors">{item}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white/70 mb-4">资源</h4>
              <div className="space-y-2.5">
                {['API文档', '使用教程', '社区论坛', '更新日志'].map((item) => (
                  <a key={item} href="#" className="block text-sm text-white/40 hover:text-white/70 transition-colors">{item}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">&copy; 2026 Kacey AI. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {['隐私政策', '服务条款'].map((item) => (
                <a key={item} href="#" className="text-xs text-white/30 hover:text-white/50 transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col lg:flex-row gap-6 bg-white/5 rounded-3xl border border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 min-h-[300px] lg:min-h-[500px] overflow-hidden rounded-l-3xl">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="lg:w-72 p-6 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-fuchsia-500/20 text-fuchsia-300 text-[10px] font-bold rounded-lg uppercase tracking-wider mb-3">
                  {selectedImage.tag}
                </span>
                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-sm text-white/50 mb-4">{selectedImage.category}</p>
                <p className="text-sm text-white/40 leading-relaxed">{selectedImage.prompt}</p>

                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-white/50">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{selectedImage.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/50">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{selectedImage.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <button className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  下载图片
                </button>
                <Link
                  to="/canvas"
                  onClick={() => setSelectedImage(null)}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  用此风格创作
                </Link>
              </div>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all z-10"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
