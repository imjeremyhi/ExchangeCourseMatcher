import { FacultyDropDown, CourseSearch } from './components.js'

class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      facultyChosen: ''
    }
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
    const faculties = Object.freeze(["Business School", "Engineering"])
    var courses = [
      {"name": "ECON1203", "faculty": "Business School"}, {"name": "COMP1000", "faculty": "Engineering"}, 
      {"name": "INFS1603", "faculty": "Business School"}, {"name": "INFS1602", "faculty": "Business School"}
      /*,
      {"name": "Bolivia"}, {"name": "Latvia"}, {"name": "Samoa"}, {"name": "Armenia"},
      {"name": "Greenland"}, {"name": "Cuba"}, {"name": "Western Sahara"}, {"name": "Ethiopia"},
      {"name": "Malaysia"}, {"name": "Argentina"}, {"name": "Uganda"}, {"name": "Chile"},
      {"name": "Aruba"}, {"name": "Japan"}, {"name": "Trinidad and Tobago"}, {"name": "Italy"},
      {"name": "Cambodia"}, {"name": "Iceland"}, {"name": "Dominican Republic"}, {"name": "Turkey"},
      {"name": "Spain"}, {"name": "Poland"}, {"name": "Hawaii"}, {"name": "Iraq"}*/
    ]
    if (this.state.facultyChosen.length > 0) {
      courses = courses.filter((course) => {
        console.log('filtering')
        return course.faculty == this.state.facultyChosen
      })
    }

    return (
      <div>
        <FacultyDropDown faculties={ faculties } handleChange = { this.handleFacultyChange } />
        <CourseSearch courses={ courses } />
      </div>
    )
  }
}

ReactDOM.render(
  <HomePage />,
  document.getElementById('main')
);