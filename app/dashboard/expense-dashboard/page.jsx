'use client'

import DateRangePicker from '@/components/share/form/DateRangePicker'
import FormSelectField from '@/components/share/form/FormSelect'
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
import { addMonths, startOfToday } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

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
  const now = new Date()
  const oneMonthLater = addMonths(now, -1)
  const form = useForm({
    defaultValues: {
      date: {
        from: oneMonthLater,
        to: now
      }
    }
  })
  const [dummyData, setDummyData] = useState([])
  const [options, setOptions] = useState([])

  const totalExpenses = [
    {
      category: 'Food',
      items: [
        { id: 1, amount: 4866, date: '2025/08/29' },
        { id: 2, amount: 3200, date: '2025/09/10' }
      ]
    },
    {
      category: 'Utilities',
      items: [
        { id: 3, amount: 4160, date: '2025/07/29' },
        { id: 4, amount: 4200, date: '2025/08/15' }
      ]
    },
    { category: 'Bills', items: [{ id: 5, amount: 3960, date: '2025/03/23' }] },
    {
      category: 'Shopping',
      items: [
        { id: 6, amount: 3375, date: '2025/04/29' },
        { id: 7, amount: 2900, date: '2025/05/12' }
      ]
    },
    {
      category: 'Transportation',
      items: [{ id: 8, amount: 3230, date: '2025/05/29' }]
    },
    {
      category: 'Insurance',
      items: [
        { id: 9, amount: 2890, date: '2025/06/29' },
        { id: 10, amount: 3000, date: '2025/07/29' },
        { id: 10, amount: 7000, date: '2025/09/24' }
      ]
    },
    {
      category: 'Health Care',
      items: [{ id: 11, amount: 2480, date: '2025/03/29' }]
    },
    {
      category: 'Clothing',
      items: [
        { id: 12, amount: 2255, date: '2025/02/29' },
        { id: 13, amount: 2100, date: '2025/03/15' }
      ]
    },
    {
      category: 'Others',
      items: [{ id: 14, amount: 4844, date: '2025/01/29' }]
    }
  ]

  // Build initial dummyData
  function buildDummyData(startDate, endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)

    // Step 1: Flatten & filter by date
    const flatExpenses = totalExpenses.flatMap(exp =>
      exp.items
        .filter(item => {
          const d = new Date(item.date)
          return d >= start && d <= end
        })
        .map(item => ({
          category: exp.category,
          amount: item.amount,
          date: item.date
        }))
    )

    // Step 2: Group by category and sum amounts
    const groupedExpenses = Object.values(
      flatExpenses.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = { category: item.category, amount: 0 }
        }
        acc[item.category].amount += item.amount
        return acc
      }, {})
    )

    const categoryOptions = groupedExpenses.map(exp => ({
      value: exp.category,
      label: exp.category
    }))
    setOptions(categoryOptions)
    return {
      user: { name: 'Nicholas Delacruz', balance: 5240 },
      summary: {
        expenses: flatExpenses.reduce((sum, e) => sum + e.amount, 0), // ✅ sum dynamically
        balance: 5240,
        transactions: groupedExpenses?.length
      },
      totalExpenses: groupedExpenses
    }
  }

  // Filter when user picks dates
  const handleDataFilterBasedOnDate = (start, end) => {
    const newData = buildDummyData(start, end)
    form.setValue('category', '')

    setDummyData(newData)
  }

  const dateValue = form.watch('date')

  useEffect(() => {
    if (dateValue?.from) {
      handleDataFilterBasedOnDate(
        dateValue?.from,
        dateValue?.to == undefined ? dateValue?.from : dateValue?.to
      )
    }
  }, [dateValue])

  const [date, setDate] = useState({
    from: startOfToday(),
    to: startOfToday()
  })
  

   const totalExpenseAmount = useMemo(
    () => dummyData?.totalExpenses?.reduce((acc, item) => acc + item.amount, 0),
    [dummyData?.totalExpenses]
  )
  console.log('totalExpenseAmount', totalExpenseAmount);
  
  // watch selected category
  const selectedCategory = useWatch({ control: form.control, name: 'category' })

  // fixed category colors
  const categoryColors = {
    'Mortgage / Rent': '#3B82F6',
    Food: '#A3E635',
    Utilities: '#FACC15',
    Bills: '#D97706',
    Shopping: '#6366F1',
    Transportation: '#F472B6',
    Insurance: '#8B5CF6',
    'Health Care': '#C084FC',
    Clothing: '#1D4ED8',
    Others: '#06B6D4'
  }
  // Pie chart data

  const pieData = {
    labels:
      selectedCategory && selectedCategory.trim() !== ''
        ? [selectedCategory, '']
        : dummyData?.totalExpenses?.map(item => item.category),

    datasets: [
      {
        data:
          selectedCategory && selectedCategory.trim() !== ''
            ? [
                dummyData?.totalExpenses?.find(
                  item => item.category === selectedCategory
                )?.amount || 0,
                totalExpenseAmount -
                  (dummyData?.totalExpenses?.find(
                    item => item.category === selectedCategory
                  )?.amount || 0)
              ]
            : dummyData?.totalExpenses?.map(item => item.amount),

        backgroundColor:
          selectedCategory && selectedCategory.trim() !== ''
            ? [
                categoryColors[selectedCategory] || '#999999',
                '#E5E7EB' // gray empty ring
              ]
            : dummyData?.totalExpenses?.map(
                item => categoryColors[item.category] || '#999999'
              ),

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
            const label = context.label ||
              context.chart.data.labels[context.dataIndex] ||''
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
    labels: dummyData?.totalExpenses?.map(item => item.category),
    datasets: [
      {
        label: 'Expenses',
        data: dummyData?.totalExpenses?.map(item => item.amount),
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
    labels: dummyData?.totalExpenses?.map(item => item.category),
    datasets: [
      {
        label: 'Expenses',
        data: dummyData?.totalExpenses?.map(item => item.amount),
        backgroundColor: '#F472B6'
      }
    ]
  }

  const barOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    maintainAspectRatio: false
  }

   const centerAmount = selectedCategory
    ? dummyData.totalExpenses.find((i) => i.category === selectedCategory)
      ?.amount || 0
    : totalExpenseAmount

  return (
    <>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl'>Dashboard</h2>
        <FormProvider {...form}>
          <form>
            <DateRangePicker
              form={form}
              name='date'
              setDate={setDate}
              date={date}
            />
          </form>
        </FormProvider>
      </div>
      <div className='!mt-3 grid grid-cols-3 gap-4'>
        {dummyData?.summary &&
          Object.entries(dummyData.summary).map(([key, value]) => (
            <Card
              key={key}
              className='rounded-lg border border-gray-200 p-4 text-center shadow-md'
            >
              <div className='text-xl font-bold text-blue-600'>
                {key === 'balance' || key === 'expenses' ? `$ ${value}` : value}
              </div>
              <div className='mt-1 text-lg text-gray-700'>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </div>
            </Card>
          ))}
      </div>

      {/* Donut Chart */}
      <Card className='mt-4 rounded-lg border border-gray-200 p-4 shadow-md'>
        <div>
          <div className='flex justify-between gap-2'>
            <h2 className='mb-4 text-lg font-semibold'>Total Expenses</h2>
            <FormProvider {...form}>
              <form>
                <FormSelectField
                  name='category'
                  label=''
                  placeholder='Select Category'
                  form={form}
                  options={options || []}
                  className='colum-box-bg-change !mt-0 !w-44'
                />
              </form>
            </FormProvider>
          </div>
        </div>
        <div className='flex gap-8'>
          <div className='relative h-80 w-[60%]'>
            <Pie data={pieData} options={pieOptions} />
            <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center'>
              <div className='font-semibold text-gray-800'>{selectedCategory || 'Total'}
</div>
              <div className='text-xl font-bold text-blue-600'>₹{centerAmount}
</div>
            </div>
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
