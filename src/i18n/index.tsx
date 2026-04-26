import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

export type Locale = 'zh-CN' | 'en-US';

export interface LocaleConfig {
  locale: Locale;
  messages: LocaleMessages;
}

export interface LocaleMessages {
  pagination: {
    prev: string;
    next: string;
    page: string;
    jumpTo: string;
    total: string;
    pageSize: string;
  };
  select: {
    placeholder: string;
    noData: string;
    noMatch: string;
    maxTag: string;
  };
  table: {
    emptyText: string;
  };
  form: {
    required: string;
    email: string;
    url: string;
    number: string;
    minLength: string;
    maxLength: string;
    min: string;
    max: string;
  };
  upload: {
    upload: string;
    preview: string;
    remove: string;
  };
  steps: {
    next: string;
    previous: string;
  };
  common: {
    confirm: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    search: string;
    reset: string;
    loading: string;
  };
}

const zhCN: LocaleMessages = {
  pagination: {
    prev: '上一页',
    next: '下一页',
    page: '页',
    jumpTo: '跳至',
    total: '共 {total} 条',
    pageSize: '条/页',
  },
  select: {
    placeholder: '请选择',
    noData: '暂无数据',
    noMatch: '无匹配数据',
    maxTag: '已选择 {count} 项',
  },
  table: {
    emptyText: '暂无数据',
  },
  form: {
    required: '此字段为必填项',
    email: '请输入有效的邮箱地址',
    url: '请输入有效的URL',
    number: '请输入数字',
    minLength: '至少需要 {minLength} 个字符',
    maxLength: '最多只能输入 {maxLength} 个字符',
    min: '值不能小于 {min}',
    max: '值不能大于 {max}',
  },
  upload: {
    upload: '上传',
    preview: '预览',
    remove: '删除',
  },
  steps: {
    next: '下一步',
    previous: '上一步',
  },
  common: {
    confirm: '确定',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    search: '搜索',
    reset: '重置',
    loading: '加载中...',
  },
};

const enUS: LocaleMessages = {
  pagination: {
    prev: 'Previous',
    next: 'Next',
    page: 'Page',
    jumpTo: 'Jump to',
    total: '{total} items',
    pageSize: '/ page',
  },
  select: {
    placeholder: 'Please select',
    noData: 'No data',
    noMatch: 'No match',
    maxTag: '{count} items selected',
  },
  table: {
    emptyText: 'No data',
  },
  form: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    url: 'Please enter a valid URL',
    number: 'Please enter a number',
    minLength: 'At least {minLength} characters required',
    maxLength: 'At most {maxLength} characters allowed',
    min: 'Value must be at least {min}',
    max: 'Value must be at most {max}',
  },
  upload: {
    upload: 'Upload',
    preview: 'Preview',
    remove: 'Remove',
  },
  steps: {
    next: 'Next',
    previous: 'Previous',
  },
  common: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    reset: 'Reset',
    loading: 'Loading...',
  },
};

const localeMessages: Record<Locale, LocaleMessages> = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

export interface I18nContextValue {
  locale: Locale;
  messages: LocaleMessages;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export interface I18nProviderProps {
  locale?: Locale;
  defaultLocale?: Locale;
  messages?: LocaleMessages;
  children?: React.ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  locale = 'zh-CN',
  defaultLocale = 'zh-CN',
  messages,
  children,
}): React.ReactNode => {
  const [currentLocale, setCurrentLocale] = useState<Locale>(locale || defaultLocale);

  const currentMessages = useMemo(() => {
    return messages || localeMessages[currentLocale];
  }, [messages, currentLocale]);

  const changeLocale = useCallback((newLocale: Locale) => {
    setCurrentLocale(newLocale);
  }, []);

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = currentMessages;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, paramKey) => {
        return String(params[paramKey] ?? `{${paramKey}}`);
      });
    }

    return value;
  }, [currentMessages]);

  const contextValue = useMemo((): I18nContextValue => ({
    locale: currentLocale,
    messages: currentMessages,
    setLocale: changeLocale,
    t,
  }), [currentLocale, currentMessages, changeLocale, t]);

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

export default I18nProvider;
