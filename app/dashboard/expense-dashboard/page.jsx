'use client'

import FormDatePickerRange from '@/components/share/form/DateRangePicker'
import { Card } from '@/components/ui/card'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { FormProvider, useForm } from 'react-hook-form'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

const ExpenseDashboard = () => {
  const form = useForm({
    defaultValues: {
      date:  new Date()
    }
  })
  const dummyData = {
    user: { name: 'Nicholas Delacruz', balance: 5240 },
    summary: {
      income: 43300,
      expenses: 38060,
      balance: 5240,
      transactions: 1284
    },
    totalExpenses: [
      { category: 'Mortgage / Rent', amount: 6000 },
      { category: 'Food', amount: 4866 },
      { category: 'Utilities', amount: 4160 },
      { category: 'Bills', amount: 3960 },
      { category: 'Shopping', amount: 3375 },
      { category: 'Transportation', amount: 3230 },
      { category: 'Insurance', amount: 2890 },
      { category: 'Health Care', amount: 2480 },
      { category: 'Clothing', amount: 2255 },
      { category: 'Others', amount: 4844 }
    ]
  }

  const totalExpenseAmount = dummyData.totalExpenses.reduce(
    (acc, item) => acc + item.amount,
    0
  )

  // Pie chart data
  const pieData = {
    labels: dummyData.totalExpenses.map(item => item.category),
    datasets: [
      {
        data: dummyData.totalExpenses.map(item => item.amount),
        backgroundColor: [
          '#3B82F6',
          '#A3E635',
          '#FACC15',
          '#D97706',
          '#6366F1',
          '#F472B6',
          '#8B5CF6',
          '#C084FC',
          '#1D4ED8',
          '#06B6D4'
        ],
        borderWidth: 1,
        cutout: '60%'
      }
    ]
  }

  const pieOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label =
              context.label ||
              context.chart.data.labels[context.dataIndex] ||
              ''
            const value = context.parsed || 0
            const percentage = ((value / totalExpenseAmount) * 100).toFixed(2)
            return `${label}: $${value} (${percentage}%)`
          }
        }
      }
    },
    maintainAspectRatio: false
  }

  // Line chart data
  const lineData = {
    labels: dummyData.totalExpenses.map(item => item.category),
    datasets: [
      {
        label: 'Expenses',
        data: dummyData.totalExpenses.map(item => item.amount),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59,130,246,0.2)',
        tension: 0.4
      }
    ]
  }

  const lineOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    maintainAspectRatio: false
  }

  // Bar chart data
  const barData = {
    labels: dummyData.totalExpenses.map(item => item.category),
    datasets: [
      {
        label: 'Expenses',
        data: dummyData.totalExpenses.map(item => item.amount),
        backgroundColor: '#F472B6'
      }
    ]
  }

  const barOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    maintainAspectRatio: false
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl'>Dashboard</h2>
        <FormProvider {...form}>
          <form>
            <FormDatePickerRange
              form={form}
              name='date'
              // label='Date Range Picker'
            />
          </form>
        </FormProvider>
      </div>
      <div className='!mt-3 grid grid-cols-4 gap-4'>
        {Object.entries(dummyData.summary).map(([key, value]) => (
          <Card
            key={key}
            className='rounded-lg border border-gray-200 p-4 text-center shadow-md'
          >
            <div className='text-xl font-bold text-blue-600'>
              {key === 'balance' || key === 'income' || key === 'expenses'
                ? `$ ${value}`
                : value}
            </div>
            <div className='mt-1 text-lg text-gray-700'>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
          </Card>
        ))}
      </div>

      {/* Donut Chart */}
      <Card className='mt-4 rounded-lg border border-gray-200 p-4 shadow-md'>
        <h2 className='mb-4 text-lg font-semibold'>Total Expenses</h2>
        <div className='flex gap-8'>
          <div className='relative h-80 w-[60%]'>
            <Pie data={pieData} options={pieOptions} />
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <div className='font-semibold text-gray-800'>Total</div>
              <div className='text-xl font-bold text-blue-600'>
                ${totalExpenseAmount}
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className='flex flex-1 flex-col justify-center gap-2 pr-52'>
            {dummyData.totalExpenses.map((item, idx) => (
              <div key={idx} className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div
                    className='h-4 w-4 rounded-full'
                    style={{
                      backgroundColor: pieData.datasets[0].backgroundColor[idx]
                    }}
                  />
                  <span className='text-gray-700'>{item.category}</span>
                </div>
                <div className='text-gray-900'>
                  ${item.amount} (
                  {((item.amount / totalExpenseAmount) * 100).toFixed(2)}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className='grid grid-cols-2 gap-4'>
        {/* Line Chart */}
        <Card className='mt-4 rounded-lg border border-gray-200 p-4 shadow-md'>
          <h2 className='mb-4 text-lg font-semibold'>
            Expenses Trend (Line Chart)
          </h2>
          <div className='h-80'>
            <Line data={lineData} options={lineOptions} />
          </div>
        </Card>

        {/* Bar Chart */}
        <Card className='mt-4 rounded-lg border border-gray-200 p-4 shadow-md'>
          <h2 className='mb-4 text-lg font-semibold'>
            Expenses Distribution (Bar Chart)
          </h2>
          <div className='h-80'>
            <Bar data={barData} options={barOptions} />
          </div>
        </Card>
      </div>
    </>
  )
}

export default ExpenseDashboard
