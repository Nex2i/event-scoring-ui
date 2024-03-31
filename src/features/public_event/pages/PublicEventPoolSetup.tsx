import { Button, Input, Link, Typography } from '@mui/material';
import { FC, useState } from 'react';
import * as Styled from '../publicEvent.styles';
import { FormFilledInput } from '@/libs/forms/formFilledComponents';
import { generateCharGUID } from '@/utils/guidGenerator';

interface PublicEventPoolSetupProps {}

export const PublicEventPoolSetup: FC<PublicEventPoolSetupProps> = ({}) => {
  const [contestants, setContestants] = useState<string[]>([]);
  const [currentContestant, setCurrentContestant] = useState<string>('');

  const updateCurrentContestant = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentContestant(e.target.value);
  };

  const addContestant = () => {
    if (!currentContestant) return;
    const uniqueContestant = currentContestant + '-' + generateCharGUID(4);
    setContestants([...contestants, uniqueContestant]);
    setCurrentContestant('');
  };

  return (
    <div>
      <Typography variant="h3">Pool Setup</Typography>
      <Typography variant="h6">Contestants</Typography>

      <Link>
        <Button>Start Pool</Button>
      </Link>

      <Input
        placeholder="Enter Contestant Name"
        value={currentContestant}
        onChange={updateCurrentContestant}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addContestant();
          }
        }}
      />
      <Button onClick={addContestant}>Add Contestant</Button>
      <ul>
        {contestants.map((contestant) => (
          <li>{contestant}</li>
        ))}
      </ul>
    </div>
  );
};
