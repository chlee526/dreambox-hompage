'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { PortfolioType } from '@/types/portfolio';
import { useUploadImage } from '@/lib/queries/upload/useUpload';
import { useCreatePortfolio, useUpdatePortfolio, usePortfolios } from '@/lib/queries/portfolios/usePortfolios';
import './style.scss';

interface PortfolioFormProps {
  mode: 'create' | 'edit';
  portfolio?: PortfolioType;
}

// 고정된 추가정보 필드
const FIXED_INFO_FIELDS = [
  { code: 'type', name: '형태' },
  { code: 'category', name: '종류' },
  { code: 'material', name: '재질' },
];

const CATEGORY_OPTIONS = [
  { value: 'package', label: '패키지' },
  { value: 'bag', label: '쇼핑백' },
  { value: 'etc', label: '기타' },
];

interface FormValues {
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  isPreview: boolean;
  images: { url: string; uploading?: boolean }[];
  infoData: { code: string; name: string; value: string }[];
}

export default function PortfolioForm({ mode, portfolio }: PortfolioFormProps) {
  const router = useRouter();

  // 전체 포트폴리오 목록 조회 (메인페이지 노출 개수 확인용)
  const { data: portfolios = [] } = usePortfolios();

  // 현재 메인페이지에 노출 중인 포트폴리오 개수 계산
  const currentPreviewCount = portfolios.filter((p) => {
    // 수정 모드일 때는 현재 수정 중인 포트폴리오는 제외하고 계산
    if (mode === 'edit' && portfolio && p.seq === portfolio.seq) {
      return false;
    }
    return p.isPreview;
  }).length;

  // 이미지 업로드 mutation
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage({
    onError: (error) => {
      console.error('파일 업로드 오류:', error);
      alert('파일 업로드에 실패했습니다.');
    },
  });

  // 포트폴리오 생성 mutation
  const { mutateAsync: createPortfolio, isPending: isCreating } = useCreatePortfolio({
    onSuccess: () => {
      alert('포트폴리오가 생성되었습니다.');
      router.push('/admin/portfolio');
      router.refresh();
    },
    onError: (error) => {
      console.error('생성 오류:', error);
      alert('포트폴리오 생성에 실패했습니다.');
    },
  });

  // 포트폴리오 수정 mutation
  const { mutateAsync: updatePortfolio, isPending: isUpdating } = useUpdatePortfolio({
    onSuccess: () => {
      alert('포트폴리오가 수정되었습니다.');
      router.push('/admin/portfolio');
      router.refresh();
    },
    onError: (error) => {
      console.error('수정 오류:', error);
      alert('포트폴리오 수정에 실패했습니다.');
    },
  });

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
  const isPreview = watch('isPreview');

  // 폼 유효성 검사: 이름, 썸네일, 이미지 최소 1개
  const isFormValid = () => {
    const hasName = name && name.trim() !== '';
    const hasThumbnail = thumbnail && thumbnail.trim() !== '';
    const hasValidImage = images.some((img) => img.url && img.url.trim() !== '');
    return hasName && hasThumbnail && hasValidImage;
  };

  // 썸네일 파일 업로드
  const handleThumbnailFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadImage({
        file,
        folder: 'thumbnails', // 썸네일은 thumbnails 폴더에 저장
      });
      setValue('thumbnail', result.url);
    } catch (error) {
      // 에러는 mutation의 onError에서 처리
      console.error('썸네일 업로드 실패:', error);
    }
  };

  // 상세 이미지 다중 업로드
  const [uploadingCount, setUploadingCount] = useState(0);

  const handleMultipleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploadingCount(files.length);

    try {
      const results = await Promise.allSettled(files.map((file) => uploadImage({ file, folder: 'images' })));

      let failCount = 0;
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          appendImage({ url: result.value.url });
        } else {
          failCount++;
        }
      });

      if (failCount > 0) {
        alert(`${failCount}개의 이미지 업로드에 실패했습니다.`);
      }
    } finally {
      setUploadingCount(0);
      e.target.value = '';
    }
  };

  const countWarningMsg = '메인페이지 노출은 최대 7개까지만 가능합니다.\n다른 포트폴리오의 노출을 먼저 해제해주세요.';

  // 메인페이지 노출 체크박스 변경 핸들러
  const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    // 체크하려고 할 때 이미 7개가 노출 중이면 막기
    if (checked && currentPreviewCount >= 7) {
      alert(countWarningMsg);
      return;
    }

    setValue('isPreview', checked);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // 저장 시 최종 검증: 메인페이지 노출 7개 제한
    if (data.isPreview && currentPreviewCount >= 7) {
      alert(countWarningMsg);
      return;
    }

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

    // React Query Mutation 사용
    if (mode === 'create') {
      await createPortfolio(payload);
    } else {
      await updatePortfolio({
        seq: portfolio!.seq,
        data: payload,
      });
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
        <div className="col-left">
          <div className="section">
            <h2 className="section-title">대표 이미지</h2>
            <div className="field min-h-[298px]">
              <label className="file-label">
                <input type="file" accept="image/*" onChange={handleThumbnailFileChange} className="file-input" />
                <span className="btn btn-file">파일 선택</span>
              </label>
              {thumbnail && (
                <div className="preview">
                  <img src={thumbnail} alt="썸네일 미리보기" />
                </div>
              )}
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">상세 이미지</h2>
            <label className="file-label image-upload-label">
              <input type="file" accept="image/*" multiple onChange={handleMultipleImageUpload} className="file-input" disabled={uploadingCount > 0} />
              <span className="btn btn-file">{uploadingCount > 0 ? `${uploadingCount}개 업로드 중...` : '파일 선택 (다중 선택 가능)'}</span>
            </label>
            <div className="images-scroll">
              {imageFields.map((field, index) => {
                const url = watch(`images.${index}.url`);
                if (!url) return null;
                return (
                  <div key={field.id} className="field-group">
                    <div className="preview">
                      <img src={url} alt={`이미지 ${index + 1} 미리보기`} />
                      <button type="button" onClick={() => removeImage(index)} className="btn btn-remove">
                        ×
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 오른쪽: 내용 작성 */}
        <div className="col-right">
          <div className="section">
            <h2 className="section-title">기본 정보</h2>

            <div className="field">
              <label className="label">
                포트폴리오 이름 <span className="required">*</span>
              </label>
              <input {...register('name', { required: true })} className="input" placeholder="포트폴리오 이름을 입력하세요" />
            </div>

            <div className="field">
              <span className="label">
                카테고리 <span className="required">*</span>
              </span>
              <div className="flex gap-[16px]">
                {CATEGORY_OPTIONS.map((option) => (
                  <label key={option.value} className="radio-label">
                    <input type="radio" {...register('category', { required: true })} value={option.value} />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="field">
              {FIXED_INFO_FIELDS.map((info, index) => (
                <div key={info.code} className="field">
                  <label className="label">{info.name}</label>
                  <input {...register(`infoData.${index}.value`)} className="input" placeholder={`${info.name}을(를) 입력하세요`} />
                </div>
              ))}
            </div>

            <div className="field">
              <label className="label">설명</label>
              <textarea {...register('description')} className="textarea h-[250px]" placeholder="포트폴리오 설명을 입력하세요" />
            </div>

            <div className="field">
              <label className="checkbox-label">
                <input type="checkbox" checked={isPreview} onChange={handlePreviewChange} />
                <span>메인페이지 노출</span>
                <span className="ml-[8px]">
                  <strong className={currentPreviewCount >= 7 ? 'counter-full' : ''}>{isPreview ? currentPreviewCount + 1 : currentPreviewCount}/7</strong>
                </span>
                <span className="counter-full"> (최대 7개 제한)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={handleCancel} className="btn btn-cancel" disabled={isSubmitting || isUploading || isCreating || isUpdating || uploadingCount > 0}>
          취소
        </button>
        <button type="submit" className="btn btn-submit" disabled={isSubmitting || isUploading || isCreating || isUpdating || uploadingCount > 0 || !isFormValid()}>
          {isUploading || uploadingCount > 0 ? '업로드 중...' : isCreating || isUpdating ? '저장 중...' : mode === 'create' ? '생성' : '수정'}
        </button>
      </div>
    </form>
  );
}
