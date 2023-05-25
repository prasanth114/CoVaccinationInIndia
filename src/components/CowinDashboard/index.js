import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatuses = {
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const CowinDashboard = () => {
  const [vaccinationData, updateVaccinationData] = useState([])
  const [vaccinationByAgeData, updateVaccinationByAge] = useState([])
  const [vaccinationByGenderData, updateVaccinationByGender] = useState([])
  const [apiStatus, changeStatus] = useState(apiStatuses.inprogress)

  const fetchingData = async () => {
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(covidVaccinationDataApiUrl)
    const data = await response.json()

    const formattingLast7DaysData = data.last_7_days_vaccination.map(
      eachItem => ({
        vaccineDate: eachItem.vaccine_date,
        dose1: eachItem.dose_1,
        dose2: eachItem.dose_2,
      }),
    )

    if (response.ok === true) {
      updateVaccinationData(formattingLast7DaysData)
      updateVaccinationByAge(data.vaccination_by_age)
      updateVaccinationByGender(data.vaccination_by_gender)
      changeStatus(apiStatuses.success)
    } else {
      changeStatus(apiStatuses.failure)
    }
  }

  const renderingLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  const renderingFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  useEffect(() => {
    fetchingData()
  }, [])

  return (
    <div className="app-container">
      <div className="co-win-vaccination-container">
        <div className="website-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="logo-heading">Co-WIN</h1>
        </div>
        <h1 className="main-heading">CoWIN Vaccination in India</h1>

        {apiStatus === 'INPROGRESS' && renderingLoadingView()}
        {apiStatus === 'SUCCESS' && (
          <VaccinationCoverage data={vaccinationData} />
        )}
        {apiStatus === 'SUCCESS' && (
          <VaccinationByGender data={vaccinationByGenderData} />
        )}
        {apiStatus === 'SUCCESS' && (
          <VaccinationByAge data={vaccinationByAgeData} />
        )}
        {apiStatus === 'FAILURE' && renderingFailureView()}
      </div>
    </div>
  )
}

export default CowinDashboard
