class FacultyDropDown extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      facultyChosen: ''
    };
  }

  render() {
    return (
      <div>
        <select onChange={ this.props.handleChange }>
          <option value='' selected disabled hidden>Select faculty</option>
          <option value=''>All</option>
          { this.props.faculties.map((faculty) => { 
            return <option value={faculty}>{faculty}</option> 
          }
          )}
        </select>
      </div>
    )
  }
}

class CourseSearch extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      searchedCourse: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps
    this.setState({ searchedCourse: '' })
  }

  handleChange(event){
    this.setState({ searchedCourse: event.target.value })
    console.log("course updated!")
  }

  render() {
    var courses = this.props.courses;
    var course = this.state.searchedCourse.trim().toLowerCase()

    if(course.length > 0){
      courses = courses.filter((courseFilter) => {
        return courseFilter.name.toLowerCase().includes(course)
      });
    }

    return (
      <div>
        <input type="text" value={this.state.course} onChange={this.handleChange} placeholder="Course" />
        <ul>
          { courses.map((courseFilter) => { 
            return <li>{courseFilter.name} </li> 
          }
          )}
        </ul>
      </div>
    )
  }
}

export {
  FacultyDropDown, CourseSearch
}