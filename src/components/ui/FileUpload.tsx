'use client';

import { useRef, useState } from 'react';

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

interface UploadedFile {
    id: string;
    file: File;
    error?: string;
}

interface FileUploadProps {
    onFilesChange?: (files: File[]) => void;
}

export default function FileUpload({ onFilesChange }: FileUploadProps) {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const updateFiles = (updated: UploadedFile[]) => {
        setFiles(updated);
        onFilesChange?.(updated.filter((f) => !f.error).map((f) => f.file));
    };

    const handleFiles = (fileList: FileList) => {
        const newFiles: UploadedFile[] = Array.from(fileList).map((file) => ({
            id: `${file.name}-${Date.now()}-${Math.random()}`,
            file,
            error: file.size > MAX_SIZE ? `파일 용량이 10MB를 초과합니다` : undefined,
        }));
        updateFiles([...files, ...newFiles]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
            e.target.value = '';
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
    };

    const removeFile = (id: string) => {
        updateFiles(files.filter((f) => f.id !== id));
    };

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes}B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
    };

    return (
        <div className="file-upload">
            <div
                className="drop-zone"
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <span className="drop-text">클릭 또는 파일을 여기로 드래그하세요</span>
                <span className="drop-limit">파일당 최대 10MB · 여러 파일 동시 업로드 가능</span>
                <input ref={inputRef} type="file" multiple onChange={handleChange} />
            </div>

            {files.length > 0 && (
                <ul className="file-list">
                    {files.map(({ id, file, error }) => (
                        <li key={id} className={`file-item${error ? ' has-error' : ''}`}>
                            <span className="file-name">{file.name}</span>
                            <span className="file-size">{formatSize(file.size)}</span>
                            {error && <span className="file-error">{error}</span>}
                            <button type="button" className="file-remove" onClick={() => removeFile(id)}>
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
