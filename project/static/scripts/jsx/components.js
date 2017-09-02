//import { Input, Table, Button } from 'react-materialize'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { Input, Table } from 'react-materialize'
/*
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
*/
import Checkbox from 'material-ui/Checkbox'
import AutoComplete from 'material-ui/AutoComplete'

class FacultyDropDown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      facultyChosen: props.facultyChosen
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      facultyChosen: nextProps.facultyChosen
    })
  }

  render() {
    return (
      <SelectField value={this.state.facultyChosen} onChange={ this.props.handleChange }>
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
      facultyChosen: props.facultyChosen,
      courses: props.courses
    };
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.facultyChosen != nextProps.facultyChosen) {
      var coursesNext = nextProps.courses
      if (nextProps.facultyChosen.length > 0) {
        coursesNext = coursesNext.filter((course) => {
          console.log('filtering')
          return course.faculty == nextProps.facultyChosen
        })
      }

      this.setState({ 
        searchedCourse: '',
        facultyChosen: nextProps.facultyChosen,
        courses: coursesNext
      })
    }
  }

  handleChange(event){
    this.setState({searchedCourse: event.target.value })
    console.log("course updated!")
  }

  render() {
    return (
      <div>
        <input list="courses" value={this.state.searchedCourse} onChange={this.handleChange} placeholder="Course" id="coursesList" />
        <datalist id="courses">
          { this.state.courses.map((courseFilter) => { 
            return <option value={courseFilter.name}/> 
          }
          )}
        </datalist>
      </div>
    )
  }
}

class UniversitiesTable extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      universities: props.universities,
      countries: props.countries
    };
    this.toggleSelected = this.toggleSelected.bind(this)
    this.handleUniversityFilterChange = this.handleUniversityFilterChange.bind(this)
    this.handleCountryFilterChange = this.handleCountryFilterChange.bind(this)
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

  handleUniversityFilterChange(event) {

  }

  handleCountryFilterChange(event) {

  }
/*

            <TableHeaderColumn><AutoComplete floatingLabelText="University" dataSource={universities} openOnFocus={true} onUpdateInput={this.handleUniversityFilterChange} /></TableHeaderColumn>
            <TableHeaderColumn><AutoComplete floatingLabelText="Country" dataSource={countries} openOnFocus={true} onUpdateInput={this.handleCountryFilterChange} /></TableHeaderColumn>
            */
  render() {
    /*
    const Temp = () => (
      <TableBody>
      {this.state.universities.map((university) => { 
          return 
            <TableRow>
              <TableRowColumn>
                <Checkbox label=" " onCheck={this.toggleSelected} checked={university.isSelected} />
              </TableRowColumn>
              <TableRowColumn>{university.name}</TableRowColumn>
              <TableRowColumn>{university.country}</TableRowColumn>
            </TableRow>
        })}
      </TableBody>
    )

          <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn><RaisedButton label="Select all" /></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableRowColumn>a</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    */
    return (
      <Table>
        <thead>
          <tr>
            <th><button type="button">SELECT ALL</button></th>
            <th>
              <input list="universities" onChange={this.handleUniversityFilterChange} placeholder="University" />
              <datalist id="universities">
                { this.state.universities.map((universityFilter) => { 
                  return <option value={universityFilter.name}/> 
                }
                )}
              </datalist>
            </th>
            <th>
              <input list="countries" onChange={this.handleCountryFilterChange} placeholder="Country" />
              <datalist id="countries">
                { this.state.countries.map((countryFilter) => { 
                  return <option value={countryFilter}/> 
                }
                )}
              </datalist>
            </th>
          </tr>
        </thead>
        <tbody>
          { this.state.universities.map((university) => {
            return (
              <tr>
                <td>
                  <Input type="checkbox" label=" " name={university.name} id={university.name} 
                  onChange={this.toggleSelected} defaultChecked={university.isSelected} />
                </td>
                <td>{university.name}</td>
                <td>{university.country}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
}

export {
  FacultyDropDown, CourseSearch, UniversitiesTable
}