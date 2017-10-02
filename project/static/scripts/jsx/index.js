import { Search } from './components.js'
import { Button } from 'react-materialize'

class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      // courses: props.courses,
      // countries: props.countries,
      // universities: props.universities
    }
  }
//          <Results results={ this.state.results } />
  render() {
    return (
      <div>
        <form method="POST">
          <Search data={ this.props.courses } dataType="Courses" />
          <Search data={ this.props.countries } dataType="Countries" />
          <Search data={ this.props.universities } dataType="Universities" />
          <Button waves='light' type="submit">MATCH</Button>
        </form>
      </div>
    )
  }
}

window.onload = () => {
  let courses = JSON.parse(document.getElementById("coursesProps").innerHTML)
  let countries = JSON.parse(document.getElementById("countriesProps").innerHTML)
  let universities = JSON.parse(document.getElementById("universitiesProps").innerHTML)

  ReactDOM.render(
    <HomePage universities={ universities } courses={ courses } countries={ countries } />,
    document.getElementById('main')
  );
}