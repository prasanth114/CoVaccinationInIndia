import {
  ResponsiveContainer,
  Legend,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {data} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}K`
    }
    return number
  }
  return (
    <div className="card-container">
      <h1>Vaccination Coverage</h1>
      <ResponsiveContainer width="90%" height={400}>
        <BarChart data={data} width={1000} height={300}>
          <XAxis
            dataKey="vaccineDate"
            tick={{stroke: 'gray', strokeWight: 1}}
          />
          <YAxis tickFormatter={DataFormatter} />
          <Legend wrapperStyle={{padding: 20}} />
          <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="10%" />
          <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="10%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
