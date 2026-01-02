'use client';

export default function Process() {
  const processes = [
    {
      id: 1,
      step: 'STEP 01',
      title: '상담 및 견적',
      description: '고객님의 요구사항을 상세히 파악하고\n최적의 솔루션을 제안합니다',
    },
    {
      id: 2,
      step: 'STEP 02',
      title: '패키지 디자인',
      description: '브랜드 아이덴티티를 담은\n맞춤형 디자인을 제작합니다',
    },
    {
      id: 3,
      step: 'STEP 03',
      title: '샘플 제작',
      description: '실물 샘플로 품질과 디자인을\n직접 확인하실 수 있습니다',
    },
    {
      id: 4,
      step: 'STEP 04',
      title: '본 생산',
      description: '엄격한 품질 관리 하에\n정밀하게 제작합니다',
    },
    {
      id: 5,
      step: 'STEP 05',
      title: '검수 및 배송',
      description: '최종 품질 검수 후\n안전하게 포장하여 배송합니다',
    },
  ];

  return (
    <section className="process-section">
      <div className="l-inner">
        <div className="section-header">
          <h2 className="section-title">Production Process</h2>
          <p className="section-desc">체계적인 프로세스로 고객님의 브랜드 가치를 높입니다</p>
        </div>

        <div className="process-timeline">
          {processes.map((process, index) => (
            <div key={process.id} className="process-item">
              <div className="process-order">{String(index + 1).padStart(2, '0')}</div>
              <div className="process-content">
                <span className="step">{process.step}</span>
                <h3 className="title">{process.title}</h3>
                <p className="desc">
                  {process.description.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < process.description.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
              {index < processes.length - 1 && (
                <div className="connector">
                  <div className="arrow">→</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
