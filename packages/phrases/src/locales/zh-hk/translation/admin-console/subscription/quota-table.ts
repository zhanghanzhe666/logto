const quota_table = {
  quota: {
    title: '基本',
    base_price: '基本價格',
    mau_limit: 'MAU 限制',
    included_tokens: '包含的令牌',
  },
  application: {
    title: '應用程式',
    total: '應用程式總數',
    m2m: '機器到機器',
    third_party: '第三方應用程式',
  },
  resource: {
    title: 'API 資源',
    resource_count: '資源數量',
    scopes_per_resource: '每資源權限',
  },
  branding: {
    title: '用戶界面與品牌',
    custom_domain: '自訂網域',
    custom_css: '自訂 CSS',
    logo_and_favicon: 'Logo 和 favicon',
    bring_your_ui: '帶上你的 UI',
    dark_mode: '深色模式',
    i18n: '國際化',
  },
  user_authn: {
    title: '用戶認證',
    omni_sign_in: '全渠道登錄',
    password: '密碼',
    passwordless: '免密碼登錄 - 電子郵件和短信',
    email_connector: '電子郵件連接器',
    sms_connector: '短信連接器',
    social_connectors: '社交連接器',
    standard_connectors: '標準連接器',
    built_in_email_connector: '內置電子郵件連接器',
    mfa: '多因素認證',
    sso: '企業 SSO',

    impersonation: '冒充',
  },
  user_management: {
    title: '用戶管理',
    user_management: '用戶管理',
    roles: '角色',
    machine_to_machine_roles: '機器對機器角色',
    scopes_per_role: '每角色權限',
  },
  organizations: {
    title: '組織',
    organizations: '組織',
    organization: '組織',
    organization_count: '組織數量',
    allowed_users_per_org: '每組織的用戶數',
    invitation: '邀請（管理 API）',
    org_roles: '組織角色',
    org_permissions: '組織權限',
    just_in_time_provisioning: '即時規定',
  },
  support: {
    title: '合規和支援',
    community: '社群',
    customer_ticket: '客戶支援票據',
    premium: '高級版',
    email_ticket_support: '電子郵件票務支援',
    soc2_report: 'SOC2報告',
    hipaa_or_baa_report: 'HIPAA/BAA報告',
  },
  developers_and_platform: {
    title: '開發者和平台',
    hooks: 'Webhooks',
    audit_logs_retention: '審計日誌保留',
    jwt_claims: 'JWT聲明',
    tenant_members: '租戶成員',
  },
  unlimited: '無限制',
  contact: '聯絡',
  monthly_price: '${{value, number}} /月',
  days_one: '{{count, number}} 天',
  days_other: '{{count, number}} 天',
  add_on: '附加功能',
  tier: '層級{{value, number}}：',

  million: '{{value, number}} 百萬',
  mau_tip: 'MAU（每月活躍用戶）是指在計費週期內與Logto交換過至少一個令牌的獨立用戶數量。',
  tokens_tip: 'Logto 發行的所有類型令牌，包括訪問令牌、刷新令牌等。',
  mao_tip: 'MAO（月度活躍組織）指的是在計費週期內至少有一個MAU（月度活躍用戶）的獨特組織數量。',
  third_party_tip: '使用Logto作為您的OIDC身份提供者，用於第三方應用程式的登錄和權限授予。',
  included: '已包含 {{value, number}}',
  included_mao: '已包含 {{value, number}} MAO',
  extra_quota_price: '然後每月 ${{value, number}} / 每個之後',
  per_month_each: '每月 ${{value, number}} / 每個',
  extra_mao_price: '然後每 MAO ${{value, number}}',
  per_month: '每月 ${{value, number}}',
  per_member: '然後 ${{value, number}} 每個成員',
};

export default Object.freeze(quota_table);
