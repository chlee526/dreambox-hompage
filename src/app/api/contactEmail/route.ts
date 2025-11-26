import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, subject, content } = await request.json();

    // 필수 필드 검증
    if (!name || !phone || !email || !content) {
      return NextResponse.json({ success: false, message: '모든 필드를 입력해주세요.' }, { status: 400 });
    }

    // 이메일 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: '유효한 이메일 주소를 입력해주세요.' }, { status: 400 });
    }

    // Nodemailer transporter 설정
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 메일 옵션 설정
    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO, // 문의를 받을 이메일 주소
      subject: `[드림박스 문의] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">새로운 문의가 도착했습니다</h2>
          
          <div style="margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; background-color: #f5f5f5; font-weight: bold; width: 120px;">이름</td>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f5f5f5; font-weight: bold;">연락처</td>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f5f5f5; font-weight: bold;">이메일</td>
                <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${email}" style="color: #4CAF50; text-decoration: none;">${email}</a></td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">문의 내용</h3>
            <div style="background-color: #f9f9f9; padding: 10px; border-radius: 5px; white-space: pre-wrap;">
              ${content}
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #888;">
            <p>이 메일은 드림박스 홈페이지 문의하기 폼을 통해 자동으로 발송되었습니다.</p>
          </div>
        </div>
      `,
      text: `
${name}님의 문의가 도착했습니다.

이름: ${name}
연락처: ${phone}
이메일: ${email}
제목: ${subject}

문의 내용:
${content}

---
이 메일은 드림박스 홈페이지 문의하기 폼을 통해 자동으로 발송되었습니다.
      `,
    };

    // 메일 전송
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: '문의가 성공적으로 접수되었습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('메일 전송 실패:', error);
    return NextResponse.json(
      {
        success: false,
        message: '메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      },
      { status: 500 },
    );
  }
}
