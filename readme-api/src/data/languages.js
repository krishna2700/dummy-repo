/**
 * Supported languages for README generation.
 * Each entry defines display name, text direction, and all UI strings.
 */
const LANGUAGES = {
  en: {
    name: "English",
    direction: "ltr",
    strings: {
      overview: "Overview",
      features: "Features",
      techStack: "Tech Stack",
      installation: "Installation",
      usage: "Usage",
      contributing: "Contributing",
      license: "License",
      contribBody:
        "Contributions are welcome! Please open an issue or submit a pull request.",
      licenseBody: (l) => `This project is licensed under the ${l} License.`,
      defaultDesc: "A brief description of what this project does.",
      defaultFeatures: ["Easy to use", "Well documented", "Highly configurable"],
    },
  },
  es: {
    name: "Spanish (Español)",
    direction: "ltr",
    strings: {
      overview: "Descripción",
      features: "Características",
      techStack: "Tecnologías",
      installation: "Instalación",
      usage: "Uso",
      contributing: "Contribuciones",
      license: "Licencia",
      contribBody:
        "¡Las contribuciones son bienvenidas! Por favor abre un issue o envía un pull request.",
      licenseBody: (l) =>
        `Este proyecto está licenciado bajo la Licencia ${l}.`,
      defaultDesc: "Una breve descripción del proyecto.",
      defaultFeatures: [
        "Fácil de usar",
        "Bien documentado",
        "Altamente configurable",
      ],
    },
  },
  fr: {
    name: "French (Français)",
    direction: "ltr",
    strings: {
      overview: "Présentation",
      features: "Fonctionnalités",
      techStack: "Technologies",
      installation: "Installation",
      usage: "Utilisation",
      contributing: "Contributions",
      license: "Licence",
      contribBody:
        "Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou soumettre une pull request.",
      licenseBody: (l) => `Ce projet est sous licence ${l}.`,
      defaultDesc: "Une brève description du projet.",
      defaultFeatures: [
        "Facile à utiliser",
        "Bien documenté",
        "Hautement configurable",
      ],
    },
  },
  de: {
    name: "German (Deutsch)",
    direction: "ltr",
    strings: {
      overview: "Übersicht",
      features: "Funktionen",
      techStack: "Technologien",
      installation: "Installation",
      usage: "Verwendung",
      contributing: "Mitwirken",
      license: "Lizenz",
      contribBody:
        "Beiträge sind willkommen! Bitte öffne ein Issue oder sende einen Pull Request.",
      licenseBody: (l) => `Dieses Projekt steht unter der ${l}-Lizenz.`,
      defaultDesc: "Eine kurze Beschreibung des Projekts.",
      defaultFeatures: [
        "Einfach zu bedienen",
        "Gut dokumentiert",
        "Hochkonfigurierbar",
      ],
    },
  },
  zh: {
    name: "Chinese Simplified (中文)",
    direction: "ltr",
    strings: {
      overview: "项目概述",
      features: "功能特性",
      techStack: "技术栈",
      installation: "安装",
      usage: "使用方法",
      contributing: "贡献",
      license: "许可证",
      contribBody: "欢迎贡献！请提交 Issue 或 Pull Request。",
      licenseBody: (l) => `本项目基于 ${l} 许可证开源。`,
      defaultDesc: "项目的简要描述。",
      defaultFeatures: ["易于使用", "文档完善", "高度可配置"],
    },
  },
  ja: {
    name: "Japanese (日本語)",
    direction: "ltr",
    strings: {
      overview: "概要",
      features: "機能",
      techStack: "技術スタック",
      installation: "インストール",
      usage: "使い方",
      contributing: "コントリビューション",
      license: "ライセンス",
      contribBody:
        "コントリビューションを歓迎します！Issue を開くか Pull Request を送ってください。",
      licenseBody: (l) =>
        `このプロジェクトは ${l} ライセンスの下に公開されています。`,
      defaultDesc: "プロジェクトの簡単な説明。",
      defaultFeatures: ["使いやすい", "ドキュメントが充実", "高い設定可能性"],
    },
  },
  pt: {
    name: "Portuguese (Português)",
    direction: "ltr",
    strings: {
      overview: "Visão Geral",
      features: "Funcionalidades",
      techStack: "Tecnologias",
      installation: "Instalação",
      usage: "Uso",
      contributing: "Contribuições",
      license: "Licença",
      contribBody:
        "Contribuições são bem-vindas! Abra uma issue ou envie um pull request.",
      licenseBody: (l) =>
        `Este projeto está licenciado sob a Licença ${l}.`,
      defaultDesc: "Uma breve descrição do projeto.",
      defaultFeatures: [
        "Fácil de usar",
        "Bem documentado",
        "Altamente configurável",
      ],
    },
  },
  hi: {
    name: "Hindi (हिन्दी)",
    direction: "ltr",
    strings: {
      overview: "अवलोकन",
      features: "विशेषताएं",
      techStack: "तकनीकी स्टैक",
      installation: "इंस्टॉलेशन",
      usage: "उपयोग",
      contributing: "योगदान",
      license: "लाइसेंस",
      contribBody:
        "योगदान स्वागत योग्य है! कृपया एक issue खोलें या pull request सबमिट करें।",
      licenseBody: (l) => `यह प्रोजेक्ट ${l} लाइसेंस के अंतर्गत है।`,
      defaultDesc: "प्रोजेक्ट का संक्षिप्त विवरण।",
      defaultFeatures: [
        "उपयोग में आसान",
        "अच्छी तरह प्रलेखित",
        "उच्च कॉन्फ़िगर करने योग्य",
      ],
    },
  },
  ar: {
    name: "Arabic (العربية)",
    direction: "rtl",
    strings: {
      overview: "نظرة عامة",
      features: "الميزات",
      techStack: "التقنيات المستخدمة",
      installation: "التثبيت",
      usage: "الاستخدام",
      contributing: "المساهمة",
      license: "الرخصة",
      contribBody:
        "المساهمات مرحب بها! يرجى فتح issue أو إرسال pull request.",
      licenseBody: (l) => `هذا المشروع مرخص بموجب رخصة ${l}.`,
      defaultDesc: "وصف مختصر للمشروع.",
      defaultFeatures: ["سهل الاستخدام", "موثق جيداً", "قابل للتهيئة بشكل كبير"],
    },
  },
  ru: {
    name: "Russian (Русский)",
    direction: "ltr",
    strings: {
      overview: "Обзор",
      features: "Возможности",
      techStack: "Технологии",
      installation: "Установка",
      usage: "Использование",
      contributing: "Участие в разработке",
      license: "Лицензия",
      contribBody:
        "Вклад приветствуется! Пожалуйста, откройте issue или отправьте pull request.",
      licenseBody: (l) =>
        `Этот проект распространяется под лицензией ${l}.`,
      defaultDesc: "Краткое описание проекта.",
      defaultFeatures: [
        "Простота использования",
        "Хорошая документация",
        "Высокая настраиваемость",
      ],
    },
  },
  ko: {
    name: "Korean (한국어)",
    direction: "ltr",
    strings: {
      overview: "개요",
      features: "기능",
      techStack: "기술 스택",
      installation: "설치",
      usage: "사용법",
      contributing: "기여",
      license: "라이선스",
      contribBody:
        "기여를 환영합니다! Issue를 열거나 Pull Request를 제출해 주세요.",
      licenseBody: (l) => `이 프로젝트는 ${l} 라이선스에 따라 배포됩니다.`,
      defaultDesc: "이 프로젝트에 대한 간략한 설명입니다.",
      defaultFeatures: ["사용하기 쉬운", "문서화 잘 됨", "고도로 구성 가능"],
    },
  },
  it: {
    name: "Italian (Italiano)",
    direction: "ltr",
    strings: {
      overview: "Panoramica",
      features: "Funzionalità",
      techStack: "Tecnologie Utilizzate",
      installation: "Installazione",
      usage: "Utilizzo",
      contributing: "Contributi",
      license: "Licenza",
      contribBody:
        "I contributi sono benvenuti! Apri un issue o invia una pull request.",
      licenseBody: (l) =>
        `Questo progetto è distribuito con la Licenza ${l}.`,
      defaultDesc: "Una breve descrizione del progetto.",
      defaultFeatures: [
        "Facile da usare",
        "Ben documentato",
        "Altamente configurabile",
      ],
    },
  },
  nl: {
    name: "Dutch (Nederlands)",
    direction: "ltr",
    strings: {
      overview: "Overzicht",
      features: "Functies",
      techStack: "Gebruikte Technologieën",
      installation: "Installatie",
      usage: "Gebruik",
      contributing: "Bijdragen",
      license: "Licentie",
      contribBody:
        "Bijdragen zijn welkom! Open een issue of dien een pull request in.",
      licenseBody: (l) => `Dit project is gelicenseerd onder de ${l} Licentie.`,
      defaultDesc: "Een korte beschrijving van het project.",
      defaultFeatures: [
        "Gemakkelijk te gebruiken",
        "Goed gedocumenteerd",
        "Zeer configureerbaar",
      ],
    },
  },
  tr: {
    name: "Turkish (Türkçe)",
    direction: "ltr",
    strings: {
      overview: "Genel Bakış",
      features: "Özellikler",
      techStack: "Kullanılan Teknolojiler",
      installation: "Kurulum",
      usage: "Kullanım",
      contributing: "Katkıda Bulunma",
      license: "Lisans",
      contribBody:
        "Katkılarınızı bekliyoruz! Lütfen bir issue açın veya pull request gönderin.",
      licenseBody: (l) =>
        `Bu proje ${l} Lisansı kapsamında lisanslanmıştır.`,
      defaultDesc: "Projenin kısa bir açıklaması.",
      defaultFeatures: [
        "Kullanımı kolay",
        "İyi belgelenmiş",
        "Yüksek düzeyde yapılandırılabilir",
      ],
    },
  },
  pl: {
    name: "Polish (Polski)",
    direction: "ltr",
    strings: {
      overview: "Przegląd",
      features: "Funkcje",
      techStack: "Użyte Technologie",
      installation: "Instalacja",
      usage: "Użycie",
      contributing: "Wkład",
      license: "Licencja",
      contribBody:
        "Wkłady są mile widziane! Otwórz issue lub wyślij pull request.",
      licenseBody: (l) => `Ten projekt jest objęty licencją ${l}.`,
      defaultDesc: "Krótki opis projektu.",
      defaultFeatures: [
        "Łatwy w użyciu",
        "Dobrze udokumentowany",
        "Wysoko konfigurowalny",
      ],
    },
  },
};

export default LANGUAGES;
