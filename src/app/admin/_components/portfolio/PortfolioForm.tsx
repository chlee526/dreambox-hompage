'use client';

import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { PortfolioType } from '@/types/portfolio';
import './style.scss';

interface PortfolioFormProps {
  mode: 'create' | 'edit';
  portfolio?: PortfolioType;
}

// 고정된 추가정보 필드
const FIXED_INFO_FIELDS = [
  { code: 'type', name: '형태' },
  { code: 'category', name: '종류' },
  { code: 'processing', name: '후가공' },
  { code: 'material', name: '재질' },
];

interface FormValues {
  name: string;
  category: 'package' | 'bag' | 'etc';
  description: string;
  thumbnail: string;
  isPreview: boolean;
  images: { url: string; uploading?: boolean }[];
  infoData: { code: string; name: string; value: string }[];
}

export default function PortfolioForm({ mode, portfolio }: PortfolioFormProps) {
  const router = useRouter();

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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: portfolio?.name || '',
      category: (portfolio?.category as 'package' | 'bag' | 'etc') || 'package',
      description: portfolio?.description || '',
      thumbnail: portfolio?.thumbnail || '',
      isPreview: portfolio?.isPreview || false,
      images: portfolio?.images ? portfolio.images.map((img) => ({ url: typeof img === 'string' ? img : '' })) : [{ url: '' }],
      infoData: initializeInfoData(),
    },
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({ control, name: 'images' });

  const thumbnail = watch('thumbnail');
  const name = watch('name');
  const images = watch('images');

  // 폼 유효성 검사: 이름, 썸네일, 이미지 최소 1개
  const isFormValid = () => {
    const hasName = name && name.trim() !== '';
    const hasThumbnail = thumbnail && thumbnail.trim() !== '';
    const hasValidImage = images.some((img) => img.url && img.url.trim() !== '');
    return hasName && hasThumbnail && hasValidImage;
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

    const url = await uploadFile(file);
    if (url) {
      setValue('thumbnail', url);
    }
  };

  // 상세 이미지 파일 업로드
  const handleImageFileChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue(`images.${index}.uploading`, true);
    const url = await uploadFile(file);
    setValue(`images.${index}.uploading`, false);

    if (url) {
      setValue(`images.${index}.url`, url);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // 이미지 필터링 (빈 값 제거)
      const filteredImages = data.images.filter((img) => img.url.trim() !== '').map((img) => img.url);

      // infoData 필터링 (빈 값 제거)
      const filteredInfoData = data.infoData.filter((info) => info.code && info.name);

      const payload = {
        name: data.name,
        category: data.category,
        description: data.description,
        thumbnail: data.thumbnail,
        isPreview: data.isPreview,
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
    }
  };

  const handleCancel = () => {
    if (confirm('변경사항이 저장되지 않습니다. 취소하시겠습니까?')) {
      router.push('/admin/portfolio');
    }
  };

  return (
    <form className="portfolio-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-layout">
        {/* 왼쪽: 이미지 업로드 */}
        <div className="form-col">
          <div className="section">
            <h2 className="section-title">썸네일 이미지</h2>
            <div className="field">
              <label className="file-label">
                <input type="file" accept="image/*" onChange={handleThumbnailFileChange} className="file-input" />
                <span className="btn btn-file">파일 선택</span>
              </label>
              {thumbnail && (
                <div className="preview">
                  <img src={thumbnail} alt="썸네일 미리보기" />
                  <button type="button" onClick={() => setValue('thumbnail', '')} className="btn-remove" title="이미지 제거">
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">상세 이미지</h2>
            <div className="images-scroll">
              {imageFields.map((field, index) => (
                <div key={field.id} className="field-group">
                  <div className="input-row">
                    <label className="file-label">
                      <input type="file" accept="image/*" onChange={(e) => handleImageFileChange(index, e)} className="file-input" disabled={watch(`images.${index}.uploading`)} />
                      <span className="btn btn-file">{watch(`images.${index}.uploading`) ? '업로드 중...' : `이미지 ${index + 1} 선택`}</span>
                    </label>
                    {imageFields.length > 1 && (
                      <button type="button" onClick={() => removeImage(index)} className="btn btn-delete">
                        삭제
                      </button>
                    )}
                  </div>
                  {watch(`images.${index}.url`) && (
                    <div className="preview">
                      <img src={watch(`images.${index}.url`)} alt={`이미지 ${index + 1} 미리보기`} />
                      <button type="button" onClick={() => setValue(`images.${index}.url`, '')} className="btn-remove" title="이미지 제거">
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={() => appendImage({ url: '' })} className="btn btn-add">
              + 이미지 추가
            </button>
          </div>
        </div>

        {/* 오른쪽: 내용 작성 */}
        <div className="form-col">
          <div className="section">
            <h2 className="section-title">기본 정보</h2>

            <div className="field">
              <label className="label">
                포트폴리오 이름 <span className="required">*</span>
              </label>
              <input {...register('name', { required: true })} className="input" placeholder="포트폴리오 이름을 입력하세요" />
            </div>

            <div className="field">
              <label className="label">
                카테고리 <span className="required">*</span>
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" {...register('category', { required: true })} value="package" />
                  <span>패키지</span>
                </label>
                <label className="radio-label">
                  <input type="radio" {...register('category', { required: true })} value="bag" />
                  <span>가방</span>
                </label>
                <label className="radio-label">
                  <input type="radio" {...register('category', { required: true })} value="etc" />
                  <span>기타</span>
                </label>
              </div>
            </div>

            <div className="field">
              <label className="label">설명</label>
              <textarea {...register('description')} className="textarea" placeholder="포트폴리오 설명을 입력하세요" rows={3} />
            </div>

            <div className="field">
              <label className="checkbox-label">
                <input type="checkbox" {...register('isPreview')} />
                <span>홈페이지 미리보기에 노출</span>
              </label>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">추가 정보</h2>
            {FIXED_INFO_FIELDS.map((info, index) => (
              <div key={info.code} className="field">
                <label className="label">{info.name}</label>
                <input {...register(`infoData.${index}.value`)} className="input" placeholder={`${info.name}을(를) 입력하세요`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={handleCancel} className="btn btn-cancel" disabled={isSubmitting}>
          취소
        </button>
        <button type="submit" className="btn btn-submit" disabled={isSubmitting || !isFormValid()}>
          {isSubmitting ? '저장 중...' : mode === 'create' ? '생성' : '수정'}
        </button>
      </div>
    </form>
  );
}
