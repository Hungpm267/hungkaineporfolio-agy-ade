/* ============================================================
   DATA LAYER - data.js
   Portfolio Website Data Management via LocalStorage
   ============================================================ */

/* ────────────────────────────────────────────────────────────
   DEFAULT SETTINGS
   ──────────────────────────────────────────────────────────── */
const DEFAULT_SETTINGS = {
  title: 'My Portfolio',
  favicon: '',
  metaDesc: 'Welcome to my portfolio website.',
  accentColor: '#7c3aed',
  emailjsServiceId: '',
  emailjsTemplateId: '',
  emailjsPublicKey: '',
  contactEmail: ''
};

/* ────────────────────────────────────────────────────────────
   DEFAULT SECTIONS
   ──────────────────────────────────────────────────────────── */
const DEFAULT_SECTIONS = [
  {
    id: 'profile',
    type: 'profile',
    order: 0,
    visible: true,
    data: {
      name: { vi: 'Phạm Mạnh Hùng', en: 'Pham Manh Hung' },
      title: { vi: 'Analytics Data Engineer', en: 'Analytics Data Engineer' },
      bio: {
        vi: 'Xin chào, Tôi là HungKaine, tôi tốt nghiệp chuyên ngành Hệ thống Thông tin tại trường Đại học Công nghệ Thông tin - Đại học Quốc gia TP.HCM. Tôi là một người yêu thích công nghệ và luôn mong muốn học hỏi những điều mới. Hiện tôi đang là Kỹ sư Dữ liệu và Phân tích với các công cụ chủ đạo như MS Fabric, MS PowerBi, Snowflake và DataBricks. Tôi có kinh nghiệm trong việc xây dựng các hệ thống dữ liệu lớn, các pipeline và các giải pháp phân tích dữ liệu.',
        en: 'Hi there! I\'m a passionate developer with 3+ years of experience building modern web applications. I love turning creative ideas into real-world products.'
      },
      avatar: '',
      socialLinks: [
        { id: 'gh', platform: 'GitHub', url: 'https://github.com/hungpm267', icon: 'github' },
        { id: 'li', platform: 'LinkedIn', url: 'linkedin.com/in/hungpm267/', icon: 'linkedin' }
      ]
    }
  },
  {
    id: 'projects',
    type: 'projects',
    order: 1,
    visible: true,
    data: {
      items: [
        {
          id: 'proj-1',
          name: { vi: 'Ứng dụng Quản lý Công việc', en: 'Task Management App' },
          description: {
            vi: 'Ứng dụng quản lý công việc theo thời gian thực với tính năng kéo thả, phân công nhóm và báo cáo tiến độ.',
            en: 'A real-time task management application with drag-and-drop, team assignment, and progress reporting features.'
          },
          image: '',
          tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
          demoUrl: 'https://example.com',
          repoUrl: 'https://github.com',
          featured: true
        },
        {
          id: 'proj-2',
          name: { vi: 'Nền tảng Thương mại Điện tử', en: 'E-Commerce Platform' },
          description: {
            vi: 'Nền tảng mua sắm trực tuyến với tính năng thanh toán, quản lý kho hàng và phân tích dữ liệu.',
            en: 'An online shopping platform with payment processing, inventory management, and data analytics.'
          },
          image: '',
          tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
          demoUrl: 'https://example.com',
          repoUrl: 'https://github.com',
          featured: false
        },
        {
          id: 'proj-3',
          name: { vi: 'Ứng dụng Thời tiết', en: 'Weather App' },
          description: {
            vi: 'Ứng dụng thời tiết đẹp mắt hiển thị dự báo 7 ngày với biểu đồ tương tác và hỗ trợ vị trí GPS.',
            en: 'A beautiful weather app showing 7-day forecasts with interactive charts and GPS location support.'
          },
          image: '',
          tags: ['Vue.js', 'OpenWeather API', 'Chart.js'],
          demoUrl: 'https://example.com',
          repoUrl: 'https://github.com',
          featured: false
        }
      ]
    }
  },
  {
    id: 'experience',
    type: 'experience',
    order: 2,
    visible: true,
    data: {
      items: [
        {
          id: 'exp-1',
          company: { vi: 'Công ty Công nghệ ABC', en: 'ABC Technology Company' },
          role: { vi: 'Lập trình viên Full-Stack', en: 'Full-Stack Developer' },
          description: {
            vi: 'Phát triển và duy trì các ứng dụng web quy mô lớn sử dụng React, Node.js và AWS. Dẫn dắt nhóm 5 kỹ sư trong việc xây dựng các tính năng mới.',
            en: 'Developed and maintained large-scale web applications using React, Node.js, and AWS. Led a team of 5 engineers in building new features.'
          },
          logo: '',
          startDate: '2022-01',
          endDate: '',
          current: true
        },
        {
          id: 'exp-2',
          company: { vi: 'Startup XYZ', en: 'XYZ Startup' },
          role: { vi: 'Lập trình viên Front-End', en: 'Front-End Developer' },
          description: {
            vi: 'Xây dựng giao diện người dùng tương tác cho nền tảng SaaS sử dụng Vue.js. Cải thiện hiệu suất trang tải lên 40%.',
            en: 'Built interactive user interfaces for a SaaS platform using Vue.js. Improved page load performance by 40%.'
          },
          logo: '',
          startDate: '2020-06',
          endDate: '2021-12',
          current: false
        }
      ]
    }
  },
  {
    id: 'education',
    type: 'education',
    order: 3,
    visible: true,
    data: {
      items: [
        {
          id: 'edu-1',
          school: { vi: 'Đại học Bách Khoa Hà Nội', en: 'Hanoi University of Science and Technology' },
          degree: { vi: 'Kỹ thuật Phần mềm', en: 'Software Engineering' },
          description: {
            vi: 'Tốt nghiệp loại Giỏi. Nghiên cứu chuyên sâu về trí tuệ nhân tạo và phát triển ứng dụng di động.',
            en: 'Graduated with distinction. Research focus on artificial intelligence and mobile application development.'
          },
          logo: '',
          startDate: '2016-09',
          endDate: '2020-06'
        },
        {
          id: 'edu-2',
          school: { vi: 'Coursera / Google', en: 'Coursera / Google' },
          degree: { vi: 'Chứng chỉ Cloud Computing', en: 'Cloud Computing Certificate' },
          description: {
            vi: 'Hoàn thành chương trình chứng chỉ Google Cloud Professional với điểm xuất sắc.',
            en: 'Completed Google Cloud Professional certificate program with distinction.'
          },
          logo: '',
          startDate: '2021-03',
          endDate: '2021-09'
        }
      ]
    }
  },
  {
    id: 'skills',
    type: 'skills',
    order: 4,
    visible: true,
    data: {
      groups: [
        {
          id: 'sg-frontend',
          name: { vi: 'Front-End', en: 'Front-End' },
          skills: [
            { id: 'sk-html', name: 'HTML / CSS', level: 95 },
            { id: 'sk-js', name: 'JavaScript', level: 90 },
            { id: 'sk-react', name: 'React', level: 88 },
            { id: 'sk-vue', name: 'Vue.js', level: 80 },
            { id: 'sk-ts', name: 'TypeScript', level: 82 },
            { id: 'sk-tailwind', name: 'Tailwind CSS', level: 92 }
          ]
        },
        {
          id: 'sg-backend',
          name: { vi: 'Back-End', en: 'Back-End' },
          skills: [
            { id: 'sk-node', name: 'Node.js', level: 85 },
            { id: 'sk-python', name: 'Python', level: 78 },
            { id: 'sk-express', name: 'Express.js', level: 85 },
            { id: 'sk-sql', name: 'SQL', level: 75 },
            { id: 'sk-mongo', name: 'MongoDB', level: 80 }
          ]
        },
        {
          id: 'sg-tools',
          name: { vi: 'Công cụ & DevOps', en: 'Tools & DevOps' },
          skills: [
            { id: 'sk-git', name: 'Git / GitHub', level: 92 },
            { id: 'sk-docker', name: 'Docker', level: 70 },
            { id: 'sk-aws', name: 'AWS', level: 65 },
            { id: 'sk-figma', name: 'Figma', level: 72 }
          ]
        }
      ]
    }
  },
  {
    id: 'blog',
    type: 'blog',
    order: 5,
    visible: true,
    data: {
      items: [
        {
          id: 'blog-1',
          title: { vi: 'Tại sao tôi chọn React cho dự án lớn', en: 'Why I Choose React for Large Projects' },
          content: {
            vi: 'Trong bài viết này, tôi chia sẻ kinh nghiệm và lý do tại sao React vẫn là lựa chọn hàng đầu cho các dự án lớn trong năm 2024...',
            en: 'In this article, I share my experience and reasons why React remains the top choice for large projects in 2024...'
          },
          cover: '',
          date: '2024-03-15',
          tags: ['React', 'JavaScript', 'Web Dev']
        },
        {
          id: 'blog-2',
          title: { vi: 'Tối ưu hiệu suất CSS với CSS Variables', en: 'Optimizing Performance with CSS Variables' },
          content: {
            vi: 'CSS Variables (Custom Properties) không chỉ giúp code sạch hơn mà còn cải thiện đáng kể hiệu suất trang web...',
            en: 'CSS Variables (Custom Properties) not only make code cleaner but also significantly improve website performance...'
          },
          cover: '',
          date: '2024-01-20',
          tags: ['CSS', 'Performance', 'Frontend']
        }
      ]
    }
  },
  {
    id: 'testimonials',
    type: 'testimonials',
    order: 6,
    visible: true,
    data: {
      items: [
        {
          id: 'test-1',
          content: {
            vi: 'Làm việc với anh ấy thật tuyệt vời. Anh ấy luôn hoàn thành công việc đúng hạn và chất lượng vượt mong đợi. Rất chuyên nghiệp và nhiệt tình!',
            en: 'Working with him was amazing. He always delivers on time and the quality exceeds expectations. Very professional and enthusiastic!'
          },
          authorName: 'Trần Thị B',
          role: { vi: 'Product Manager', en: 'Product Manager' },
          company: { vi: 'Công ty ABC', en: 'ABC Company' },
          authorAvatar: ''
        },
        {
          id: 'test-2',
          content: {
            vi: 'Anh ấy có kiến thức kỹ thuật sâu rộng và khả năng giải quyết vấn đề xuất sắc. Sản phẩm cuối cùng vượt xa những gì chúng tôi kỳ vọng.',
            en: 'He has deep technical knowledge and outstanding problem-solving ability. The final product far exceeded what we expected.'
          },
          authorName: 'Lê Văn C',
          role: { vi: 'CTO', en: 'CTO' },
          company: { vi: 'Startup XYZ', en: 'XYZ Startup' },
          authorAvatar: ''
        },
        {
          id: 'test-3',
          content: {
            vi: 'Tôi đã hợp tác với nhiều lập trình viên nhưng hiếm khi gặp được người vừa giỏi kỹ thuật vừa có khả năng giao tiếp tốt như vậy.',
            en: 'I\'ve worked with many developers but rarely find someone who is both technically skilled and has excellent communication skills like this.'
          },
          authorName: 'Phạm Thị D',
          role: { vi: 'UI/UX Designer', en: 'UI/UX Designer' },
          company: { vi: 'Agency Z', en: 'Agency Z' },
          authorAvatar: ''
        }
      ]
    }
  },
  {
    id: 'contact',
    type: 'contact',
    order: 7,
    visible: true,
    data: {
      title: { vi: 'Liên hệ với tôi', en: 'Get In Touch' },
      subtitle: {
        vi: 'Hãy cùng nhau tạo ra những điều tuyệt vời! Tôi luôn sẵn sàng lắng nghe và hợp tác trong các dự án mới.',
        en: 'Let\'s create something amazing together! I\'m always ready to listen and collaborate on new projects.'
      },
      phone: '+84 xxx xxx xxx',
      address: { vi: 'Hà Nội, Việt Nam', en: 'Hanoi, Vietnam' },
      email: 'contact@example.com',
      socialLinks: [
        { id: 'gh', platform: 'GitHub', url: 'https://github.com/', icon: 'github' },
        { id: 'li', platform: 'LinkedIn', url: 'https://linkedin.com/', icon: 'linkedin' },
        { id: 'tw', platform: 'Twitter', url: 'https://twitter.com/', icon: 'twitter' },
        { id: 'fb', platform: 'Facebook', url: 'https://facebook.com/', icon: 'facebook' }
      ]
    }
  }
];

