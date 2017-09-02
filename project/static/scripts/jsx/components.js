//import { Input, Table, Button } from 'react-materialize'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'
import AutoComplete from 'material-ui/AutoComplete'

class FacultyDropDown extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <SelectField floatingLabelText="Select faculty" value='' onChange={ this.props.handleChange }>
        <MenuItem value='' primaryText="All" />
        { this.props.faculties.map((faculty) => { 
          return <MenuItem value={faculty} primaryText={faculty} /> 
        }
        )}
      </SelectField>
    )
  }
}

class CourseSearch extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      searchedCourse: '',
      facultyChosen: props.facultyChosen
    };
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.facultyChosen != nextProps.facultyChosen) {
      this.setState({ 
        searchedCourse: '',
        facultyChosen: nextProps.facultyChosen
      })
    }
  }

  handleChange(event){
    this.setState({ searchedCourse: event.target.value })
    console.log("course updated!")
  }

  render() {
    var courses = this.props.courses;
    if (this.state.facultyChosen.length > 0) {
      courses = courses.filter((course) => {
        console.log('filtering')
        return course.faculty == this.state.facultyChosen
      })
    }

    var course = this.state.searchedCourse.trim().toLowerCase()

    if(course.length > 0){
      courses = courses.filter((courseFilter) => {
        return courseFilter.name.toLowerCase().includes(course)
      });
    }

    return (
      <div>
        <AutoComplete hintText="Course" dataSource={courses} onUpdateInput={this.handleChange} />
      </div>
    )
  }
}

class UniversitiesTable extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      universities: props.universities
    };
    this.toggleSelected = this.toggleSelected.bind(this)
  }

  toggleSelected(event) {
    console.log('handling is selected')
    var universities = this.state.universities
    var cur = universities.find((university) => {
      return university.name == event.target.name
    })
    cur.isSelected = (cur.isSelected == true) ? false : true
    /*
    var universities = []
    this.state.universities.forEach((university) => {
      if (university.name == event.target.name) {
        var selected = (university.isSelected) ? false : true
        universities.push({univ})
      } else {
        universities.push(university)
      }
    })
    */
    this.setState({ universities: universities })
  }

  render() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn><RaisedButton label="Select all" /></TableHeaderColumn>
            <TableHeaderColumn><AutoComplete hintText="University" id="universityFilter" /></TableHeaderColumn>
            <TableHeaderColumn><AutoComplete hintText="Country" id="countryFilter" /></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
        { this.state.universities.map((university) => { 
          return (
            <TableRow>
              <TableRowColumn>
                <Checkbox label=" " 
                  name={university.name} onCheck={this.toggleSelected} checked={university.isSelected} />
              </TableRowColumn>
              <TableRowColumn>{university.name}</TableRowColumn>
              <TableRowColumn>{university.country}</TableRowColumn>
            </TableRow>
          )
        })
        }
        </TableBody>
      </Table>
    )
  }
}

export {
  FacultyDropDown, CourseSearch, UniversitiesTable
}