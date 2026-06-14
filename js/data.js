/* ============================================================
   DATA LAYER - data.js
   Portfolio Website Data Management via LocalStorage
   ============================================================ */

/* ────────────────────────────────────────────────────────────
   DEFAULT SETTINGS
   ──────────────────────────────────────────────────────────── */
const DEFAULT_SETTINGS = {
  title: 'Pham Manh Hung - Analytics Data Engineer Portfolio',
  favicon: '',
  metaDesc: 'Portfolio of Pham Manh Hung, an Analytics Data Engineer focused on Databricks, Snowflake, Azure, Google Cloud, and building scalable data pipelines.',
  accentColor: '#7c3aed',
  emailjsServiceId: '',
  emailjsTemplateId: '',
  emailjsPublicKey: '',
  contactEmail: 'hungpm267@gmail.com'
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
        vi: 'Tôi là kỹ sư dữ liệu tốt nghiệp chuyên ngành Hệ thống Thông tin tại trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM (UIT). Tôi đam mê và định hướng phát triển chuyên sâu trong lĩnh vực Kỹ thuật Dữ liệu (Data Engineering). Tôi có kinh nghiệm thực tế trong việc thiết kế và chuyển đổi hệ thống dữ liệu từ kiến trúc ETL sang ELT, đảm bảo tính nhất quán của dữ liệu. Hiện tại, tôi đang tham gia chương trình đào tạo kỹ sư chuyên sâu tại NashTech để nâng cao năng lực kỹ thuật và kỹ năng mềm trong môi trường làm việc toàn cầu.',
        en: 'I am an Information Systems graduate from UIT, and I am highly focused on developing my career in Data Engineering. Previously, I gained practical experience in designing and migrating data systems from ETL to ELT architectures while ensuring data consistency. Currently, I am participating in NashTech\'s intensive engineering training program to advance technical capabilities in data analytics, cloud infrastructure, and enterprise data architectures within a global environment.'
      },
      avatar: '',
      socialLinks: [
        { id: 'gh', platform: 'GitHub', url: 'https://github.com/Hungpm267', icon: 'github' },
        { id: 'li', platform: 'LinkedIn', url: 'https://linkedin.com/in/hungpm267/', icon: 'linkedin' }
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
          name: { vi: 'Hệ thống Kho dữ liệu & OLAP cho dữ liệu Động đất', en: 'Data Warehouse & OLAP System for Earthquake Data' },
          description: {
            vi: 'Xây dựng hệ thống Data Warehouse hoàn chỉnh sử dụng SSIS để trích xuất, biến đổi và lưu trữ tập dữ liệu động đất lịch sử vào SQL Server. Xây dựng các khối SSAS OLAP đa chiều để tổng hợp và xử lý phân tích dữ liệu hiệu quả. Thiết kế các báo cáo trực quan bằng SSRS, Power BI và Excel Pivot Tables.',
            en: 'Developed an end-to-end Data Warehouse system using SSIS to extract, transform, and store historical earthquake datasets into SQL Server. Built multi-dimensional OLAP cubes with SSAS to enable efficient data aggregation and analytical processing. Constructed interactive reports and dashboards using SSRS, Power BI, and Excel Pivot Tables.'
          },
          image: '',
          tags: ['SQL Server', 'SSIS', 'SSAS', 'SSRS', 'Power BI', 'Python', 'Excel'],
          demoUrl: '',
          repoUrl: 'https://github.com/Hungpm267',
          featured: true
        },
        {
          id: 'proj-2',
          name: { vi: 'Dự đoán Chất lượng Rượu bằng Apache Spark', en: 'Wine Quality Prediction with Apache Spark' },
          description: {
            vi: 'Sử dụng PySpark trong hệ sinh thái Apache Spark để thực hiện Phân tích Dữ liệu Khám phá (EDA) và tiền xử lý dữ liệu trên các tập dữ liệu lớn. Thiết kế và triển khai mô hình phân loại K-Nearest Neighbors (KNN) từ đầu (không dùng MLlib) để dự đoán chất lượng rượu.',
            en: 'Employed PySpark within the Apache Spark ecosystem to execute Exploratory Data Analysis (EDA) and data preprocessing on large datasets. Engineered and implemented a K-Nearest Neighbors (KNN) classification model from scratch (without relying on MLlib) to accurately predict wine quality metrics.'
          },
          image: '',
          tags: ['Apache Spark', 'PySpark', 'Python', 'Jupyter Notebook'],
          demoUrl: '',
          repoUrl: 'https://github.com/Hungpm267',
          featured: true
        },
        {
          id: 'proj-3',
          name: { vi: 'Đường ống Dữ liệu Đám mây qua Azure Data Factory & Databricks', en: 'Cloud Data Pipeline via Azure Data Factory & Databricks' },
          description: {
            vi: 'Thiết kế quy trình nạp dữ liệu tự động bằng Azure Data Factory. Triển khai Kiến trúc Medallion (Bronze, Silver, Gold layers) trong Azure Data Lake Gen2 sử dụng Azure Databricks và PySpark để làm sạch, kiểm định schema và biến đổi dữ liệu. Quản lý bảo mật thông qua Azure Key Vault và lưu trữ dữ liệu phân tích tại Azure Synapse Analytics.',
            en: 'Designed automated ingestion workflows using Azure Data Factory pipelines to securely collect and move raw data. Implemented a Medallion Architecture (Bronze, Silver, and Gold layers) inside Azure Data Lake Gen2 using Azure Databricks and PySpark for scalable data cleansing, schema validation, and transformations. Managed credentials using Azure Key Vault. Loaded final data into Azure Synapse Analytics.'
          },
          image: '',
          tags: ['Azure Data Factory', 'Azure Data Lake Gen2', 'Azure Databricks', 'Azure Synapse Analytics', 'Azure Key Vault', 'PySpark'],
          demoUrl: '',
          repoUrl: 'https://github.com/Hungpm267',
          featured: true
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
          company: { vi: 'NashTech', en: 'NashTech' },
          role: { vi: 'Kỹ sư Dữ liệu và Phân tích (Analytics Data Engineer)', en: 'Analytics Data Engineer (Vocational Training Program)' },
          description: {
            vi: 'Tham gia chương trình đào tạo kỹ sư chuyên sâu để nâng cao năng lực kỹ thuật về phân tích dữ liệu, hạ tầng đám mây và kiến trúc dữ liệu doanh nghiệp trong môi trường toàn cầu.\n• Công nghệ: Databricks, Snowflake, Fabric, PowerBI, T-SQL (SQL Server), PostgreSQL, PL/SQL (Oracle), SSIS, Pandas/Pyspark, Lakehouse/Warehouse.\n• Kỹ năng: Mô hình hóa dữ liệu (Kimball/Inmon), Data Governance, Thiết kế mẫu ETL.',
            en: 'Participating in an intensive engineering training program to advance technical capabilities in data analytics, cloud infrastructure, and enterprise data architectures within a global environment.\n• Technologies: Databricks, Snowflake, Fabric, PowerBI, T-SQL (SQL Server), PostgreSQL, PL/SQL (Oracle), SSIS, Pandas/Pyspark, Lakehouse/Warehouse.\n• Data Skills: Data Modeling (Kimball/Inmon), Data Governance, ETL Design Patterns.'
          },
          logo: '',
          startDate: '2026-04',
          endDate: '',
          current: true
        },
        {
          id: 'exp-2',
          company: { vi: 'Cigro', en: 'Cigro' },
          role: { vi: 'Kỹ sư Dữ liệu Sản phẩm (Product Data Engineer)', en: 'Product Data Engineer' },
          description: {
            vi: 'Tập trung xây dựng các đường ống ETL/ELT mới và chuyển đổi hệ thống dữ liệu để hỗ trợ phát triển sản phẩm.\n• Công nghệ: Python, SQL, Google Cloud (GCS, BigQuery), Slowly Changing Dimension (SCD), Data Build Tool (dbt), GitLab, Prefect.\n• Công việc: Phát triển các đường ống ETL mới, chuyển đổi các hệ thống ETL cũ sang kiến trúc ELT hiện đại; duy trì và tối ưu hóa các pipeline hiện tại; giám sát quy trình dữ liệu với Prefect; viết tài liệu kỹ thuật chi tiết.',
            en: 'Focused on building new ETL/ELT pipelines and migrating the company\'s data pipeline system to support product growth.\n• Technologies: Python, SQL, Google Cloud (GCS, BigQuery), Slowly Changing Dimension (SCD), Data Build Tool (dbt), GitLab, Prefect.\n• Responsibilities: Developed new ETL pipelines and migrated legacy ETL systems to modern ELT architectures; maintained existing production pipelines; monitored workflows using Prefect; authored comprehensive technical documentation.'
          },
          logo: '',
          startDate: '2025-12',
          endDate: '2026-03',
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
          school: { vi: 'Đại học Công nghệ Thông tin - ĐHQG TP.HCM (UIT)', en: 'University of Information Technology - VNUHCM' },
          degree: { vi: 'Cử nhân Hệ thống Thông tin (Đã tốt nghiệp)', en: 'Bachelor of Information Systems (Graduated)' },
          description: {
            vi: 'Thời gian: 07/2021 – 11/2025.\nCác môn học liên quan: Cơ sở dữ liệu phân tán, Khai phá dữ liệu, Dữ liệu lớn, Phân tích dữ liệu với Python, Phân tích dữ liệu kinh doanh, Kho dữ liệu & OLAP, Hệ quản trị cơ sở dữ liệu, Điện toán đám mây.',
            en: 'July 2021 – November 2025. Relevant courses: Distributed Database Systems, Data Mining, Big Data, Data Analysis with Python, Business Data Analytics, Data Warehousing & OLAP, Database Management Systems, Cloud Computing.'
          },
          logo: '',
          startDate: '2021-07',
          endDate: '2025-11'
        },
        {
          id: 'edu-2',
          school: { vi: 'IBM & Các Tổ chức Đào tạo', en: 'IBM & Learning Platforms' },
          degree: { vi: 'Chứng chỉ Chuyên môn & Kỹ năng', en: 'Professional Certificates' },
          description: {
            vi: '• TOEIC LR: 735 điểm\n• Python for Data Science, AI & Development - IBM\n• Python Project for Data Engineering - IBM\n• Business Intelligence (BI) Essentials - IBM\n• Foundations: Data, Data, Everywhere - IBM\n• SQL (Intermediate) - HackerRank\n• Critical Thinking Certificate - Thinking School',
            en: '• TOEIC LR: 735\n• Python for Data Science, AI & Development - IBM\n• Python Project for Data Engineering - IBM\n• Business Intelligence (BI) Essentials - IBM\n• Foundations: Data, Data, Everywhere - IBM\n• SQL (Intermediate) - HackerRank\n• Critical Thinking Certificate - Thinking School'
          },
          logo: '',
          startDate: '2024-01',
          endDate: '2025-12'
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
          id: 'sg-data-cloud',
          name: { vi: 'Kỹ thuật Dữ liệu & Đám mây', en: 'Data Engineering & Cloud' },
          skills: [
            { id: 'sk-databricks', name: 'Databricks / PySpark', level: 85 },
            { id: 'sk-snowflake', name: 'Snowflake', level: 80 },
            { id: 'sk-fabric', name: 'Microsoft Fabric', level: 80 },
            { id: 'sk-gcp', name: 'Google Cloud (GCS, BigQuery)', level: 82 },
            { id: 'sk-azure', name: 'Azure (ADF, Databricks, Synapse)', level: 85 }
          ]
        },
        {
          id: 'sg-etl-analytics',
          name: { vi: 'Công cụ ETL & Phân tích', en: 'ETL Tools & Analytics' },
          skills: [
            { id: 'sk-dbt', name: 'dbt (Data Build Tool)', level: 85 },
            { id: 'sk-prefect', name: 'Prefect (Orchestration)', level: 80 },
            { id: 'sk-powerbi', name: 'Power BI / SSRS', level: 88 },
            { id: 'sk-ssis', name: 'SSIS / SSAS', level: 82 }
          ]
        },
        {
          id: 'sg-languages-tools',
          name: { vi: 'Lập trình & Công cụ khác', en: 'Programming & General Tools' },
          skills: [
            { id: 'sk-python', name: 'Python', level: 88 },
            { id: 'sk-sql', name: 'SQL (T-SQL, PL/SQL, PostgreSQL)', level: 90 },
            { id: 'sk-git', name: 'Git / GitLab / GitHub', level: 85 }
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
          title: { vi: 'So sánh Kiến trúc ETL và ELT trong Data Engineering', en: 'Comparing ETL and ELT Architectures in Data Engineering' },
          content: {
            vi: 'Chia sẻ kinh nghiệm thực tế về việc chuyển đổi hệ thống dữ liệu từ ETL truyền thống sang kiến trúc ELT hiện đại sử dụng dbt và BigQuery...',
            en: 'Sharing practical experience on migrating data systems from traditional ETL to modern ELT architectures using dbt and BigQuery...'
          },
          cover: '',
          date: '2026-03-01',
          tags: ['Data Engineering', 'ETL', 'ELT', 'dbt']
        },
        {
          id: 'blog-2',
          title: { vi: 'Xây dựng Hồ Dữ liệu (Lakehouse) với Medallion Architecture', en: 'Building a Lakehouse with Medallion Architecture' },
          content: {
            vi: 'Hướng dẫn chi tiết cách thiết lập các tầng dữ liệu Bronze, Silver, và Gold bằng PySpark trên Azure Databricks...',
            en: 'Detailed guide on setting up Bronze, Silver, and Gold data layers using PySpark on Azure Databricks...'
          },
          cover: '',
          date: '2026-05-10',
          tags: ['Databricks', 'Lakehouse', 'PySpark', 'Azure']
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
        vi: 'Hãy cùng nhau tạo ra những điều tuyệt vời! Tôi luôn sẵn sàng lắng nghe và hợp tác trong các dự án mới về dữ liệu.',
        en: 'Let\'s create something amazing together! I\'m always ready to collaborate on new data engineering projects.'
      },
      phone: '0333856974',
      address: { vi: 'Quận 7, TP. Hồ Chí Minh, Việt Nam', en: 'District 7, Ho Chi Minh City, Vietnam' },
      email: 'hungpm267@gmail.com',
      socialLinks: [
        { id: 'gh', platform: 'GitHub', url: 'https://github.com/Hungpm267', icon: 'github' },
        { id: 'li', platform: 'LinkedIn', url: 'https://linkedin.com/in/hungpm267/', icon: 'linkedin' }
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
