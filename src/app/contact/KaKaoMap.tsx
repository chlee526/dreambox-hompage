'use client';

import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

const KaKaoMap = () => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAOMAP_KEY!, // 발급 받은
  });

  console.log('loading', loading);
  console.log('error', error);
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      <Map center={{ lat: 37.49793, lng: 127.027596 }} style={{ width: '100%', height: '360px' }}>
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: '#000' }}>Hello World!</div>
        </MapMarker>
      </Map>
    </div>
  );
};

export default KaKaoMap;
