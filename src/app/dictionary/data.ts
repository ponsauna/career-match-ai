// src/app/dictionary/data.ts

export const categorizedDictionary: {
    [key: string]: { term: string; description: string }[];
  } = {
    営業: [
      {
        term: "AE (Account Executive)",
        description:
          "新規営業担当。新規顧客へのアプローチ・契約獲得がメイン。SaaSや広告業界で多用される。",
      },
      {
        term: "AM (Account Manager)/CSM(Client Success Manager)/CAM(Client Account Manager)",
        description:
          "既存顧客との関係維持・売上拡大を担当。顧客満足度向上やリレーション構築がキー。",
      },
      {
        term: "Partner Manager/PSM(Partner Success Manager)",
        description:
          "販売代理店やパートナー企業との連携を強化し、共同プロモーションや販売戦略を推進する。",
      },
      {
        term: "Technical Account Manager (TAM)",
        description:
          "顧客の技術課題解決や製品導入支援を行い、技術とアカウント管理を兼ね備える。",
      },
      {
        term: "CP(Client Partner)",
        description:
          "広告業界などでよく使われる。営業担当。既存顧客の新しい提案や新しい部署や商品を開拓",
      },
      {
        term: "AP(Agency Partner)",
        description:
          "広告業界などでよく使われる。代理店向きあいの営業担当。既存顧客の新しい提案や新しい部署や商品を開拓",
      },
      {
        term: "BDR (Business Development Representative)",
        description:
          "リード（潜在顧客）のリサーチ・初期アプローチを担当。AEにパスするための見込み客開拓が目的。",
      },
      {
        term: "Sales Executive",
        description:
          "積極的な新規顧客獲得や市場開拓を担当。対人スキルとプレゼン力が重視される。",
      },
      {
        term: "Field Sales Representative",
        description:
          "対面での直接訪問営業を担当。顧客のニーズを直接把握する役割。",
      },
      {
        term: "Inside Sales Representative",
        description:
          "電話やオンラインでの営業活動を担当。効率的なフォローアップが求められる。",
      },
      {
        term: "Territory Sales Manager",
        description:
          "特定地域における販売戦略の策定と実行。地域内の売上目標達成が目的。",
      },
      {
        term: "Regional Sales Manager",
        description:
          "広域の複数地域にわたる営業チームの統括。販売戦略の管理・実行を担う。",
      },
      {
        term: "Business Development Manager (BDM)",
        description:
          "新規市場開拓と既存ビジネス拡大に向け、戦略的パートナーシップの構築や成約促進を担当。",
      },
      {
        term: "Sales Operations Manager",
        description:
          "営業プロセスの最適化、KPI管理、データ分析を通じた効率向上を支援。",
      },
      {
        term: "Client Relationship Manager",
        description:
          "既存顧客との関係強化を図り、長期的なビジネスパートナーシップを築く。",
      },
      {
        term: "Channel Sales Manager",
        description:
          "パートナーを通じた間接販売戦略の立案・実行で販路拡大を図る。",
      },
    ],
    プロダクト: [
      {
        term: "Product Specialist",
        description:
          "製品に関する深い知識を持ち、デモや内部トレーニング、フィードバック集約を担当する。",
      },
      {
        term: "Solution Engineer / Solutions Consultant",
        description:
          "プリセールスエンジニアとして、製品デモや技術提案を実施。技術力とコミュニケーション力が求められる。",
      },
      {
        term: "Implementation Consultant",
        description:
          "システムやソフトウェアの導入支援、要件定義、ユーザートレーニングを担当する。",
      },
      {
        term: "Product Manager (PM)",
        description:
          "製品企画・開発、ロードマップ策定、顧客要件の調整など、製品全体の管理を担う。",
      },
      {
        term: "Solution Architect (SA)",
        description:
          "顧客のシステム全体設計支援、技術的コンサルティングを行い、最適なソリューションを提案する。",
      },
    ],
    マーケティング: [
      {
        term: "PMM (Product Marketing Manager)/GBM(Global Business Marketing)",
        description:
          "製品の市場導入戦略、競合分析、販売促進施策を立案・実施する。",
      },
      {
        term: "Marketing Manager",
        description:
          "リード獲得、ブランディング、キャンペーン実施など、幅広いマーケティング活動を統括する。",
      },
      {
        term: "Brand Manager",
        description:
          "ブランド戦略の策定と管理、ブランドイメージの維持向上に責任を持つ。",
      },
      {
        term: "Digital Marketing Manager",
        description:
          "オンラインマーケティング、SNS、デジタル広告の戦略と運用を統括し、リード獲得を狙う。",
      },
    ],
    その他: [
      {
        term: "Customer Support / Customer Service",
        description:
          "顧客からの問い合わせ対応、技術サポート、トラブルシュートを担うフロントラインの役割。",
      },
      {
        term: "Business Analyst (BA)",
        description:
          "データ分析、レポート作成、経営戦略立案のサポートを行い、数字と戦略に基づいた提案を行う。",
      },
      {
        term: "HRBP (Human Resources Business Partner)",
        description:
          "各部署の人事戦略立案、採用制度や評価制度の構築、組織改善に取り組む。",
      },
      {
        term: "Program Manager / Project Manager",
        description:
          "大規模プロジェクトの進捗管理、スケジュール調整、リスク管理、関係者調整を行う。",
      },
      {
        term: "Operations Manager",
        description:
          "日常業務の運営、プロセス改善、効率化を担当し、組織運営の円滑化を支える。",
      },
      {
        term: "Data Scientist",
        description:
          "大量のデータを解析、モデル構築、ビジネスインサイトの抽出を行う。",
      },
      {
        term: "Data Analyst",
        description:
          "データの集計・分析を通じて、経営判断やマーケティング戦略に必要な情報を提供する。",
      },
      {
        term: "Cloud Architect",
        description:
          "クラウドインフラの設計・構築、最適化を担当し、スケーラブルなシステムを実現する。",
      },
      {
        term: "DevOps Engineer",
        description:
          "ソフトウェア開発と運用のプロセスを統合し、CI/CDパイプラインの構築・維持を行う。",
      },
      {
        term: "Cybersecurity Specialist",
        description:
          "企業の情報セキュリティ対策、脅威の検出、リスク管理を担当する。",
      },
      {
        term: "Financial Analyst",
        description:
          "企業の財務状況分析、予算策定、投資評価等を通じた財務戦略を支援する。",
      },
      {
        term: "Legal Counsel",
        description:
          "法務問題対応、契約書レビュー、コンプライアンス管理を行う。",
      },
      {
        term: "Corporate Communications Manager",
        description:
          "企業の社内外への情報発信やブランドイメージの向上、PR戦略の企画・実行を担当する。",
      },
      {
        term: "Investor Relations Manager",
        description:
          "投資家とのコミュニケーションを担当し、企業の財務情報や経営戦略を説明する。",
      },
      {
        term: "Technical Support Engineer",
        description:
          "製品やシステムの技術的サポート、問い合わせ対応、問題解決を担当する。",
      },
      {
        term: "Professional Services Consultant",
        description:
          "有償コンサルティング、カスタム開発、導入支援など、顧客の複雑な要求に応える。",
      },
    ],
  };
  