/* ────────────────────────────────────────────────────────────
   DEFAULT USERS
   ──────────────────────────────────────────────────────────── */
const DEFAULT_USERS = [
  {
    id: '1',
    username: 'admin',
    passwordHash: btoa('admin123')
  }
];

/* ────────────────────────────────────────────────────────────
   HELPER: Generate simple ID
   ──────────────────────────────────────────────────────────── */
function _generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ────────────────────────────────────────────────────────────
   EMPTY SECTION DATA TEMPLATES
   ──────────────────────────────────────────────────────────── */
function _emptyDataForType(type) {
  switch (type) {
    case 'profile':
      return {
        name: { vi: '', en: '' },
        title: { vi: '', en: '' },
        bio: { vi: '', en: '' },
        avatar: '',
        socialLinks: []
      };
    case 'projects':
      return { items: [] };
    case 'experience':
      return { items: [] };
    case 'education':
      return { items: [] };
    case 'skills':
      return { groups: [] };
    case 'blog':
      return { items: [] };
    case 'testimonials':
      return { items: [] };
    case 'contact':
      return {
        title: { vi: '', en: '' },
        subtitle: { vi: '', en: '' },
        phone: '',
        address: { vi: '', en: '' },
        email: '',
        socialLinks: []
      };
    default:
      return {};
  }
}

