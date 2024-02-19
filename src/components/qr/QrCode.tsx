import { Button, Card } from '@mui/material';
import QRCodeStyling, {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  Options,
} from 'qr-code-styling-new';
import { FC, useEffect, useRef, useState } from 'react';
import * as Styled from '@/common/style';

import siteLogo from '@/assets/event-score.png';

interface QrCodeProps {
  url: string;
  qrName?: string;
}

export const QrCode: FC<QrCodeProps> = ({ url, qrName }) => {
  const options = {
    width: getViewWidth(),
    height: getViewWidth(),
    type: 'svg' as DrawType,
    data: url,
    image: siteLogo,
    margin: 10,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: 'Byte' as Mode,
      errorCorrectionLevel: 'Q' as ErrorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 5,
      crossOrigin: 'anonymous',
    },
    dotsOptions: {
      color: '#222222',
      type: 'dots' as DotType,
    },
    cornersSquareOptions: {
      color: '#222222',
      type: 'dot' as CornerSquareType,
    },
    cornersDotOptions: {
      color: '#222222',
      type: 'dot' as CornerDotType,
    },
  } as Options;

  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options]);

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: 'png',
      name: qrName,
    });
  };

  const previewQrCode = () => {
    window.open(url, '_blank');
  };

  return (
    <Card sx={{ width: '40vw' }}>
      <div ref={ref} />
      <Styled.SpreadRow>
        <Button onClick={onDownloadClick}>Download</Button>
        <Button onClick={previewQrCode}>Preview</Button>
      </Styled.SpreadRow>
    </Card>
  );
};

function getViewWidth(): number {
  return window.innerWidth / 4.5;
}
