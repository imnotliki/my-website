export type Language = 'en' | 'zh';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      highlights: 'Highlights',
      contact: 'Contact',
    },
    hero: {
      subtitle: 'Communication Engineering & AI',
      title: 'Su',
      titleItalic: 'Zhenyao',
      description: 'Bridging the gap between cutting-edge AI algorithms and low-level hardware architecture.',
    },
    about: {
      subtitle: 'About Me',
      title: 'The Fusion of AI & Hardware',
      p1: 'Currently pursuing a Master of Engineering at Nanyang Technological University (NTU), I specialize in the intersection of advanced AI algorithms and underlying hardware/network architectures.',
      p2: 'With a background in Communication Engineering, I possess the unique ability to translate complex technical languages into impactful business solutions. My goal is to become a leading Technical Product Manager or Solution Architect.',
      edu: 'Education',
      lang: 'Languages',
      edu1: 'NTU Master\'s (MSc)',
      edu2: 'Tiangong Univ. (BEng)',
      lang1: 'English (IELTS 7.0)',
      lang2: 'Mandarin (Native)',
    },
    experience: {
      subtitle: 'Career Path',
      title: 'Professional Experience',
      competencies: 'Core Competencies',
      items: [
        {
          company: 'Shanghai Ruizhi Culture',
          role: 'Network Maintenance Intern',
          period: '2024.08',
          description: 'Handled internal network anomalies, performed packet capture and connectivity testing to resolve network issues efficiently.',
        },
        {
          company: 'PetroChina Bohai Equipment',
          role: 'R&D Intern',
          period: '2023.07 - 2023.08',
          description: 'Worked in the intelligent manufacturing research center, debugging Siemens S7 PLC devices and learning modular programming for large-scale hardware.',
        },
        {
          company: 'Shanghai Qingyue Info Tech',
          role: 'Tech Support Intern',
          period: '2023',
          description: 'Assisted engineers in network planning, physical wiring, and performance testing of network nodes.',
        }
      ],
      skills: [
        { title: "Hardware Architecture", desc: "PLC debugging, network planning, and physical infrastructure." },
        { title: "AI Algorithms", desc: "CNN model training, PyTorch framework, and tumor detection optimization." },
        { title: "Product Strategy", desc: "Translating technical specs into business solutions and product demos." },
        { title: "IoT Systems", desc: "End-to-end architecture from embedded control to cloud deployment." }
      ]
    },
    projects: {
      subtitle: 'Portfolio',
      title: 'Selected Projects',
      items: [
        {
          title: "WSI Tumor Detection Optimization",
          role: "Research Member",
          period: "2026.02 - Present",
          description: "Optimizing tumor detection algorithms using weakly supervised learning on Whole Slide Images (WSI). Exploring dynamic pseudo-labeling in PyTorch to reduce annotation costs.",
          tags: ['AI', 'Healthcare', 'PyTorch', 'WSI']
        },
        {
          title: "Smart Fundus AI Diagnosis SaaS",
          role: "Project Leader",
          period: "2022.05 - 2023.02",
          description: "End-to-end architecture from data preprocessing to cloud deployment. Led a 5-person team to win the Gold Medal in the 'Internet+' Innovation Competition.",
          tags: ['SaaS', 'CNN', 'Cloud', 'Leadership']
        },
        {
          title: "ILight - AI IoT Street Light System",
          role: "Core R&D Member",
          period: "2022.08 - 2023.09",
          description: "Integrated environmental sensing and adaptive control for smart cities. Won the 16th National Student Energy Saving Competition and 3rd Prize in the China-US Young Maker Competition. Achieved full-stack closure from hardware selection to software monitoring.",
          tags: ['IoT', 'Smart City', 'Embedded', 'Android']
        },
        {
          title: "HCI Bionic Robot 3D Projection",
          role: "Tech Support & Testing",
          period: "2022.03 - 2023.01",
          description: "Developed a visual correction scheme for 2D facial animation projection onto 3D surfaces. Published as third author in an academic journal.",
          tags: ['HCI', 'Robotics', '3D Projection', 'Research']
        }
      ]
    },
    highlights: {
      title1: 'Built for',
      italic1: 'Innovation',
      title2: 'Driven by',
      italic2: 'Precision',
      stats: [
        { label: "GPA", value: "3.67/4", sub: "Tiangong University" },
        { label: "IELTS", value: "7.0", sub: "English Proficiency" },
        { label: "Awards", value: "10+", sub: "National & Provincial" }
      ]
    },
    contact: {
      subtitle: 'Get in Touch',
      title: 'Let\'s create something extraordinary.',
      description: 'I\'m always open to discussing new projects, creative ideas or opportunities to be part of your visions.',
      location: 'Singapore / Shanghai',
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        placeholderName: 'Your Name',
        placeholderEmail: 'Your Email',
        placeholderMessage: 'How can I help you?',
        submit: 'Send Message'
      }
    },
    footer: {
      rights: '© 2026 Su Zhenyao. All rights reserved.'
    }
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于',
      experience: '经历',
      projects: '项目',
      highlights: '高光',
      contact: '联系',
    },
    hero: {
      subtitle: '通信工程与人工智能',
      title: '苏',
      titleItalic: '珍瑶',
      description: '架起前沿 AI 算法与底层硬件架构之间的桥梁。',
    },
    about: {
      subtitle: '关于我',
      title: 'AI 与硬件的融合',
      p1: '目前在南洋理工大学（NTU）攻读通信工程硕士学位（MSc），专注于前沿 AI 算法与底层硬件/网络架构的交叉领域。',
      p2: '具备通信工程背景，擅长将复杂的技术语言转化为直击痛点的商业方案。我的目标是成为一名领先的技术产品经理或解决方案架构师。',
      edu: '教育背景',
      lang: '语言能力',
      edu1: '南洋理工大学 (硕士)',
      edu2: '天津工业大学 (学士)',
      lang1: '英语 (IELTS 7.0)',
      lang2: '普通话 (母语)',
    },
    experience: {
      subtitle: '职业路径',
      title: '专业经历',
      competencies: '核心能力',
      items: [
        {
          company: '上海锐智文化传播有限公司',
          role: '网络维护实习生',
          period: '2024.08',
          description: '协助处理企业内部网络异常，通过基础的数据包抓取与连通性测试，快速协助解决网络连接问题。',
        },
        {
          company: '中石油渤海装备制造有限公司',
          role: '研发实习生',
          period: '2023.07 - 2023.08',
          description: '深入企业研发机构，学习西门子 S7 系列 PLC 设备的现场信号调试与模块化编程，熟悉工业级大型硬件设备的实际运作环境。',
        },
        {
          company: '上海庆越信息科技有限公司',
          role: '技术支持实习生',
          period: '2023',
          description: '配合工程师完成数据网络规划与物理布线，参与网络节点的性能测试与日常巡检，协助排查基础通信设备故障。',
        }
      ],
      skills: [
        { title: "硬件架构", desc: "PLC 调试、网络规划和物理基础设施。" },
        { title: "AI 算法", desc: "CNN 模型训练、PyTorch 框架和肿瘤检测优化。" },
        { title: "产品策略", desc: "将技术规格转化为商业解决方案和产品 Demo。" },
        { title: "物联网系统", desc: "从嵌入式控制到云端部署的端到端架构。" }
      ]
    },
    projects: {
      subtitle: '作品集',
      title: '精选项目',
      items: [
        {
          title: "基于弱监督学习的 WSI 肿瘤检测算法优化",
          role: "研究成员",
          period: "2026.02 - 至今",
          description: "利用弱监督学习优化全数字切片（WSI）肿瘤检测算法。在 PyTorch 中探索动态伪标签技术以降低标注成本。",
          tags: ['AI', '医疗', 'PyTorch', 'WSI']
        },
        {
          title: "智能眼底 AI 诊断与慢性病预测 SaaS 平台",
          role: "项目负责人",
          period: "2022.05 - 2023.02",
          description: "从数据预处理到云端部署的端到端架构设计。带领 5 人团队斩获第九届“互联网+”大学生创新创业大赛金奖。",
          tags: ['SaaS', 'CNN', '云端', '领导力']
        },
        {
          title: "ILight – AI 驱动的物联网智能路灯管理系统",
          role: "产品研发核心成员",
          period: "2022.08 - 2023.09",
          description: "集成环境感知与自适应控制，助力智慧城市建设。荣获第十六届全国大学生节能减排社会实践与科技竞赛及中美青年创客大赛三等奖。实现了从硬件选型到软件监控的全链路闭环。",
          tags: ['物联网', '智慧城市', '嵌入式', 'Android']
        },
        {
          title: "人机交互 (HCI) 仿生机器人 3D 曲面投影系统",
          role: "技术支持与测试优化",
          period: "2022.03 - 2023.01",
          description: "针对 2D 面部动画投影至 3D 物理曲面的视觉校正方案。作为第三作者在相关学术期刊发表成果。",
          tags: ['HCI', '机器人', '3D 投影', '研究']
        }
      ]
    },
    highlights: {
      title1: '为',
      italic1: '创新',
      title2: '而生，由',
      italic2: '精准',
      stats: [
        { label: "GPA", value: "3.67/4", sub: "天津工业大学" },
        { label: "IELTS", value: "7.0", sub: "英语水平" },
        { label: "奖项", value: "10+", sub: "国家级及省级" }
      ]
    },
    contact: {
      subtitle: '联系我',
      title: '让我们一起创造卓越。',
      description: '我随时欢迎讨论新项目、创意想法或加入您的愿景的机会。',
      location: '新加坡 / 上海',
      form: {
        name: '姓名',
        email: '邮箱',
        message: '留言',
        placeholderName: '您的姓名',
        placeholderEmail: '您的邮箱',
        placeholderMessage: '我能为您提供什么帮助？',
        submit: '发送消息'
      }
    },
    footer: {
      rights: '© 2026 苏珍瑶。保留所有权利。'
    }
  }
};