/* ════════════════════════════════════════════════════════════
   DB OBJECT
   ════════════════════════════════════════════════════════════ */
const DB = {
  // Local cache for database records to keep reads synchronous
  cache: {
    settings: null,
    sections: null
  },

  /* ── Storage Keys for local browser preferences ────────── */
  KEYS: {
    THEME:    'portfolio_theme',
    LANG:     'portfolio_lang'
  },

  /**
   * Initialize Supabase data, load settings/sections, and seed defaults if empty.
   */
  async init() {
    if (typeof window.supabaseClient === 'undefined') {
      console.warn('[DB] Supabase client is not initialized. Falling back to default data.');
      this.cache.settings = { ...DEFAULT_SETTINGS };
      this.cache.sections = [...DEFAULT_SECTIONS];
      return;
    }

    try {
      // 1. Fetch settings
      let { data: settingsData, error: settingsError } = await window.supabaseClient
        .from('portfolio_settings')
        .select('*')
        .eq('id', 'main')
        .maybeSingle();

      if (!settingsData) {
        // Record not found, seed settings
        console.log('[DB] Seeding default settings into Supabase...');
        const { data: newSettings, error: insertError } = await window.supabaseClient
          .from('portfolio_settings')
          .insert({ id: 'main', data: DEFAULT_SETTINGS })
          .select()
          .single();
        
        if (insertError) throw insertError;
        settingsData = newSettings;
      } else if (settingsError) {
        throw settingsError;
      }

      this.cache.settings = settingsData.data;

      // 2. Fetch sections
      let { data: sectionsData, error: sectionsError } = await window.supabaseClient
        .from('portfolio_sections')
        .select('*')
        .order('order', { ascending: true });

      if (sectionsError) throw sectionsError;

      if (!sectionsData || sectionsData.length === 0) {
        // Seed sections
        console.log('[DB] Seeding default sections into Supabase...');
        const { error: insertError } = await window.supabaseClient
          .from('portfolio_sections')
          .insert(DEFAULT_SECTIONS.map(s => ({
            id: s.id,
            type: s.type || s.id,
            order: s.order || 0,
            visible: s.visible !== false,
            data: s.data || {}
          })));

        if (insertError) throw insertError;

        // Fetch again after seeding
        const { data: refetchedSections, error: refetchError } = await window.supabaseClient
          .from('portfolio_sections')
          .select('*')
          .order('order', { ascending: true });
        
        if (refetchError) throw refetchError;
        sectionsData = refetchedSections;
      }

      this.cache.sections = sectionsData.map(s => ({
        id: s.id,
        type: s.type,
        order: s.order,
        visible: s.visible,
        data: s.data
      }));

      console.log('[DB] Data loaded from Supabase successfully.');
    } catch (e) {
      console.error('[DB] Error initializing Supabase database:', e);
      // Fallback to defaults
      this.cache.settings = { ...DEFAULT_SETTINGS };
      this.cache.sections = [...DEFAULT_SECTIONS];
    }
  },

  /* ── Settings ──────────────────────────────────────────── */
  getSettings() {
    return this.cache.settings || { ...DEFAULT_SETTINGS };
  },

  async saveSettings(settings) {
    this.cache.settings = { ...settings };
    if (typeof window.supabaseClient !== 'undefined') {
      const { error } = await window.supabaseClient
        .from('portfolio_settings')
        .update({ data: settings })
        .eq('id', 'main');
      if (error) console.error('[DB] Error updating settings:', error);
    }
  },

  /* ── Sections ──────────────────────────────────────────── */
  getSections() {
    return (this.cache.sections || []).sort((a, b) => a.order - b.order);
  },

  async saveSections(sections) {
    this.cache.sections = [...sections];
    if (typeof window.supabaseClient !== 'undefined') {
      const { error } = await window.supabaseClient
        .from('portfolio_sections')
        .upsert(sections.map(s => ({
          id: s.id,
          type: s.type || s.id,
          order: s.order,
          visible: s.visible !== false,
          data: s.data || {}
        })));
      if (error) console.error('[DB] Error saving sections:', error);
    }
  },

  getSection(id) {
    return (this.cache.sections || []).find(s => s.id === id) || null;
  },

  async updateSection(id, updates) {
    const idx = (this.cache.sections || []).findIndex(s => s.id === id);
    if (idx === -1) {
      console.warn('[DB] Section not found in cache:', id);
      return false;
    }

    const current = this.cache.sections[idx];
    const updated = {
      ...current,
      ...updates,
      data: updates.data !== undefined ? updates.data : current.data
    };
    this.cache.sections[idx] = updated;

    if (typeof window.supabaseClient !== 'undefined') {
      const { error } = await window.supabaseClient
        .from('portfolio_sections')
        .update({
          order: updated.order,
          visible: updated.visible !== false,
          data: updated.data
        })
        .eq('id', id);
      if (error) {
        console.error('[DB] Error updating section:', error);
        return false;
      }
    }
    return true;
  },

  async addSection(type) {
    const sections = this.getSections();
    const maxOrder = sections.reduce((max, s) => Math.max(max, s.order), -1);
    const newSection = {
      id: type + '-' + Date.now().toString(36),
      type,
      order: maxOrder + 1,
      visible: true,
      data: (typeof _emptyDataForType === 'function') ? _emptyDataForType(type) : {}
    };

    this.cache.sections.push(newSection);

    if (typeof window.supabaseClient !== 'undefined') {
      const { error } = await window.supabaseClient
        .from('portfolio_sections')
        .insert({
          id: newSection.id,
          type: newSection.type,
          order: newSection.order,
          visible: newSection.visible,
          data: newSection.data
        });
      if (error) console.error('[DB] Error inserting section:', error);
    }

    return newSection;
  },

  async deleteSection(id) {
    this.cache.sections = (this.cache.sections || []).filter(s => s.id !== id);

    if (typeof window.supabaseClient !== 'undefined') {
      const { error } = await window.supabaseClient
        .from('portfolio_sections')
        .delete()
        .eq('id', id);
      if (error) {
        console.error('[DB] Error deleting section:', error);
        return false;
      }
    }
    return true;
  },

  async reorderSections(orderedIds) {
    const sections = this.getSections();
    const updates = [];

    orderedIds.forEach((id, index) => {
      const section = sections.find(s => s.id === id);
      if (section) {
        section.order = index;
        updates.push({ id, order: index });
      }
    });

    this.cache.sections.sort((a, b) => a.order - b.order);

    if (typeof window.supabaseClient !== 'undefined' && updates.length > 0) {
      for (const update of updates) {
        await window.supabaseClient
          .from('portfolio_sections')
          .update({ order: update.order })
          .eq('id', update.id);
      }
    }
  },

  /* ── Stubs for secure User Management via Supabase Console ─ */
  getUsers() {
    if (typeof Auth !== 'undefined' && Auth.isLoggedIn && Auth.isLoggedIn()) {
      return [{ id: 'auth-user', username: Auth.getCurrentUser() || 'admin' }];
    }
    return [{ id: 'auth-user', username: 'admin' }];
  },
  saveUsers() {
    console.warn('[DB] User management is handled securely in Supabase Auth Dashboard.');
  },
  addUser() {
    console.warn('[DB] Client-side user creation is disabled. Please create users in Supabase Auth Console.');
    return null;
  },
  deleteUser() {
    console.warn('[DB] Client-side user deletion is disabled. Please manage users in Supabase Auth Console.');
    return false;
  },
  verifyUser() {
    return null;
  },
  updateUserPassword() {
    console.warn('[DB] Password change must be triggered via Supabase Auth Console.');
    return false;
  },

  /* ── Theme ──────────────────────────────────────────────── */

  /**
   * Get the saved theme preference ('dark' or 'light').
   * @returns {string}
   */
  getTheme() {
    return localStorage.getItem(this.KEYS.THEME) || 'dark';
  },

  /**
   * Save the theme preference.
   * @param {'dark'|'light'} theme
   */
  setTheme(theme) {
    localStorage.setItem(this.KEYS.THEME, theme);
  },

  /* ── Language ───────────────────────────────────────────── */

  /**
   * Get the saved language preference ('vi' or 'en').
   * @returns {string}
   */
  getLang() {
    return localStorage.getItem(this.KEYS.LANG) || 'vi';
  },

  /**
   * Save the language preference.
   * @param {'vi'|'en'} lang
   */
  setLang(lang) {
    localStorage.setItem(this.KEYS.LANG, lang);
  },

  /* ── Utility ────────────────────────────────────────────── */

  /**
   * Reset ALL portfolio data to defaults (except theme & lang).
   * Useful for a factory reset from the admin panel.
   */
  resetAll() {
    this.saveSettings({ ...DEFAULT_SETTINGS });
    this.saveSections(DEFAULT_SECTIONS.slice());
    this.saveUsers(DEFAULT_USERS.slice());
    this.clearSession();
  },

  /**
   * Export all portfolio data as a JSON string.
   * @returns {string}
   */
  exportData() {
    return JSON.stringify({
      settings: this.getSettings(),
      sections: this.getSections(),
      users: this.getUsers(),
      theme: this.getTheme(),
      lang: this.getLang(),
      exportedAt: new Date().toISOString()
    }, null, 2);
  },

  /**
   * Import data from a previously exported JSON string.
   * Only overwrites known keys.
   * @param {string} jsonString
   * @returns {boolean} true on success
   */
  importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.settings) this.saveSettings(data.settings);
      if (Array.isArray(data.sections)) this.saveSections(data.sections);
      if (Array.isArray(data.users)) this.saveUsers(data.users);
      if (data.theme) this.setTheme(data.theme);
      if (data.lang) this.setLang(data.lang);
      return true;
    } catch (e) {
      console.error('[DB] importData: parse error', e);
      return false;
    }
  }
};

/* Expose globally */
window.DB = DB;
window.DEFAULT_SECTIONS = DEFAULT_SECTIONS;
window.DEFAULT_SETTINGS = DEFAULT_SETTINGS;
window.DEFAULT_USERS = DEFAULT_USERS;
