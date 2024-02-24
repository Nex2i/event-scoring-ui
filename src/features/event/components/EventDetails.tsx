import { formatDate } from '@/shared/formatDate';
import { EventModel } from '@/types/models/event/event.model';
import { Card } from '@mui/material';
import { FC, useContext } from 'react';
import * as Styled from '../event.styles';
import { QrCode } from '@/components/qr/QrCode';
import { ApiContext } from '@/apis/api.context';
import { useParams } from 'react-router-dom';

interface EventDetailsProps {
  event: EventModel;
}

export const EventDetails: FC<EventDetailsProps> = ({ event }) => {
  const { id } = useParams() as { id: string };
  const { apiUrl } = useContext(ApiContext);

  const qrCodeUrl = `${apiUrl}/api/qr/event/${id}`;
  const qrCodeName = buildEventQrName(event);
  return (
    <Card>
      <Styled.SpreadRow>
        <div>
          <p>Name: {event.name}</p>
          <p>
            Dates: {formatDate(event.startDate)} - {formatDate(event.endDate)}
          </p>
          {/* <div>
            <p>Courses:</p>
            {event?.Courses?.map((course) => (
              <div key={course.id}>
                <p>{course.name}</p>
                {course.Targets.map((target) => (
                  <Styled.Row key={target.id}>
                    <p>Name: {target.name}</p>
                    <p>Shots: {target.Shots.length}</p>
                  </Styled.Row>
                ))}
              </div>
            ))}
          </div> */}
        </div>
        <QrCode url={qrCodeUrl} qrName={qrCodeName} />
      </Styled.SpreadRow>
    </Card>
  );
};

function buildEventQrName(event: EventModel) {
  return `event-${formatDate(event.startDate)}-${formatDate(event.endDate)}-qr-code`;
}
