'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PortfolioType } from '@/types/portfolio';

interface PortfolioFormProps {
  mode: 'create' | 'edit';
  portfolio?: PortfolioType;
}

// 고정된 추가정보 필드
const FIXED_INFO_FIELDS = [
  { code: 'client', name: '클라이언트' },
  { code: 'date', name: '제작 날짜' },
  { code: 'size', name: '크기' },
  { code: 'material', name: '재질' },
  { code: 'quantity', name: '수량' },
];

export default function PortfolioForm({ mode, portfolio }: PortfolioFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<boolean[]>([]);

  // 폼 상태
  const [formData, setFormData] = useState({
    name: portfolio?.name || '',
    category: portfolio?.category || 'package',
    description: portfolio?.description || '',
    thumbnail: portfolio?.thumbnail || '',
    isPreview: portfolio?.isPreview || false,
  });

  const [images, setImages] = useState<string[]>(portfolio?.images ? portfolio.images.map((img) => (typeof img === 'string' ? img : '')) : ['']);

  // 고정된 추가정보 초기화
  const initializeInfoData = () => {
    return FIXED_INFO_FIELDS.map((field) => {
      const existing = portfolio?.infoData?.find((info: { code: string; name: string; value: string }) => info.code === field.code) as { code: string; name: string; value: string } | undefined;
      return {
        code: field.code,
        name: field.name,
        value: existing?.value || '',
      };
    });
  };

  const [infoData, setInfoData] = useState<{ code: string; name: string; value: string }[]>(initializeInfoData());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, '']);
  };

  const removeImageField = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleInfoDataChange = (code: string, value: string) => {
    const newInfoData = infoData.map((info) => (info.code === code ? { ...info, value } : info));
    setInfoData(newInfoData);
  };

  // 파일 업로드 함수
  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('파일 업로드 실패');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('파일 업로드 오류:', error);
      alert('파일 업로드에 실패했습니다.');
      return null;
    }
  };

  // 썸네일 파일 업로드
  const handleThumbnailFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingThumbnail(true);
    const url = await uploadFile(file);
    setUploadingThumbnail(false);

    if (url) {
      setFormData((prev) => ({ ...prev, thumbnail: url }));
    }
  };

  // 상세 이미지 파일 업로드
  const handleImageFileChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newUploadingImages = [...uploadingImages];
    newUploadingImages[index] = true;
    setUploadingImages(newUploadingImages);

    const url = await uploadFile(file);

    newUploadingImages[index] = false;
    setUploadingImages(newUploadingImages);

    if (url) {
      handleImageChange(index, url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 이미지 필터링 (빈 값 제거)
      const filteredImages = images.filter((img) => img.trim() !== '');

      // infoData 필터링 (빈 값 제거)
      const filteredInfoData = infoData.filter((info) => info.code && info.name);

      const payload = {
        ...formData,
        images: filteredImages,
        infoData: filteredInfoData,
      };

      const url = mode === 'create' ? '/api/admin/portfolio' : `/api/admin/portfolio/${portfolio?.seq}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('저장에 실패했습니다.');
      }

      alert(mode === 'create' ? '포트폴리오가 생성되었습니다.' : '포트폴리오가 수정되었습니다.');
      router.push('/admin/portfolio');
      router.refresh();
    } catch (error) {
      console.error('저장 오류:', error);
      alert('포트폴리오 저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (confirm('변경사항이 저장되지 않습니다. 취소하시겠습니까?')) {
      router.push('/admin/portfolio');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="portfolio-form">
      <div className="portfolio-form__layout">
        {/* 왼쪽: 이미지 업로드 */}
        <div className="portfolio-form__left">
          <div className="portfolio-form__section">
            <h2 className="portfolio-form__section-title">썸네일 이미지</h2>
            <div className="portfolio-form__field">
              <label className="portfolio-form__file-label">
                <input type="file" accept="image/*" onChange={handleThumbnailFileChange} className="portfolio-form__file-input" disabled={uploadingThumbnail} />
                <span className="portfolio-form__file-button">{uploadingThumbnail ? '업로드 중...' : '파일 선택'}</span>
              </label>
              {formData.thumbnail && (
                <div className="portfolio-form__preview">
                  <img src={formData.thumbnail} alt="썸네일 미리보기" />
                  <button type="button" onClick={() => setFormData((prev) => ({ ...prev, thumbnail: '' }))} className="portfolio-form__preview-remove" title="이미지 제거">
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="portfolio-form__section">
            <h2 className="portfolio-form__section-title">상세 이미지</h2>
            {images.map((image, index) => (
              <div key={index} className="portfolio-form__field-group">
                <div className="portfolio-form__input-row">
                  <label className="portfolio-form__file-label">
                    <input type="file" accept="image/*" onChange={(e) => handleImageFileChange(index, e)} className="portfolio-form__file-input" disabled={uploadingImages[index]} />
                    <span className="portfolio-form__file-button">{uploadingImages[index] ? '업로드 중...' : `이미지 ${index + 1} 선택`}</span>
                  </label>
                  {images.length > 1 && (
                    <button type="button" onClick={() => removeImageField(index)} className="portfolio-form__btn-remove">
                      삭제
                    </button>
                  )}
                </div>
                {image && (
                  <div className="portfolio-form__preview">
                    <img src={image} alt={`이미지 ${index + 1} 미리보기`} />
                    <button type="button" onClick={() => handleImageChange(index, '')} className="portfolio-form__preview-remove" title="이미지 제거">
                      ✕
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button type="button" onClick={addImageField} className="portfolio-form__btn-add">
              + 이미지 추가
            </button>
          </div>
        </div>

        {/* 오른쪽: 내용 작성 */}
        <div className="portfolio-form__right">
          <div className="portfolio-form__section">
            <h2 className="portfolio-form__section-title">기본 정보</h2>

            <div className="portfolio-form__field">
              <label className="portfolio-form__label">
                포트폴리오 이름 <span className="required">*</span>
              </label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="portfolio-form__input" placeholder="포트폴리오 이름을 입력하세요" required />
            </div>

            <div className="portfolio-form__field">
              <label className="portfolio-form__label">
                카테고리 <span className="required">*</span>
              </label>
              <select name="category" value={formData.category} onChange={handleChange} className="portfolio-form__select" required>
                <option value="package">패키지</option>
                <option value="bag">가방</option>
                <option value="etc">기타</option>
              </select>
            </div>

            <div className="portfolio-form__field">
              <label className="portfolio-form__label">설명</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="portfolio-form__textarea" placeholder="포트폴리오 설명을 입력하세요" rows={4} />
            </div>

            <div className="portfolio-form__field">
              <label className="portfolio-form__checkbox">
                <input type="checkbox" name="isPreview" checked={formData.isPreview} onChange={handleChange} />
                <span>홈페이지 미리보기에 노출</span>
              </label>
            </div>
          </div>

          <div className="portfolio-form__section">
            <h2 className="portfolio-form__section-title">추가 정보</h2>
            {infoData.map((info) => (
              <div key={info.code} className="portfolio-form__field">
                <label className="portfolio-form__label">{info.name}</label>
                <input type="text" value={info.value} onChange={(e) => handleInfoDataChange(info.code, e.target.value)} className="portfolio-form__input" placeholder={`${info.name}을(를) 입력하세요`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="portfolio-form__actions">
        <button type="button" onClick={handleCancel} className="portfolio-form__btn portfolio-form__btn--cancel" disabled={loading}>
          취소
        </button>
        <button type="submit" className="portfolio-form__btn portfolio-form__btn--submit" disabled={loading}>
          {loading ? '저장 중...' : mode === 'create' ? '생성' : '수정'}
        </button>
      </div>
    </form>
  );
}
