import { FacultyDropDown, CourseSearch, UniversitiesTable } from './components.js'
import { Button } from 'react-materialize'

class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      facultyChosen: '',
      faculties: Object.freeze(["Business School", "Engineering"]),
      courses: props.courses,
      universities: props.universities,
      countries: ["USA", "HONG KONG"]
    }
    console.log(this.state)
    this.handleFacultyChange = this.handleFacultyChange.bind(this)
  }

  handleFacultyChange(event){
    console.log('faculty changing' + event.target.value)
    if (event.target.value != undefined) {
      this.setState({ facultyChosen: event.target.value })
    }
    console.log("faculty updated!")
  }

  render() {
    return (
        <form method="POST">
          <FacultyDropDown faculties={ this.state.faculties } handleChange={ this.handleFacultyChange } facultyChosen={this.state.facultyChosen} />
          <CourseSearch courses={ this.state.courses } facultyChosen={ this.state.facultyChosen } />
          <UniversitiesTable universities={ this.state.universities } countries={ this.state.countries } />
          <Button waves='light' type="submit">MATCH</Button>
        </form>
    )
  }
}

window.onload = () => {
  let universities = JSON.parse(document.getElementById("universitiesState").innerHTML)
  let courses = JSON.parse(document.getElementById("coursesState").innerHTML)
  ReactDOM.render(
    <HomePage universities={ universities } courses={ courses } />,
    document.getElementById('main')
  );
}