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
      <Input type='select' label='Select your faculty' name='facultyFilter' value={this.state.facultyChosen} onChange={ this.props.handleChange } >
        <option value=''>All</option>
        { this.props.faculties.map((faculty) => { 
          return <option value={faculty}>{faculty}</option> 
        }
        )}
      </Input>
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
        <Input list="courses" name='courseFilter' value={this.state.searchedCourse} onChange={this.handleChange} label="Course" id="coursesList" autocomplete="false" />
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
    var universitiesSelected = {}
    props.universities.forEach((university) => {
      if (university.isSelected == true) {
        universitiesSelected[university.name] = university
      }
    })
    this.state = { 
      universities: props.universities,
      universitiesSelected: universitiesSelected,
      selectAll: false,
      universitiesFilter: '',
      countriesFilter: ''
    };
    this.toggleSelected = this.toggleSelected.bind(this)
    this.selectAll = this.selectAll.bind(this)
    this.handleUniversityFilterChange = this.handleUniversityFilterChange.bind(this)
    this.handleCountryFilterChange = this.handleCountryFilterChange.bind(this)
    this.filterByUniversity = this.filterByUniversity.bind(this)
    this.filterByCountry = this.filterByCountry.bind(this)
    this.mapOverPriorSelection = this.mapOverPriorSelection.bind(this)
  }

  toggleSelected(event) {
    console.log('handling is selected')
    var universities = this.state.universities
    var cur = universities.find((university) => {
      return university.name == event.target.id
    })
    cur.isSelected = (cur.isSelected == true) ? false : true
    // set universities selected
    var universitiesSelected = this.state.universitiesSelected
    if (cur.isSelected == true) {
      universitiesSelected[cur.name] = cur
    } else if (cur.name in universitiesSelected) {
      delete universitiesSelected[cur.name]
    }
    this.setState({ 
      universities: universities,
      universitiesSelected: universitiesSelected
    })
  }

  selectAll(event) {
    var selectVal = (this.state.selectAll == true) ? false : true
    var universities = this.state.universities.map((university) => {
      var uniNew = university
      uniNew.isSelected = selectVal
      return uniNew
    })
    var universitiesSelected = this.state.universitiesSelected
    if (selectVal == true) {
      universities.forEach((university) => {
        universitiesSelected[university.name] = university
      })
    } else {
      universities.forEach((university) => {
        if (university.name in universitiesSelected) {
          delete universitiesSelected[university.name]
        }
      })
    }

    this.setState({ 
      universities: universities, 
      universitiesSelected: universitiesSelected, 
      selectAll: selectVal 
    })
  }

  mapOverPriorSelection(universities) {
    var universitiesWithPriorSelection = universities.map((university) => {
      if (university.name in this.state.universitiesSelected) {
        university.isSelected = true
      }
      return university
    })
    return universitiesWithPriorSelection
  }

  handleUniversityFilterChange(event) {
    var universitiesNext = this.filterByCountry(this.state.countriesFilter, this.props.universities)
    var universitiesNextNext = this.filterByUniversity(event.target.value, universitiesNext)
    var universitiesWithPriorSelection = this.mapOverPriorSelection(universitiesNextNext)
    this.setState({ 
      universities: universitiesWithPriorSelection,
      universitiesFilter: event.target.value,
    })
  }

  filterByUniversity(value, universities) {
    var universitiesNext = universities.filter((university) => {
      console.log('filtering universities')
      return university.name.includes(value.toUpperCase())
    })
    return universitiesNext
  }

  handleCountryFilterChange(event) {
    var universitiesNext = this.filterByUniversity(this.state.universitiesFilter, this.props.universities)
    var universitiesNextNext = this.filterByCountry(event.target.value, universitiesNext)
    var universitiesWithPriorSelection = this.mapOverPriorSelection(universitiesNextNext)
    this.setState({ 
      universities: universitiesWithPriorSelection, 
      countriesFilter: event.target.value 
    })
  }

  filterByCountry(value, universities) {
    var universitiesNext = universities.filter((university) => {
      console.log('filtering universities by countries')
      return university.country.includes(value.toUpperCase())
    })
    return universitiesNext
  }

  render() {
    console.log('rerendering table')
    return (
      <Table>
        <thead>
          <tr>
            <th><Input type="checkbox" label=" " onChange={this.selectAll} checked={this.state.selectAll} /></th>
            <th>
              <Input list="universities" value={this.state.universitiesFilter} onChange={this.handleUniversityFilterChange} label="University" id="universityFilter" />
              <datalist id="universities">
                { this.state.universities.map((universityFilter) => { 
                  return <option value={universityFilter.name}/> 
                }
                )}
              </datalist>
            </th>
            <th>
              <Input list="countries" value={this.state.countriesFilter} onChange={this.handleCountryFilterChange} label="Country" id="countryFilter" />
              <datalist id="countries">
                { this.props.countries.map((countryFilter) => { 
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
                  <Input type="checkbox" label=" " id={university.name} onChange={this.toggleSelected} checked={university.isSelected} />
                </td>
                <td>{university.name}</td>
                <td>{university.country}</td>
              </tr>
            )
          })}
          <input type="hidden" name="universitiesSelected" value={this.state.universitiesSelected} />
        </tbody>
      </Table>
    )
  }
}

export {
  FacultyDropDown, CourseSearch, UniversitiesTable
}