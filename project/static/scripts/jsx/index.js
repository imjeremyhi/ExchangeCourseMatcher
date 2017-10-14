import { Search, ResultsTable } from './components.js'
import { Button, Autocomplete } from 'react-materialize'

class HomePage extends React.Component {
  constructor(props){
    super(props);

    this.state = { 
      // courses: props.courses,
      // countries: props.countries,
      // universities: props.universities
      results: props.results,
      isLoading: false,
      showArrowLine: false
    };

    this.getResults = this.getResults.bind(this);
    this.updateResultValues = this.updateResultValues.bind(this);
  }
//          <Results results={ this.state.results } />
  // displayResults() {

  // }
  getResults() {
    // button onClick ajax call
    var self = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        self.updateResultValues(this.responseText);
      }
    };

    var courses = [];
    $(".search-list-item-Courses").each(function() {
      courses.push($(this).text());
    });

    var universities = [];
    $(".search-list-item-Universities").each(function() {
      universities.push($(this).text());
    });

    var countries = [];
    $(".search-list-item-Countries").each(function() {
      countries.push($(this).text());
    });

    var params = "/ajax/" + courses + "/" + universities + "/" + countries;
    xhttp.open("GET", params);
    xhttp.send();

    this.setState({
      isLoading: true
    });
  }

  // Get value of all form elements to send to ajax request
  updateResultValues(responseText) {
    console.log(typeof(responseText))
    this.setState({
      results: JSON.parse(responseText),
      isLoading: false,
      showArrowLine: true
    });
    console.log(responseText);
  }

  render() {
    return (
      <div>
        <Search data={ this.props.courses } dataType="Courses" />
        <Search data={ this.props.countries } dataType="Countries" />
        <Search data={ this.props.universities } dataType="Universities" />
        <br/>
        <Button waves='light' type="button" onClick={this.getResults} id="match-button">MATCH</Button>
        { this.state.isLoading == true ? <img src="static/imgs/loading.gif" id="loading-img" /> : <img src="" /> }
        <br/>
        { this.state.showArrowLine == true ? <img src="static/imgs/arrow-line.png" id="arrow-line-img" /> : <img src="" /> }
        <br/>
        <br/>
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