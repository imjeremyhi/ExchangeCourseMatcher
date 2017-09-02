import { Input, Table } from 'react-materialize'

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
      <Input type='select' label='Select your faculty'value={this.state.facultyChosen} onChange={ this.props.handleChange }>
        <option value=''>All</option>
        { this.props.faculties.map((faculty) => { 
          return <option value={faculty}>{faculty}</option> 
        }
        )}
      </Input>
        /*
      <SelectField value={this.state.facultyChosen} onChange={ this.props.handleChange }>
        <MenuItem value='' primaryText="All" />
        { this.props.faculties.map((faculty) => { 
          return <MenuItem value={faculty} primaryText={faculty} /> 
        }
        )}
      </SelectField>
      */
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
        <Input list="courses" value={this.state.searchedCourse} onChange={this.handleChange} label="Course" id="coursesList" />
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
    this.setState({ universities: universities })
  }

  handleUniversityFilterChange(event) {

  }

  handleCountryFilterChange(event) {

  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th><Input type="checkbox" label=" " name={"all"} id={"all"} 
              onChange={this.selectAll} defaultChecked={false} /></th>
            <th>
              <Input list="universities" onChange={this.handleUniversityFilterChange} label="University" id="universityFilter" />
              <datalist id="universities">
                { this.state.universities.map((universityFilter) => { 
                  return <option value={universityFilter.name}/> 
                }
                )}
              </datalist>
            </th>
            <th>
              <Input list="countries" onChange={this.handleCountryFilterChange} label="Country" id="countryFilter" />
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