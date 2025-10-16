// src/components/LanguageSwitcher.tsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CiGlobe } from "react-icons/ci";

const LANGS = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
    { code: 'it', label: 'Italiano' },
    { code: 'fi', label: 'Suomi' },
    { code: 'lt', label: 'Lietuvių' },
    { code: 'el', label: 'Ελληνικά' },
];

const LanguageSwitcher  = () => {

  const { i18n, t } = useTranslation();

    const onChange = (e) => {
        const lng = e.target.value;
        i18n.changeLanguage(lng);
        // Päivitä <html lang> saavutettavuuden vuoksi
        if (typeof document !== 'undefined') {
            document.documentElement.lang = lng; 
        }
    };

    return (
        
        <label className="inline-flex items-center gap-2" aria-label={t('selectLabel', 'Change language')}>
            <CiGlobe />
            <span className="sr-only">{t('selectLabel', 'Change language')}</span>
            <select 
                value={i18n.resolvedLanguage}
                onChange={onChange}
                className="rounded-md border px-2 py-1 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
                {LANGS.map((l) => (
                    <option key={l.code} value={l.code}>
                        {l.label}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default LanguageSwitcher;