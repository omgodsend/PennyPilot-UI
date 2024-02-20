import { Center,Text } from '@mantine/core'
import { jwtDecode } from 'jwt-decode'
import { BarChart } from '@mantine/charts'
import { data } from '../components/features/Data'
import { Bar } from 'recharts'

const Dashboard = () => {
  // const token = jwtDecode(sessionStorage.getItem("token")|| '')
  return (
    <>
    <Center>
      <Text size="xl" weight={700}>Welcome to the Dashboard</Text>
      </Center>
      
      <Bar></Bar>
    <BarChart
    h={300}
    data={data}
    dataKey="month"
    type="stacked"

    series={[
      { name: 'Smartphones', color: 'violet.6' },
      { name: 'Laptops', color: 'blue.6' },
      { name: 'Tablets', color: 'teal.6' },
    ]}
    tickLine="y"
  />
  </>
  );
}

export default Dashboard