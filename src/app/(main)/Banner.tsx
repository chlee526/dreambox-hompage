'use client';

export default function Banner() {
  return (
    <section className="flex flex-col justify-center  gap-[6rem] w-full h-screen mt-[-6.9rem] px-[12rem]  bg-cover bg-top bg-no-repeat" style={{ backgroundImage: "url('/assets/image/banner.png')" }}>
      <div className="flex flex-col text-secondary">
        <p className="mb-16 text-[50px] font-bold leading-[1.3] tracking-[0.2rem]">
          당신의 브랜드를
          <br />
          담는 첫 번째 순간
          <br /> DREAM BOX
        </p>

        <p className="text-[32px] font-medium leading-[1.4]">
          필요한 만큼, 원하는 방식으로
          <br /> 소량 맞춤 제작으로 브랜드 감성을 완성합니다.
        </p>
      </div>

      <div className="flex  items-start gap-[1.6rem]">
        <button className="py-[10px] px-[20px] rounded-[0.8rem] border-2 border-secondary bg-transparent text-secondary transition-all duration-200 hover:bg-secondary hover:text-primary hover:border-primary">
          <span className="text-lg font-semibold">상담 및 견적 문의</span>
        </button>
        <button className="py-[10px] px-[20px] rounded-[0.8rem] border-2 border-secondary bg-transparent text-secondary transition-all duration-200 hover:bg-secondary hover:text-primary hover:border-primary">
          <span className="text-lg font-semibold">포트폴리오 보기</span>
        </button>
      </div>
    </section>
  );
}
