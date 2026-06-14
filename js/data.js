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
  /* ── Storage Keys ──────────────────────────────────────── */
  KEYS: {
    SETTINGS: 'portfolio_settings',
    SECTIONS: 'portfolio_sections',
    USERS: 'portfolio_users',
    SESSION: 'portfolio_session',
    THEME: 'portfolio_theme',
    LANG: 'portfolio_lang'
  },

  /* ── Generic LocalStorage CRUD ─────────────────────────── */

  /**
   * Get a value from localStorage and parse it from JSON.
   * Returns null if the key does not exist or parsing fails.
   * @param {string} key
   * @returns {*|null}
   */
  get(key) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('[DB] get() parse error for key:', key, e);
      return null;
    }
  },

  /**
   * Serialize a value to JSON and store it in localStorage.
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('[DB] set() error for key:', key, e);
    }
  },

  /* ── Settings ──────────────────────────────────────────── */

  /**
   * Retrieve portfolio settings, falling back to defaults.
   * @returns {object}
   */
  getSettings() {
    const stored = this.get(this.KEYS.SETTINGS);
    if (!stored) return { ...DEFAULT_SETTINGS };
    // Merge with defaults to handle new fields added later
    return { ...DEFAULT_SETTINGS, ...stored };
  },

  /**
   * Persist portfolio settings.
   * @param {object} settings
   */
  saveSettings(settings) {
    this.set(this.KEYS.SETTINGS, settings);
  },

  /* ── Sections ──────────────────────────────────────────── */

  /**
   * Retrieve all sections, sorted by order, falling back to defaults.
   * @returns {Array}
   */
  getSections() {
    const stored = this.get(this.KEYS.SECTIONS);
    if (!stored || !Array.isArray(stored) || stored.length === 0) {
      return DEFAULT_SECTIONS.slice();
    }
    return stored.slice().sort((a, b) => a.order - b.order);
  },

  /**
   * Persist all sections.
   * @param {Array} sections
   */
  saveSections(sections) {
    this.set(this.KEYS.SECTIONS, sections);
  },

  /**
   * Get a single section by id.
   * @param {string} id
   * @returns {object|null}
   */
  getSection(id) {
    const sections = this.getSections();
    return sections.find(s => s.id === id) || null;
  },

  /**
   * Update a section's data (shallow-merges top-level properties).
   * @param {string} id - Section id
   * @param {object} updates - Partial section object to merge
   * @returns {boolean} true if found and updated
   */
  updateSection(id, updates) {
    const sections = this.getSections();
    const idx = sections.findIndex(s => s.id === id);
    if (idx === -1) {
      console.warn('[DB] updateSection: section not found:', id);
      return false;
    }
    // Deep-merge 'data' if provided, otherwise shallow-merge
    sections[idx] = {
      ...sections[idx],
      ...updates,
      data: updates.data !== undefined
        ? updates.data
        : sections[idx].data
    };
    this.saveSections(sections);
    return true;
  },

  /**
   * Add a new section of the given type.
   * @param {string} type - One of the 8 known section types
   * @returns {object} The newly created section
   */
  addSection(type) {
    const sections = this.getSections();
    const maxOrder = sections.reduce((max, s) => Math.max(max, s.order), -1);
    const newSection = {
      id: type + '-' + _generateId(),
      type,
      order: maxOrder + 1,
      visible: true,
      data: _emptyDataForType(type)
    };
    sections.push(newSection);
    this.saveSections(sections);
    return newSection;
  },

  /**
   * Delete a section by id.
   * @param {string} id
   * @returns {boolean} true if found and deleted
   */
  deleteSection(id) {
    const sections = this.getSections();
    const filtered = sections.filter(s => s.id !== id);
    if (filtered.length === sections.length) {
      console.warn('[DB] deleteSection: section not found:', id);
      return false;
    }
    this.saveSections(filtered);
    return true;
  },

  /**
   * Reorder sections by providing an array of ids in the desired order.
   * @param {string[]} orderedIds - Array of section ids in desired order
   */
  reorderSections(orderedIds) {
    const sections = this.getSections();
    orderedIds.forEach((id, index) => {
      const section = sections.find(s => s.id === id);
      if (section) section.order = index;
    });
    this.saveSections(sections);
  },

  /* ── Users ─────────────────────────────────────────────── */

  /**
   * Hash a plain-text password using btoa (base64 encoding).
   * NOTE: This is intentionally simple — use server-side hashing in production.
   * @param {string} password
   * @returns {string}
   */
  hashPassword(password) {
    // Double-encode with a salt prefix for minimal obfuscation
    return btoa('pf_salt::' + password);
  },

  /**
   * Retrieve all users, falling back to defaults.
   * @returns {Array}
   */
  getUsers() {
    const stored = this.get(this.KEYS.USERS);
    if (!stored || !Array.isArray(stored) || stored.length === 0) {
      return DEFAULT_USERS.slice();
    }
    return stored;
  },

  /**
   * Persist all users.
   * @param {Array} users
   */
  saveUsers(users) {
    this.set(this.KEYS.USERS, users);
  },

  /**
   * Add a new user. Returns the new user object or null if username taken.
   * @param {string} username
   * @param {string} password - Plain-text password
   * @returns {object|null}
   */
  addUser(username, password) {
    const users = this.getUsers();
    const trimmed = username.trim().toLowerCase();
    if (!trimmed || !password) {
      console.warn('[DB] addUser: username and password are required');
      return null;
    }
    const exists = users.some(u => u.username.toLowerCase() === trimmed);
    if (exists) {
      console.warn('[DB] addUser: username already exists:', trimmed);
      return null;
    }
    const newUser = {
      id: _generateId(),
      username: trimmed,
      passwordHash: this.hashPassword(password)
    };
    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  },

  /**
   * Delete a user by id.
   * @param {string} id
   * @returns {boolean} true if found and deleted
   */
  deleteUser(id) {
    const users = this.getUsers();
    // Prevent deleting the last user
    if (users.length <= 1) {
      console.warn('[DB] deleteUser: cannot delete the last user');
      return false;
    }
    const filtered = users.filter(u => u.id !== id);
    if (filtered.length === users.length) {
      console.warn('[DB] deleteUser: user not found:', id);
      return false;
    }
    this.saveUsers(filtered);
    return true;
  },

  /**
   * Verify credentials. Returns the matching user object or null.
   * @param {string} username
   * @param {string} password - Plain-text password
   * @returns {object|null}
   */
  verifyUser(username, password) {
    if (!username || !password) return null;
    const users = this.getUsers();
    const trimmed = username.trim().toLowerCase();
    const hash = this.hashPassword(password);

    // Also support legacy DEFAULT_USERS hash format (btoa without salt)
    const legacyHash = btoa(password);

    const match = users.find(u =>
      u.username.toLowerCase() === trimmed &&
      (u.passwordHash === hash || u.passwordHash === legacyHash || u.password === password)
    );
    return match || null;
  },

  /**
   * Update a user's password.
   * @param {string} id
   * @param {string} newPassword - Plain-text new password
   * @returns {boolean}
   */
  updateUserPassword(id, newPassword) {
    const users = this.getUsers();
    const user = users.find(u => u.id === id);
    if (!user) {
      console.warn('[DB] updateUserPassword: user not found:', id);
      return false;
    }
    user.passwordHash = this.hashPassword(newPassword);
    this.saveUsers(users);
    return true;
  },

  /* ── Session ────────────────────────────────────────────── */

  /**
   * Get the current session username from sessionStorage (or localStorage if remember-me was used).
   * @returns {string|null}
   */
  getSession() {
    let session = sessionStorage.getItem(this.KEYS.SESSION);
    if (!session) {
      session = localStorage.getItem(this.KEYS.SESSION);
    }
    return session;
  },

  /**
   * Set the current session to a username.
   * @param {string} username
   * @param {boolean} remember - Persist session to localStorage
   */
  setSession(username, remember = false) {
    sessionStorage.setItem(this.KEYS.SESSION, username);
    if (remember) {
      localStorage.setItem(this.KEYS.SESSION, username);
    } else {
      localStorage.removeItem(this.KEYS.SESSION);
    }
  },

  /**
   * Clear the current session (logout).
   */
  clearSession() {
    sessionStorage.removeItem(this.KEYS.SESSION);
    localStorage.removeItem(this.KEYS.SESSION);
  },

  /**
   * Check whether a user is currently logged in.
   * @returns {boolean}
   */
  isLoggedIn() {
    return !!this.getSession();
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
