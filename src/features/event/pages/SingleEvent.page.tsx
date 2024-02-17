import { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@mui/material';
import { useEventHook } from '@/hooks/event/useEvent.hook';
import { LoadingComponent } from '@/components/loading/Loading.Component';
import { QrCode } from '@/components/qr/QrCode';
import { ApiContext } from '@/apis/api.context';
import { EventModel } from '@/types/models/event/event.model';
import { formatDate } from '../shared/formatDate';
import * as Styled from '../event.styles';

interface SingleEventPageProps {}

export const SingleEventPage: FC<SingleEventPageProps> = ({}) => {
  const { id } = useParams() as { id: string };
  const { apiUrl } = useContext(ApiContext);
  const { isFetching, event } = useEventHook(id);

  if (isFetching) return <LoadingComponent loadingText="Fetching Event" />;
  if (!event) return <p>Error: No event found</p>;

  const qrCodeUrl = `${apiUrl}/qr/event/${id}`;
  const qrCodeName = buildEventQrName(event);
  return (
    <Styled.StartRow align="flex-start">
      <Card>
        <div>
          <p>Name: {event.name}</p>
          <p>
            Dates: {formatDate(event.startDate)} - {formatDate(event.endDate)}
          </p>
          <div>
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
          </div>
        </div>
      </Card>
      <Card>
        <QrCode url={qrCodeUrl} qrName={qrCodeName} />
      </Card>
    </Styled.StartRow>
  );
};

function buildEventQrName(event: EventModel) {
  return `event-${formatDate(event.startDate)}-${formatDate(event.endDate)}-qr-code`;
}
