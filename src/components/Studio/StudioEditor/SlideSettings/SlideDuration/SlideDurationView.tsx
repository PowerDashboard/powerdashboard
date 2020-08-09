import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Typography, TimePicker } from 'antd';

import { BasicSlidePartsFragment, useUpdateSlideMutation } from 'generated/graphql';
import { getDayjsDuration, getSecondsDuration, TIME_FORMAT } from './SlideDurationUtils';

const { Text } = Typography;

interface Props {
  slide: BasicSlidePartsFragment;
}

const SlideDuration: React.FC<Props> = ({ slide }: Props) => {
  const [updateSlide] = useUpdateSlideMutation();
  const value = getDayjsDuration(slide.durationSeconds);

  const handleChange = async (duration: any | null) => {
    if (!duration) {
      return;
    }

    const durationSeconds = getSecondsDuration(duration);

    try {
      await updateSlide({
        variables: {
          id: parseInt(slide.id, 10),
          values: {
            durationSeconds,
          }
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateSlide: {
            ...slide,
            durationSeconds,
            __typename: 'Slide',
          }
        }
      })
    } catch (e) {
      console.error(e);
    }
  };

  const footer = () => (
    <Text>
      Czas trwania
    </Text>
  );

  return (
    <TimePicker
      size="large"
      format={TIME_FORMAT}
      allowClear={false}
      showNow={false}
      value={value}
      onChange={handleChange}
      renderExtraFooter={footer}
    />
  )
};

export default SlideDuration;
