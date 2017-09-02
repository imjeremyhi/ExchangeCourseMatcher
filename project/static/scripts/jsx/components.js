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
        <select className="browser-default" onChange={ this.props.handleChange }>
          <option value='' selected disabled>Choose your option</option>
          <option value=''>All</option>
          { this.props.faculties.map((faculty) => { 
            return <option value={faculty}>{faculty}</option> 
          }
          )}
        </select>
        <label>Select faculty</label>
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
        <input list="courses" value={this.state.course} onChange={this.handleChange} placeholder="Course" />
        <datalist id="courses">
          { courses.map((courseFilter) => { 
            return <option value={courseFilter.name}/> 
          }
          )}
        </datalist>
      </div>
    )
  }
}

export {
  FacultyDropDown, CourseSearch
}