const KST_TIME_ZONE = 'Asia/Seoul';

const getKstParts = (date: Date) => {
    const parts = new Intl.DateTimeFormat('ko-KR', {
        timeZone: KST_TIME_ZONE,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).formatToParts(date);
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
    return { year: get('year'), month: get('month'), day: get('day'), hour: get('hour'), minute: get('minute'), second: get('second') };
};

// "YYYY.MM.DD" (KST 기준)
export const formatKstDate = (iso: string) => {
    const { year, month, day } = getKstParts(new Date(iso));
    return `${year}.${month}.${day}`;
};

// "YYYY.MM.DD HH:mm:ss" (KST 기준)
export const formatKstDateTime = (iso: string) => {
    const { year, month, day, hour, minute, second } = getKstParts(new Date(iso));
    return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
};

// 오늘 날짜 "YYYY.MM.DD" (KST 기준)
export const getKstToday = () => formatKstDate(new Date().toISOString());
