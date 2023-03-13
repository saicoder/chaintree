import { Layout } from '@/components/layout'
import { useEffect, useState } from 'react'
import type { AnalyticsResult } from '@/pages/api/analytics'
import { useAccount } from '@/hooks/useAccount'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import format from 'date-fns/format'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsResult>()
  const { chainProfile } = useAccount()

  useEffect(() => {
    if (!chainProfile?.slug) {
      setData({ clicks7Day: [], clicks7DayByLink: [] })
      return
    }

    fetch(`/api/analytics?username=${chainProfile.slug}`)
      .then<AnalyticsResult>((t) => t.json())
      .then(setData)
  }, [chainProfile?.slug])

  if (!data || data.clicks7DayByLink.length === 0) {
    return (
      <Layout>
        <div className="py-8 m-5 font-semibold text-center text-gray-400 border-2 border-dashed rounded-2xl">
          {data === undefined ? 'Loading' : 'No Analytics Available'}
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="mt-2 text-lg font-semibold text-gray-800">Total Clicks</div>
      <div className="p-5 mt-4 bg-white rounded-lg shadow-sm">
        <div className="relative h-40">
          <Line
            width={'670px'}
            data={{
              labels: data.clicks7Day.map((t) => format(new Date(t.date), 'eeee')),

              datasets: [
                {
                  label: 'Clicks',
                  data: data.clicks7Day.map((t) => t._count),
                  backgroundColor: '#31C48D',
                  borderColor: '#d2f6e9',
                },
              ],
            }}
          />
        </div>
      </div>

      <div className="text-lg font-semibold text-gray-800 mt-7">Top Performers</div>
      <div className="mt-3 bg-white rounded-md shadow-sm">
        {data.clicks7DayByLink.map((t, i) => (
          <div key={i} className="flex items-center px-4 py-4 border-b hover:bg-gray-50">
            <div>{t.link.label}</div>
            <div className="flex-1"></div>
            <div className="font-semibold text-gray-300 text-tiny">CLICKS</div>
            <div className="ml-2 text-lg">{t._count}</div>
          </div>
        ))}

        {data.clicks7DayByLink.length === 0 && (
          <div className="py-8 m-5 font-semibold text-center text-gray-400 border-2 border-dashed rounded-2xl">
            No Items
          </div>
        )}
      </div>
    </Layout>
  )
}
