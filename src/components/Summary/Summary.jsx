import { useSelector } from 'react-redux';
import { useAuth } from 'hooks';
import { dayInfo, selectDay } from 'redux/day-endpoints/selectors';
import { FoodList } from 'components/FoodList/FoodList';
import { Box, Typography } from '@mui/material';

export const Summary = () => {
  const { kcalConsumed, kcalLeft, percentsOfDailyRate } = useSelector(dayInfo);
  const day = useSelector(selectDay);
  const { user } = useAuth();
  const dailyRate = user.userData.dailyRate;

  // const data = user.userData;
  // const { kcalConsumed, kcalLeft, dailyRate, percentsOfDailyRate } = data;

  // console.log(data);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  let date = new Date().toLocaleDateString('uk-UA', options).split('.').join('/');

  if (day) {
    date = day.date.split('-').reverse().join('/');
  }
  const summery = {
    kcalConsumed: kcalConsumed ? Math.round(kcalConsumed) : '0',
    kcalLeft: kcalLeft ? Math.round(kcalLeft) : Math.round(dailyRate),
    dailyRate: dailyRate ? Math.round(dailyRate) : '0',
    percentsOfDailyRate: percentsOfDailyRate ? `${Math.round(percentsOfDailyRate)}%` : '0%',
    date,
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row', lg: 'column' },
          justifyContent: { md: 'space-around' },
          maxWidth: { lg: '270px', md: '100%', xs: '270px' },
          width: '100%',
        }}
      >
        <Box>
          <Typography variant="h4" component="h4">{`Summary for ${date}`}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box component="ul" sx={{ marginBottom: { lg: '60px', xs: '40px' } }}>
              <Typography variant="liSummery" component="li">
                Left
              </Typography>
              <Typography variant="liSummery" component="li">
                Consumed{' '}
              </Typography>
              <Typography variant="liSummery" component="li">
                Daily rate{' '}
              </Typography>
              <Typography variant="liSummery" component="li">
                n% of normal{' '}
              </Typography>
            </Box>
            <Box component="ul">
              <Typography variant="liSummery" component="li">
                {Math.round(summery.kcalLeft)} kcal
              </Typography>
              <Typography variant="liSummery" component="li">
                {summery.kcalConsumed} kcal
              </Typography>
              <Typography variant="liSummery" component="li">
                {summery.dailyRate} kcal
              </Typography>
              <Typography variant="liSummery" component="li">
                {summery.percentsOfDailyRate}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography variant="h4" component="h4">
            Food not recommended
          </Typography>
          <FoodList />
        </Box>
      </Box>
    </>
  );
};
