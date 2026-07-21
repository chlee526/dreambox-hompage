'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { PackageItem } from '@/types/contactTypes';

interface PackageSelectProps {
    packageList: PackageItem[];
    initialValue?: string;
    onPackageChange?: (value: string | null) => void;
}

// package와 example을 '-'로 구분해 저장하므로 첫 번째 '-' 기준으로만 분리
const parseInitial = (val: string | undefined) => {
    if (!val) return { pkg: null, ex: null };
    const idx = val.indexOf('-');
    if (idx === -1) return { pkg: val, ex: null };
    return { pkg: val.slice(0, idx), ex: val.slice(idx + 1) };
};

export default function PackageSelect({ packageList, initialValue, onPackageChange }: PackageSelectProps) {
    const initial = parseInitial(initialValue);
    const [selectedPackage, setSelectedPackage] = useState<string | null>(initial.pkg);
    const [selectedExample, setSelectedExample] = useState<string | null>(initial.ex);

    const selectedPackageItem = packageList.find((item) => item.package === selectedPackage);

    const handlePackageClick = (pkg: string) => {
        const next = pkg === selectedPackage ? null : pkg;
        setSelectedPackage(next);
        setSelectedExample(null);
        onPackageChange?.(next);
    };

    const handleExampleClick = (exName: string) => {
        const next = exName === selectedExample ? null : exName;
        setSelectedExample(next);
        onPackageChange?.(next ? `${selectedPackage}-${next}` : selectedPackage);
    };

    return (
        <div className="package-wrap">
            <div className="package-list">
                {packageList.map((item) => (
                    <button key={item.package} type="button" className={`package-btn${selectedPackage === item.package ? ' active' : ''}`} onClick={() => handlePackageClick(item.package)}>
                        {item.package}
                    </button>
                ))}
            </div>
            {selectedPackageItem && selectedPackageItem.example.length > 0 && (
                <div className="example-list">
                    {selectedPackageItem.example.map((ex) => (
                        <button key={ex.name} type="button" className={`example-btn${selectedExample === ex.name ? ' active' : ''}`} onClick={() => handleExampleClick(ex.name)}>
                            <div className="image-wrap">{ex.url && <Image src={ex.url} alt={ex.name} fill sizes="200px" />}</div>
                            <span className="name">{ex.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
