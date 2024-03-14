import { Button, Link } from '@mui/material';
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
import siteLogo from '@/assets/event-score.png';
import * as Styled from './styles';

interface QrCodeProps {
  url: string;
  qrName?: string;
}

const containerSize = '20vw';

function containerToPixels(): number {
  const numericValue = parseFloat(containerSize);
  return (numericValue / 100) * window.innerWidth;
}

export const QrCode: FC<QrCodeProps> = ({ url, qrName }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const options = {
    type: 'svg' as DrawType,
    data: url,
    image: siteLogo,
    margin: 10,
    width: containerToPixels(),
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

  const [qrCode, setQrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));

  useEffect(() => {
    if (qrRef.current) {
      qrCode.append(qrRef.current);
    }
  }, [qrCode, qrRef]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options]);

  const onDownloadClick = () => {
    if (!qrCode) return;

    qrCode.update({ width: 2160, height: 2160 });
    qrCode.download({
      extension: 'png',
      name: qrName,
    });
    setQrCode(new QRCodeStyling(options));
  };

  return (
    <Styled.QrContainer sx={{ width: containerSize }}>
      <div ref={qrRef} />
      <Styled.SpreadRow width="100%">
        <Button onClick={onDownloadClick}>Download</Button>
        <Button>
          <Link href={url} target="_blank">
            Preview
          </Link>
        </Button>
      </Styled.SpreadRow>
    </Styled.QrContainer>
  );
};
