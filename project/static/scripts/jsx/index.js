import { Search, ResultsTable } from './components.js'
import { Button, Autocomplete } from 'react-materialize'

class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      // courses: props.courses,
      // countries: props.countries,
      // universities: props.universities
      results: props.results
    }
    this.getResults = this.getResults.bind(this)
  }
//          <Results results={ this.state.results } />
  // displayResults() {

  // }
  getResults() {
    // button onClick ajax call

  }

  // Get value of all form elements to send to ajax request
  getFormValues() {
    
  }

  render() {
    return (
      <div>
        <form method="POST">
          <Search data={ this.props.courses } dataType="Courses" />
          <Search data={ this.props.countries } dataType="Countries" />
          <Search data={ this.props.universities } dataType="Universities" />
          <br/>
          <Button waves='light' type="submit">MATCH</Button>
        </form>
        <br/><br/>
        <ResultsTable data={ this.state.results } />
      </div>
    )
  }
}
//          <Autocomplete title="Current university" data={ this.props.universities }></Autocomplete>

//         <ResultsTable data={ this.props.results, this.compare } />


window.onload = () => {
  let courses = JSON.parse(document.getElementById("coursesProps").innerHTML)
  let countries = JSON.parse(document.getElementById("countriesProps").innerHTML)
  let universities = JSON.parse(document.getElementById("universitiesProps").innerHTML)
  let results = JSON.parse(document.getElementById("resultsProps").innerHTML)
  // let universities = { universities|safe }
  // let courses = { courses|safe }
  // let countries = { countries|safe }
  // let results = { results|safe }
  // console.log(universities)

  ReactDOM.render(
    <HomePage universities={ universities } courses={ courses } countries={ countries } results={ results } />,
    document.getElementById('main')
  );
}