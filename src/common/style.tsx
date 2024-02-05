import { Box, FormControl, Typography, styled } from '@mui/material';
import { default as MuiEditIcon } from '@mui/icons-material/Edit';
import { default as MuiAddIcon } from '@mui/icons-material/AddCircle';
import { default as MuiCancelIcon } from '@mui/icons-material/Cancel';
import { default as MuiPanoramaFishEyeIcon } from '@mui/icons-material/PanoramaFishEye';

interface dynamicTypographyProps {
  text: string;
  baseFontSize?: number;
}

const calculateFontSize = (text: string, baseFontSize: number = 40, minFontSize: number = 12): number => {
  const length = text.length;

  // Set thresholds for text length
  const minLengthThreshold = 1; // Length below which font size remains large
  const maxLengthThreshold = 5; // Length beyond which font size scales down more aggressively

  let fontSize;
  if (length <= minLengthThreshold) {
    // Keep font size large for short texts
    fontSize = baseFontSize;
  } else if (length > minLengthThreshold && length <= maxLengthThreshold) {
    // Gradual scaling for moderate length texts
    const scaleFactor = 0.5; // Adjust as needed
    fontSize = baseFontSize - (length - minLengthThreshold) * scaleFactor;
  } else {
    // More aggressive scaling for longer texts
    const scaleFactor = 1.5; // Adjust as needed
    fontSize = baseFontSize - ((length - maxLengthThreshold) * scaleFactor) / 2;
  }

  // Ensure font size is within min and max limits
  fontSize = Math.max(fontSize, minFontSize);
  fontSize = Math.min(fontSize, baseFontSize);

  return fontSize;
};

export const DynamicTypography = styled(Typography)<dynamicTypographyProps>(({ text, baseFontSize }) => ({
  fontSize: calculateFontSize(text, baseFontSize),
}));

export const Link = styled('a')(({}) => ({
  cursor: 'pointer',
}));

export const Row = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const Column = styled(Box)<{ align?: 'left' | 'center' | 'right' }>(({ align }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: align || 'center',
  width: '100%',
}));

export const EditIcon = styled(MuiEditIcon)(({}) => ({
  cursor: 'pointer',
}));

export const AddIcon = styled(MuiAddIcon)(({}) => ({
  cursor: 'pointer',
}));

export const CancelIcon = styled(MuiCancelIcon)(({}) => ({
  cursor: 'pointer',
}));

const CreateActionSize = '60px';
export const CreateActionIcon = styled(MuiPanoramaFishEyeIcon)(({}) => ({
  cursor: 'pointer',
  height: CreateActionSize,
  width: CreateActionSize,
  color: '#60c0ed',
  borderRadius: '50%',
  backgroundColor: '#51b4e2',
  padding: '.5px',
}));

export const BaseForm = styled(FormControl)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const FormHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const FormTitle = styled('h2')(({}) => ({
  margin: 0,
}));

export const CenterTypography = styled(Typography)(({}) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'underline',
}));

export const ScrollableContainer = styled(Box)<{ maxHeight?: string }>(({ maxHeight }) => ({
  overflow: 'auto',
  height: '100%',
  maxHeight: maxHeight || '50vh',
}));
