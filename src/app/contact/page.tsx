import React from 'react';
import './contact-style.scss';
import KaKaoMap from './KaKaoMap';

export default function ContactPage() {
  return (
    <section className="l-page">
      <div className="l-inner">
        <div className="l-page-header">
          <h3>Contact us</h3>
          <span>궁금하신 점이 있다면 언제든 문의해주세요.</span>
        </div>

        <div className="content-wrap">
          <div className="lc">
            <div className="content">
              <h4>오시는 길</h4>
              <p>서울특별시 강남구 도산대로 123-45 10층</p>
              <KaKaoMap />
            </div>
          </div>

          <div className="rc">
            <form>
              <div className="flex gap-[1rem]">
                <div className="w-[50%] form-group">
                  <label htmlFor="name">이름 *</label>
                  <input type="text" id="name" name="name" />
                </div>
                <div className="w-[50%] form-group">
                  <label htmlFor="phone">연락처(휴대폰) *</label>
                  <input type="tel" id="phone" name="phone" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">이메일 *</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="form-group content">
                <label htmlFor="content">내용 *</label>
                <textarea id="content" name="content" />
              </div>
              <button type="submit">보내기</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
