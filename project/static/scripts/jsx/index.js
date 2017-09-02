import { FacultyDropDown, CourseSearch, UniversitiesTable } from './components.js'
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
//import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Button } from 'react-materialize'

class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      facultyChosen: '',
      faculties: Object.freeze(["Business School", "Engineering"]),
      courses: [
        {"name": "ECON1203", "faculty": "Business School"}, {"name": "COMP1000", "faculty": "Engineering"}, 
        {"name": "INFS1603", "faculty": "Business School"}, {"name": "INFS1602", "faculty": "Business School"}
        /*,
        {"name": "Bolivia"}, {"name": "Latvia"}, {"name": "Samoa"}, {"name": "Armenia"},
        {"name": "Greenland"}, {"name": "Cuba"}, {"name": "Western Sahara"}, {"name": "Ethiopia"},
        {"name": "Malaysia"}, {"name": "Argentina"}, {"name": "Uganda"}, {"name": "Chile"},
        {"name": "Aruba"}, {"name": "Japan"}, {"name": "Trinidad and Tobago"}, {"name": "Italy"},
        {"name": "Cambodia"}, {"name": "Iceland"}, {"name": "Dominican Republic"}, {"name": "Turkey"},
        {"name": "Spain"}, {"name": "Poland"}, {"name": "Hawaii"}, {"name": "Iraq"}*/
      ],
      universities: [
        {"name": "UNIVERSITY OF NEW YORK", "country": "USA", "isSelected": true},
        {"name": "UNIVERSITY OF HONG KONG", "country": "HONG KONG", "isSelected": false}
      ],
      countries: ["USA", "HONG KONG"]
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
    return (
      //<MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <FacultyDropDown faculties={ this.state.faculties } handleChange={ this.handleFacultyChange } facultyChosen={this.state.facultyChosen} />
          <CourseSearch courses={ this.state.courses } facultyChosen={this.state.facultyChosen} />
          <UniversitiesTable universities={ this.state.universities } countries={ this.state.countries } />
          <Button waves='light'>MATCH</Button>
        </div>
      //</MuiThemeProvider>
    )
  }
}

ReactDOM.render(
  <HomePage />,
  document.getElementById('main')
);