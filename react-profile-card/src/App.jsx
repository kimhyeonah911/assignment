import './App.css'
import ProfileList from './components/ProfileList'

const profileData = [{
  name: "김현아",
  age: 24,
  isOnline: true
}, {
  name: "김현아",
  age: 25,
  isOnline: false
},{
  name: "김현아",
  age: 28,
  isOnline: true
}]

function App() {
  return (
    <>
      <ProfileList profile={profileData}/>
    </>
  )
}

export default App